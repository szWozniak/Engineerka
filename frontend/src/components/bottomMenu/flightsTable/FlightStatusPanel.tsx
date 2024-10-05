import React, { useContext, useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TooltipProps, LegendProps } from 'recharts';
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { AppContext } from '../../../context/AppContext';
import { useTranslation } from 'react-i18next';

const FlightStatusPanel = () => {
  const { t } = useTranslation();

  const { trackedFlight, setTrackedFlight, trackedPoint, setTrackedPoint,
    setTableSelectedDroneRegistration, setFlightsTableSelectedFlightId, setHighlightedFlightId } = useContext(AppContext)
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            setTableSelectedDroneRegistration(null)
            setTrackedFlight(null)
            setHighlightedFlightId(null)
            setFlightsTableSelectedFlightId(null)
          }}
        >✈️ {t("actions.backToDrones")}</button>
        
        <button
          onClick={() => {
            setTrackedFlight(null)
            setHighlightedFlightId(null)
            setFlightsTableSelectedFlightId(null)
          }}
        >📋 {t("actions.backToFlights")}</button>
      </div>
      <div className="chartContainer">
        <ResponsiveContainer height={200} width='100%'>
          <LineChart data={trackedFlight?.flightRecords?.map((record, index) => ({
            time: index,
            alt: record?.altitude,
            fuel: record?.fuel
          }))}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#555555" strokeDasharray="3 3" opacity={0.8}  />
            <XAxis
              dataKey="time"
              hide={true}
              interval={"equidistantPreserveStart"}
            />
            <Legend content={<CustomLegend />}/>
            <Line type="monotone" dataKey="alt" stroke="rgb(184, 124, 50)" strokeWidth={3} dot={{ r: 4 }}/>
            <Line type="monotone" dataKey="fuel" stroke="rgb(90, 130, 20)" strokeWidth={3} dot={{ r: 4 }}/>
          </LineChart>
        </ResponsiveContainer>
        <input type="range" min={0} max={trackedFlight?.flightRecords?.length} step={1} value={trackedPoint} onChange={(e) => {
          setTrackedPoint(parseInt(e?.target?.value))
        }}/>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>)  => {
  const { t } = useTranslation();

  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        📈 {t("geo.altitude")}: <b>{payload[0]?.value}m</b><br />
        🔋 {t("details.drone.battery")}: <b>{payload[1]?.value}%</b>
      </div>
    );
  }

  return null;
};

const CustomLegend = ({payload}: LegendProps) => {
  const { t } = useTranslation();

  if (payload){
    return (
      <div className="legend">
        <h5 style={{color: payload[0]?.color}}>📈 {t("geo.altitude")}</h5>
        <h5 style={{color: payload[1]?.color}}>🔋 {t("details.drone.battery")}</h5>
      </div>
    )
  }

  return null;
}

export default FlightStatusPanel;