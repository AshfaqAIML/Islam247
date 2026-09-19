import type { DuaCategory, Dua } from "../types";

// Authentic adhkar and supplications gathered from the Quran and Sunnah.
// Transliterations follow common Latin conventions used in English-speaking
// Muslim communities. Recommended counts are based on authentic narrations.
export const duaCategories: DuaCategory[] = [
  {
    id: "morning-evening",
    name: "Morning & Evening Azkar",
    nameArabic: "أذكار الصباح والمساء",
    icon: "sunrise",
    duas: [
      {
        id: "sayyid-al-istighfar",
        title: "Sayyid al-Istighfar (Chief of Seeking Forgiveness)",
        arabic:
          "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
        transliteration:
          "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mas-tata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi-ni'matika 'alayya, wa abu'u bi-dhanbi faghfir li fa-innahu la yaghfirudh-dhunuba illa anta.",
        translation:
          "O Allah, You are my Lord; there is no deity except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for indeed none can forgive sins except You.",
        reference: "Sahih al-Bukhari 6306",
        count: 1,
        virtue:
          "Whoever says this with certainty in the morning or evening and dies that day/night will enter Paradise.",
      },
      {
        id: "aoodhu-bikalimatillah",
        title: "Seeking Refuge in Allah's Perfect Words",
        arabic:
          "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration:
          "A'udhu bi-kalimatillahi at-tammati min sharri ma khalaqa.",
        translation:
          "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        reference: "Sahih Muslim 2708",
        count: 3,
        virtue:
          "Whoever says it three times in the evening will not be harmed by anything that night.",
      },
      {
        id: "asbahna-asbahal-mulk",
        title: "Morning Remembrance - Sovereignty Belongs to Allah",
        arabic:
          "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ",
        transliteration:
          "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fi hadhal-yawmi wa khayra ma ba'dahu, wa a'udhu bika min sharri ma fi hadhal-yawmi wa sharri ma ba'dahu.",
        translation:
          "We have entered the morning and dominion belongs to Allah, all praise is for Allah. There is no deity except Allah alone, with no partner. To Him belongs sovereignty and praise, and He is over all things competent. My Lord, I ask You for the best of this day and what is after it, and I seek refuge in You from the evil of this day and what is after it.",
        reference: "Sahih Muslim 2723",
        count: 1,
        virtue:
          "A comprehensive morning remembrance affirming Allah's sovereignty and seeking good and protection for the day.",
      },
      {
        id: "three-quls-morning",
        title: "The Three Surahs (Al-Ikhlas, Al-Falaq, An-Nas)",
        arabic:
          "قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration:
          "Recite Surah al-Ikhlas, Surah al-Falaq, and Surah an-Nas in full.",
        translation:
          "Recite Surah Al-Ikhlas (112), Surah Al-Falaq (113), and Surah An-Nas (114) — blowing into one's palms and wiping over the body.",
        reference: "Sahih al-Bukhari 5017, Sahih Muslim 2734",
        count: 3,
        virtue:
          "Whoever recites them three times in the morning and evening will be protected from everything sufficient for him.",
      },
    ],
  },
  {
    id: "after-prayer",
    name: "After Prayer",
    nameArabic: "أذكار بعد الصلاة",
    icon: "heart",
    duas: [
      {
        id: "astaghfirullah-after-prayer",
        title: "Seeking Forgiveness Three Times",
        arabic: "أَسْتَغْفِرُ اللَّهَ",
        transliteration: "Astaghfirullah.",
        translation: "I seek the forgiveness of Allah.",
        reference: "Sahih Muslim 591",
        count: 3,
        virtue:
          "Said immediately after every obligatory prayer's tasleem, opening the door to forgiveness.",
      },
      {
        id: "allahumma-anta-as-salam",
        title: "Allah is the Source of Peace",
        arabic:
          "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
        transliteration:
          "Allahumma anta as-Salam wa minka as-Salam, tabarakta ya Dhal-Jalali wal-Ikram.",
        translation:
          "O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of Majesty and Honor.",
        reference: "Sahih Muslim 591",
        count: 1,
        virtue:
          "The recommended supplication immediately following the prayer, glorifying Allah's attribute of peace.",
      },
      {
        id: "tasbih-after-prayer",
        title: "Glorification of Allah (Tasbih Fatimah)",
        arabic:
          "سُبْحَانَ اللَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ",
        transliteration:
          "SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x), then: La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir.",
        translation:
          "Glory be to Allah (33 times), All praise is for Allah (33 times), Allah is the Greatest (33 times). Then complete the hundred with: There is no deity except Allah alone, with no partner. His is the dominion and praise, and He is over all things competent.",
        reference: "Sahih Muslim 597",
        count: 100,
        virtue:
          "Whoever says this after every prayer will have all his sins forgiven even if they are like the foam of the sea.",
      },
      {
        id: "ayat-al-kursi-after-prayer",
        title: "Ayat al-Kursi (The Verse of the Throne)",
        arabic:
          "اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ... وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        transliteration:
          "Allahu la ilaha illa huwal-hayyul-qayyum... (Surah al-Baqarah: 255)",
        translation:
          "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence... (recite the full verse)",
        reference: "Sunan an-Nasa'i, authenticated by al-Albani",
        count: 1,
        virtue:
          "Whoever recites Ayat al-Kursi after every obligatory prayer will not be prevented from entering Paradise except by death.",
      },
    ],
  },
  {
    id: "sleep",
    name: "Sleep",
    nameArabic: "أذكار النوم",
    icon: "moon",
    duas: [
      {
        id: "bismika-amutu-ahya",
        title: "In Your Name I Die and Live",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya.",
        translation: "In Your name, O Allah, I die and I live.",
        reference: "Sahih al-Bukhari 6324",
        count: 1,
        virtue:
          "The Prophet (peace be upon him) would say this when he went to his bed at night.",
      },
      {
        id: "allahumma-aslamtu-nafsi",
        title: "Surrendering Oneself to Allah",
        arabic:
          "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لاَ مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",
        transliteration:
          "Allahumma aslamtu nafsi ilayk, wa fawwadtu amri ilayk, wa wajjahtu wajhi ilayk, wa alja'tu zahri ilayk, raghbatan wa rahbatan ilayk, la malja'a wa la manja minka illa ilayk, amantu bi-kitabikalladhi anzalt, wa bi-nabiyyikalladhi arsalt.",
        translation:
          "O Allah, I have surrendered myself to You, entrusted my affairs to You, turned my face to You, taken refuge in You out of fear and desire of You. There is no refuge or escape from You except to You. I have believed in Your Book that You revealed and in Your Prophet that You sent.",
        reference: "Sahih al-Bukhari 6313, Sahih Muslim 2710",
        count: 1,
        virtue:
          "Whoever says this and dies that night will die in a state of fitrah (natural faith).",
      },
      {
        id: "three-surahs-sleep",
        title: "Reciting the Three Surahs and Wiping Over the Body",
        arabic:
          "قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration:
          "Recite Surah al-Ikhlas, al-Falaq, and an-Nas, cupping the palms together, blowing into them, and wiping over the body three times.",
        translation:
          "Recite Surah Al-Ikhlas (112), Surah Al-Falaq (113), and Surah An-Nas (114), blow into your hands, and wipe over the entire body.",
        reference: "Sahih al-Bukhari 5017",
        count: 3,
        virtue:
          "The Prophet (peace be upon him) would do this every night, and nothing would harm him by Allah's permission.",
      },
      {
        id: "last-two-verses-baqarah",
        title: "Last Two Verses of Surah Al-Baqarah",
        arabic:
          "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ... فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        transliteration:
          "Amana ar-rasulu bima unzila ilayhi min rabbihi wal-mu'minun... (Surah al-Baqarah: 285-286)",
        translation:
          "The Messenger has believed in what was revealed to him from his Lord, and the believers have believed... (recite verses 285-286 of Surah Al-Baqarah)",
        reference: "Sahih al-Bukhari 5009",
        count: 1,
        virtue:
          "Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him.",
      },
    ],
  },
  {
    id: "eating",
    name: "Eating",
    nameArabic: "أذكار الطعام",
    icon: "utensils",
    duas: [
      {
        id: "bismillah-eating",
        title: "Before Eating",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah.",
        translation: "In the name of Allah.",
        reference: "Sunan Abi Dawud 3767, Jami at-Tirmidhi 1858",
        count: 1,
        virtue:
          "Saying Bismillah before eating keeps Shaytan away from sharing in the food.",
      },
      {
        id: "bismillahi-awwalahu-akhirahu",
        title: "If One Forgets to Say Bismillah",
        arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
        transliteration: "Bismillahi awwalahu wa akhirahu.",
        translation: "In the name of Allah at its beginning and at its end.",
        reference: "Sunan Abi Dawud 3767, Jami at-Tirmidhi 1858",
        count: 1,
        virtue:
          "If a person forgets to say Bismillah at the start, saying this during the meal restores the blessing.",
      },
      {
        id: "alhamdulillah-atamana",
        title: "After Eating",
        arabic:
          "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
        transliteration:
          "Alhamdulillahilladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.",
        translation:
          "Praise is to Allah Who has fed me this and provided it for me without any strength or power on my part.",
        reference: "Sunan Abi Dawud 4023, Jami at-Tirmidhi 3458",
        count: 1,
        virtue:
          "Past sins are forgiven for the one who says this after eating.",
      },
    ],
  },
  {
    id: "travel",
    name: "Travel",
    nameArabic: "أذكار السفر",
    icon: "plane",
    duas: [
      {
        id: "subhanalladhi-sakhkhara",
        title: "Dua at the Start of Travel",
        arabic:
          "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
        transliteration:
          "Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun. Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa, wa minal-'amali ma tarda. Allahumma hawwin 'alayna safarina hadha watwi 'anna bu'dah.",
        translation:
          "Glory to the One Who has subjected this to us, and we could never have accomplished it ourselves. And to our Lord we will surely return. O Allah, we ask You on this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and fold up its distance.",
        reference: "Sahih Muslim 1342",
        count: 1,
        virtue:
          "The Prophet's comprehensive travel supplication, said upon mounting one's ride.",
      },
      {
        id: "takbir-travel",
        title: "Takbir While Traveling",
        arabic:
          "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        transliteration:
          "Allahu Akbar, Allahu Akbar, Allahu Akbar. Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
        translation:
          "Allah is the Greatest (3 times). Glory to the One Who has subjected this to us, and we could never have accomplished it ourselves. And to our Lord we will surely return.",
        reference: "Sahih Muslim 1344",
        count: 1,
        virtue:
          "Said three times when ascending a rise or setting out; opening the journey with Allah's glorification.",
      },
      {
        id: "returning-travel",
        title: "Dua When Returning from Travel",
        arabic:
          "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
        transliteration:
          "Ayibuna ta'ibuna 'abiduna li-Rabbina hamidun.",
        translation:
          "Returning, repenting, worshipping, to our Lord praising.",
        reference: "Sahih al-Bukhari 1797, Sahih Muslim 1345",
        count: 1,
        virtue:
          "Said by the Prophet (peace be upon him) each time he returned from a journey, as he neared home.",
      },
    ],
  },
  {
    id: "protection",
    name: "Protection",
    nameArabic: "أذكار الحماية",
    icon: "shield",
    duas: [
      {
        id: "bismillahilladhi-la-yadurru",
        title: "Protection by the Name of Allah",
        arabic:
          "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration:
          "Bismillahilladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa huwa as-Sami'ul-'Alim.",
        translation:
          "In the name of Allah, with Whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
        reference: "Sunan Abi Dawud 5088, Jami at-Tirmidhi 3388",
        count: 3,
        virtue:
          "Whoever says this three times in the morning and evening will not be afflicted by any calamity.",
      },
      {
        id: "three-surahs-protection",
        title: "The Three Surahs for Comprehensive Protection",
        arabic:
          "قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        transliteration:
          "Recite Surah al-Ikhlas (112), al-Falaq (113), and an-Nas (114) three times each.",
        translation:
          "Recite Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas three times each in the morning and evening, and before sleep.",
        reference: "Sunan Abi Dawud 5082, Sahih al-Bukhari 5017",
        count: 3,
        virtue:
          "These three surahs are the Prophet's chosen refuge against evil eye, jealousy, and the whisperings of Shaytan.",
      },
      {
        id: "raditu-billahi-rabba",
        title: "Contentment with Allah",
        arabic:
          "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        transliteration:
          "Raditu billahi Rabba, wa bil-Islami dina, wa bi-Muhammadin sallallahu 'alayhi wa sallama Nabiyya.",
        translation:
          "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.",
        reference: "Sunan Abi Dawud 5072, Jami at-Tirmidhi 3389",
        count: 3,
        virtue:
          "Allah takes it upon Himself to please the one who says this three times in the morning and evening.",
      },
      {
        id: "allahumma-inni-aoodhu",
        title: "Seeking Refuge from Grief and Laziness",
        arabic:
          "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
        transliteration:
          "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
        translation:
          "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from miserliness and cowardice, from the burden of debt and the domination of men.",
        reference: "Sahih al-Bukhari 2891",
        count: 1,
        virtue:
          "A comprehensive prophetic dua seeking protection from the anxieties and trials that burden the believer.",
      },
    ],
  },
];

/**
 * Find a dua by its unique id across all categories.
 * Returns undefined if not found.
 */
export function getDuaById(id: string): Dua | undefined {
  for (const category of duaCategories) {
    const found = category.duas.find((d) => d.id === id);
    if (found) return found;
  }
  return undefined;
}

// Build a flat list of all duas across categories for daily rotation.
export function getAllDuas(): { dua: Dua; category: DuaCategory }[] {
  const all: { dua: Dua; category: DuaCategory }[] = [];
  for (const cat of duaCategories) {
    for (const d of cat.duas) {
      all.push({ dua: d, category: cat });
    }
  }
  return all;
}

// Returns a dua of the day based on the current date.
export function getDailyDua(): { dua: Dua; category: DuaCategory } {
  const all = getAllDuas();
  const day = new Date().getDate();
  return all[day % all.length];
}
