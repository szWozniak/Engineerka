import { useContext } from "react";
import { AppContext } from "../../../context/AppContext"
import RegistrationNumberFilter from "./concreteFilters/RegistrationNumberFilter";
import AltitudeFilter from "./concreteFilters/AltitudeFilter";
import FuelFilter from "./concreteFilters/FuelFilter";
import ModelFilter from "./concreteFilters/ModelFilter";
import LatitudeFilter from "./concreteFilters/LatitudeFilter";
import LongitudeFilter from "./concreteFilters/LongitudeFilter";
import useFilters from "../../../filters/useCases/useFilters";

interface props{
  isOpen: boolean
}

const FilterSection: React.FC<props> = ({ isOpen }) => {
  const {applyFilters} = useContext(AppContext);

  const {filters, numberFilters, textFilters} = useFilters();

  return(
    <div className={`content filterSection ${isOpen && 'opened'}`} style={{"height": "270px"}}>
      <div style={{"paddingLeft": "20px", "paddingTop": "20px"}}>
        Filtry
        <div className="filters">
          <RegistrationNumberFilter
            value={textFilters.get("registrationNumber").value}
            onChange={(value) => textFilters.onChange("registrationNumber", value)}
          />
          <AltitudeFilter
            minValue={numberFilters.get("minAltitude").value}
            maxValue={numberFilters.get("maxAltitude").value}
            onMinValueChange={(value) => numberFilters.onChange("minAltitude", value)}
            onMaxValueChange={(value) => numberFilters.onChange("maxAltitude", value)}
          />
          <LatitudeFilter
            minValue={numberFilters.get("minLatitude").value}
            maxValue={numberFilters.get("maxLatitude").value}
            onMinValueChange={(value) => numberFilters.onChange("minLatitude", value)}
            onMaxValueChange={(value) => numberFilters.onChange("maxLatitude", value)}
          />
          <LongitudeFilter
            minValue={numberFilters.get("minLongitude").value}
            maxValue={numberFilters.get("maxLongitude").value}
            onMinValueChange={(value) => numberFilters.onChange("minLongitude", value)}
            onMaxValueChange={(value) => numberFilters.onChange("maxLongitude", value)}
          />
          <FuelFilter
            minValue={numberFilters.get("minFuel").value}
            maxValue={numberFilters.get("maxFuel").value}
            onMinValueChange={(value) => numberFilters.onChange("minFuel", value)}
            onMaxValueChange={(value) => numberFilters.onChange("maxFuel", value)}
          />
          <ModelFilter
            value={textFilters.get("model").value}
            onChange={(value) => textFilters.onChange("model", value)}
          />
        </div>
        <button className="apply" onClick={() => applyFilters(filters)}>Zastosuj</button>
      </div>
      
    </div>
  )
}

export default FilterSection