import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream text-text-dark flex flex-col relative overflow-hidden hero-orb-1 hero-orb-2">
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <Link href="/uz" className="flex items-center no-underline group">
              <div className="relative h-[64px] w-[115px] md:h-[92px] md:w-[165px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo/logo-merhaba-high.png"
                  alt="Merhaba Hotel Logo"
                  fill
                  className="object-contain opacity-95"
                  priority
                  sizes="(max-width: 768px) 115px, 165px"
                />
              </div>
            </Link>
          </div>
          <h1 className="font-cormorant text-[clamp(100px,20vw,200px)] font-light leading-none text-gold mb-2 tracking-widest drop-shadow-[0_0_30px_rgba(200,161,58,0.15)]">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-jost font-light text-text-dark mb-6 tracking-wide">
            Page Not Found
          </h2>
          <p className="text-sm md:text-base font-light text-text-mid tracking-[1px] leading-[1.7] max-w-[500px] mx-auto mb-10">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/uz"
            className="inline-flex items-center justify-center bg-brand hover:bg-brand-dark transition-all duration-300 text-text-dark border-none h-[44px] px-7 font-jost text-[10px] tracking-[3px] uppercase cursor-pointer shadow-lg shadow-brand/10 font-bold active:scale-95 no-underline"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
