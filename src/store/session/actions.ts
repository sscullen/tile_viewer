import { UPDATE_MAIN_SESSION, AUTHENTICATE, SessionActionTypes, MainSessionState } from './types'

// TypeScript infers that this function is returning SendMessageAction
export function updateMainSession(sessionState: MainSessionState): SessionActionTypes {
  return {
    type: UPDATE_MAIN_SESSION,
    payload: sessionState,
  }
}

// TypeScript infers that this function is returning SendMessageAction
export function authenticate(sessionState: MainSessionState): SessionActionTypes {
  return {
    type: AUTHENTICATE,
    payload: sessionState,
  }
}
