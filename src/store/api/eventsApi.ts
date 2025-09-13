import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Event, } from "../typeAnnotation/types";
import { type MyEvent, } from "../typeAnnotation/types";
import { parseISO, sub } from "date-fns";

const defaultApiUrl = "http://127.0.0.1:8000/api/events/";


// fetch events and exceptions
export const fetchEvents = createAsyncThunk("events/fetch", async (
  query: { start: string; end: string; timezone: string; type?: string }
) => {
  let url = defaultApiUrl + "events/";

  if (query) {
    const params = new URLSearchParams();
    params.append("start", query.start);
    params.append("end", query.end);
    params.append("timezone", query.timezone);
    query.type && params.append("type", query.type);
    url += "?" + params.toString();
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  const data = await res.json();

  const transformed: MyEvent[] = data.map((ev: any) => ({
    id: ev.id ?? null,
    sub_id: ev.sub_id ?? null,
    parent: ev.parent ?? null,
    title: ev.title,
    start: parseISO(ev.start_time),
    end: parseISO(ev.end_time),
    type: ev.type,
    link: ev.link ?? null,
    note: ev.note ?? "",
    extra_info: ev.extra_info ?? "",
    occurrence_time: ev.occurrence_time
  }));

  return transformed;
});

// create event
export const addEvent = createAsyncThunk(
  "events/create",
  async (data: MyEvent) => {
    const res = await fetch(defaultApiUrl + "events/", {
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
  async (data: Event) => {
    const res = await fetch(defaultApiUrl + `modify_event/${data.id}/`, {
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
export const deleteEvent = createAsyncThunk("events/delete", async (data: Event) => {
  const res = await fetch(defaultApiUrl + `modify_event/${data.id}/`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
});

// create exception
export const addException = createAsyncThunk(
  "exceptions/create",
  async (data: { exception_type: string, mother_id: number, occurrence_time: string } & Record<string, any>) => {
    const res = await fetch(defaultApiUrl + "exceptions/", {
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
  async (data: { exception_type: string, mother_id: number, occurrence_time: string } & Record<string, any>) => {
    const res = await fetch(defaultApiUrl + `exceptions/${data.sub_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    return res.json();
  })