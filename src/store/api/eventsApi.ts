import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Event, EventException } from "../typeAnnotation/types";

const defaultApiUrl="http://localhost:8000/events/";




// fetch events and exceptions
export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  const res = await fetch(defaultApiUrl + "events/");
  if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
        }
  return await res.json();
});

// create event
export const addEvent = createAsyncThunk(
  "events/create",
  async (data:Event) => {
    const res = await fetch(defaultApiUrl+"events/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
        }
    return res.json();
  }
);

// update event
export const updateEvent = createAsyncThunk(
  "events/update",
  async (data:Event) => {
    const res = await fetch(defaultApiUrl+`modify_event/${data.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        });
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
        }
    return res.json();
  })

// delete event
export const deleteEvent = createAsyncThunk("events/delete", async (data:Event) => {
  const res = await fetch(defaultApiUrl+`modify_event/${data.id}/`, { method: "DELETE" });
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
        }
  return res.json();
});

// create exception
export const addException = createAsyncThunk(
  "exceptions/create",
  async (data:EventException) => {
    const res = await fetch(defaultApiUrl+"exceptions/", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        });
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
        }
    return res.json();  
  })

// update (or delete ) exception
export const updateException = createAsyncThunk(
  "exceptions/update",
  async (data:EventException) => {
    const res = await fetch(defaultApiUrl+`exceptions/${data.sub_id}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        });
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
        }
    return res.json();
  })