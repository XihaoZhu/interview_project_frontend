import { useState, useEffect } from "react";
import { useFetchEvents } from '@/hooks/useFetchEvents';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setTypeFilter } from "@/store/slices/frontEndSlice";


export function EventTypeSelect() {
    const typeFilter = useSelector((state: RootState) => state.frontend.typeFilter)
    const refreshEvents = useFetchEvents()
    const dispatch = useDispatch()

    useEffect(() => {
        refreshEvents()
    }, [typeFilter]);

    return (
        <div className="flex justify-start flex-col pt-4 items-start w-full h-full">
            <select
                className="z-50 m-5 w-4/5 border rounded px-2 py-1 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={typeFilter}
                onChange={(e) => dispatch(setTypeFilter(e.target.value))}
            >
                <option value="">All Types</option>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
                <option value="first_appointment">First Appointment</option>
                <option value="presentation">Presentation</option>
            </select>
        </div>
    );
}
