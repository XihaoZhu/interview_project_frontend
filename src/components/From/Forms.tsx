import { useForm, type SubmitHandler } from "react-hook-form"
import { type MyEvent, mapEventToBackend } from "../../store/typeAnnotation/types"
import { useEffect } from "react"
import { addEvent, updateException, addException, updateEvent, deleteEvent } from "@/store/api/eventsApi"
import { type AppDispatch } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { type RootState } from "@/store"
import { useFetchEvents } from '@/hooks/useFetchEvents';

interface EventFormProps {
    initialData?: Partial<MyEvent> | null
    onOpenChange?: (open: boolean) => void;
}


export function EventForm({ initialData, onOpenChange }: EventFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        resetField,
        setValue,
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
            apply_range: "This time",
            action_type: "save",
        },
    })

    // If there is a initialData, reset the form with it
    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData])

    const refreshEvents = useFetchEvents()

    const dispatch: AppDispatch = useDispatch()
    const timezone = useSelector((state: RootState) => state.frontend.timezone)

    const onSubmit: SubmitHandler<MyEvent> = async (data) => {
        const event = {
            ...data,
            start_time: new Date(data.start!).toISOString(),
            end_time: new Date(data.end!).toISOString(),
            buid_timeZone: timezone,
        };
        if (event.sub_id) {
            // if there is sub id, must be modify exception
            const exceptionPayload = { ...mapEventToBackend(event) }
            {/* @ts-expect-error */ }
            await dispatch(updateException(exceptionPayload))
                .unwrap()
                .then((res) => {
                    console.log("Event modified:", res);
                })
                .catch((err) => {
                    console.error("Failed to modify event:", err);
                })

        } else if (event.parent) {
            // if there is no sub id but parent, then must be create exception
            const exceptionPayload = { ...mapEventToBackend(event), occurrence_time: event.occurrence_time }
            {/* @ts-expect-error */ }
            await dispatch(addException(exceptionPayload))
                .unwrap()
                .then((res) => {
                    console.log("Event modified:", res);
                })
                .catch((err) => {
                    console.error("Failed to modify event:", err);
                })
        } else if (event.id) {
            // no parent, single event modify
            if (event.action_type == 'delete') {
                {/* @ts-expect-error */ }
                await dispatch(deleteEvent(event))
                    .unwrap()
                    .then((res) => {
                        console.log("Event added:", res);
                    })
                    .catch((err) => {
                        console.error("Failed to add event:", err);
                    })
            } else {
                {/* @ts-expect-error */ }
                await dispatch(updateEvent(event))
                    .unwrap()
                    .then((res) => {
                        console.log("Event added:", res);
                    })
                    .catch((err) => {
                        console.error("Failed to add event:", err);
                    })
            }

        } else {
            // no parent no id, create new event
            await dispatch(addEvent(event))
                .unwrap()
                .then((res) => {
                    console.log("Event added:", res);
                })
                .catch((err) => {
                    console.error("Failed to add event:", err);
                })
        }
        refreshEvents()
        onOpenChange!(false)
    }


    const type = watch("type",)

    useEffect(() => {
        resetField("extra_info")
    }, [type, resetField])

    const typeLabelMap: Record<string, string> = {
        meeting: "with: ",
        event: "location:",
        first_appointment: "interviewee:",
        presentation: "Hold by:",
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 border p-4 rounded-md w-80 bg-white/30 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg">
                <span className="text-center w-full">{
                    initialData!.parent ? "Modify Exception" : initialData!.id ? "Modify Event" : "Create Event"
                }</span>
                {/* Title */}
                <label className="flex justify-between items-center">
                    <span>Title*</span>
                    <input
                        {...register("title", { required: "Title is required" })}
                        placeholder="Title"
                        className=" pl-2 border rounded ml-3 w-4/5"
                        maxLength={20}
                        autoComplete="off"
                    />
                </label>
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}

                {/* Type */}
                <label className="flex justify-between items-center">
                    <span>Type*</span>
                    <select
                        {...register("type", { required: "Type is required" })}
                        className="pl-2 border rounded w-4/5 ml-3"
                    >
                        <option value="meeting">Meeting</option>
                        <option value="event">Event</option>
                        <option value="first_appointment">First Appointment</option>
                        <option value="presentation">Presentation</option>
                    </select>
                </label>

                {/* Extra Info */}
                <label className="flex justify-between items-center">
                    <span>{typeLabelMap[type || "event"]}</span>
                    <input
                        {...register("extra_info")}
                        placeholder="Optional"
                        className="pl-2 border rounded w-3/5 ml-3"
                        autoComplete="off"
                        maxLength={20}
                    />
                </label>

                {/* Start */}
                <label className="flex justify-between items-center">
                    <span>Start*</span>
                    <input
                        type="datetime-local"
                        {...register("start", { required: "Start date is required" })}
                        autoComplete="off"
                        className="pl-2 border rounded px-2 py-1 w-4/5 ml-3"
                    />
                </label>
                {errors.start && <span className="text-red-500">{errors.start.message}</span>}

                {/* End */}
                <label className="flex justify-between items-center w-full">
                    <span>End*</span>
                    <input
                        type="datetime-local"
                        {...register("end", {
                            required: "End date is required",
                            validate: (value, formValues) => {
                                if (!formValues.start) return true
                                return new Date(value!) > new Date(formValues.start) || "End time must be after start time"
                            },
                        },)}
                        autoComplete="off"
                        className="pl-2 border rounded px-2 py-1 ml-3 w-4/5"
                    />
                </label>
                {errors.end && <span className="text-red-500">{errors.end.message}</span>}

                {/* Link */}
                <label className="flex justify-between items-center">
                    <span>Link</span>
                    <input
                        type="url"
                        {...register("link")}
                        placeholder="Optional link"
                        className="pl-2 border rounded w-4/5 ml-3"
                    />
                </label>

                {/* Note */}
                <label className="flex justify-between items-start">
                    <span className="">
                        Note
                    </span>
                    <textarea
                        {...register("note")}
                        placeholder="Optional note"
                        className="resize-none pl-2 border rounded w-4/5 ml-3"
                        maxLength={100}
                    />
                </label>

                {/* Repeat Rule */}
                {initialData!.parent ?
                    (<label className="flex justify-between items-center">
                        <span>Apply range</span>
                        <select
                            {...register("apply_range")}
                            className="pl-2 border rounded px-2 py-1"
                        >
                            <option value="This time">This time</option>
                            <option value="This and future">This and future</option>
                            <option value="All time">All time</option>
                        </select>
                    </label>)
                    : (<label className="flex justify-between items-center">
                        <span>Repeat?</span>
                        <select
                            {...register("repeat_rule")}
                            className="pl-2 border rounded px-2 py-1"
                        >
                            <option value="">Never</option>
                            <option value="FREQ=DAILY">Daily</option>
                            <option value="FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR">Every work day</option>
                            <option value="FREQ=WEEKLY">Weekly</option>
                            <option value="FREQ=WEEKLY;INTERVAL=2">Fortnightly</option>
                        </select>
                    </label>)}

                {/* Submit */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        onClick={() => setValue("action_type", "save")}
                        className="mt-2 !bg-blue-300 text-white rounded px-4 py-2 hover:!bg-blue-600 inline-block flex-1"
                    >
                        Save Event
                    </button>
                    {
                        (initialData?.id || initialData?.parent) && (
                            <button
                                type="submit"
                                onClick={() => setValue("action_type", "delete")}
                                className="mt-2 !bg-red-300 text-white rounded px-4 py-2 hover:!bg-red-600 inline-block flex-1"
                            >
                                Delete Event
                            </button>
                        )
                    }
                </div>
            </div>
        </form>

    )
}
