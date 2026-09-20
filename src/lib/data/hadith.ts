import type { HadithCollection, Hadith } from "../types";

// Curated selections from the four major Sunni hadith collections.
// Arabic text uses authentic riwayah wording; English translations are
// standard scholarly renderings. Book/chapter labels follow traditional
// numbering conventions used in print editions.
export const hadithCollections: HadithCollection[] = [
  {
    id: "sahih-bukhari",
    name: "Sahih al-Bukhari",
    nameArabic: "صحيح البخاري",
    description:
      "The most authentic book after the Quran, compiled by Imam Muhammad ibn Ismail al-Bukhari (d. 256 AH). It is the first of the Six Books (Kutub al-Sittah) and is revered across the Muslim world.",
    bookCount: 97,
    hadithCount: 7563,
    hadiths: [
      {
        id: "bukhari-1",
        number: 1,
        arabic:
          "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
        english:
          "Actions are but by intentions, and every man shall have only that which he intended. So whoever migrated for Allah and His Messenger, then his migration was for Allah and His Messenger. And whoever migrated for worldly gain or a woman to marry, then his migration was for that which he migrated.",
        narrator: "Umar ibn al-Khattab (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab Bad' al-Wahy (Book of the Beginning of Revelation)",
        chapter: "How the Divine Revelation started to come to Allah's Messenger",
      },
      {
        id: "bukhari-13",
        number: 13,
        arabic:
          "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        english:
          "None of you truly believes until he loves for his brother what he loves for himself.",
        narrator: "Anas ibn Malik (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab al-Iman (Book of Faith)",
        chapter: "From the signs of faith is loving good for one's brother",
      },
      {
        id: "bukhari-10",
        number: 10,
        arabic:
          "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ",
        english:
          "The Muslim is the one from whose tongue and hand the Muslims are safe, and the Muhajir (emigrant) is the one who abandons what Allah has forbidden.",
        narrator: "Abdullah ibn Amr (may Allah be pleased with them)",
        grade: "Sahih",
        book: "Kitab al-Iman (Book of Faith)",
        chapter: "Whose Islam is best and whose emigration is best",
      },
      {
        id: "bukhari-5027",
        number: 5027,
        arabic:
          "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        english:
          "The best among you are those who learn the Quran and teach it.",
        narrator: "Uthman ibn Affan (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab Fada'il al-Quran (Book of the Virtues of the Quran)",
        chapter: "The best of you is he who learns the Quran and teaches it",
      },
      {
        id: "bukhari-6018",
        number: 6018,
        arabic:
          "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
        english:
          "Whoever believes in Allah and the Last Day, let him speak good or remain silent. Whoever believes in Allah and the Last Day, let him honor his neighbor. Whoever believes in Allah and the Last Day, let him honor his guest.",
        narrator: "Abu Hurayrah (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab al-Adab (Book of Manners)",
        chapter: "Speaking good or remaining silent",
      },
    ],
  },
  {
    id: "sahih-muslim",
    name: "Sahih Muslim",
    nameArabic: "صحيح مسلم",
    description:
      "The second most authentic hadith compilation, gathered by Imam Muslim ibn al-Hajjaj al-Naysaburi (d. 261 AH). It is renowned for the precision of its chain (isnad) methodology.",
    bookCount: 56,
    hadithCount: 7470,
    hadiths: [
      {
        id: "muslim-55",
        number: 55,
        arabic:
          "الدِّينُ النَّصِيحَةُ، قُلْنَا لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ",
        english:
          "Religion is sincerity. We asked: To whom? He said: To Allah, His Book, His Messenger, the leaders of the Muslims, and their common folk.",
        narrator: "Tamim al-Dari (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab al-Iman (Book of Faith)",
        chapter: "Religion is sincerity",
      },
      {
        id: "muslim-4736",
        number: 4736,
        arabic:
          "لاَ يَشْكُرُ اللَّهَ مَنْ لاَ يَشْكُرُ النَّاسَ",
        english:
          "He who does not thank people does not thank Allah.",
        narrator: "Abu Hurayrah (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab al-Birr was-Silah wal-Adab (Book of Righteousness and Good Manners)",
        chapter: "Thanking Allah and thanking people",
      },
      {
        id: "muslim-4797",
        number: 4797,
        arabic:
          "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ، وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
        english:
          "Whoever relieves a believer of a hardship in this world, Allah will relieve for him a hardship from the hardships of the Day of Resurrection. And Allah is in the aid of the servant as long as the servant is in the aid of his brother.",
        narrator: "Abu Hurayrah (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab adh-Dhikr wad-Du'a (Book of Remembrance and Supplication)",
        chapter: "The virtue of relieving hardship",
      },
      {
        id: "muslim-2674a",
        number: 2674,
        arabic:
          "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
        english:
          "Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.",
        narrator: "Abu Hurayrah (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab adh-Dhikr wad-Du'a (Book of Remembrance and Supplication)",
        chapter: "The virtue of gathering for the recitation of the Quran and for remembrance",
      },
    ],
  },
  {
    id: "sunan-abu-dawud",
    name: "Sunan Abu Dawud",
    nameArabic: "سنن أبي داود",
    description:
      "Compiled by Imam Abu Dawud as-Sijistani (d. 275 AH), one of the most important works of hadith focusing on legal rulings (ahkam). The author selected hadiths that form the basis of juristic derivation.",
    bookCount: 43,
    hadithCount: 5274,
    hadiths: [
      {
        id: "abudawud-4941",
        number: 4941,
        arabic:
          "لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا",
        english:
          "He is not one of us who does not show mercy to our young ones and respect to our elders.",
        narrator: "Amr ibn Shu'ayb, from his father, from his grandfather (may Allah be pleased with him)",
        grade: "Hasan",
        book: "Kitab al-Adab (Book of Manners)",
        chapter: "Showing mercy to the young and honoring the elders",
      },
      {
        id: "abudawud-3115",
        number: 3115,
        arabic:
          "الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ",
        english:
          "Paradise lies at the feet of your mothers.",
        narrator: "Mu'awiya ibn Jahimah as-Sulami (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab al-Jihad (Book of Jihad)",
        chapter: "Permission of parents for jihad",
      },
      {
        id: "abudawud-3643",
        number: 3643,
        arabic:
          "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        english:
          "The seeking of knowledge is obligatory upon every Muslim.",
        narrator: "Anas ibn Malik (may Allah be pleased with him)",
        grade: "Hasan",
        book: "Kitab al-Ilm (Book of Knowledge)",
        chapter: "The recommendation to seek knowledge",
      },
      {
        id: "abudawud-4811",
        number: 4811,
        arabic:
          "عَلَيْكُمْ بِالصِّدْقِ، فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ",
        english:
          "Hold fast to truthfulness, for truthfulness leads to righteousness, and righteousness leads to Paradise.",
        narrator: "Abdullah ibn Mas'ud (may Allah be pleased with him)",
        grade: "Hasan",
        book: "Kitab al-Adab (Book of Manners)",
        chapter: "The virtue of truthfulness",
      },
    ],
  },
  {
    id: "jami-tirmidhi",
    name: "Jami at-Tirmidhi",
    nameArabic: "جامع الترمذي",
    description:
      "Also known as Sunan at-Tirmidhi, compiled by Imam Muhammad ibn Isa at-Tirmidhi (d. 279 AH). It is celebrated for grading each hadith and including the opinions of the jurists, making it a bridge between hadith and fiqh.",
    bookCount: 46,
    hadithCount: 3956,
    hadiths: [
      {
        id: "tirmidhi-1987",
        number: 1987,
        arabic:
          "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
        english:
          "Fear Allah wherever you are, follow a bad deed with a good one to erase it, and treat people with good character.",
        narrator: "Mu'adh ibn Jabal (may Allah be pleased with him)",
        grade: "Hasan",
        book: "Kitab al-Birr was-Silah (Book of Righteousness and Maintaining Ties)",
        chapter: "Good character",
      },
      {
        id: "tirmidhi-2783",
        number: 2783,
        arabic:
          "إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلاَّ غَلَبَهُ، فَسَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا",
        english:
          "Indeed, the religion is ease, and no one will ever overburden himself in religion except that it overcomes him. So aim for what is right, draw close, and give glad tidings.",
        narrator: "Abu Hurayrah (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab al-Iman (Book of Faith)",
        chapter: "The religion is ease",
      },
      {
        id: "tirmidhi-2670",
        number: 2670,
        arabic:
          "مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ",
        english:
          "Whoever guides to something good is like the one who does it.",
        narrator: "Abu Mas'ud al-Ansari (may Allah be pleased with him)",
        grade: "Sahih",
        book: "Kitab al-Ilm (Book of Knowledge)",
        chapter: "Whoever guides to good is like its doer",
      },
      {
        id: "tirmidhi-2516",
        number: 2516,
        arabic:
          "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
        english:
          "The merciful are shown mercy by the Most Merciful. Show mercy to those on earth, and the One in the heaven will show mercy to you.",
        narrator: "Abdullah ibn Amr (may Allah be pleased with them)",
        grade: "Sahih",
        book: "Kitab al-Birr was-Silah (Book of Righteousness and Maintaining Ties)",
        chapter: "Showing mercy to the people of the earth",
      },
    ],
  },
];

/**
 * Find a hadith by its unique id across all collections.
 * Returns undefined if not found.
 */
export function getHadithById(id: string): Hadith | undefined {
  for (const collection of hadithCollections) {
    const found = collection.hadiths.find((h) => h.id === id);
    if (found) return found;
  }
  return undefined;
}

// Build a flat list of all hadiths across collections for daily rotation.
export function getAllHadiths(): { hadith: Hadith; collection: HadithCollection }[] {
  const all: { hadith: Hadith; collection: HadithCollection }[] = [];
  for (const col of hadithCollections) {
    for (const h of col.hadiths) {
      all.push({ hadith: h, collection: col });
    }
  }
  return all;
}

// Returns a hadith of the day based on the current date.
export function getDailyHadith(): { hadith: Hadith; collection: HadithCollection } {
  const all = getAllHadiths();
  const day = new Date().getDate();
  return all[day % all.length];
}
