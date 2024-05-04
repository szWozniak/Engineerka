import { Color, Position } from "deck.gl"
import { useEffect, useRef, useState } from "react"
import { Drone, MapDrone } from "../drones/types"
import { paths } from "../map/configuration/pathConfiguration"

const DEFAULT_COLOR: Color = [215, 80, 80]
const SELECTED_COLOR: Color = [255, 0, 0]

const useDrones = (selectedDrone : MapDrone | null) => {
    const [drones, setDrones] = useState<Drone[]>([
        {
          id: 1,
          position: [19.9317, 50.0671, 50],
          orientation: [0, 130, 90]
        },
        {
          id: 2,
          position: [19.9276, 50.0685, 60],
          orientation: [0, 180, 90],
        },
        {
          id: 3,
          position: [19.9207, 50.0712, 40],
          orientation: [30, 150, 90],
        }
    ])

    const [dronInSimulation, setDroneInSimulation] = useState<MapDrone | null>(null)

    const [currentPosition, setCurrentPosition] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
      if (!dronInSimulation?.id) return
      setDrones([
        ...drones.filter((drone: any) => drone.id !== dronInSimulation.id),
        {
          id: dronInSimulation.id,
          position: paths[currentPosition].start,
          orientation: dronInSimulation.orientation
        }
      ])
  }, [currentPosition])

  const startSimulation = () => {
    setDroneInSimulation(selectedDrone)
    intervalRef.current = setInterval(() => {
      setCurrentPosition((prev: number) => (prev + 1) % 199)
    }, 15)
  }

    const mappedDrones: MapDrone[] = drones.map(d => ({
        ...d,
        color: d.id === selectedDrone?.id ? SELECTED_COLOR : DEFAULT_COLOR
    }))

    return {drones: mappedDrones, startSimulation}
}

export default useDrones