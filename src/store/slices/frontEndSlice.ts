import { createSlice } from "@reduxjs/toolkit";
import type { Event } from "../typeAnnotation/types";   
import type { MyEvent } from "../typeAnnotation/types";
import { set } from "date-fns";

interface CalendarState {
  selectedDate: string | null;
  selectedEvent: MyEvent | null;
  leftSideView: "month" | "week" | "day" | "agenda";
  timezone?: string;
}

const initialState: CalendarState = {
  selectedDate: new Date().toISOString(),
  selectedEvent:null,
  leftSideView: "month",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
    }
  },
});

export const { setSelectedDate, setSelectedEvent, setLeftSideView, setTimezone } = frontEndSlice.actions;

export default frontEndSlice.reducer;