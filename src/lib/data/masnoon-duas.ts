// Masnoon Duas — authentic prophetic supplications for daily occasions.
// Source: Hisn al-Muslim (Fortress of the Muslim) and authentic hadith collections.
// These are duas taught by the Prophet Muhammad ﷺ for daily life.

import type { DuaCategory, Dua } from "../types";

export const masnoonCategories: DuaCategory[] = [
  {
    id: "masnoon-entering-leaving-home",
    name: "Entering & Leaving Home",
    nameArabic: "دخول المنزل والخروج منه",
    icon: "home",
    duas: [
      {
        id: "masnoon-entering-home",
        title: "When Entering the Home",
        arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
        transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna",
        translation: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.",
        reference: "Abu Dawud 5096",
        count: 1,
        virtue: "The Prophet ﷺ said this when entering his home.",
      },
      {
        id: "masnoon-leaving-home",
        title: "When Leaving the Home",
        arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
        translation: "In the name of Allah, I place my trust in Allah, and there is no might or power except with Allah.",
        reference: "Abu Dawud 5095, Tirmidhi 3426",
        count: 1,
        virtue: "The Prophet ﷺ said: 'When a man goes out of his house and says this, it is said to him: You are guided, sufficed, and protected.'",
      },
    ],
  },
  {
    id: "masnoon-dressing",
    name: "Dressing",
    nameArabic: "لبس الثوب",
    icon: "shirt",
    duas: [
      {
        id: "masnoon-new-clothes",
        title: "When Wearing a New Garment",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        transliteration: "Alhamdulillahil-ladhi kasani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
        translation: "Praise is to Allah Who has clothed me with this garment and provided it for me, with no power or strength from myself.",
        reference: "Abu Dawud 4023, Tirmidhi 3458",
        count: 1,
        virtue: "The Prophet ﷺ taught this dua to say when wearing new clothes.",
      },
    ],
  },
  {
    id: "masnoon-food-drink",
    name: "Food & Drink",
    nameArabic: "الطعام والشراب",
    icon: "utensils",
    duas: [
      {
        id: "masnoon-before-eating",
        title: "Before Eating",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah",
        translation: "In the name of Allah.",
        reference: "Abu Dawud 3767, Tirmidhi 1858",
        count: 1,
        virtue: "The Prophet ﷺ said: 'When one of you eats, let him mention the name of Allah. If he forgets, let him say: Bismillahi awwalahu wa akhirahu.'",
      },
      {
        id: "masnoon-after-eating",
        title: "After Eating",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        transliteration: "Alhamdulillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah",
        translation: "Praise is to Allah Who has fed me this and provided it for me, with no power or strength from myself.",
        reference: "Abu Dawud 4023, Tirmidhi 3458",
        count: 1,
        virtue: "The Prophet ﷺ said: 'Allah is pleased with His servant who, when he eats, praises Him, and when he drinks, praises Him.'",
      },
      {
        id: "masnoon-drinking-milk",
        title: "When Drinking Milk",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Allahumma barik lana fima razaqtana wa qina 'adhaban-nar",
        translation: "O Allah, bless us in what You have provided for us, and protect us from the punishment of the Fire.",
        reference: "Abu Dawud 3730, Ibn Majah 3322",
        count: 1,
        virtue: "The Prophet ﷺ made this dua when drinking milk.",
      },
    ],
  },
  {
    id: "masnoon-entering-leaving-mosque",
    name: "Entering & Leaving the Mosque",
    nameArabic: "دخول المسجد والخروج منه",
    icon: "building",
    duas: [
      {
        id: "masnoon-entering-mosque",
        title: "When Entering the Mosque",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliteration: "Allahummaftah li abwaba rahmatik",
        translation: "O Allah, open the gates of Your mercy for me.",
        reference: "Muslim 713",
        count: 1,
        virtue: "The Prophet ﷺ taught this dua for entering the mosque.",
      },
      {
        id: "masnoon-leaving-mosque",
        title: "When Leaving the Mosque",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        transliteration: "Allahumma inni as'aluka min fadlik",
        translation: "O Allah, I ask You for Your bounty.",
        reference: "Muslim 713",
        count: 1,
        virtue: "The Prophet ﷺ taught this dua for leaving the mosque.",
      },
    ],
  },
  {
    id: "masnoon-wudu",
    name: "Ablution (Wudu)",
    nameArabic: "الوضوء",
    icon: "droplet",
    duas: [
      {
        id: "masnoon-after-wudu",
        title: "After Completing Wudu",
        arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan 'abduhu wa rasuluh",
        translation: "I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger.",
        reference: "Muslim 234",
        count: 1,
        virtue: "The Prophet ﷺ said: 'Whoever makes wudu and says this, the eight gates of Paradise are opened for him — he may enter by whichever he wishes.'",
      },
    ],
  },
  {
    id: "masnoon-adhan",
    name: "Response to Adhan",
    nameArabic: "إجابة الأذان",
    icon: "bell",
    duas: [
      {
        id: "masnoon-after-adhan",
        title: "After the Adhan",
        arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
        transliteration: "Allahumma Rabba hadhihid-da'wati-tammah, was-salati qa'imah, ati Muhammadanil-wasilata wal-fadilah, wab'athhu maqaman mahmudanil-ladhi wa'adtah",
        translation: "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor, and raise him to the praised station that You have promised him.",
        reference: "Bukhari 614, Muslim 385",
        count: 1,
        virtue: "The Prophet ﷺ said: 'Whoever says this when hearing the adhan, my intercession will be permissible for him on the Day of Resurrection.'",
      },
    ],
  },
  {
    id: "masnoon-anxiety-sorrow",
    name: "Anxiety & Sorrow",
    nameArabic: "الكرب والحزن",
    icon: "heart",
    duas: [
      {
        id: "masnoon-anxiety",
        title: "When Experiencing Anxiety or Sorrow",
        arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
        transliteration: "Allahumma inni 'abduk, ibnu 'abdik, ibnu amatik, nasiyati biyadik, madin fiyya hukmuk, 'adlun fiyya qada'uk, as'aluka bikulli ismin huwa lak, sammayta bihi nafsak, aw anzaltahu fi kitabik, aw 'allamtahu ahadan min khalqik, awista'tharta bihi fi 'ilmil-ghaybi 'indak, an taj'alal-Qur'ana rabbi'a qalbi, wa nura sadri, wa jalaa huzni, wa dhahaba hammi",
        translation: "O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your Hand. Your judgment upon me is carried out. Your decree upon me is just. I ask You by every name of Yours — which You have named Yourself, or revealed in Your Book, or taught to any of Your creation, or kept to Yourself in the knowledge of the unseen — to make the Quran the spring of my heart, the light of my chest, the banisher of my sorrow, and the remover of my anxiety.",
        reference: "Ahmad 3712",
        count: 1,
        virtue: "The Prophet ﷺ said: 'No servant ever says this except that Allah removes his sorrow and replaces it with joy.'",
      },
      {
        id: "masnoon-distress",
        title: "Dua of Distress",
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
        transliteration: "La ilaha illallahul-'Adhimul-Halim, la ilaha illallahu Rabbul-'Arshil-'Adhim, la ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim",
        translation: "There is no god but Allah, the Mighty, the Forbearing. There is no god but Allah, Lord of the Magnificent Throne. There is no god but Allah, Lord of the heavens, Lord of the earth, and Lord of the Noble Throne.",
        reference: "Bukhari 6346",
        count: 1,
        virtue: "The Prophet ﷺ taught this dua to be said in times of distress.",
      },
    ],
  },
  {
    id: "masnoon-rain",
    name: "Rain & Weather",
    nameArabic: "نزول المطر",
    icon: "cloud-rain",
    duas: [
      {
        id: "masnoon-rain-falling",
        title: "When Rain Falls",
        arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
        transliteration: "Allahumma sayyiban nafi'an",
        translation: "O Allah, [make it] a beneficial rain.",
        reference: "Bukhari 1032",
        count: 1,
        virtue: "The Prophet ﷺ said this when rain fell.",
      },
      {
        id: "masnoon-after-rain",
        title: "After the Rain",
        arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
        transliteration: "Mutirna bifadlillahi wa rahmatih",
        translation: "We have been given rain by the favor and mercy of Allah.",
        reference: "Bukhari 846, Muslim 71",
        count: 1,
        virtue: "The Prophet ﷺ said this after rain. He said it is a form of pure faith to attribute rain to Allah's mercy.",
      },
    ],
  },
  {
    id: "masnoon-mirror",
    name: "Looking in the Mirror",
    nameArabic: "النظر في المرآة",
    icon: "eye",
    duas: [
      {
        id: "masnoon-mirror",
        title: "When Looking in the Mirror",
        arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
        transliteration: "Allahumma kama hassanta khalqi fahassin khuluqi",
        translation: "O Allah, just as You have made my form beautiful, beautify my character.",
        reference: "Ahmad 2450, Ibn Hibban 959",
        count: 1,
        virtue: "The Prophet ﷺ used to say this when looking in the mirror.",
      },
    ],
  },
  {
    id: "masnoon-anger",
    name: "When Angry",
    nameArabic: "عند الغضب",
    icon: "flame",
    duas: [
      {
        id: "masnoon-anger",
        title: "When Feeling Angry",
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A'udhu billahi minash-shaytanir-rajim",
        translation: "I seek refuge in Allah from the accursed Satan.",
        reference: "Bukhari 3282, Muslim 2610",
        count: 1,
        virtue: "The Prophet ﷺ said: 'If someone is angry and says this, his anger will go away.'",
      },
    ],
  },
];

// Flatten all masnoon duas for search/favorites
export function getAllMasnoonDuas(): { dua: Dua; category: DuaCategory }[] {
  const all: { dua: Dua; category: DuaCategory }[] = [];
  for (const cat of masnoonCategories) {
    for (const d of cat.duas) {
      all.push({ dua: d, category: cat });
    }
  }
  return all;
}

export function getMasnoonDuaById(id: string): Dua | undefined {
  for (const cat of masnoonCategories) {
    const found = cat.duas.find((d) => d.id === id);
    if (found) return found;
  }
  return undefined;
}
