import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// event type
export interface Event {
  id: number;
  title: string;
  link?: string | null;
  note?: string;
  extra_info?: string | null;
  start_time: string;   
  end_time: string;
  buid_timeZone: string;
  created_at: string;
  updated_at: string;
  type: "meeting" | "event" | "first_appointment" | "presentation";

  repeat_rule?: string | null;
  parent?: number | null;
}

// exception type
export interface EventException {
  sub_id: number;
  event: number; 
  occurrence_time: string;
  exception_type: "skip" | "modify";

  new_start_time?: string | null;
  new_end_time?: string | null;
  new_title?: string | null;
  new_description?: string | null;
  new_link?: string | null;
  new_extra_info?: string | null;
  new_note?: string | null;
  new_type?: "meeting" | "event" | "first time appointment" | "presentation" | null;

  modified_at: string;
}

interface EventsState {
  list: Event[];
  exceptions: EventException[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  list: [],
  exceptions: [],
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.list = action.payload;
    },
    addEvent(state, action: PayloadAction<Event>) {
      state.list.push(action.payload);
    },
    updateEvent(state, action: PayloadAction<Event>) {
      const idx = state.list.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
      }
    },
    removeEvent(state, action: PayloadAction<number>) {
      state.list = state.list.filter(e => e.id !== action.payload);
    },
    setExceptions(state, action: PayloadAction<EventException[]>) {
      state.exceptions = action.payload;
    },
    addException(state, action: PayloadAction<EventException>) {
      state.exceptions.push(action.payload);
    },
    updateException(state, action: PayloadAction<EventException>) {
      const idx = state.exceptions.findIndex(ex => ex.sub_id === action.payload.sub_id);
      if (idx !== -1) {
        state.exceptions[idx] = action.payload;
      }
    },
    removeException(state, action: PayloadAction<number>) {
      state.exceptions = state.exceptions.filter(ex => ex.sub_id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  setExceptions,
  addException,
  updateException,
  removeException,
  setLoading,
  setError,
} = eventsSlice.actions;

export default eventsSlice.reducer;
