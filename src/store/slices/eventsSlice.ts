import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  addException,
  updateException
} from "../api/eventsApi";
import type { Event, EventException } from "../typeAnnotation/types";
import type { MyEvent } from "../typeAnnotation/types";

interface EventsState {
  events: MyEvent[];
  exceptions: EventException[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  exceptions: [],
  status: "idle",
  error: null
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch events
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Fetch events failed";
      });

    // add event
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.events.push(action.payload);
    });

    // update event
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.events.findIndex((e) => e.id === updated.id);
      if (index >= 0) {
        state.events[index] = updated;
      }
    });

    // delete event
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      const id = action.payload;
      state.events = state.events.filter((e) => e.id !== id);
    });

    // add exception
    builder.addCase(addException.fulfilled, (state, action) => {
      state.exceptions.push(action.payload);
    });

    // update exception
    builder.addCase(updateException.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.exceptions.findIndex((ex) => ex.sub_id === updated.sub_id);
      if (index >= 0) {
        state.exceptions[index] = updated;
      }
    });
  }
});

export default eventsSlice.reducer;
