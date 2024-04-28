import React from 'react';
import { MapDrone } from '../drones/types';

interface props{
    selectedDrone: MapDrone | null,
    onDebugClick: () => void,
    onUpdateClick: () => void,

}

const Sidebar: React.FC<props> = ({selectedDrone, onDebugClick, onUpdateClick}) => {
    return (
        <div className="panel">
            <h3>Map options</h3>
            <button onClick={onDebugClick}>
                Map debug
            </button>
            {selectedDrone && <div>
                <h2>Selected drone: {selectedDrone.id}</h2>
                <h3>Position</h3>
                Latitude: {selectedDrone.position[0]}<br />
                Longtitude: {selectedDrone.position[1]}<br />
                <h3>Orientation</h3>
                Direction: {selectedDrone.orientation[1]}<br />
                Slope: {selectedDrone.orientation[2]}<br />
                <h3>Drone management</h3>
                <button onClick={onUpdateClick}>Update location</button>
            </div>}
      </div>
    );
};

export default Sidebar;