import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import csv from 'csv-parser';
import fs from 'fs';
import { IDroneEntry } from "./interfaces/IDroneEntry";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

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
          CurrentMoment: Number(data?.CurrentMoment),
          Latitude: Number(data?.Latitude),
          Longitude: Number(data?.Longitude),
          Heading: Number(data?.Heading),
          Speed: Number(data?.Speed),
          Altitude: Number(data?.Altitude),
          Country: data?.Country,
          Operator: data?.Operator,
          Identification: Number(data.Identification),
          IdentificationLabel: data?.IdentificationLabel,
          Model: data?.Model,
          RegistrationNumber: data?.RegistrationNumber,
          Sign: data?.Sign,
          IsAirborne: data?.IsAirborne === 'true',
          Fuel: Number(data?.Fuel)
        }
        if (!csvData?.[parsedData.Identification]) {
          csvData[parsedData.Identification] = []
        }
        csvData[parsedData.Identification].push(parsedData)
      })
      .on('end', () => {
        console.log('CSV file successfully loaded');
      });
  });
}

readCSVFile();

app.get("/drones", (req: Request, res: Response) => {
  res.status(200).send(currentData);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});