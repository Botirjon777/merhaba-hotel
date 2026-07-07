"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center no-underline group ${className}`}>
      <div className="relative h-[46px] md:h-[58px] w-[82px] md:w-[104px] transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo/logo-merhaba-high.png"
          alt="Merhaba Hotel Logo"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 82px, 104px"
        />
      </div>
    </Link>
  );
}
