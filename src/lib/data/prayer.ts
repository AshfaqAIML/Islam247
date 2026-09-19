import type { PrayerTime } from "../types";

// Prayer times are computed client-side using a simplified astronomical algorithm.
// This is demo/educational content — for precise times, refer to certified local timetables.

export const prayerNames: PrayerTime[] = [
  { name: "Fajr", nameArabic: "الفجر", time: "", icon: "sunrise" },
  { name: "Sunrise", nameArabic: "الشروق", time: "", icon: "sun" },
  { name: "Dhuhr", nameArabic: "الظهر", time: "", icon: "cloud-sun" },
  { name: "Asr", nameArabic: "العصر", time: "", icon: "sun-medium" },
  { name: "Maghrib", nameArabic: "المغرب", time: "", icon: "sunset" },
  { name: "Isha", nameArabic: "العشاء", time: "", icon: "moon" },
];

// Compute approximate prayer times for a given latitude/longitude and date.
// Uses simplified solar position calculations. Returns times in local HH:MM.
export function computePrayerTimes(
  lat: number,
  _lng: number,
  date: Date = new Date()
): PrayerTime[] {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const decl = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180);
  const latRad = (lat * Math.PI) / 180;
  const declRad = (decl * Math.PI) / 180;

  // Simplified hour angle for each prayer (approximate)
  const hourAngleFajr = 100; // ~18 degrees depression
  const hourAngleSunset = 90.83;

  const computeTime = (angle: number) => {
    const cosH =
      -Math.sin((angle * Math.PI) / 180) - Math.sin(latRad) * Math.sin(declRad);
    const denom = Math.cos(latRad) * Math.cos(declRad);
    const H = Math.acos(Math.max(-1, Math.min(1, cosH / denom))) * (180 / Math.PI);
    return (12 - H / 15 + 6) % 24; // rough local solar time + offset
  };

  const fajrH = computeTime(hourAngleFajr);
  const sunriseH = computeTime(hourAngleSunset);
  const sunsetH = 12 + (12 - sunriseH);

  const fmt = (h: number) => {
    let hh = Math.floor(h);
    let mm = Math.round((h - hh) * 60);
    if (mm === 60) {
      mm = 0;
      hh = (hh + 1) % 24;
    }
    const period = hh >= 12 ? "PM" : "AM";
    let displayH = hh % 12;
    if (displayH === 0) displayH = 12;
    return `${displayH}:${mm.toString().padStart(2, "0")} ${period}`;
  };

  const dhuhrH = 12.2;
  const asrH = dhuhrH + (sunsetH - dhuhrH) * 0.55;
  const maghribH = sunsetH;
  const ishaH = maghribH + 1.4;

  return [
    { name: "Fajr", nameArabic: "الفجر", time: fmt(fajrH), icon: "sunrise" },
    { name: "Sunrise", nameArabic: "الشروق", time: fmt(sunriseH), icon: "sun" },
    { name: "Dhuhr", nameArabic: "الظهر", time: fmt(dhuhrH), icon: "cloud-sun" },
    { name: "Asr", nameArabic: "العصر", time: fmt(asrH), icon: "sun-medium" },
    { name: "Maghrib", nameArabic: "المغرب", time: fmt(maghribH), icon: "sunset" },
    { name: "Isha", nameArabic: "العشاء", time: fmt(ishaH), icon: "moon" },
  ];
}

// Get Qibla bearing from a given location (simplified, using great-circle bearing to Mecca).
export function getQiblaBearing(lat: number, lng: number): number {
  const meccaLat = 21.4225;
  const meccaLng = 39.8262;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const dLng = toRad(meccaLng - lng);
  const y = Math.sin(dLng) * Math.cos(toRad(meccaLat));
  const x =
    Math.cos(toRad(lat)) * Math.sin(toRad(meccaLat)) -
    Math.sin(toRad(lat)) * Math.cos(toRad(meccaLat)) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

// Find the next prayer and time remaining
export function getNextPrayer(times: PrayerTime[]) {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (const p of times) {
    if (!p.time) continue;
    const [time, period] = p.time.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    const prayerMin = h * 60 + m;
    if (prayerMin > nowMin) {
      const diff = prayerMin - nowMin;
      return {
        name: p.name,
        nameArabic: p.nameArabic,
        time: p.time,
        hoursLeft: Math.floor(diff / 60),
        minutesLeft: diff % 60,
      };
    }
  }
  // Next is tomorrow's Fajr
  const fajr = times[0];
  if (fajr.time) {
    const [time, period] = fajr.time.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    const prayerMin = h * 60 + m + 24 * 60;
    const diff = prayerMin - nowMin;
    return {
      name: fajr.name,
      nameArabic: fajr.nameArabic,
      time: fajr.time,
      hoursLeft: Math.floor(diff / 60),
      minutesLeft: diff % 60,
    };
  }
  return null;
}
