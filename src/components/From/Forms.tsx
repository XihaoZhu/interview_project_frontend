import { useForm, useWatch, type SubmitHandler } from "react-hook-form"
import type { MyEvent } from "../../store/typeAnnotation/types"
import { useEffect } from "react"

interface EventFormProps {
    initialData?: Partial<MyEvent> | null
}




export function EventForm({ initialData }: EventFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        resetField,
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
            repeat_rule: "NEVER",
            parent: null,
            extra_info: "",
            action_type: "add regular",
        },
    })

    // If there is a initialData, reset the form with it
    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData])

    const onSubmit: SubmitHandler<MyEvent> = (data) => {
        switch (data.action_type) {
            case "add regular":
                // 调用新增 API
                break
            case "add exception":
                // 调用新增 exception API
                break
            case "update exception":
                // 调用更新 exception API
                break
            case "update regular":
                // 调用更新 regular API
                break
            case "delete regular":
                // 调用删除 API
                break
        }
    }


    const type = watch("type",)

    useEffect(() => {
        resetField("extra_info") // 或者 setValue("extra_info", "")
    }, [type, resetField])

    const typeLabelMap: Record<string, string> = {
        meeting: "with: ",
        event: "location:",
        first_appointment: "interviewee:",
        presentation: "Hold by:",
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 border p-4 rounded-md w-80 bg-white/30 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
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
                <label className="flex justify-between items-center">
                    <span>Repeat?</span>
                    <select
                        {...register("repeat_rule")}
                        className="pl-2 border rounded px-2 py-1"
                    >
                        <option value="NEVER">Never</option>
                        <option value="DAILY">Daily</option>
                        <option value="MON_FRI">Every work day</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="FORTNIGHTLY">Fortnightly</option>
                    </select>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-2 !bg-blue-300 text-white rounded px-4 py-2 hover:!bg-blue-600"
                >
                    Save Event
                </button>
            </div>
        </form>

    )
}

export function ExceptionForm({ initialData }: EventFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        resetField,
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
            repeat_rule: "NEVER",
            parent: null,
            extra_info: "",
            action_type: "add regular",
        },
    })

    // If there is a initialData, reset the form with it
    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData])

    const onSubmit: SubmitHandler<MyEvent> = (data) => {
        switch (data.action_type) {
            case "add regular":
                // 调用新增 API
                break
            case "add exception":
                // 调用新增 exception API
                break
            case "update exception":
                // 调用更新 exception API
                break
            case "update regular":
                // 调用更新 regular API
                break
            case "delete regular":
                // 调用删除 API
                break
        }
    }


    const type = watch("type",)

    useEffect(() => {
        resetField("extra_info") // 或者 setValue("extra_info", "")
    }, [type, resetField])

    const typeLabelMap: Record<string, string> = {
        meeting: "with: ",
        event: "location:",
        first_appointment: "interviewee:",
        presentation: "Hold by:",
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 border p-4 rounded-md w-80 bg-white/30 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
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
                <label className="flex justify-between items-center">
                    <span>Repeat?</span>
                    <select
                        {...register("repeat_rule")}
                        className="pl-2 border rounded px-2 py-1"
                    >
                        <option value="NEVER">Never</option>
                        <option value="DAILY">Daily</option>
                        <option value="MON_FRI">Every work day</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="FORTNIGHTLY">Fortnightly</option>
                    </select>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-2 !bg-blue-300 text-white rounded px-4 py-2 hover:!bg-blue-600"
                >
                    Save Event
                </button>
            </div>
        </form>

    )
}