export interface IDroneEntry {
  CurrentMoment: number,
  Latitude: number,
  Longitude: number,
  Heading: number,
  Speed: number,
  Altitude: number,
  Country: string,
  Operator: string,
  Identification: number,
  IdentificationLabel: string,
  Model: string,
  RegistrationNumber: string,
  Sign: string,
  IsAirborne: boolean,
  Fuel: number
}