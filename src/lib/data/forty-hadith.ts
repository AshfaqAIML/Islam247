// The Forty Hadith of Imam An-Nawawi — a celebrated compilation of 42
// foundational hadiths covering the essentials of Islam.
// Source: public domain religious text (hadith collections).

export interface NawawiHadith {
  number: number;
  title: string;
  arabic: string;
  english: string;
  narrator: string;
  reference: string;
  grade: string;
}

export const fortyHadith: NawawiHadith[] = [
  {
    number: 1,
    title: "Intentions",
    arabic:
      "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    english:
      "Actions are but by intentions, and every man shall have only that which he intended. Thus he whose migration was for Allah and His Messenger, his migration was for Allah and His Messenger; and he whose migration was to achieve some worldly benefit or to take some woman in marriage, his migration was for that for which he migrated.",
    narrator: "Umar ibn al-Khattab (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #1, Sahih Muslim #1907",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 2,
    title: "Islam, Iman, and Ihsan",
    arabic:
      "الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    english:
      "Islam is to testify that there is no god but Allah and that Muhammad is the Messenger of Allah, to establish prayer, to give charity, to fast Ramadan, and to perform the pilgrimage to the House if you are able. Iman is to believe in Allah, His angels, His books, His messengers, the Last Day, and divine decree, both the good and the difficult. Ihsan is to worship Allah as though you see Him, and if you cannot see Him, then know that He sees you.",
    narrator: "Umar ibn al-Khattab (may Allah be pleased with him)",
    reference: "Sahih Muslim #8",
    grade: "Sahih",
  },
  {
    number: 3,
    title: "The Pillars of Islam",
    arabic:
      "بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
    english:
      "Islam is built upon five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing prayer, giving charity, pilgrimage to the House, and fasting Ramadan.",
    narrator: "Ibn Umar (may Allah be pleased with them)",
    reference: "Sahih al-Bukhari #8, Sahih Muslim #16",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 4,
    title: "The Stages of Creation",
    arabic:
      "إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا نُطْفَةً",
    english:
      "Each of you is gathered in the womb of his mother for forty days as a drop, then as a clot for a similar period, then as a morsel for a similar period, then the angel is sent to breathe the soul into him. He is commanded to write his provision, his lifespan, his deeds, and whether he will be wretched or blessed. By Allah, beside whom there is no god, one of you may do the deeds of the people of Paradise until there is no more than a cubit between him and it, then the decree overtakes him and he does the deeds of the people of Hell and enters it.",
    narrator: "Abdullah ibn Mas'ud (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #3208, Sahih Muslim #2643",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 5,
    title: "Rejecting Innovation",
    arabic: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ",
    english:
      "Whoever introduces into this affair of ours something that does not belong to it, it is rejected. And whoever does an action that is not in accordance with our affair, it is rejected.",
    narrator: "Aisha (may Allah be pleased with her)",
    reference: "Sahih al-Bukhari #2697, Sahih Muslim #1718",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 6,
    title: "The Clear and the Doubtful",
    arabic: "إِنَّ الْحَلاَلَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ",
    english:
      "The lawful is clear, and the unlawful is clear, and between them are matters that are doubtful, which many people do not know. Whoever guards against the doubtful has safeguarded his religion and honor, and whoever falls into the doubtful falls into the unlawful, like a shepherd who pastures around a sanctuary, soon to trespass therein.",
    narrator: "An-Numan ibn Bashir (may Allah be pleased with them)",
    reference: "Sahih al-Bukhari #52, Sahih Muslim #1599",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 7,
    title: "Religion is Sincerity",
    arabic: "الدِّينُ النَّصِيحَةُ",
    english:
      "Religion is sincerity. They asked: To whom, O Messenger of Allah? He said: To Allah, His Book, His Messenger, the leaders of the Muslims, and their common folk.",
    narrator: "Tamim ad-Dari (may Allah be pleased with him)",
    reference: "Sahih Muslim #55",
    grade: "Sahih",
  },
  {
    number: 8,
    title: "The Sanctity of a Muslim",
    arabic:
      "أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوا أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ",
    english:
      "I have been commanded to fight the people until they testify that there is no god but Allah and that Muhammad is the Messenger of Allah, establish prayer, and give charity. When they do so, their blood and wealth are protected from me except by right of Islam, and their reckoning is with Allah.",
    narrator: "Ibn Umar (may Allah be pleased with them)",
    reference: "Sahih al-Bukhari #25, Sahih Muslim #22",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 9,
    title: "Fulfilling Obligations",
    arabic: "أَدِّ مَا ائْتُمِنْتَ عَلَيْهِ",
    english:
      "Perform the obligations. The people asked: And what are they, O Messenger of Allah? He said: Fulfill what you have been entrusted with.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sunan at-Tirmidhi #1924",
    grade: "Hasan",
  },
  {
    number: 10,
    title: "Allah Accepts Only the Pure",
    arabic: "إِنَّ اللَّهَ طَيِّبٌ لاَ يَقْبَلُ إِلاَّ طَيِّبًا",
    english:
      "Allah is Good and accepts only what is good. And indeed Allah commanded the believers as He commanded the messengers: 'O you messengers, eat of the good things and do righteousness.' And He said: 'O you who believe, eat of the good things We have provided for you.' Then he mentioned a man on a long journey, disheveled and dusty, raising his hands to the sky: O Lord, O Lord — while his food is unlawful, his drink unlawful, his clothing unlawful, nourished with the unlawful — how can he be answered?",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih Muslim #1015",
    grade: "Sahih",
  },
  {
    number: 11,
    title: "Leave What Doubts You",
    arabic: "دَعْ مَا يَرِيبُكَ إِلَى مَا لاَ يَرِيبُكَ",
    english:
      "Leave that which makes you doubt for that which does not make you doubt. For indeed truth brings tranquility, and falsehood brings doubt.",
    narrator: "Al-Hasan ibn Ali (may Allah be pleased with them)",
    reference: "Sunan at-Tirmidhi #2518",
    grade: "Hasan Sahih",
  },
  {
    number: 12,
    title: "Avoiding the Unimportant",
    arabic: "مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ",
    english:
      "Part of the perfection of a person's Islam is his leaving alone what does not concern him.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sunan at-Tirmidhi #2317",
    grade: "Hasan",
  },
  {
    number: 13,
    title: "Loving Good for Others",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    english:
      "None of you truly believes until he loves for his brother what he loves for himself.",
    narrator: "Anas ibn Malik (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #13, Sahih Muslim #45",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 14,
    title: "The Sanctity of Blood",
    arabic: "لاَ يَحِلُّ دَمُ امْرِئٍ مُسْلِمٍ إِلاَّ بِإِحْدَى ثَلاثٍ",
    english:
      "It is not lawful to shed the blood of a Muslim who testifies that there is no god but Allah and that I am the Messenger of Allah, except in one of three cases: the married adulterer, a life for a life, and the one who abandons his religion and separates from the community.",
    narrator: "Ibn Mas'ud (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #6878, Sahih Muslim #1676",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 15,
    title: "Speaking Good or Silence",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    english:
      "Whoever believes in Allah and the Last Day, let him speak good or remain silent. And whoever believes in Allah and the Last Day, let him honor his neighbor. And whoever believes in Allah and the Last Day, let him honor his guest.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #6018, Sahih Muslim #47",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 16,
    title: "Do Not Become Angry",
    arabic: "لاَ تَغْضَبْ",
    english:
      "A man said to the Prophet ﷺ: Counsel me. He said: Do not become angry. The man repeated his request several times, and the Prophet ﷺ said each time: Do not become angry.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #6116",
    grade: "Sahih",
  },
  {
    number: 17,
    title: "Allah's Protection",
    arabic: "إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ",
    english:
      "Allah has prescribed excellence in all things. So if you kill, kill well; and if you slaughter, slaughter well. Let each of you sharpen his blade and spare his animal suffering.",
    narrator: "Abu Ya'la Shaddad ibn Aws (may Allah be pleased with him)",
    reference: "Sahih Muslim #1955",
    grade: "Sahih",
  },
  {
    number: 18,
    title: "Fear Allah Wherever You Are",
    arabic: "اتَّقِ اللَّهَ حَيْثُ مَا كُنْتَ",
    english:
      "Fear Allah wherever you are, and follow up an evil deed with a good one to wipe it out, and treat people with good character.",
    narrator: "Abu Dharr and Mu'adh ibn Jabal (may Allah be pleased with them)",
    reference: "Sunan at-Tirmidhi #1987",
    grade: "Hasan",
  },
  {
    number: 19,
    title: "Allah's Protection",
    arabic: "احْفَظِ اللَّهَ يَحْفَظْكَ",
    english:
      "Guard Allah's commands and He will guard you. Guard Allah's commands and you will find Him before you. And when you ask, ask of Allah. And when you seek help, seek help from Allah. Know that if the whole nation were to gather to benefit you, they could not benefit you except by what Allah has decreed for you, and if they were to gather to harm you, they could not harm you except by what Allah has decreed against you. The pens have been lifted and the pages have dried.",
    narrator: "Ibn Abbas (may Allah be pleased with them)",
    reference: "Sunan at-Tirmidhi #2516",
    grade: "Hasan Sahih",
  },
  {
    number: 20,
    title: "Modesty",
    arabic: "الْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
    english: "Modesty brings nothing except good.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #6117, Sahih Muslim #37",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 21,
    title: "Say I Believe and Then Be Steadfast",
    arabic: "قُلْ آمَنْتُ ثُمَّ اسْتَقِمْ",
    english: "Say: I believe in Allah, then be steadfast.",
    narrator: "Sufyan ibn Abdullah (may Allah be pleased with him)",
    reference: "Sahih Muslim #38",
    grade: "Sahih",
  },
  {
    number: 22,
    title: "The Straight Path",
    arabic: "الْمَسْلَكُ الْوَاحِدُ يُؤْدِي إِلَى الْجَنَّةِ",
    english:
      "I said: O Messenger of Allah, tell me something about Islam that I will not need to ask anyone after you. He said: Say: I believe in Allah, then be steadfast.",
    narrator: "Sufyan ibn Abdullah (may Allah be pleased with him)",
    reference: "Sahih Muslim #38",
    grade: "Sahih",
  },
  {
    number: 23,
    title: "Purification is Half of Faith",
    arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ",
    english:
      "Purification is half of faith. And al-hamdu lillah fills the scale. And SubhanAllah and al-hamdu lillah fill what is between the heavens and the earth. And prayer is a light, and charity is a proof, and patience is a light, and the Quran is a proof for you or against you.",
    narrator: "Abu Malik al-Ash'ari (may Allah be pleased with him)",
    reference: "Sahih Muslim #223",
    grade: "Sahih",
  },
  {
    number: 24,
    title: "Forbidding the Unlawful",
    arabic: "كُلُّ أُمَّتِي مُعَافًى إِلاَّ الْمُجَاهِرِينَ",
    english:
      "Every one of my nation will be forgiven except those who sin openly. Indeed, part of sinning openly is that a man does something at night, then wakes in the morning with Allah having concealed it, and he says: O so-and-so, I did such-and-such last night — while his Lord had concealed it for him, but he discloses what Allah had concealed.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #6069, Sahih Muslim #2990",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 25,
    title: "Charity in Everything",
    arabic: "كُلُّ سُلاَمَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ",
    english:
      "Every joint of a person's body must perform charity each day the sun rises: to judge justly between two people is a charity; to help a man with his mount, lifting him onto it or hoisting up his belongings onto it, is a charity; a good word is a charity; every step you take toward prayer is a charity; and removing a harmful object from the road is a charity.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #2989, Sahih Muslim #1009",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 26,
    title: "The Righteous Grant Safety",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    english:
      "A Muslim is the one from whose tongue and hand the Muslims are safe. And a believer is the one in whom people place their trust regarding their lives and wealth.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sunan an-Nasa'i, Jami at-Tirmidhi #2627",
    grade: "Hasan",
  },
  {
    number: 27,
    title: "Excellence and Kindness",
    arabic: "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلاً أَنْ يُتْقِنَهُ",
    english:
      "Allah loves that when one of you does a deed, he does it with excellence.",
    narrator: "Aisha (may Allah be pleased with her)",
    reference: "Bayhaqi, Shu'ab al-Iman",
    grade: "Sahih",
  },
  {
    number: 28,
    title: "Holding to the Sunnah",
    arabic: "تَرَكْتُ فِيكُمْ أَمْرَيْنِ لَنْ تَضِلُّوا مَا تَمَسَّكْتُمْ بِهِمَا",
    english:
      "I have left you with two things; you will never go astray as long as you hold fast to them: the Book of Allah and the Sunnah of His Prophet.",
    narrator: "Ibn Abbas (may Allah be pleased with them)",
    reference: "Muwatta Imam Malik",
    grade: "Hasan",
  },
  {
    number: 29,
    title: "The Path to Paradise",
    arabic: "حُجِبَ عَنِ النَّارِ مَنْ أَدْرَكَ الصُّبْحَ",
    english:
      "Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.",
    narrator: "Abu Musa (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #574, Sahih Muslim #635",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 30,
    title: "The Boundaries of Allah",
    arabic: "إِنَّ اللَّهَ حَدَّ حُدُودًا فَلاَ تُعْتَدُوهَا",
    english:
      "Verily Allah, the Exalted, has defined obligations, so do not neglect them. And He has set limits, so do not transgress them. And He has prohibited things, so do not violate them. And He has remained silent about things out of mercy for you, not forgetfulness, so do not seek them out.",
    narrator: "Ibn Abbas (may Allah be pleased with them)",
    reference: "Sunan ad-Daraqutni",
    grade: "Hasan",
  },
  {
    number: 31,
    title: "True Asceticism",
    arabic: "ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ",
    english:
      "Be abstemious regarding the world and Allah will love you. And be abstemious regarding what people possess and people will love you.",
    narrator: "Sahl ibn Sa'd (may Allah be pleased with him)",
    reference: "Sunan Ibn Majah #4102",
    grade: "Hasan",
  },
  {
    number: 32,
    title: "No Harm and No Reciprocating Harm",
    arabic: "لاَ ضَرَرَ وَلاَ ضِرَارَ",
    english: "There should be neither harming nor reciprocating harm.",
    narrator: "Ibn Abbas and Abu Sa'id al-Khudri (may Allah be pleased with them)",
    reference: "Sunan Ibn Majah #2341",
    grade: "Hasan",
  },
  {
    number: 33,
    title: "The Burden of Proof",
    arabic: "الْبَيِّنَةُ عَلَى الْمُدَّعِي",
    english: "The burden of proof is upon the claimant, and the oath is upon the one who denies.",
    narrator: "Ibn Abbas (may Allah be pleased with them)",
    reference: "Sunan al-Bayhaqi",
    grade: "Sahih",
  },
  {
    number: 34,
    title: "Changing Evil",
    arabic: "مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ",
    english:
      "Whoever among you sees an evil, let him change it with his hand. If he cannot, then with his tongue. If he cannot, then with his heart — and that is the weakest of faith.",
    narrator: "Abu Sa'id al-Khudri (may Allah be pleased with him)",
    reference: "Sahih Muslim #49",
    grade: "Sahih",
  },
  {
    number: 35,
    title: "Brotherhood",
    arabic: "لاَ تَحَاسَدُوا وَلاَ تَنَاجَشُوا",
    english:
      "Do not envy one another, do not inflate prices for one another, do not hate one another, do not turn away from one another, and do not undercut one another. But be, O servants of Allah, brothers.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih Muslim #2564",
    grade: "Sahih",
  },
  {
    number: 36,
    title: "The Believer's Salvation",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا",
    english:
      "Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih Muslim #2699",
    grade: "Sahih",
  },
  {
    number: 37,
    title: "Seeking Permission",
    arabic: "لاَ يُؤْذَنُ لأَحَدٍ أَنْ يَدْخُلَ بَيْتَ غَيْرِهِ إِلاَّ بِإِذْنِهِ",
    english:
      "Permission is to be sought before entering, especially before bedrooms, so that one does not see what is not lawful to see.",
    narrator: "Sahl ibn Sa'd (may Allah be pleased with him)",
    reference: "Sunan al-Bayhaqi",
    grade: "Sahih",
  },
  {
    number: 38,
    title: "The Beloved to Allah",
    arabic: "إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ",
    english:
      "A strong believer is better and more beloved to Allah than a weak believer, though in both is good. Pursue what benefits you, and seek help from Allah, and do not lose heart. If a calamity befalls you, do not say: If only I had done such-and-such — rather say: This is the decree of Allah, and He does what He wills. For indeed 'if' opens the door to Satan's work.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih Muslim #2664",
    grade: "Sahih",
  },
  {
    number: 39,
    title: "Allah's Mercy",
    arabic: "إِنَّ اللَّهَ تَعَالَى خَلَقَ الرَّحْمَةَ يَوْمَ خَلَقَهَا جَمَعَهَا مِائَةَ رَحْمَةٍ",
    english:
      "Allah created mercy in one hundred parts. He kept ninety-nine with Himself and sent down one part to the earth. By it, all creation shows mercy to one another — even a beast raises its hoof from its young lest it harm it.",
    narrator: "Abu Hurayrah (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #6000, Sahih Muslim #2752",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 40,
    title: "Be in This World as a Stranger",
    arabic: "كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ",
    english:
      "Be in this world as though you are a stranger or a traveler passing through.",
    narrator: "Ibn Umar (may Allah be pleased with them)",
    reference: "Sahih al-Bukhari #6416",
    grade: "Sahih",
  },
  {
    number: 41,
    title: "Following the Way of the Prophet",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى أَكُونَ أَحَبَّ إِلَيْهِ مِنْ وَالِدِهِ وَوَلَدِهِ وَالنَّاسِ أَجْمَعِينَ",
    english:
      "None of you truly believes until I am more beloved to him than his father, his children, and all of mankind.",
    narrator: "Anas (may Allah be pleased with him)",
    reference: "Sahih al-Bukhari #15, Sahih Muslim #44",
    grade: "Sahih (Agreed Upon)",
  },
  {
    number: 42,
    title: "The Vastness of Allah's Mercy",
    arabic: "رَحِمَ اللَّهُ رَجُلاً سَمْحًا إِذَا بَاعَ وَإِذَا اشْتَرَى وَإِذَا اقْتَضَى",
    english:
      "May Allah have mercy on a man who is generous when he sells, when he buys, and when he makes a claim.",
    narrator: "Jabir ibn Abdullah (may Allah be pleased with them)",
    reference: "Sahih al-Bukhari #2076",
    grade: "Sahih",
  },
];
