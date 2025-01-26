'use client';
import { differenceInDays, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

// دالة للتحقق من وجود تواريخ محجوزة ضمن النطاق المحدد
function isAlreadyBooked(range, bookedDates) {
  return (
    range.from &&
    range.to &&
    bookedDates.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const {range,setRange,resetRange}=useReservation()
  const displayRange=isAlreadyBooked(range,bookedDates)?{}:range;
  // إعدادات الحجز
  const { minBookingLength, maxBookingLength } = settings;

  // تعطيل التواريخ المحجوزة
  const disabledDays = [
    ...bookedDates,
    { before: new Date() }, // تعطيل التواريخ قبل اليوم
    { after: new Date(new Date().getFullYear() + 5, 11, 31) }, // تعطيل التواريخ بعد 5 سنوات
  ];

  // دالة لتعيين النطاق بشكل صحيح
  const handleSelect = (dates) => {
    if (dates) {
      const { from, to } = dates;

      if (!to) {
        setRange({ from, to: undefined });
      } else {
        setRange({ from, to });
      }
    } else {
      resetRange();
    }
  };

  // حساب السعر والإعدادات الأخرى
  const regularPrice = cabin.regularPrice;
  const discount = cabin.discount;
  // const numNights = range.from && range.to ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) : 0;
  const numNights=differenceInDays(displayRange.to,displayRange.from)
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-6 md:pt-12 place-self-center"
        mode="range"
        selected={displayRange}     
        onSelect={handleSelect}
        defaultMonth={new Date()} // الشهر الافتراضي
        disabled={disabledDays} // تعطيل التواريخ المحجوزة
        captionLayout="dropdown" // كيفية عرض التسمية (السنة والشهر)
        numberOfMonths={2} // عدد الأشهر المعروضة
        hidden={{ after: new Date(new Date().getFullYear() + 5, 11, 31) }} // إخفاء التواريخ بعد 5 سنوات
      
      
      />

      <div className="flex items-center justify-between px-4 md:px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-lg md:text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg md:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-lg md:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-lg md:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-2 text-xs md:py-2 md:px-4 md:text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
