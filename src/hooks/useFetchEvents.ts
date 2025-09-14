// hooks/useFetchEvents.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startOfMonth, endOfMonth, subDays, addDays, format } from "date-fns";
import type { RootState, AppDispatch } from "../store";
import { fetchEvents } from "../store/api/eventsApi"

function getMonthQuery(date: Date) {
    const start = subDays(startOfMonth(date), 7);
    const end = addDays(endOfMonth(date), 7);
    return {
        start: format(start, "yyyy-MM-dd").toString(),
        end: format(end, "yyyy-MM-dd").toString(),
    };
}

export function useFetchEvents() {
    const dispatch: AppDispatch = useDispatch();
    const selectedDate = useSelector((state: RootState) => state.frontend.selectedDate);
    const timezone = useSelector((state: RootState) => state.frontend.timezone);
    const typeFilter = useSelector((state: RootState) => state.frontend.typeFilter);

    const fetchEventsForCurrentDate = () => {
        if (!selectedDate || !timezone) return;
        const query = getMonthQuery(new Date(selectedDate));
        if (typeFilter) {
            dispatch(fetchEvents({ ...query, timezone, type: typeFilter }));
        } else { dispatch(fetchEvents({ ...query, timezone })); }
    };

    useEffect(() => {
        fetchEventsForCurrentDate()
    }, [selectedDate]);

    return fetchEventsForCurrentDate
}