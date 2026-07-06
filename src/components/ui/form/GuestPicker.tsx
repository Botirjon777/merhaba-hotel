import React, { useState, useRef, useEffect } from "react";
import { FiUsers, FiMinus, FiPlus } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";

function CustomAgeSelect({
  value,
  onChange,
  theme
}: {
  value: number;
  onChange: (value: number) => void;
  theme: "light" | "dark";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("GuestPicker");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: 0, label: t("under1") },
    { value: 1, label: t("1year") },
    { value: 2, label: t("2years") },
  ];

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-3 border rounded px-3 py-1.5 text-sm min-w-[110px] outline-none transition-colors ${
          theme === "light" 
            ? "border-gray-300 text-gray-800 bg-white hover:border-gold" 
            : "border-white/20 text-white bg-transparent hover:border-gold"
        }`}
      >
        <span>{selectedOption?.label}</span>
        <span className="text-[10px] text-gold">▼</span>
      </button>
      
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-1 rounded shadow-lg z-6100 overflow-hidden ${
          theme === "light" 
            ? "bg-white border border-gray-200" 
            : "bg-[#2a1f14] border border-gold/20"
        }`}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                theme === "light"
                  ? opt.value === value ? "bg-gold/10 text-gold font-medium" : "text-gray-800 hover:bg-gray-100"
                  : opt.value === value ? "bg-gold/20 text-gold font-medium" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface GuestPickerProps {
  adults: number;
  childrenAges: number[];
  onChange: (adults: number, childrenAges: number[]) => void;
  label?: string;
  className?: string;
  theme?: "light" | "dark";
  /** Set true when this picker lives inside a position:fixed container (e.g. sticky bar) */
  dropdownFixed?: boolean;
}

export function GuestPicker({
  adults,
  childrenAges,
  onChange,
  label,
  className = "",
  theme = "dark",
  dropdownFixed = false,
}: GuestPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("GuestPicker");

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (dropdownFixed) {
        // Inside a fixed bar: use viewport-relative coords (no scroll offset)
        setCoords({ top: rect.bottom, left: rect.left });
      } else {
        // Normal flow: use document-relative coords so dropdown scrolls with page
        setCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      }
    }
  }, [isOpen, dropdownFixed]);

  const handleAdultsChange = (delta: number) => {
    const newAdults = Math.max(1, Math.min(3, adults + delta));
    let newChildrenAges = [...childrenAges];
    const maxChildren = 4 - newAdults;
    if (newChildrenAges.length > maxChildren) {
      newChildrenAges = newChildrenAges.slice(0, maxChildren);
    }
    onChange(newAdults, newChildrenAges);
  };

  const handleChildrenChange = (delta: number) => {
    const maxChildren = 4 - adults;
    const currentChildren = childrenAges.length;
    if (delta > 0 && currentChildren < maxChildren) {
      onChange(adults, [...childrenAges, 0]);
    } else if (delta < 0 && currentChildren > 0) {
      onChange(adults, childrenAges.slice(0, -1));
    }
  };

  const handleAgeChange = (index: number, age: number) => {
    const newChildrenAges = [...childrenAges];
    newChildrenAges[index] = age;
    onChange(adults, newChildrenAges);
  };

  const displayText = `${adults} ${t("adult")}` + (childrenAges.length > 0 ? `, ${childrenAges.length} ${t("child")}` : "");

  return (
    <div className={`relative flex flex-col gap-1 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[8px] tracking-[2px] uppercase text-gold font-bold">
          {label}
        </label>
      )}
      
      <div
        className={`flex items-center justify-between cursor-pointer group px-4 h-[58px] border transition-all duration-300 ${
          theme === "light"
            ? "bg-white border-gold/30 hover:border-gold focus:bg-white text-text-dark rounded-[4px]"
            : "border-transparent"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col">
          <span className={`text-[9px] ${theme === "light" ? "text-gray-500" : "text-white/50"}`}>
            {t("numGuests")}
          </span>
          <span className={`text-sm font-medium tracking-[0.5px] truncate ${theme === "light" ? "text-text-dark font-jost" : "text-white"}`}>
            {displayText}
          </span>
        </div>
        <FiUsers className="text-gold text-lg" />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="dropdown"
        coords={coords}
        dropdownFixed={dropdownFixed}
        id="guestpicker-modal"
      >
        <div 
          className={`w-full h-full md:h-auto md:w-[350px] md:rounded-md shadow-2xl overflow-y-auto custom-scrollbar flex flex-col ${
             theme === "light" ? "bg-white text-gray-800 md:border md:border-gold/30" : "bg-[#1a1108] text-white md:border md:border-gold/20"
          }`}
        >
           {/* Mobile Header */}
           <div className="md:hidden px-2.5 py-2.5 border-b border-gold/20 flex justify-between items-center sticky top-0 bg-inherit z-10">
              <span className="font-bold text-sm tracking-widest uppercase">{label || t("guests")}</span>
              <button onClick={() => setIsOpen(false)} className="text-2xl leading-none">&times;</button>
           </div>

           <div className="p-6 md:p-5 flex flex-col gap-8 pb-32 md:pb-5">
              {/* Adults Counter */}
              <div className="flex justify-between items-center">
                 <div>
                   <div className={`text-base font-medium ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                     {t("adults")}
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                   <button 
                     className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${adults <= 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gold/10"} ${theme === "light" ? "border-gray-300 text-gray-800" : "border-white/20 text-white"}`}
                     onClick={() => handleAdultsChange(-1)}
                     disabled={adults <= 1}
                   >
                     <FiMinus />
                   </button>
                   <span className={`w-4 text-center font-bold text-lg ${theme === "light" ? "text-gray-800" : "text-white"}`}>{adults}</span>
                   <button 
                     className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${adults >= 3 || adults + childrenAges.length >= 4 ? "opacity-30 cursor-not-allowed" : "hover:bg-gold/10"} ${theme === "light" ? "border-gray-300 text-gray-800" : "border-white/20 text-white"}`}
                     onClick={() => handleAdultsChange(1)}
                     disabled={adults >= 3 || adults + childrenAges.length >= 4}
                   >
                     <FiPlus />
                   </button>
                 </div>
              </div>

              {/* Children Counter */}
              <div className="flex justify-between items-center">
                 <div>
                   <div className={`text-base font-medium ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                     {t("children")}
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                   <button 
                     className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${childrenAges.length <= 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gold/10"} ${theme === "light" ? "border-gray-300 text-gray-800" : "border-white/20 text-white"}`}
                     onClick={() => handleChildrenChange(-1)}
                     disabled={childrenAges.length <= 0}
                   >
                     <FiMinus />
                   </button>
                   <span className={`w-4 text-center font-bold text-lg ${theme === "light" ? "text-gray-800" : "text-white"}`}>{childrenAges.length}</span>
                   <button 
                     className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${childrenAges.length >= (4 - adults) ? "opacity-30 cursor-not-allowed" : "hover:bg-gold/10"} ${theme === "light" ? "border-gray-300 text-gray-800" : "border-white/20 text-white"}`}
                     onClick={() => handleChildrenChange(1)}
                     disabled={childrenAges.length >= (4 - adults)}
                   >
                     <FiPlus />
                   </button>
                 </div>
              </div>

              {/* Children Ages */}
              {childrenAges.length > 0 && (
                <div className={`pt-6 border-t ${theme === "light" ? "border-gray-200" : "border-white/10"} flex flex-col gap-6`}>
                  {childrenAges.map((age, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-white/70"}`}>
                        {t("childAge", { index: index + 1 })}
                      </div>
                      <CustomAgeSelect 
                        value={age}
                        onChange={(newAge) => handleAgeChange(index, newAge)}
                        theme={theme}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile specific close button */}
              <button 
                className="md:hidden mt-8 bg-brand hover:bg-brand-dark text-text-dark py-4 rounded-md font-bold tracking-widest uppercase text-sm shadow-xl"
                onClick={() => setIsOpen(false)}
              >
                {t("done")}
              </button>
           </div>
        </div>
      </Modal>
    </div>
  );
}

