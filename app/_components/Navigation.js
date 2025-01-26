'use client';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navigation({ session=null }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // مرجع للقائمة
  const buttonRef = useRef(null); // مرجع لزر القائمة

  const toggleMenu = () => {
    console.log("isOpen before:", isOpen); // للتأكد من القيمة الحالية
    setIsOpen((prev) => !prev);
    console.log("isOpen after:", !isOpen); // للتأكد من القيمة الجديدة
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <nav className="z-10 text-lg sm:text-xl overflow-visible">
      <button
        className="sm:hidden text-primary-50"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        ref={buttonRef}

      >
        {isOpen ? (
        
    // أيقونة الإغلاق (X)
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
) : (
  // أيقونة القائمة (Menu)
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
)}      
      </button>

 {/* {isOpen  && (
        <ul
          ref={menuRef}
          className={`absolute sm:static bg-primary-50 text-primary-800 sm:bg-transparent
            top-16 left-0 w-full sm:w-auto transition-all duration-300 sm:flex
              gap-4 sm:gap-16 items-center z-50
              `}
        >  */}
        <ul
  ref={menuRef}
  className={`absolute sm:static bg-primary-50 sm:text-primary-50 text-primary-800 sm:bg-transparent top-16 left-0 w-full sm:w-auto transition-all duration-300 
    ${
    isOpen ? "block" : "hidden sm:flex"
  } gap-4 sm:gap-16 items-center z-50`}
>
        <li>
          <Link
            href="/cabins"
            className="block sm:inline-block hover:text-accent-400 transition-colors py-2 px-4 sm:p-0"
            onClick={toggleMenu} // إغلاق القائمة عند النقر

          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="block sm:inline-block hover:text-accent-400 transition-colors py-2 px-4 sm:p-0"
            onClick={toggleMenu} // إغلاق القائمة عند النقر

          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className=" sm:flex hover:text-accent-400 transition-colors py-2 px-4 sm:p-0 flex gap-2 sm:gap-4 items-center"
              onClick={toggleMenu} // إغلاق القائمة عند النقر
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="block sm:inline-block hover:text-accent-400 transition-colors py-2 px-4 sm:p-0"
              onClick={toggleMenu} // إغلاق القائمة عند النقر
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}