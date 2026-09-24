import { useEffect, useState } from "react";
import { DEMO_MODE } from "./config";
import { demo } from "./demo";
import { live } from "./live";

// Every component talks to `api`; which backend it gets is decided once here.
export const api = DEMO_MODE ? demo : live;
export { DEMO_MODE };

export const INGREDIENT_IMG = "https://spoonacular.com/cdn/ingredients_100x100/";

export function useUser() {
  const [user, setUser] = useState(undefined);
  useEffect(() => api.onAuthChange((u) => setUser(u || null)), []);
  return user; // undefined while loading, null when signed out
}

export function useInventory() {
  const [items, setItems] = useState(null);
  useEffect(() => api.subscribeInventory(setItems), []);
  return items;
}

export function useShopping() {
  const [items, setItems] = useState(null);
  useEffect(() => api.subscribeShopping(setItems), []);
  return items;
}

const DAY = 24 * 60 * 60 * 1000;

// Days until expiry, rounded up; negative when already expired.
export function daysLeft(date) {
  if (!date) return null;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return Math.round((d - startOfToday) / DAY);
}
