import { createSlice } from "@reduxjs/toolkit";
import type { MyEvent } from "../typeAnnotation/types";

interface CalendarState {
  selectedDate: string | null;
  selectedEvent: MyEvent | null;
  leftSideView: "month" | "week" | "day" | "agenda";
  timezone?: string;
  typeFilter: '' | 'meeting' | 'presentation' | 'first_appointment' | 'event'
}

const initialState: CalendarState = {
  selectedDate: new Date().toISOString(),
  selectedEvent: null,
  leftSideView: "month",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  typeFilter: ''
};

export const frontEndSlice = createSlice({
  name: "frontEnd",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setLeftSideView: (state, action) => {
      state.leftSideView = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    }
  },
});

export const { setSelectedDate, setSelectedEvent, setLeftSideView, setTimezone, setTypeFilter } = frontEndSlice.actions;

export default frontEndSlice.reducer;