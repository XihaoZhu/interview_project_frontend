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