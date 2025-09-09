import { createSlice } from "@reduxjs/toolkit";
import type { Event } from "../typeAnnotation/types";   

interface CalendarState {
  selectedDate: Date | null;
  selectedEvent: Event | null;
}

const initialState: CalendarState = {
  selectedDate: new Date(Date.now()), // 默认今天
  selectedEvent:null,
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
  },
});

export const { setSelectedDate, setSelectedEvent } = frontEndSlice.actions;

export default frontEndSlice.reducer;