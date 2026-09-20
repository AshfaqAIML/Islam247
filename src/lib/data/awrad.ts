// Awrad al-Fatiha (Awrad Fateh) — the daily litany of Ameer Kabir
// Mir Syed Ali Hamadani (RA) (1314–1384 CE), the great Kubrawi Sufi scholar
// who spread Islam in Kashmir. This wird is recited daily in mosques across
// Kashmir, especially after Fajr and Maghrib prayers.
//
// Source: public religious text, the Awrad al-Fatiha of Ameer Kabir,
// widely published and recited in Kashmir and beyond.

export interface AwradSection {
  id: string;
  title: string;
  titleArabic: string;
  order: number;
  items: AwradItem[];
}

export interface AwradItem {
  id: string;
  type: "quran" | "dhikr" | "dua" | "salawat" | "name";
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  count: number;
  note?: string;
}

export const awradSections: AwradSection[] = [
  {
    id: "awrad-1-opening",
    title: "Opening — Bismillah & Salawat",
    titleArabic: "الافتتاح",
    order: 1,
    items: [
      {
        id: "awrad-1-1",
        type: "quran",
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillāhir-Raḥmānir-Raḥīm",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
        reference: "Quran 1:1",
        count: 1,
        note: "The Awrad begins with the Basmala, as every good deed begins with the name of Allah.",
      },
      {
        id: "awrad-1-2",
        type: "salawat",
        arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَأَصْحَابِهِ وَسَلِّمْ",
        transliteration: "Allāhumma ṣalli ʿalā sayyidinā Muḥammad wa ʿalā ālihī wa aṣḥābihī wa sallim",
        translation: "O Allah, send blessings and peace upon our master Muhammad, his family, and his companions.",
        reference: "Based on Bukhari & Muslim",
        count: 10,
        note: "Ameer Kabir begins the Awrad with salawat upon the Prophet ﷺ, following the Sunnah of beginning every gathering with blessings.",
      },
    ],
  },
  {
    id: "awrad-2-istighfar",
    title: "Seeking Forgiveness (Istighfar)",
    titleArabic: "الاستغفار",
    order: 2,
    items: [
      {
        id: "awrad-2-1",
        type: "dhikr",
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullāhal-ʿAẓīm al-ladhī lā ilāha illā Huwal-Ḥayyal-Qayyūma wa atūbu ilayh",
        translation: "I seek forgiveness from Allah the Mighty, besides Whom there is no god, the Ever-Living, the Sustainer, and I turn to Him in repentance.",
        reference: "Abu Dawud 1517, Tirmidhi 3577",
        count: 100,
        note: "Sayyid al-Istighfar — the Chief of Seeking Forgiveness. The Prophet ﷺ said: 'Whoever says this with certainty and dies that day, enters Paradise.'",
      },
      {
        id: "awrad-2-2",
        type: "dhikr",
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Rabbighfir lī wa tub ʿalayya innaka antat-Tawwābur-Raḥīm",
        translation: "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of Repentance, the Merciful.",
        reference: "Based on Quran 2:128",
        count: 100,
      },
    ],
  },
  {
    id: "awrad-3-quranic-verses",
    title: "Quranic Verses",
    titleArabic: "الآيات القرآنية",
    order: 3,
    items: [
      {
        id: "awrad-3-1",
        type: "quran",
        arabic: "الم * اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ * نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ * مِن قَبْلُ هُدًى لِّلنَّاسِ وَأَنزَلَ الْفُرْقَانَ",
        transliteration: "Alif Lām Mīm. Allāhu lā ilāha illā Huwal-Ḥayyul-Qayyūm. Nazzala ʿalaykal-Kitāba bil-ḥaqq muṣaddiqan limā bayna yadayhi wa anzalat-Tawrāta wal-Injīla min qablu hudan lin-nāsi wa anzalal-Furqān",
        translation: "Alif, Lam, Meem. Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. He has sent down upon you, [O Muhammad], the Book in truth, confirming what was before it. And He revealed the Torah and the Gospel. Before, as guidance for the people. And He revealed the Criterion.",
        reference: "Quran 3:1–3",
        count: 3,
        note: "The opening verses of Surah Aal Imran — recited for protection and blessings.",
      },
      {
        id: "awrad-3-2",
        type: "quran",
        arabic: "شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ لَا إِلَٰهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ",
        transliteration: "Shahidallāhu annahu lā ilāha illā Huwa wal-malā'ikatu wa ulūl-ʿilmi qā'iman bil-qisṭ lā ilāha illā Huwal-ʿAzīzul-Ḥakīm",
        translation: "Allah witnesses that there is no deity except Him, and [so do] the angels and those of knowledge — [that He is] maintaining [creation] in justice. There is no deity except Him, the Exalted in Might, the Wise.",
        reference: "Quran 3:18",
        count: 3,
        note: "Ayat al-Shahada — the Verse of Testimony. A core verse of Tawhid.",
      },
      {
        id: "awrad-3-3",
        type: "quran",
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
        transliteration: "Allāhu lā ilāha illā Huwal-Ḥayyul-Qayyūm. Lā ta'khudhuhū sinatun wa lā nawm. Lahu mā fis-samāwāti wa mā fil-arḍ",
        translation: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
        reference: "Quran 2:255 (Ayat al-Kursi)",
        count: 3,
        note: "Ayat al-Kursi — the Verse of the Throne. The Prophet ﷺ said it is the greatest verse in the Quran.",
      },
      {
        id: "awrad-3-4",
        type: "quran",
        arabic: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا * لِّيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِن ذَنبِكَ وَمَا تَأَخَّرَ",
        transliteration: "Innā faṭahnā laka fatḥan mubīnā. Liyaghfira lakallāhu mā taqaddama min dhanbika wa mā ta'akhkhara",
        translation: "Indeed, We have given you a clear conquest. That Allah may forgive you what preceded of your sin and what will follow.",
        reference: "Quran 48:1–2",
        count: 7,
        note: "The opening of Surah Al-Fath — Ameer Kabir recited this for spiritual opening (fath) and success.",
      },
    ],
  },
  {
    id: "awrad-4-tawhid",
    title: "Declaration of Oneness (Tawhid)",
    titleArabic: "كلمة التوحيد",
    order: 4,
    items: [
      {
        id: "awrad-4-1",
        type: "dhikr",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
        transliteration: "Lā ilāha illā Allāh, Muḥammadun rasūlullāh",
        translation: "There is no god but Allah, Muhammad is the Messenger of Allah.",
        reference: "The Kalima",
        count: 100,
        note: "The Word of Tawhid — the foundation of Islam. Ameer Kabir emphasized its constant recitation.",
      },
      {
        id: "awrad-4-2",
        type: "dhikr",
        arabic: "اللَّهُ اللَّهُ اللَّهُ",
        transliteration: "Allāh, Allāh, Allāh",
        translation: "Allah, Allah, Allah",
        reference: "Supreme Dhikr",
        count: 500,
        note: "The Supreme Name (al-Ism al-A'zam). The core dhikr of the Awrad, recited abundantly for spiritual elevation.",
      },
      {
        id: "awrad-4-3",
        type: "dhikr",
        arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ",
        transliteration: "Huwal-Awwalu wal-Ākhiru waẓ-Ẓāhiru wal-Bāṭinu wa Huwa bikulli shay'in ʿalīm",
        translation: "He is the First and the Last, the Manifest and the Hidden, and He is, of all things, Knowing.",
        reference: "Quran 57:3",
        count: 100,
        note: "A verse of Tawhid describing Allah's attributes — recited for spiritual realization.",
      },
    ],
  },
  {
    id: "awrad-5-dhikr",
    title: "Dhikr & Tasbeeh",
    titleArabic: "الذكر والتسبيح",
    order: 5,
    items: [
      {
        id: "awrad-5-1",
        type: "dhikr",
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
        transliteration: "Subḥānallāhi wa biḥamdih, Subḥānallāhil-ʿAẓīm",
        translation: "Glory be to Allah and praise Him. Glory be to Allah the Mighty.",
        reference: "Bukhari 6406, Muslim 2691",
        count: 100,
        note: "Two phrases light on the tongue, heavy on the scale, beloved to the Most Merciful.",
      },
      {
        id: "awrad-5-2",
        type: "dhikr",
        arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "Lā ḥawla wa lā quwwata illā billāh",
        translation: "There is no power and no strength except with Allah.",
        reference: "Bukhari 6610",
        count: 100,
        note: "A treasure from the treasures of Paradise. Ameer Kabir included it for reliance on Allah alone.",
      },
      {
        id: "awrad-5-3",
        type: "dhikr",
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Ḥasbiyallāhu lā ilāha illā Huwa ʿalayhi tawakkaltu wa Huwa Rabbul-ʿArshil-ʿAẓīm",
        translation: "Allah is sufficient for me. There is no god but Him. Upon Him I rely, and He is the Lord of the Magnificent Throne.",
        reference: "Quran 9:129, Abu Dawud 5081",
        count: 7,
        note: "Recited for protection, provision, and reliance on Allah. The Prophet ﷺ said whoever says this 7 times morning and evening, Allah suffices him.",
      },
    ],
  },
  {
    id: "awrad-6-salawat-abundant",
    title: "Abundant Salawat",
    titleArabic: "الصلاة الإكثار",
    order: 6,
    items: [
      {
        id: "awrad-6-1",
        type: "salawat",
        arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
        transliteration: "Allāhumma ṣalli ʿalā sayyidinā Muḥammad wa ʿalā āli sayyidinā Muḥammad kamā ṣallayta ʿalā Ibrāhīm wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd. Allāhumma bārik ʿalā sayyidinā Muḥammad wa ʿalā āli sayyidinā Muḥammad kamā bārakta ʿalā Ibrāhīm wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd",
        translation: "O Allah, send blessings upon our master Muhammad and upon the family of our master Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bless our master Muhammad and the family of our master Muhammad, as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.",
        reference: "Bukhari 3370, Muslim 407",
        count: 100,
        note: "The Ibrahimi Salawat — recited abundantly in the Awrad. Ameer Kabir said: 'The fastest way to Allah is through salawat upon the Prophet ﷺ.'",
      },
    ],
  },
  {
    id: "awrad-7-closing-duas",
    title: "Closing Supplications",
    titleArabic: "الأدعية الختامية",
    order: 7,
    items: [
      {
        id: "awrad-7-1",
        type: "dua",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ، وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
        transliteration: "Allāhumma innī as'aluka minal-khayri kullih ʿājilihī wa ājilih, mā ʿalimtu minhu wa mā lam aʿlam, wa aʿūdhu bika minash-sharri kullih ʿājilihī wa ājilih mā ʿalimtu minhu wa mā lam aʿlam",
        translation: "O Allah, I ask You for all good — the immediate and the delayed, what I know of it and what I do not know. And I seek refuge in You from all evil — the immediate and the delayed, what I know of it and what I do not know.",
        reference: "Ibn Majah 3871",
        count: 1,
        note: "A comprehensive dua of the Prophet ﷺ for all good and protection from all evil.",
      },
      {
        id: "awrad-7-2",
        type: "dua",
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ",
        transliteration: "Allāhummaghfir lī dhanbī kullah, diqqahu wa jillahu, wa awwalahu wa ākhirahu, wa ʿalāniyatahu wa sirrah",
        translation: "O Allah, forgive all my sins — the small and the great, the first and the last, the open and the hidden.",
        reference: "Muslim 483",
        count: 3,
        note: "A comprehensive dua for forgiveness included by Ameer Kabir at the closing of the Awrad.",
      },
      {
        id: "awrad-7-3",
        type: "dua",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbanā ātinā fid-dunyā ḥasanah wa fil-ākhirati ḥasanah wa qinā ʿadhāban-nār",
        translation: "Our Lord, give us in this world good and in the Hereafter good, and protect us from the punishment of the Fire.",
        reference: "Quran 2:201",
        count: 3,
        note: "The most comprehensive dua of the Quran — Ameer Kabir closes the Awrad with this verse.",
      },
      {
        id: "awrad-7-4",
        type: "salawat",
        arabic: "اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَأَصْحَابِهِ وَسَلِّمْ",
        transliteration: "Allāhumma ṣalli ʿalā sayyidinā Muḥammad wa ʿalā ālihī wa aṣḥābihī wa sallim",
        translation: "O Allah, send blessings and peace upon our master Muhammad, his family, and his companions.",
        reference: "Based on Bukhari & Muslim",
        count: 10,
        note: "The Awrad ends as it began — with salawat upon the Prophet ﷺ, sealing the wird with blessings.",
      },
    ],
  },
];

// The virtue of the Awrad
export const awradVirtue =
  "Ameer Kabir Mir Syed Ali Hamadani (RA) (1314–1384 CE) was a great scholar, Sufi master of the Kubrawi order, and caller to Islam who came to Kashmir and transformed its spiritual landscape. His Awrad al-Fatiha — known as 'Awrad Fateh' — is recited daily in mosques across Kashmir after Fajr and Maghrib prayers.\n\nThe Awrad is structured to progress through: seeking forgiveness, salawat upon the Prophet ﷺ, Quranic verses, the declaration of Tawhid, dhikr and tasbeeh, abundant salawat, and closing supplications.\n\nAmeer Kabir said: 'Whoever holds fast to this wird with sincerity and regularity, Allah will open for him the doors of mercy, protect him from harm, and grant him success in both worlds.'\n\nThis Awrad is a treasure of the people of Kashmir, passed down through generations, connecting the worshipper to Allah through the means of His remembrance and the intercession of His Beloved Messenger ﷺ.";

export function getAllAwradItems(): AwradItem[] {
  return awradSections.flatMap((s) => s.items);
}

export function getAwradItemById(id: string): AwradItem | undefined {
  return getAllAwradItems().find((i) => i.id === id);
}
