import React, { useContext, useState } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { AppContext } from '../../../context/AppContext';

const FlightTracking = () => {
  const { trackedFlight, setTableSelectedDroneRegistration, 
    setTrackedFlight, setTrackedPoint, trackedPoint } = useContext(AppContext)
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            setTableSelectedDroneRegistration(null)
            setTrackedFlight(null)
          }}
        >✈️ Powrót do listy dronów</button>
        
        <button
          onClick={() => {
            setTrackedFlight(null)
          }}
        >📋 Powrót do listy lotów</button>
      </div>
      <div className="chartContainer">
        <ResponsiveContainer height={200} width='100%'>
          <LineChart data={trackedFlight?.flightRecords?.map((record, index) => ({
            time: index,
            uv: record?.altitude
          }))}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#555555" strokeDasharray="3 3" opacity={0.8}  />
            <XAxis
              dataKey="time"
              hide={true}
              interval={"equidistantPreserveStart"}
            />
            <Line type="monotone" dataKey="uv" stroke="rgb(134, 194, 50)" strokeWidth={2} dot={{ r: 2 }}/>
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
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        Wysokość: <b>{payload[0].value}</b>
      </div>
    );
  }

  return null;
};

export default FlightTracking;