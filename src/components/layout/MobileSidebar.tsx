"use client";
import { navLinks } from "@/lib/data";
import { usePopup } from "@/lib/PopupContext";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

export function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = usePopup();
  const t = useTranslations("Navbar");
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-1999 transition-opacity duration-500 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeSidebar}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-[320px] bg-cream z-2000 px-10 pt-25 pb-10 flex flex-col gap-8 shadow-[-10px_0_50px_rgba(26,17,8,0.2)] transition-all duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-7 right-7 w-12 h-12 cursor-pointer flex items-center justify-center text-gold bg-transparent border-none hover:rotate-90 transition-transform duration-300"
          onClick={closeSidebar}
        >
          <IoIosClose size={40} />
        </button>

        <ul className="list-none flex flex-col gap-8 m-0 p-0 overflow-y-auto overflow-x-hidden no-scrollbar">
          {navLinks.map((link, index) => {
            const hasSubLinks = link.subLinks && link.subLinks.length > 0;
            const isOpen = openSubMenu === link.label;

            return (
              <li
                key={link.label}
                className={`transition-all duration-700 transform ${isSidebarOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
                style={{
                  transitionDelay: isSidebarOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-between group">
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className="font-cormorant text-2xl font-light text-text-dark no-underline tracking-[1.5px] transition-all duration-300 hover:text-gold block flex-1"
                  >
                    {t(link.label.toLowerCase())}
                  </Link>
                  {hasSubLinks && (
                    <button
                      onClick={() => toggleSubMenu(link.label)}
                      className="p-2 text-gold hover:text-gold-dark transition-colors duration-300"
                    >
                      <FiChevronDown
                        className={`w-6 h-6 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {hasSubLinks && (
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-6"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="list-none flex flex-col gap-5 ml-5 pb-2 border-l border-gold/10">
                        {link.subLinks!.map((sub) => (
                          <li
                            key={sub.label}
                            className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2 before:h-px before:bg-gold/30"
                          >
                            <Link
                              href={sub.href}
                              onClick={closeSidebar}
                              className="font-jost text-[11px] font-medium text-text-mid no-underline tracking-[2px] uppercase transition-colors duration-300 hover:text-gold block"
                            >
                              {t(`subLinks.${sub.label.toLowerCase()}`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

      </div>
    </>
  );
}
