import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/eventsSlice";
import frontendReducer from "./slices/frontEndSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    frontend: frontendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
