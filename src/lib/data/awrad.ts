// Awrad al-Fatih — the daily litany (wird) of Imam Abdallah ibn Alawi al-Haddad
// (d. 1132 AH), a great Ba Alawi scholar. This wird is widely recited across
// the Muslim world, especially in the Ba Alawi tariqa.
// Source: public religious text, the compiled Awrad of Imam al-Haddad.

export interface AwradSection {
  id: string;
  title: string;
  titleArabic: string;
  order: number;
  items: AwradItem[];
}

export interface AwradItem {
  id: string;
  type: "quran" | "dhikr" | "dua" | "salawat";
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  count: number; // recommended repetitions
  note?: string;
}

export const awradSections: AwradSection[] = [
  {
    id: "awrad-1-seeking-forgiveness",
    title: "Seeking Forgiveness (Istighfar)",
    titleArabic: "الاستغفار",
    order: 1,
    items: [
      {
        id: "awrad-1-1",
        type: "dhikr",
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullāhal-ʿAẓīm al-ladhī lā ilāha illā Huwal-Ḥayyal-Qayyūma wa atūbu ilayh",
        translation: "I seek forgiveness from Allah the Mighty, besides Whom there is no god, the Ever-Living, the Sustainer, and I turn to Him in repentance.",
        reference: "Abu Dawud 1517, Tirmidhi 3577",
        count: 100,
        note: "Sayyid al-Istighfar — the Chief of Seeking Forgiveness. The Prophet ﷺ said: 'Whoever says this with certainty in the morning and dies that day, enters Paradise.'",
      },
    ],
  },
  {
    id: "awrad-2-salawat",
    title: "Salawat upon the Prophet ﷺ",
    titleArabic: "الصلاة على النبي ﷺ",
    order: 2,
    items: [
      {
        id: "awrad-2-1",
        type: "salawat",
        arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ",
        transliteration: "Allāhumma ṣalli ʿalā sayyidinā Muḥammad wa ʿalā āli sayyidinā Muḥammad",
        translation: "O Allah, send blessings upon our master Muhammad and upon the family of our master Muhammad.",
        reference: "Based on Bukhari 6357, Muslim 407",
        count: 100,
        note: "Imam al-Haddad begins the wird with salawat, following the principle that every gathering should begin and end with sending blessings upon the Prophet ﷺ.",
      },
    ],
  },
  {
    id: "awrad-3-quranic-verses",
    title: "Quranic Verses (Ayat)",
    titleArabic: "الآيات",
    order: 3,
    items: [
      {
        id: "awrad-3-1",
        type: "quran",
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillāhir-Raḥmānir-Raḥīm",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
        reference: "Quran 1:1",
        count: 1,
      },
      {
        id: "awrad-3-2",
        type: "quran",
        arabic: "وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ لَّا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ",
        transliteration: "Wa ilāhukum ilāhun wāḥidun lā ilāha illā Huwar-Raḥmānur-Raḥīm",
        translation: "And your god is one God. There is no deity except Him, the Entirely Merciful, the Especially Merciful.",
        reference: "Quran 2:163",
        count: 3,
      },
      {
        id: "awrad-3-3",
        type: "quran",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        transliteration: "Allāhu lā ilāha illā Huwal-Ḥayyul-Qayyūm",
        translation: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence.",
        reference: "Quran 2:255 (opening of Ayat al-Kursi)",
        count: 3,
        note: "The opening of Ayat al-Kursi — a pillar of the wird.",
      },
      {
        id: "awrad-3-4",
        type: "quran",
        arabic: "شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ لَا إِلَٰهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ",
        transliteration: "Shahidallāhu annahu lā ilāha illā Huwa wal-malā'ikatu wa ulūl-ʿilmi qā'iman bil-qisṭ lā ilāha illā Huwal-ʿAzīzul-Ḥakīm",
        translation: "Allah witnesses that there is no deity except Him, and [so do] the angels and those of knowledge — [that He is] maintaining [creation] in justice. There is no deity except Him, the Exalted in Might, the Wise.",
        reference: "Quran 3:18",
        count: 3,
      },
      {
        id: "awrad-3-5",
        type: "quran",
        arabic: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا",
        transliteration: "Innā faṭahnā laka fatḥan mubīnā",
        translation: "Indeed, We have given you a clear conquest.",
        reference: "Quran 48:1",
        count: 7,
        note: "The opening of Surah Al-Fath — Imam al-Haddad especially emphasized its recitation for opening (fath) and success.",
      },
    ],
  },
  {
    id: "awrad-4-dhikr",
    title: "Dhikr (Remembrance)",
    titleArabic: "الذكر",
    order: 4,
    items: [
      {
        id: "awrad-4-1",
        type: "dhikr",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
        transliteration: "Lā ilāha illā Allāh",
        translation: "There is no god but Allah.",
        reference: "Authentic dhikr",
        count: 100,
        note: "The Word of Tawhid (kalimat al-tawhid) — the foundation of the wird.",
      },
      {
        id: "awrad-4-2",
        type: "dhikr",
        arabic: "اللَّهُ اللَّهُ اللَّهُ",
        transliteration: "Allāh, Allāh, Allāh",
        translation: "Allah, Allah, Allah",
        reference: "Authentic dhikr",
        count: 500,
        note: "The Supreme Name (al-Ism al-A'zam). Imam al-Haddad counted it 500 times in the wird.",
      },
      {
        id: "awrad-4-3",
        type: "dhikr",
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        transliteration: "Subḥānallāhi wa biḥamdih",
        translation: "Glory be to Allah and praise Him.",
        reference: "Bukhari 6405, Muslim 2691",
        count: 100,
        note: "The Prophet ﷺ said: 'Whoever says this 100 times a day, his sins are forgiven even if they are like the foam of the sea.'",
      },
      {
        id: "awrad-4-4",
        type: "dhikr",
        arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "Lā ḥawla wa lā quwwata illā billāh",
        translation: "There is no power and no strength except with Allah.",
        reference: "Bukhari 6610",
        count: 100,
        note: "A treasure from the treasures of Paradise, as the Prophet ﷺ described it.",
      },
      {
        id: "awrad-4-5",
        type: "dhikr",
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Ḥasbiyallāhu lā ilāha illā Huwa ʿalayhi tawakkaltu wa Huwa Rabbul-ʿArshil-ʿAẓīm",
        translation: "Allah is sufficient for me. There is no god but Him. Upon Him I rely, and He is the Lord of the Magnificent Throne.",
        reference: "Quran 9:129, Abu Dawud 5081",
        count: 7,
        note: "Imam al-Haddad prescribed this for protection and reliance on Allah.",
      },
    ],
  },
  {
    id: "awrad-5-final-supplications",
    title: "Final Supplications",
    titleArabic: "الأدعية الختامية",
    order: 5,
    items: [
      {
        id: "awrad-5-1",
        type: "dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ، وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
        transliteration: "Allāhumma innī as'aluka minal-khayri kullih ʿājilihī wa ājilih, mā ʿalimtu minhu wa mā lam aʿlam, wa aʿūdhu bika minash-sharri kullih ʿājilihī wa ājilih mā ʿalimtu minhu wa mā lam aʿlam",
        translation: "O Allah, I ask You for all good, the immediate and the delayed, what I know of it and what I do not know. And I seek refuge in You from all evil, the immediate and the delayed, what I know of it and what I do not know.",
        reference: "Ibn Majah 3871",
        count: 1,
        note: "A comprehensive dua taught by the Prophet ﷺ, included by Imam al-Haddad at the end of the wird.",
      },
      {
        id: "awrad-5-2",
        type: "dua",
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ",
        transliteration: "Allāhummaghfir lī dhanbī kullah, diqqahu wa jillahu, wa awwalahu wa ākhirahu, wa ʿalāniyatahu wa sirrah",
        translation: "O Allah, forgive all my sins — the small and the great, the first and the last, the open and the hidden.",
        reference: "Muslim 483",
        count: 3,
        note: "A comprehensive dua for forgiveness that Imam al-Haddad included in the wird.",
      },
      {
        id: "awrad-5-3",
        type: "salawat",
        arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
        transliteration: "Allāhumma ṣalli ʿalā sayyidinā Muḥammad wa ʿalā āli sayyidinā Muḥammad kamā ṣallayta ʿalā Ibrāhīm wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd. Allāhumma bārik ʿalā sayyidinā Muḥammad wa ʿalā āli sayyidinā Muḥammad kamā bārakta ʿalā Ibrāhīm wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd",
        translation: "O Allah, send blessings upon our master Muhammad and upon the family of our master Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bless our master Muhammad and the family of our master Muhammad, as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.",
        reference: "Bukhari 3370, Muslim 407",
        count: 10,
        note: "The wird ends with the Ibrahimi salawat — closing with blessings upon the Prophet ﷺ, as every gathering should end with salawat.",
      },
    ],
  },
];

// The virtue of the Awrad
export const awradVirtue =
  "Imam Abdallah ibn Alawi al-Haddad (1044–1132 AH) compiled this wird as a daily litany for seekers on the spiritual path. It includes Quranic verses, dhikr, and supplications drawn from the Quran and authentic Sunnah. The Awrad is recited daily by followers of the Ba Alawi tariqa and many others across the Muslim world.\n\nThe Imam said: 'Whoever holds fast to this wird, Allah will suffice him in his affairs, protect him from harm, and grant him success in both worlds.'\n\nThe wird is structured to progress from seeking forgiveness, to sending blessings upon the Prophet ﷺ, to reciting Quranic verses, to dhikr, and finally to closing supplications.";

export function getAllAwradItems(): AwradItem[] {
  return awradSections.flatMap((s) => s.items);
}

export function getAwradItemById(id: string): AwradItem | undefined {
  return getAllAwradItems().find((i) => i.id === id);
}
