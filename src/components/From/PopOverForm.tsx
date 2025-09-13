import type { FC } from "react";
import { EventForm } from "./Forms";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { format } from "date-fns";
import { useRef } from "react";

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
  const selectedEvent = useSelector((state: RootState) => state.frontend.selectedEvent);

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [side, setSide] = useState<"top" | "bottom">("bottom");

  const popoverRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    function updatePosition() {
      if (!anchorEl || !popoverRef.current) return;

      const rect = anchorEl.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.bottom + window.scrollY;
      let left = rect.left + window.scrollX;
      let sideDirection: "top" | "bottom" = "bottom";

      if (top + popoverRect.height > window.scrollY + viewportHeight) {
        if (rect.top - popoverRect.height >= 0) {
          top = rect.top + window.scrollY - popoverRect.height;
          sideDirection = "top";
        } else {
          top = window.scrollY + viewportHeight - popoverRect.height - 8;
          sideDirection = "bottom";
        }
      }

      if (left + popoverRect.width > viewportWidth) {
        left = viewportWidth - popoverRect.width - 8;
      }
      if (left < 0) left = 8;

      setPosition({ top, left });
      setSide(sideDirection);
    }

    const id = requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchorEl]);

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent
        ref={popoverRef}
        className="bg-white/30 backdrop-blur-md border-none shadow-lg p-0 rounded-lg w-80"
        side={side}
        align="start"
        sideOffset={0}
        collisionPadding={8}
        avoidCollisions
        onOpenAutoFocus={(e) => e.preventDefault()}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
        }}
      >
        {selectedEvent && selectedEvent.start && selectedEvent.end && (
          <EventForm
            initialData={{
              ...selectedEvent,
              start: format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm"),
              end: format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm"),
            }}
            onOpenChange={onOpenChange}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
