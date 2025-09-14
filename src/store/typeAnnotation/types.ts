
// event type
export interface Event {
  id?: number;
  sub_id?: number;
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
  occurrence_time?: string,
  repeat_rule?: string | null;
  parent?: number | null;
}

// frontend event type
export interface MyEvent {
  id: number | null;
  sub_id?: number | null;
  title: string | null;
  start: string | null;
  end: string | null;
  type?: "meeting" | "event" | "first_appointment" | "presentation";
  link?: string | null;
  note?: string | null;
  repeat_rule?: string | null;
  parent?: number | null;
  extra_info?: string | null;
  apply_range?: "This time" | "This and future" | "All time"
  occurrence_time?: string | null
  action_type?: "save" | "delete" | null
}

export function mapEventToBackend(event: MyEvent & { start_time?: Date, end_time?: Date }) {
  return {
    mother_id: event.parent!,
    occurrence_time: event.occurrence_time,
    sub_id: event.sub_id,
    exception_type: (event.action_type == "delete") ? "skip" : "modify",
    action_type: event.action_type,
    new_start_time: event.start_time,
    new_end_time: event.end_time,
    new_title: event.title,
    new_link: event.link ?? null,
    new_extra_info: event.extra_info ?? null,
    new_note: event.note ?? null,
    new_type: event.type,
    apply_range: event.apply_range ?? "This time",
  };
}