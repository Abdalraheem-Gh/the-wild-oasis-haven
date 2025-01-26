import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 border border-primary-800 rounded-lg min-h-[400px]">
      {/* DateSelector */}
      <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-primary-800">
        <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
      </div>

      {/* ReservationForm أو LoginMessage */}
      <div className="p-4 md:p-6">
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}

export default Reservation;