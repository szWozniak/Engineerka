import { MapViewState, PickingInfo } from "deck.gl"
import { useEffect, useState } from "react"
import { INITIAL_VIEW_STATE } from "../config/initialView"
import useDrones from "../../drones/useCases/useDrones"
import { useTranslation } from "react-i18next";

interface ReturnType{
    mapViewState: MapViewState,
    setMapViewState: any,
    getTooltip: (info: PickingInfo) => any,
    setViewMode: (viewMode: string) => any
}

const useMapState = (): ReturnType => {
    const [mapViewState, setMapViewState] = useState<MapViewState>(INITIAL_VIEW_STATE)
    const [isMapUpdated, setIsMapUpdated] = useState<boolean>(false)

    const { selectedDrone } = useDrones();
    const {t} = useTranslation();

    function getTooltip({ object }: any) {
      return (
        object &&
        `\
      ${t("details.drone.registration")}: ${object?.registrationNumber}\n
      ${t("details.drone.model")}: ${object?.model}
      `
      );
    }

    function setViewMode(viewMode: "2d" | "3d") {
      let additionalViewStateProps = {}

      if(viewMode === "2d") {
        additionalViewStateProps = {
          pitch: 0,
          zoom: mapViewState.zoom - 2
        }
      } else if(viewMode === "3d") {
        additionalViewStateProps = {
          pitch: 70,
          zoom: mapViewState.zoom + 2
        }
      }

      setMapViewState({
        ...mapViewState,
        ...additionalViewStateProps
      })
    }

    useEffect(() => { //this might not work
        setIsMapUpdated(false)
      }, [selectedDrone?.registrationNumber])

    useEffect(() => { //this also
      if(!isMapUpdated) {
        setMapViewState(prev => ({
          ...prev,
          ...selectedDrone?.currentPosition,
          altitude: Math.max(selectedDrone?.currentPosition?.altitude || 1, 1),
          zoom: 15
        }))
        setIsMapUpdated(true)
      }
    }, [selectedDrone, isMapUpdated])

    return {
      mapViewState,
      setMapViewState,
      getTooltip,
      setViewMode
    }
}

export default useMapState