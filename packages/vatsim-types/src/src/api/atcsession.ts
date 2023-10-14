export interface AtcSession {
  connection_id: number;
  start: string;
  end: string;
  server: string;
  vatsim_id: string;
  type: number;
  rating: number;
  callsign: string;
  minutes_on_callsign: string;
  total_minutes_on_callsign: number;
  total_aircraft_tracked: number;
  total_aircraft_seen: number;
  total_flights_amended: number;
  total_handoffs_initiated: number;
  total_handoffs_received: number;
  total_handoffs_refused: number;
  total_squawks_assigned: number;
  total_cruisealts_modified: number;
  total_tempalts_modified: number;
  total_scratchpadmods: number;
  aircrafttracked: number;
  aircraftseen: number;
  flightsamended: number;
  handoffsinitiated: number;
  handoffsreceived: number;
  handoffsrefused: number;
  squawksassigned: number;
  cruisealtsmodified: number;
  tempaltsmodified: number;
  scratchpadmods: number;
}