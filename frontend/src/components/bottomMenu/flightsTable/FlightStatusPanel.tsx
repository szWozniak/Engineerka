import { Dispatch, SetStateAction, useContext } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TooltipProps, LegendProps } from 'recharts';
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { AppContext } from '../../../context/AppContext';
import { DroneFlight } from '../../../flights/api/types';


// table: {
  //   selectedDroneRegistration: string | null,
  //   selectedDroneFlights: DroneFlightSummary[],
  //   setSelectedDroneRegistration: Dispatch<SetStateAction<string | null>>,
  // }
  // flights: {
  //   trackedFlight: DroneFlight | null | undefined,
  //   tableSelectedFlightId: number | null,
  //   trackedPoint: number,
  //   highlitedFlightId: number | null,
  //   setTrackedFlight: Dispatch<SetStateAction<DroneFlight | null>>,
  //   setTableSelectedFlightId: Dispatch<SetStateAction<number | null>>,
  //   setTrackedPoint: Dispatch<SetStateAction<number>>
  //   setHighlightedFlightId: Dispatch<SetStateAction<number | null>>
  // }

interface Props {
  selectDroneRegistrationToShowFlightsFor: Dispatch<SetStateAction<string | null>>,
  selectHighlightedFlightId: Dispatch<SetStateAction<number | null>>,
  selectFlightId: Dispatch<SetStateAction<number | null>>,
  selectTrackedPoint: Dispatch<SetStateAction<number>>,
  trackedFlight: DroneFlight | null | undefined,
  trackedPoint: number,
}

const FlightStatusPanel: React.FC<Props> = ({selectDroneRegistrationToShowFlightsFor,
  selectFlightId,
  selectHighlightedFlightId,
  selectTrackedPoint,
  trackedFlight,
  trackedPoint,
}) => {
  
  return (
    <div className="tableContainer">
      <div className="controls">
        <button
          onClick={() => {
            selectDroneRegistrationToShowFlightsFor(null)
            selectHighlightedFlightId(null)
            selectFlightId(null)
          }}
        >✈️ Powrót do listy dronów</button>
        
        <button
          onClick={() => {
            selectHighlightedFlightId(null)
            selectFlightId(null)
          }}
        >📋 Powrót do listy lotów</button>
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
        <input type="range" min={0} 
        max={trackedFlight?.flightRecords?.length} 
        step={1} 
        value={trackedPoint} 
        onChange={(e) => {
          selectTrackedPoint(parseInt(e?.target?.value))
        }}/>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>)  => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        📈 Wysokość: <b>{payload[0]?.value}m</b><br />
        ⛽ Stan Paliwa: <b>{payload[1]?.value}%</b>
      </div>
    );
  }

  return null;
};

const CustomLegend = ({payload}: LegendProps) => {
  if (payload){
    return (
      <div className="legend">
        <h5 style={{color: payload[0]?.color}}>📈 Wysokość</h5>
        <h5 style={{color: payload[1]?.color}}>⛽ Stan Paliwa</h5>
      </div>
    )
  }

  return null;
}

export default FlightStatusPanel;