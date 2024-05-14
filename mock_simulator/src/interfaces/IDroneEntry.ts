export interface IDroneEntry {
  currentMoment: number,
  latitude: number,
  longitude: number,
  heading: number,
  speed: number,
  altitude: number,
  country: string,
  operator: string,
  identification: number,
  identificationLabel: string,
  model: string,
  registrationNumber: string,
  sign: string,
  isAirborne: boolean,
  fuel: number
}