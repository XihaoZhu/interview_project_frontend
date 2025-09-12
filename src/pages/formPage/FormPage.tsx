import type { FC } from "react";
import { EventForm } from "../../components/From/Forms";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { format } from "date-fns"

import { useRef } from "react";


interface RegularPopOverFormProps {
  anchorRect: DOMRect | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegularPopOverForm: FC<RegularPopOverFormProps> = ({ anchorRect, open, onOpenChange }: RegularPopOverFormProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const selectedEvent = useSelector((state: RootState) => state.frontend.selectedEvent);

  const triggerStyle = anchorRect
    ? {
      position: "absolute",
      top: anchorRect.top + window.scrollY,
      left: anchorRect.left + window.scrollX,
      width: anchorRect.width,
      height: anchorRect.height,
    }
    : { position: "absolute", top: 0, left: 0, width: 0, height: 0 };


  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild style={triggerStyle as React.CSSProperties}>
        <div ref={triggerRef} />
      </PopoverTrigger>
      <PopoverContent
        className="bg-transparent border-none shadow-none p-0 w-80 h-100"
        align="start"
        side="bottom"
        sideOffset={8}
        collisionPadding={8}
        avoidCollisions
        onOpenAutoFocus={(event) => event.preventDefault()}
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
