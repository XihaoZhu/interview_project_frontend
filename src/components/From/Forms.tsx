import { useForm, type SubmitHandler } from "react-hook-form"
import type { MyEvent } from "../../store/typeAnnotation/types"


export function EventForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MyEvent>({
    defaultValues: {
      id: null,
      sub_id: null,
      title: "",
      start: null,
      end: null,
      type: "meeting",
      link: "",
      note: "",
      repeat_rule: "",
      parent: null,
      extra_info: "",
      action_type: "add regular",
    },
  })

  const onSubmit: SubmitHandler<MyEvent> = (data) => {
    switch (data.action_type) {
        case "add regular":

        case "add exception":

        case "update exception":

        case "update regular":

        case "delete regular":
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label>
        Title*
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Event title"
        />
      </label>
      {errors.title && <span>{errors.title.message}</span>}

      <label>
        Start*
        <input
          type="datetime-local"
          {...register("start", { required: "Start date is required" })}
        />
      </label>
      {errors.start && <span>{errors.start.message}</span>}

      <label>
        End*
        <input
          type="datetime-local"
          {...register("end", { required: "End date is required" })}
        />
      </label>
      {errors.end && <span>{errors.end.message}</span>}

      <label>
        Type
        <select {...register("type")}>
          <option value="meeting">Meeting</option>
          <option value="event">Event</option>
          <option value="first_appointment">First Appointment</option>
          <option value="presentation">Presentation</option>
        </select>
      </label>

      <label>
        Link
        <input type="url" {...register("link")} placeholder="Optional link" />
      </label>

      <label>
        Note
        <textarea {...register("note")} placeholder="Optional note" />
      </label>

      <label>
        Repeat Rule
        <input {...register("repeat_rule")} placeholder="Optional repeat rule" />
      </label>

      <label>
        Parent Event ID
        <input type="number" {...register("parent")} placeholder="Optional parent id" />
      </label>

      <label>
        Extra Info
        <textarea {...register("extra_info")} placeholder="Optional extra info" />
      </label>

      <button type="submit">Save Event</button>
    </form>
  )
}