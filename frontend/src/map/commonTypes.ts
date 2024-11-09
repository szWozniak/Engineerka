export type MapStyle = {
  label: string,
  url: string
}

export const mapStyles: MapStyle[] = [
  {
    label: "mapStyles.dark",
    url: "mapbox://styles/mapbox/dark-v11"
  },
  {
    label: "mapStyles.light",
    url: "mapbox://styles/mapbox/light-v11"
  },
  {
    label: "mapStyles.standard",
    url: "mapbox://styles/mapbox/standard"
  }
]