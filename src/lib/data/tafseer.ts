// Tafseer (Quranic exegesis) — source-attributed, demo content.
// Each tafseer passage is tied to a specific surah + ayah and carries its source.
// Content is based on classical tafseer (primarily Tafsir Ibn Kathir style)
// adapted for educational purposes. For deep study, consult the original works.

export interface TafseerPassage {
  surahId: number;
  ayahNumber: number;
  tafseer: string;
  source: string;
  sourceArabic?: string;
}

// Keyed by `${surahId}:${ayahNumber}` for quick lookup.
export const tafseerData: Record<string, TafseerPassage> = {
  "1:1": {
    surahId: 1,
    ayahNumber: 1,
    tafseer:
      "The Basmala — 'In the name of Allah, the Most Gracious, the Most Merciful' — is the opening of every surah except At-Tawbah (Surah 9). The scholars differed on whether it is an ayah of Al-Fatihah; the majority hold that it is the first ayah of the surah. 'Allah' is the proper name of the Creator, derived from al-ilah (the one worshipped). 'Ar-Rahman' describes His vast, universal mercy for all creation; 'Ar-Raheem' describes His specific, ongoing mercy toward the believers. Reciting the Basmala consecrates the action that follows — here, the recitation of the Quran — and reminds the believer that every good deed begins with invoking the name of Allah.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "1:5": {
    surahId: 1,
    ayahNumber: 5,
    tafseer:
      "'It is You we worship, and You we ask for help.' This ayah is the pivot of Surah Al-Fatihah — after praising Allah in the first four ayahs, the worshipper now turns to direct address. 'Worship' (na'budu) encompasses all forms of devotion: prayer, supplication, reliance, love, fear, and hope — all directed to Allah alone. 'Ask for help' (nasta'in) means seeking Allah's assistance in all affairs, both religious and worldly, recognizing that no success comes except by His aid. The order is significant: worship is mentioned before seeking help, because the purpose of creation is worship, and help is the means to sustain it. This ayah establishes the principle of Tawhid al-Uluhiyyah — that worship belongs to Allah alone.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "1:6": {
    surahId: 1,
    ayahNumber: 6,
    tafseer:
      "'Guide us to the straight path.' This is the most essential supplication a Muslim can make, recited in every unit of prayer. 'Guide us' (ihdina) encompasses two types of guidance: (1) the guidance of direction and knowledge — showing the path of Islam and its teachings; and (2) the guidance of success and firmness — granting the heart the resolve and ability to remain steadfast on that path. The 'straight path' (as-sirat al-mustaqim) is the path of Islam, the Sunnah, and the way of the Prophet ﷺ and his companions. Ibn Abbas explained it as 'the religion of Allah, which is Islam, and there is no path clearer than this.' The believer asks for this guidance constantly because the need for it never ceases.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "112:1": {
    surahId: 112,
    ayahNumber: 1,
    tafseer:
      "'Say: He is Allah, [who is] One.' This surah is named Al-Ikhlas (Sincerity) because it is entirely devoted to declaring the oneness and perfection of Allah. The command 'Say' (qul) indicates that the Prophet ﷺ is to proclaim this declaration publicly. 'Allah' is His proper name. 'Ahad' (One) is stronger than 'wahid' — it denotes absolute oneness, negating any partner, rival, division, or equal in His essence, attributes, and actions. This single ayah refutes all forms of polytheism. The surah is equivalent to one-third of the Quran, as reported in authentic hadith, because it crystallizes the doctrine of Tawhid which is the central message of the Quran.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "112:2": {
    surahId: 112,
    ayahNumber: 2,
    tafseer:
      "'Allah, the Eternal Refuge (as-Samad).' The word 'as-Samad' has multiple interrelated meanings, all affirmed by the scholars: (1) The One who is sought and turned to in every need — the master whose sovereignty is perfect; (2) The One who is complete and self-sufficient, free of any need, while all creation is in need of Him; (3) The One whose dominion is supreme, above whom there is none. Ibn Abbas said: 'He is the Master whose mastery is perfect, the Great whose greatness is perfect, the Forbearing whose forbearance is perfect.' This ayah negates any deficiency or dependency in Allah, establishing His absolute perfection and self-sufficiency.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "255:255": {
    surahId: 255,
    ayahNumber: 255,
    tafseer:
      "Ayat al-Kursi (the Verse of the Throne) is the greatest ayah in the Quran, as reported by the Prophet ﷺ. It opens by affirming Tawhid — 'Allah — there is no deity except Him' — establishing both His oneness of worship and His sole worthiness of worship. 'Al-Hayy' (the Ever-Living) means His life is perfect, eternal, and the source of all life; 'Al-Qayyum' (the Sustainer of all) means He maintains and sustains all of existence — every atom, every creature, depends on Him while He depends on none. 'Neither drowsiness overtakes Him nor sleep' affirms His perfection and freedom from all human weakness. The 'Kursi' (throne/footstool) encompasses the heavens and the earth, demonstrating the vastness of Allah's dominion. The ayah closes with His absolute knowledge and supreme authority — 'And He is the Most High, the Most Great.'",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "113:1": {
    surahId: 113,
    ayahNumber: 1,
    tafseer:
      "'Say: I seek refuge in the Lord of the daybreak.' This surah and the next (An-Nas) are called 'al-Mu'awwidhatayn' (the two seeking-refuge surahs). The Prophet ﷺ used to seek refuge with them. 'Al-Falaq' means the daybreak or dawn — the breaking of morning light from darkness. Seeking refuge in 'the Lord of the dawn' signifies that Allah alone is the One who splits the darkness with light, both physically (the dawn) and spiritually (guidance from misguidance). By beginning with this attribute, the believer acknowledges that the same Allah who can bring light from the deepest night can protect from every evil that lurks in darkness.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "114:1": {
    surahId: 114,
    ayahNumber: 1,
    tafseer:
      "'Say: I seek refuge in the Lord of mankind.' This surah completes the seeking of refuge begun in Al-Falaq. While Al-Falaq sought refuge from external evils (the night, sorcery, the envier), An-Nas seeks refuge from the internal, whispering evil — the devils among jinn and mankind. 'Lord of mankind' (Rabb an-nas) — Allah is the Lord, Creator, Sustainer, and Owner of all people. By attributing lordship specifically to mankind here, the surah emphasizes the direct relationship between the believer and their Lord against the whisperings that target the human heart.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "103:1": {
    surahId: 103,
    ayahNumber: 1,
    tafseer:
      "'By the time (al-'Asr).' Allah takes an oath by time — a profound reminder that every moment is a trust. The scholars interpreted 'al-'Asr' as: (1) time itself, the passage of which consumes all; (2) the late afternoon prayer (Asr); (3) the era of the Prophet ﷺ. The primary meaning is time, for time is the most precious commodity — every human exists within it, and it is irretrievable. Imam al-Shafi'i said: 'If people pondered over this surah alone, it would suffice them.' The oath by time sets up the urgency: humans are at loss unless they fulfill four conditions stated in the following ayahs.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "103:2": {
    surahId: 103,
    ayahNumber: 2,
    tafseer:
      "'Indeed, mankind is in loss.' After swearing by time, Allah declares the universal human condition: loss (khusr). This is not partial loss but absolute — 'in loss' (la-fi khusrin) with the lam of emphasis and the definite article. Every human is in loss because every moment passes, and if not invested in faith and righteous deeds, it is wasted. This ayah levels the field — the wealthy and the poor, the powerful and the weak — all are equal before the reality of loss. The exception is given in the next ayah, making the surah a complete call to salvation.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
  "108:1": {
    surahId: 108,
    ayahNumber: 1,
    tafseer:
      "'Indeed, We have granted you, [O Muhammad], al-Kawthar.' This surah was revealed to console the Prophet ﷺ after his enemy Al-As ibn Wa'il mocked him for being 'abtar' (cut off, having no male heir). Allah responded with the gift of 'al-Kawthar' — abundant good. 'Al-Kawthar' primarily refers to a river in Paradise, described in hadith as whiter than milk, sweeter than honey, with vessels like the stars. More broadly, it encompasses all the abundant good Allah granted the Prophet ﷺ: the Quran, the prophethood, the millions of followers, the intercession. The irony of the surah: the one mocked as 'cut off' was given abundance beyond measure, while the mocker was truly cut off — forgotten by history.",
    source: "Tafsir Ibn Kathir (abridged)",
    sourceArabic: "تفسير ابن كثير",
  },
};

export function getTafseer(surahId: number, ayahNumber: number): TafseerPassage | undefined {
  return tafseerData[`${surahId}:${ayahNumber}`];
}

export function hasTafseer(surahId: number, ayahNumber: number): boolean {
  return `${surahId}:${ayahNumber}` in tafseerData;
}
