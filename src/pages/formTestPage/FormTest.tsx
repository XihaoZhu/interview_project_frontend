import type { FC } from "react";
import { EventForm } from "../../components/From/Forms";


export const FormTest:FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
        <EventForm />
    </div>
  );
}