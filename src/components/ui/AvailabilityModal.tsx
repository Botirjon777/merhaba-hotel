"use client";

import React, { useState, useEffect } from "react";
import { usePopup } from "@/lib/PopupContext";
import { useTranslations } from "next-intl";
import { Modal } from "./Modal";
import { useBookingStore } from "@/store/useBookingStore";
import { useRouter } from "next/navigation";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import { useAvailability } from "@/hooks/useAvailability";

function CustomAgeSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("GuestPicker");

  const options = [
    { value: 0, label: t("under1") },
    { value: 1, label: t("1year") },
    { value: 2, label: t("2years") },
  ];

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 border border-white/20 rounded px-3 py-1.5 text-sm min-w-[110px] outline-none transition-colors bg-transparent text-white hover:border-gold"
      >
        <span>{selectedOption?.label}</span>
        <span className="text-[10px] text-gold">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded shadow-lg z-100 overflow-hidden bg-[#2a1f14] border border-gold/20">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                opt.value === value
                  ? "bg-gold/20 text-gold font-medium"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
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

export function AvailabilityModal() {
  const { activePopup, closePopup } = usePopup();
  const t = useTranslations("Booking");
  const tg = useTranslations("GuestPicker");
  const td = useTranslations("DatePicker");
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const {
    checkIn,
    checkOut,
    adults,
    childrenAges,
    setCheckIn,
    setCheckOut,
    setAdults,
    setChildrenAges,
  } = useBookingStore();

  // Date Selection State
  const [selectionStep, setSelectionStep] = useState<0 | 1>(0);
  const [tempCheckIn, setTempCheckIn] = useState<string | null>(checkIn);
  const [viewDate, setViewDate] = useState(
    checkIn ? new Date(checkIn) : new Date(),
  );

  const { forbiddenDates, lowestPrices } = useAvailability(viewDate);

  const isOpen = activePopup === "availability-popup";

  useEffect(() => {
    if (!isOpen) return;

    // Reset modal state only when it opens, not on every step change.
    const t = setTimeout(() => {
      setStep(1);
      setSelectionStep(0);
      setTempCheckIn(checkIn);
    }, 0);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleNext = () => {
    if (step === 1 && checkIn && checkOut) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSearch = () => {
    router.push("/booking");
    closePopup();
  };

  // Calendar Logic
  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    day = day === 0 ? 6 : day - 1;
    return day;
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
        setCheckIn(tempCheckIn!);
        setCheckOut(dateString);
        setSelectionStep(0);
        setStep(2);
      }
    }
  };

  const monthNames = td.raw("months");
  const weekDays = td.raw("weekDays");

  const renderCalendar = (monthOffset: number) => {
    const targetDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + monthOffset,
      1,
    );
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const totalDays = daysInMonth(targetYear, targetMonth);
    const firstDay = firstDayOfMonth(targetYear, targetMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++)
      days.push(<div key={`empty-${monthOffset}-${i}`} />);

    const currentCheckIn = selectionStep === 1 ? tempCheckIn : checkIn;
    const currentCheckOut = selectionStep === 1 ? null : checkOut;

    for (let d = 1; d <= totalDays; d++) {
      const dateString = `${targetYear}-${String(targetMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const currentDate = new Date(targetYear, targetMonth, d);

      const isStart = dateString === currentCheckIn;
      const isEnd = dateString === currentCheckOut;
      let inRange = false;
      if (currentCheckIn && currentCheckOut)
        inRange = dateString > currentCheckIn && dateString < currentCheckOut;

      const isPast = currentDate < new Date(new Date().setHours(0, 0, 0, 0));
      const isForbidden = forbiddenDates.has(dateString);
      const disabled = isPast || isForbidden;

      days.push(
        <div
          key={d}
          onClick={() => !disabled && handleDateSelect(dateString)}
          className={`h-11 md:h-12 flex flex-col items-center justify-center cursor-pointer text-[13px] transition-all duration-200 border border-transparent ${
            isStart || isEnd
              ? "bg-gold text-white font-bold"
              : inRange
                ? "bg-gold/20 text-white"
                : disabled
                  ? "opacity-20 cursor-not-allowed"
                  : "hover:bg-white/10 text-white/80 hover:border-gold/30"
          }`}
        >
          <span>{d}</span>
          {!disabled && lowestPrices[dateString] && (
            <span
              className={`text-[8px] md:text-[9px] mt-0.5 ${isStart || isEnd ? "text-white/80" : "text-gold"}`}
            >
              {(lowestPrices[dateString].price_after_tax / 1000).toFixed(0)}k
            </span>
          )}
        </div>,
      );
    }
    return days;
  };

  const nextMonthDate = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    1,
  );

  return (
    <Modal isOpen={isOpen} onClose={closePopup} type="full">
      <div className="bg-[#1a1108] w-full h-full relative overflow-hidden border-none md:border md:border-gold/20 md:shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gold/10 flex items-center justify-between bg-[#1f160d] shrink-0">
          <div className="flex items-center gap-6">
            {step === 2 && (
              <button
                onClick={handleBack}
                className="text-gold text-2xl p-1 hover:bg-gold/10 rounded-full transition-all active:scale-90"
              >
                <FiChevronLeft />
              </button>
            )}
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-cormorant text-white tracking-[4px] uppercase">
                {step === 1 ? td("selectDates") : tg("guests")}
              </h2>
              <div className="flex gap-2 mt-1">
                <div
                  className={`h-1 w-8 rounded-full transition-colors ${step === 1 ? "bg-gold" : "bg-gold/20"}`}
                ></div>
                <div
                  className={`h-1 w-8 rounded-full transition-colors ${step === 2 ? "bg-gold" : "bg-gold/20"}`}
                ></div>
              </div>
            </div>
          </div>
          <button
            onClick={closePopup}
            className="text-white/40 hover:text-white text-3xl transition-colors p-2"
          >
            &times;
          </button>
        </div>

        {/* Sliding Content Container */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="modal-slide-container h-full"
            style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
          >
            {/* Step 1: Dates */}
            <div className="w-full shrink-0 p-4 md:p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center px-2">
                <button
                  onClick={() =>
                    setViewDate(
                      new Date(
                        viewDate.getFullYear(),
                        viewDate.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  className="text-gold p-2 hover:bg-gold/10 rounded-full transition-colors"
                >
                  <FiChevronLeft className="text-xl" />
                </button>
                <div className="flex gap-12 md:gap-40">
                  <span className="text-white font-bold text-sm md:text-base tracking-widest uppercase">
                    {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </span>
                  <span className="text-white font-bold text-sm md:text-base tracking-widest uppercase hidden md:block">
                    {monthNames[nextMonthDate.getMonth()]}{" "}
                    {nextMonthDate.getFullYear()}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setViewDate(
                      new Date(
                        viewDate.getFullYear(),
                        viewDate.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  className="text-gold p-2 hover:bg-gold/10 rounded-full transition-colors"
                >
                  <FiChevronRight className="text-xl" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Month 1 */}
                <div className="flex-1">
                  <div className="grid grid-cols-7 gap-1 text-[10px] md:text-[11px] text-gold/60 text-center uppercase tracking-widest mb-4">
                    {weekDays.map((w: string) => (
                      <div key={w} className="py-1">
                        {w}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar(0)}
                  </div>
                </div>

                {/* Month 2 (Desktop Only) */}
                <div className="flex-1 hidden md:block">
                  <div className="grid grid-cols-7 gap-1 text-[11px] text-gold/60 text-center uppercase tracking-widest mb-4">
                    {weekDays.map((w: string) => (
                      <div key={w} className="py-1">
                        {w}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar(1)}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-6 border-t border-gold/10 text-white/40 text-[12px] leading-relaxed flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                <p>
                  {td("chooseStayDates")}. {td("bestPricesNote")}
                </p>
              </div>
            </div>

            {/* Step 2: Guests */}
            <div className="w-full shrink-0 p-6 md:p-12 flex flex-col gap-10 overflow-y-auto custom-scrollbar">
              <div className="space-y-10 max-w-125 mx-auto w-full">
                {/* Adults */}
                <div className="flex justify-between items-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:border-gold/30 transition-colors">
                  <div>
                    <h3 className="text-white font-medium text-xl md:text-2xl">
                      {tg("adults")}
                    </h3>
                    <p className="text-white/40 text-sm mt-1">{tg("adult")}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all disabled:opacity-20 active:scale-90"
                      disabled={adults <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-white font-bold text-2xl w-8 text-center">
                      {adults}
                    </span>
                    <button
                      onClick={() => setAdults(Math.min(3, adults + 1))}
                      className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all disabled:opacity-20 active:scale-90"
                      disabled={
                        adults >= 3 || adults + childrenAges.length >= 4
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between items-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:border-gold/30 transition-colors">
                  <div>
                    <h3 className="text-white font-medium text-xl md:text-2xl">
                      {tg("children")}
                    </h3>
                    <p className="text-white/40 text-sm mt-1">Under 3 years</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setChildrenAges(childrenAges.slice(0, -1))}
                      className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all disabled:opacity-20 active:scale-90"
                      disabled={childrenAges.length <= 0}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-white font-bold text-2xl w-8 text-center">
                      {childrenAges.length}
                    </span>
                    <button
                      onClick={() => setChildrenAges([...childrenAges, 0])}
                      className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all disabled:opacity-20 active:scale-90"
                      disabled={childrenAges.length >= 4 - adults}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                {childrenAges.length > 0 && (
                  <div className="flex flex-col gap-6 pt-6 border-t border-gold/10">
                    {childrenAges.map((age, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center animate-modal-in"
                      >
                        <span className="text-white/70 text-base">
                          {tg("childAge", { index: i + 1 })}
                        </span>
                        <CustomAgeSelect
                          value={age}
                          onChange={(newAge) => {
                            const newAges = [...childrenAges];
                            newAges[i] = newAge;
                            setChildrenAges(newAges);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-gold/10 bg-[#1f160d] shrink-0">
          <div className="max-w-[500px] mx-auto w-full">
            {step === 1 ? (
              <button
                onClick={handleNext}
                disabled={!checkIn || !checkOut}
                className="w-full bg-gold hover:bg-gold-dark disabled:bg-white/5 disabled:text-white/20 text-white font-jost uppercase tracking-[4px] py-5 rounded-md font-bold transition-all flex items-center justify-center gap-4 group active:scale-[0.98] shadow-xl shadow-gold/10"
              >
                {t("next")}{" "}
                <FiArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleSearch}
                className="w-full bg-gold hover:bg-gold-dark text-white font-jost uppercase tracking-[4px] py-5 rounded-md font-bold transition-all shadow-2xl shadow-gold/20 active:scale-[0.98] flex items-center justify-center gap-4"
              >
                {t("checkAvailability")}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
