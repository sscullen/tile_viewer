import { FeatureCollection } from 'geojson'

import { RawTile, Tile } from '../tile/types'

export interface DateList {
  dates: string[]
  currentDate: string
}

export interface CurrentDates {
  [index: string]: DateList
  sentinel2?: DateList
  landsat8?: DateList
}

export interface SingleDateTileList {
  [index: string]: Tile[]
}

export interface AoiSettings {
  atmosphericCorrection: boolean
}

export interface Session {
  cloudPercentFilter: number
  datesList: CurrentDates
  currentPlatform: string
  settings: AoiSettings
}

export interface DateObject {
  [index: string]: string[]
}

export interface RawTileByDate {
  [index: string]: RawTile[]
}

export interface TileList {
  [index: string]: DateObject
  sentinel2?: DateObject
  landsat8?: DateObject
}

export interface ImageryDates {
  [index: string]: string
}

export interface TileObject {
  [index: string]: ImageryDates
}

export interface ImageryListByTile {
  [index: string]: TileObject
  sentinel2?: TileObject
  landsat8?: TileObject
}

export interface WktOverlay {
  name: string
  wkt: string
}

export interface AreaOfInterest {
  id: string
  endDate: string
  mgrsList: string[]
  name: string
  allTiles: TileList
  selectedTiles: TileList
  startDate: string
  wktFootprint: string
  wrsList: string[]
  dateCreated: string
  wrsOverlay: FeatureCollection
  mgrsOverlay: FeatureCollection
  session: Session
  jobs: string[]
  sensorList: string[]
  wktOverlayList: WktOverlay[]
}

export interface StateById {
  byId: Record<string, AreaOfInterest>
  allIds: string[]
}

export interface AreaOfInterestState extends StateById {}

export const ADD_AOI = 'ADD_AOI'
export const START_ADD_AOI = 'START_ADD_AOI'

export const UPDATE_AOI = 'UPDATE_AOI'
export const UPDATE_SESSION = 'UPDATE_SESSION'
export const REMOVE_AOI = 'REMOVE_AOI'

interface AddAoiAction {
  type: typeof ADD_AOI
  payload: AreaOfInterest
}

interface StartAddAoiAction {
  type: typeof START_ADD_AOI
  payload: HTMLFormElement
}

interface UpdateAoiAction {
  type: typeof UPDATE_AOI
  payload: AreaOfInterest
}

interface RemoveAoiAction {
  type: typeof REMOVE_AOI
  payload: string
}

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: { session: Session; id: string }
}

export type AoiActionTypes = AddAoiAction | StartAddAoiAction | UpdateAoiAction | UpdateSessionAction | RemoveAoiAction
