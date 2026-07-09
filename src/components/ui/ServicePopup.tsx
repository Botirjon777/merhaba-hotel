"use client";

import { useState } from "react";
import { PopupWrapper } from "./Popup";
import { usePopup } from "@/lib/PopupContext";

const HOTEL_EMAIL = "merhabaluxhotel@gmail.com";

const inputClass =
  "bg-white border border-sand px-[18px] py-[14px] font-jost text-sm text-text-dark outline-none transition-colors duration-300 focus:border-gold w-full";
const errorClass = "text-red-500 text-xs mt-1";

export function ServicePopup() {
  const { openPopup, closePopup } = usePopup();
  const [form, setForm] = useState({ name: "", email: "", date: "", guests: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const next: Partial<typeof form> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Valid email is required";
    if (!form.date.trim()) next.date = "Preferred date is required";
    if (!form.guests.trim()) next.guests = "Number of guests is required";
    return next;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const subject = encodeURIComponent("Service Enquiry — Merhaba Hotel");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPreferred Date: ${form.date}\nGuests: ${form.guests}`
    );
    window.open(`mailto:${HOTEL_EMAIL}?subject=${subject}&body=${body}`, "_blank");

    setForm({ name: "", email: "", date: "", guests: "" });
    setErrors({});
    closePopup();
    openPopup("confirm-popup");
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  return (
    <PopupWrapper id="service-popup">
      <span className="font-jost text-[10px] tracking-[5px] uppercase text-gold block mb-4">Enquire</span>
      <h3 className="text-4xl font-light text-text-dark mb-2">Book an Experience</h3>
      <p className="text-sm text-text-mid font-light leading-[1.7] mb-8">
        Contact our concierge to arrange this service during your stay or as a standalone experience.
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <input className={inputClass} type="text" placeholder="Your Name" {...field("name")} />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <input className={inputClass} type="email" placeholder="Email Address" {...field("email")} />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <input className={inputClass} type="date" placeholder="Preferred Date" {...field("date")} />
          {errors.date && <p className={errorClass}>{errors.date}</p>}
        </div>
        <div>
          <input className={inputClass} type="number" min="1" placeholder="Number of Guests" {...field("guests")} />
          {errors.guests && <p className={errorClass}>{errors.guests}</p>}
        </div>
        <button
          className="bg-brand hover:bg-brand-dark hover:-translate-y-[2px] transition-all duration-300 text-text-dark border-none py-4 px-10 font-jost text-xs tracking-[3px] uppercase cursor-pointer inline-block w-full"
          onClick={handleSubmit}
        >
          Send Enquiry
        </button>
      </div>
    </PopupWrapper>
  );
}
