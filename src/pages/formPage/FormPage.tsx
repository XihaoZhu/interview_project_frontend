import type { FC } from "react";
import { EventForm } from "../../components/From/Forms";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { format } from "date-fns"


interface RegularPopOverFormProps {
  anchorEl?: HTMLElement | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const RegularPopOverForm: FC<RegularPopOverFormProps> = ({
  anchorEl,

  open,
  onOpenChange,
}) => {
  const [offset, setOffset] = useState(0);
  const selectedEvent = useSelector((state: RootState) => state.frontend.selectedEvent);


  // cause my location for popover relies on anchorEl's width, so need to update it when window resize
  useLayoutEffect(() => {
    function updateOffset() {
      if (anchorEl) {
        setOffset(anchorEl.offsetWidth / 2);
      }
    }
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [anchorEl]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent
        className=""
        side="left"
        align="start"
        sideOffset={offset}
        collisionPadding={8}
        avoidCollisions

        style={{
          position: "absolute",
          top: anchorEl ? anchorEl.getBoundingClientRect().top + window.scrollY : 0,
          left: anchorEl ? anchorEl.getBoundingClientRect().left + window.scrollX : 0,
        }}
      >
        {selectedEvent && selectedEvent.start && selectedEvent.end && (
          <EventForm initialData={{
            ...selectedEvent,
            start: format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm"),
            end: format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm"),
          }} />
        )}
      </PopoverContent>
    </Popover>
  );
};
