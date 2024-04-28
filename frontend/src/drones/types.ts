import { Color, Position } from "deck.gl"

export interface Drone{
    id: number,
    position: Position
    orientation: [number, number, number]
  }

export interface MapDrone extends Drone{
    color: Color
}