"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center no-underline group ${className}`}>
      <div className="relative h-[55px] md:h-[70px] w-[55px] md:w-[70px] transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo/logo-safir.png"
          alt="Merhaba Hotel Logo"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 55px, 70px"
        />
      </div>
    </Link>
  );
}
