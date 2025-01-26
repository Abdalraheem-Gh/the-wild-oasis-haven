import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from '@/app/_components/ReservationReminder'

export const revalidate=15;
// export const revalidate=0;

export const metadata={
  title:'Cabins'
}
export default function Page({searchParams}) {
const filter=searchParams?.capacity??'all';
  return (
    <div className="p-4 sm:p-0">
      <h1 className="text-3xl sm:text-4xl mb-4 sm:mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 sm:text-lg text-base sm:mb-10 mb-6">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="sm:mb-8 mb-6 justify-end flex w-full sm:w-auto">
      <Filter/>
      </div>
      <Suspense fallback={<Spinner/> } >
      <CabinList filter={filter} key={filter}/>
      <ReservationReminder/>
      </Suspense>
    </div>
  );
}
