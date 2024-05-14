import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import csv from 'csv-parser';
import fs from 'fs';
import { IDroneEntry } from "./interfaces/IDroneEntry";
const cors = require("cors")

dotenv.config();

const app: Express = express();
app.use(cors())
const port = process.env.PORT || 8000;

const csvData: { [key: string]: IDroneEntry[] } = {}
let currentMoment: number = 0
let currentData: { [key: string]: IDroneEntry } = {}

const interval = setInterval(() => {
  currentMoment = (currentMoment + 1) % 48;

  Object.keys(csvData).forEach((key: string) => {
    currentData[key] = csvData[key][currentMoment];
  })
}, 1000);

function readCSVFile() {
  const filePath = 'src/files/data.csv';

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('CSV file not found:', err);
      return;
    }

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ";" }))
      .on('data', (data) => {
        const parsedData: IDroneEntry = {
          currentMoment: Number(data?.CurrentMoment),
          latitude: Number(data?.Latitude),
          longitude: Number(data?.Longitude),
          heading: Number(data?.Heading),
          speed: Number(data?.Speed),
          altitude: Number(data?.Altitude),
          country: data?.Country,
          operator: data?.Operator,
          identification: Number(data.Identification),
          identificationLabel: data?.IdentificationLabel,
          model: data?.Model,
          registrationNumber: data?.RegistrationNumber,
          sign: data?.Sign,
          isAirborne: data?.IsAirborne === 'true',
          fuel: Number(data?.Fuel)
        }
        if (!csvData?.[parsedData.identification]) {
          csvData[parsedData.identification] = []
        }
        csvData[parsedData.identification].push(parsedData)
      })
      .on('end', () => {
        console.log('CSV file successfully loaded');
      });
  });
}

readCSVFile();

app.get("/drones", (req: Request, res: Response) => {
  res.status(200).send(Object.values(currentData));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});