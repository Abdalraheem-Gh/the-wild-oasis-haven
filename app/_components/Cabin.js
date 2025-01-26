import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import Image from "next/image";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="flex flex-col md:grid md:grid-cols-[3fr_4fr] gap-8 md:gap-20 border border-primary-800 py-6 px-4 md:py-3 md:px-10 mb-12 md:mb-24">
      {/* الصورة */}
      <div className="relative w-full h-64 md:scale-[1.15] md:-translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover rounded-lg"
          alt={`Cabin ${name}`}
        />
      </div>

      {/* التفاصيل */}
      <div>
        <h3 className="text-accent-100 font-black text-4xl md:text-7xl mb-5 md:translate-x-[-254px] md:bg-primary-950 md:p-6 md:pb-1 md:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-base md:text-lg text-primary-300 mb-6 md:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-6 md:mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base md:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base md:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;