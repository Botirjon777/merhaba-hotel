import { create } from "zustand";

interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenAges: number[];
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
  setAdults: (adults: number) => void;
  setChildrenAges: (ages: number[]) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  checkIn: new Date().toISOString().split("T")[0],
  checkOut: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  adults: 2,
  childrenAges: [],
  setCheckIn: (date) => set({ checkIn: date }),
  setCheckOut: (date) => set({ checkOut: date }),
  setAdults: (adults) => set({ adults }),
  setChildrenAges: (childrenAges) => set({ childrenAges }),
}));
