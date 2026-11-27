import { CLASSES, STUDIOS, type ClassSlot, type Level, type StudioId, type WeekendDay } from "./data";

export const PLANNER_EVENT = "prefect-planner";
export const SLOT_EVENT = "prefect-slot";
export type PlannerPreference = { studioId?: StudioId; style?: string; level?: Level; age?: number };
export type PlannerFilters = { studioId: string; day: string; style: string; level: string; age?: number };
export const ALL_FILTERS: PlannerFilters = { studioId: "All", day: "All", style: "All", level: "All" };
export const WEEKEND_DAYS: WeekendDay[] = ["Saturday", "Sunday"];
export const NO_TIMING = "No preference yet";
export const studioName = (id: string) => STUDIOS.find((studio) => studio.id === id)?.name ?? "No studio preference";
export const slotLabel = (slot: ClassSlot) => `${slot.day} ${slot.time} · ${studioName(slot.studioId)} · ${slot.style}`;
export function matchesAge(slot: ClassSlot, age: number) {
  return Number.isInteger(age) && age >= slot.minAge && (slot.maxAge === undefined || age <= slot.maxAge);
}
export function filterSlots(filters: PlannerFilters) {
  return CLASSES.filter((slot) =>
    (filters.studioId === "All" || slot.studioId === filters.studioId) &&
    (filters.day === "All" || slot.day === filters.day) &&
    (filters.style === "All" || slot.style === filters.style) &&
    (filters.level === "All" || slot.level === filters.level) &&
    (filters.age === undefined || matchesAge(slot, filters.age)));
}
export function openPlanner(preference: PlannerPreference) {
  window.dispatchEvent(new CustomEvent<PlannerPreference>(PLANNER_EVENT, { detail: preference }));
}
