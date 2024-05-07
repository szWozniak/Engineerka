
import { useEffect, useRef, useState } from "react"
import { RoboczyDrone, MapDrone } from "../drones/types"
import { paths } from "../map/configuration/pathConfiguration"
import { useQuery } from "react-query"
import { getCurrentDrones } from "../drones/api/api"

const useDrones = (isEnabled: boolean) => {
    const [drones, setDrones] = useState<RoboczyDrone[]>([
        {
          id: 1,
          position: [19.9317, 50.0671, 50],
          orientation: [0, 0, 90]
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

    const query = useQuery({
      queryKey: ["current-drones"],
      queryFn: getCurrentDrones,
      keepPreviousData: true,
      refetchInterval: 3000,
      enabled: isEnabled
    })



    const [dronInSimulation, setDroneInSimulation] = useState<MapDrone | null>(null)

    const [currentPosition, setCurrentPosition] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // useEffect(() => {
    //     if (!dronInSimulation?.id) return
    //     setDrones([
    //       ...drones.filter((drone: any) => drone.id !== dronInSimulation.id),
    //       {
    //         id: dronInSimulation.id,
    //         position: paths[currentPosition].start,
    //         orientation: dronInSimulation.orientation
    //       }
    //     ])
    // }, [currentPosition])



      // const mappedDrones: MapDrone[] = drones.map(d => ({
      //     ...d,
      //     color: d.id === selectedDrone?.id ? SELECTED_COLOR : DEFAULT_COLOR
      // }))

      return {drones: drones, testDrones: query.data}
}

export default useDrones