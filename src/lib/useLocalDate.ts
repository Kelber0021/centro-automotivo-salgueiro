"use client";
import { useSyncExternalStore } from "react";
import { localDate } from "./consultation";

function subscribe(notify: () => void) {
  const timer = window.setInterval(notify, 60_000);
  document.addEventListener("visibilitychange", notify);
  return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", notify); };
}
// O export não congela a data mínima no dia do build nem causa divergência na hidratação.
export function useLocalDate() { return useSyncExternalStore(subscribe, () => localDate(), () => ""); }
