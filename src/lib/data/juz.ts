// Juz (Para) data — maps the 30 surahs in our dataset to their Juz assignments.
// This enables "browse by Juz" navigation in the Quran view.
// Note: A surah can span multiple Juz; we list the Juz where the surah *starts*.
// For surahs in our dataset (mostly short surahs from Juz Amma), most start in Juz 30.

export interface Juz {
  id: number;
  name: string;
  nameArabic: string;
  surahIds: number[]; // surahs in our dataset that belong to this juz
}

export const juzData: Juz[] = [
  {
    id: 1,
    name: "Juz 1 — Al-Fatihah & Al-Baqarah",
    nameArabic: "الجزء الأول",
    surahIds: [1],
  },
  {
    id: 30,
    name: "Juz 30 — Juz Amma (Amma Yatasa'alun)",
    nameArabic: "جزء عمَّ",
    surahIds: [
      78, 87, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 104, 105,
      106, 107, 108, 109, 110, 111, 112, 113, 114,
    ],
  },
  {
    id: 22,
    name: "Juz 22 — Surah Ya-Sin & Al-Mulk region",
    nameArabic: "الجزء الثاني والعشرون",
    surahIds: [36, 67],
  },
  {
    id: 27,
    name: "Juz 27 — Surah Ar-Rahman region",
    nameArabic: "الجزء السابع والعشرون",
    surahIds: [55],
  },
  {
    id: 3,
    name: "Juz 3 — Ayat al-Kursi (2:255)",
    nameArabic: "الجزء الثالث",
    surahIds: [255],
  },
];

export function getJuzBySurah(surahId: number): Juz | undefined {
  return juzData.find((j) => j.surahIds.includes(surahId));
}

export function getSurahsInJuz(juzId: number, allSurahIds: number[]): number[] {
  const juz = juzData.find((j) => j.id === juzId);
  if (!juz) return [];
  return juz.surahIds.filter((id) => allSurahIds.includes(id));
}
