'use client';
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; // استيراد useState

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(null); // حالة لتتبع العنصر النشط

  return (
    <nav className='border-b md:border-r border-primary-900'>
      <ul className='flex flex-row flex-wrap md:flex-col gap-2 h-full text-base md:text-lg overflow-x-auto'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-2 md:py-3 md:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200
                ${pathname === link.href ? 'bg-primary-900' : ''}
              `}
              href={link.href}
              onClick={() => setActiveLink(link.href)} // تعيين العنصر النشط عند النقر
            >
              {link.icon}
              {/* عرض النص فقط إذا كان العنصر نشطًا أو على شاشات أكبر من التابليت */}
              <span className={`whitespace-nowrap ${activeLink === link.href ? 'block' : 'hidden md:block'}`}>
                {link.name}
              </span>
            </Link>
          </li>
        ))}
  

        <li className='md:mt-auto  '>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;