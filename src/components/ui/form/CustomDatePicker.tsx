import React, { useState, useRef, useEffect } from "react";
import { FiCalendar, FiChevronLeft, FiArrowRight } from "react-icons/fi";
import { useAvailability } from "@/hooks/useAvailability";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";

interface CustomDatePickerProps {
  checkIn: string; // ISO string or YYYY-MM-DD
  checkOut: string; // ISO string or YYYY-MM-DD
  onChange: (checkIn: string, checkOut: string) => void;
  label?: string;
  className?: string;
  theme?: "light" | "dark";
  /** Set true when this picker lives inside a position:fixed container (e.g. sticky bar) */
  dropdownFixed?: boolean;
}

export function CustomDatePicker({
  checkIn,
  checkOut,
  onChange,
  label,
  className = "",
  theme = "dark",
  dropdownFixed = false,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const t = useTranslations("DatePicker");
  
  // Selection step: 0 = needs checkIn, 1 = needs checkOut
  const [selectionStep, setSelectionStep] = useState<0 | 1>(0);
  
  // Temporary state while selecting
  const [tempCheckIn, setTempCheckIn] = useState<string | null>(checkIn);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const [viewDate, setViewDate] = useState(
    checkIn ? new Date(checkIn) : new Date(),
  );
  
  const containerRef = useRef<HTMLDivElement>(null);

  const { forbiddenDates, lowestPrices } = useAvailability(viewDate);

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

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    day = day === 0 ? 6 : day - 1;
    return day;
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (dateString: string) => {
    if (selectionStep === 0) {
      setTempCheckIn(dateString);
      setSelectionStep(1);
    } else {
      const start = new Date(tempCheckIn!);
      const end = new Date(dateString);
      
      if (end <= start) {
        setTempCheckIn(dateString);
        setSelectionStep(1);
      } else {
        let hasForbidden = false;
        const curr = new Date(start);
        while (curr <= end) {
          const currStr = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}-${String(curr.getDate()).padStart(2, '0')}`;
          if (forbiddenDates.has(currStr)) {
            hasForbidden = true;
            break;
          }
          curr.setDate(curr.getDate() + 1);
        }
        
        if (hasForbidden) {
          setTempCheckIn(dateString);
          setSelectionStep(1);
        } else {
          onChange(tempCheckIn!, dateString);
          setSelectionStep(0);
          setIsOpen(false);
        }
      }
    }
  };

  const monthNames = t.raw("months");
  const weekDays = t.raw("weekDays");

  const renderCalendar = (monthOffset: number) => {
    const targetDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + monthOffset, 1);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();

    const days = [];
    const totalDays = daysInMonth(targetYear, targetMonth);
    const firstDay = firstDayOfMonth(targetYear, targetMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-transparent"></div>);
    }

    const currentCheckIn = selectionStep === 1 ? tempCheckIn : checkIn;
    const currentCheckOut = selectionStep === 1 ? null : checkOut;

    for (let d = 1; d <= totalDays; d++) {
      const currentDate = new Date(targetYear, targetMonth, d);
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      
      const isStart = dateString === currentCheckIn;
      const isEnd = dateString === currentCheckOut;
      
      let inRange = false;
      let inHoverRange = false;

      if (currentCheckIn && currentCheckOut) {
        inRange = dateString > currentCheckIn && dateString < currentCheckOut;
      } else if (selectionStep === 1 && currentCheckIn && hoverDate) {
        const start = currentCheckIn < hoverDate ? currentCheckIn : hoverDate;
        const end = currentCheckIn < hoverDate ? hoverDate : currentCheckIn;
        inHoverRange = dateString > start && dateString < end;
      }

      const isToday =
        new Date().getDate() === d &&
        new Date().getMonth() === targetMonth &&
        new Date().getFullYear() === targetYear;

      const isForbidden = forbiddenDates.has(dateString);
      const isPast = currentDate < new Date(new Date().setHours(0, 0, 0, 0));
      const disabled = isForbidden || isPast;
      const priceInfo = lowestPrices[dateString];

      let cellBgClasses = "";
      if (isStart || isEnd) {
        cellBgClasses = "bg-[#8b5a2b] text-white";
      } else if (inRange) {
        cellBgClasses = theme === "light" ? "bg-gold/10 text-gray-800" : "bg-gold/20 text-white/90";
      } else if (inHoverRange) {
        cellBgClasses = theme === "light" ? "bg-gray-100 text-gray-800" : "bg-white/5 text-white/90";
      } else if (disabled) {
        cellBgClasses = theme === "light" ? "bg-gray-200/50 text-gray-400" : "bg-black/20 text-white/30";
      } else {
        cellBgClasses = "cursor-pointer hover:bg-gold/20 " + (theme === "light" ? "text-gray-800" : "text-white/80");
      }

      days.push(
        <div
          key={d}
          onClick={() => !disabled && handleDateSelect(dateString)}
          onMouseEnter={() => {
            if (!disabled && selectionStep === 1) setHoverDate(dateString);
          }}
          className={`h-12 border ${theme === "light" ? "border-gray-200" : "border-gold/10"} flex flex-col items-center justify-center text-center transition-all duration-200 ${cellBgClasses} ${
            isToday && !isStart && !isEnd ? "font-bold text-gold" : ""
          }`}
          title={disabled ? t("notAvailable") : ""}
        >
          <span className="text-[13px] leading-tight font-medium">{d}</span>
          {!disabled && priceInfo ? (
            <span className={`text-[9px] mt-0.5 leading-none ${isStart || isEnd ? 'text-white/90' : theme === 'light' ? 'text-gray-500' : 'text-gold'}`}>
              {(priceInfo.price_after_tax / 1000).toFixed(1)}k
            </span>
          ) : disabled ? (
            <span className="text-[14px] mt-0.5 text-gray-400 opacity-50 font-light leading-none">&times;</span>
          ) : null}
        </div>,
      );
    }
    return days;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const d = date.getDate();
    const mName = monthNames[date.getMonth()].toLowerCase();
    return `${d} ${mName}`;
  };

  const nextMonthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);

  return (
    <div
      className={`relative flex flex-col gap-1 ${className}`}
      ref={containerRef}
    >
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
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setSelectionStep(0);
            setTempCheckIn(checkIn);
          }
        }}
      >
        <div className="flex flex-col">
          <span className={`text-[9px] ${theme === "light" ? "text-gray-500" : "text-white/50"}`}>
            {t("checkInOut")}
          </span>
          <span className={`text-sm font-medium tracking-[0.5px] ${theme === "light" ? "text-text-dark" : "text-white"}`}>
            {checkIn && checkOut ? `${formatDate(checkIn)} — ${formatDate(checkOut)}` : t("selectDates")}
          </span>
        </div>
        <FiCalendar className="text-gold text-lg" />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="dropdown"
        coords={coords}
        dropdownFixed={dropdownFixed}
        id="datepicker-modal"
      >
        <div 
          className={`w-full md:w-[680px] h-full md:h-auto rounded-none md:rounded-md border-none md:border ${
            theme === "light" ? "border-gray-200 bg-white" : "border-gold/20 bg-[#1a1108]"
          } p-5 md:p-5 pb-2.5 md:pb-2.5 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col`}
        >
          {/* Mobile Header with close button */}
          <div className="md:hidden flex justify-between items-center mb-6 pb-2 border-b border-gold/10 shrink-0">
             <span className={`font-bold tracking-widest uppercase text-sm ${theme === "light" ? "text-gray-800" : "text-white"}`}>
               {t("selectDates")}
             </span>
             <button 
               onClick={() => setIsOpen(false)} 
               className={`text-2xl leading-none ${theme === "light" ? "text-gray-500" : "text-white/70"}`}
             >
               &times;
             </button>
          </div>

          <div className="flex justify-between relative mb-2.5 shrink-0">
            <button
              onClick={handlePrevMonth}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 hover:opacity-50 ${theme === "light" ? "text-gray-400" : "text-gold"}`}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            
            <div className="flex-1 text-center">
              <span className={`text-[14px] font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>
            </div>
            
            <div className="flex-1 text-center hidden sm:block">
              <span className={`text-[14px] font-bold ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                {monthNames[nextMonthDate.getMonth()]} {nextMonthDate.getFullYear()}
              </span>
            </div>

            <button
              onClick={handleNextMonth}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 hover:opacity-50 ${theme === "light" ? "text-[#8b5a2b]" : "text-gold"}`}
            >
              <FiArrowRight className="text-xl" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 overflow-y-auto">
            <div className="flex-1">
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day: string, index: number) => (
                  <div
                    key={`w1-${index}`}
                    className={`text-center text-[11px] font-medium pb-2 ${index > 4 ? "text-red-500" : theme === "light" ? "text-gray-600" : "text-gold/60"}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">{renderCalendar(0)}</div>
            </div>
            
            <div className="flex-1 hidden sm:block">
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day: string, index: number) => (
                  <div
                    key={`w2-${index}`}
                    className={`text-center text-[11px] font-medium pb-2 ${index > 4 ? "text-red-500" : theme === "light" ? "text-gray-600" : "text-gold/60"}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">{renderCalendar(1)}</div>
            </div>
          </div>

          <div className={`mt-6 pt-4 border-t ${theme === "light" ? "border-gray-200 text-gray-600" : "border-gold/10 text-white/70"} flex flex-col gap-1 shrink-0`}>
            <span className={`text-[15px] font-medium ${theme === "light" ? "text-gray-800" : "text-white"}`}>
              {t("chooseStayDates")}
            </span>
            <span className="text-[12px]">{t("bestPricesNote")}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
