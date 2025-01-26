import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className='flex flex-col md:flex-row border border-primary-800 rounded-lg overflow-hidden'>
      {/* الصورة */}
      <div className='relative h-48 md:h-32 md:aspect-square'>
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className='object-cover'
        />
      </div>

      {/* تفاصيل الحجز */}
      <div className='flex-grow px-4 py-3 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg md:text-xl font-semibold'>
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-sm md:text-lg text-primary-300'>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex flex-col md:flex-row gap-2 md:gap-5 mt-auto items-baseline'>
          <p className='text-lg md:text-xl font-semibold text-accent-400'>${totalPrice}</p>
          <p className='hidden md:block text-primary-300'>&bull;</p>
          <p className='text-sm md:text-lg text-primary-300'>
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className='text-sm md:text-sm text-primary-400 md:ml-auto'>
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      {/* الأزرار (Edit و Delete) */}
      {!isPast(startDate) && (
        <div className='flex flex-row md:flex-col border-t md:border-l border-primary-800 w-full md:w-[100px]'>
          <Link
            href={`/account/reservations/edit/${id}`}
            className='group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
          >
            <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
            <span className='mt-1'>Edit</span>
          </Link>

          <DeleteReservation bookingId={id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;