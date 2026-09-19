import type { Book } from "../types";

// Structured Islamic library — flagged as demo content where applicable.
export const libraryBooks: Book[] = [
  {
    id: "fiqh-1",
    title: "Foundations of Islamic Jurisprudence",
    author: "Imam al-Shafi'i",
    category: "Fiqh",
    description:
      "A foundational treatise on the principles of Islamic jurisprudence (Usul al-Fiqh), covering the sources of law, legal reasoning, and the methodology of deriving rulings from the Quran and Sunnah.",
    coverColor: "from-emerald-600 to-emerald-800",
    totalPages: 320,
    isDemo: true,
    chapters: [
      {
        id: "fiqh-1-c1",
        title: "The Sources of Islamic Law",
        pages: 45,
        content:
          "The science of Usul al-Fiqh is the study of the fundamental principles from which Islamic jurisprudence is derived. The primary sources of Islamic law are four: the Quran, the Sunnah, scholarly consensus (Ijma'), and analogical reasoning (Qiyas).\n\nThe Quran stands as the supreme source, being the literal word of Allah revealed to Prophet Muhammad ﷺ over a period of twenty-three years. It contains legal rulings (ayat al-ahkam) that form the basis of legislation, alongside moral guidance, theological principles, and narratives of past nations.\n\nThe Sunnah encompasses the sayings, actions, and tacit approvals of the Prophet ﷺ. It serves to explain, clarify, and elaborate upon the Quran. The scholars developed rigorous methodologies to authenticate the Sunnah, examining the chains of narration (isnad) and the text (matn) with unparalleled precision.\n\nScholarly consensus (Ijma') refers to the agreement of the qualified scholars of the Muslim community on a legal ruling. Once established, it constitutes a binding source of law. Analogical reasoning (Qiyas) allows scholars to extend rulings from existing cases to new situations that share the same effective cause ('illah).",
      },
      {
        id: "fiqh-1-c2",
        title: "The Role of Independent Reasoning",
        pages: 38,
        content:
          "Ijtihad, or independent legal reasoning, is the exertion of maximum effort by a qualified scholar to derive rulings from the sources. The conditions for Ijtihad are stringent: deep knowledge of the Arabic language, mastery of the Quran and Sunnah, familiarity with the established rulings of the schools, and understanding of the principles of jurisprudence.\n\nThe mujtahid must possess both the theoretical knowledge and the moral integrity to engage in this sacred task. Throughout Islamic history, scholars have approached Ijtihad with profound humility, recognizing that their conclusions, however well-reasoned, remain human interpretations subject to correction.\n\nThe gates of Ijtihad were never truly closed, as some have claimed. Rather, the institutionalization of the schools of law (madhahib) provided a framework within which both adherents and independent scholars could operate. The dynamic nature of Islamic law is evident in its capacity to address new circumstances while remaining anchored to its divine sources.",
      },
      {
        id: "fiqh-1-c3",
        title: "Categorization of Actions",
        pages: 30,
        content:
          "Islamic jurisprudence classifies all human actions into five categories: obligatory (fard), recommended (mustahab), permissible (mubah), disliked (makruh), and prohibited (haram).\n\nObligatory actions are those whose performance is rewarded and whose neglect is punishable, such as the five daily prayers and the giving of zakat. Recommended actions carry reward for performance but no punishment for neglect, such as voluntary prayers and charity beyond the obligatory minimum.\n\nPermissible actions are those on which the law is silent; they carry neither reward nor punishment. Disliked actions are those whose avoidance is preferred but not required. Prohibited actions are those whose commission is punishable and whose avoidance is rewarded, such as consumption of intoxicants and unjust taking of life.\n\nThis nuanced framework allows the believer to approach every aspect of life with consciousness of the divine, transforming mundane activities into acts of worship when performed with the right intention.",
      },
    ],
  },
  {
    id: "tafsir-1",
    title: "The Magnificent Exegesis",
    author: "Ibn Kathir",
    category: "Tafsir",
    description:
      "A renowned classical commentary on the Quran that interprets verses through the Quran itself, the Sunnah, the statements of the Companions, and the Arabic language.",
    coverColor: "from-amber-600 to-amber-800",
    totalPages: 480,
    isDemo: true,
    chapters: [
      {
        id: "tafsir-1-c1",
        title: "Principles of Quranic Exegesis",
        pages: 42,
        content:
          "The science of Tafsir is among the most noble of the Islamic sciences, for it concerns itself with the words of the Creator. The authentic exegete approaches the Quran with reverence, humility, and a deep awareness of the gravity of attributing meanings to the speech of Allah.\n\nThe best method of Tafsir is to interpret the Quran by the Quran itself, for what is mentioned briefly in one place is often elaborated elsewhere. The second method is to interpret the Quran by the Sunnah, for the Prophet ﷺ was sent to explain and clarify the divine revelation.\n\nAfter these, the statements of the Companions hold great weight, for they witnessed the revelation and learned its meanings directly from the Prophet ﷺ. Their understanding, particularly that of the four caliphs and Ibn Abbas, is a treasure for later generations.\n\nFinally, the Arabic language — its grammar, rhetoric, and poetry — is essential for understanding the linguistic marvel of the Quran. The classical exegetes were masters of Arabic, and their works preserve the living meaning of the revelation across centuries.",
      },
      {
        id: "tafsir-1-c2",
        title: "Meccan and Medinan Revelations",
        pages: 36,
        content:
          "The distinction between Meccan and Medinan revelations is of great importance in Tafsir. The Meccan surahs, revealed during the thirteen years the Prophet ﷺ spent in Mecca, primarily address the foundations of faith: the oneness of Allah, the prophethood, the reality of the afterlife, and moral character.\n\nThe Medinan surahs, revealed after the migration, address the establishment of the Islamic community: laws of worship, social relations, warfare, governance, and family. Understanding the context of revelation (asbab al-nuzul) illuminates the meaning and application of the verses.\n\nThe gradual revelation of the Quran over twenty-three years allowed for the progressive education of the early Muslim community. Verses that established the prohibition of intoxicants, for instance, came in stages, first acknowledging the harms, then discouraging prayer under their influence, and finally prohibiting them outright — reflecting divine wisdom in building a society.",
      },
      {
        id: "tafsir-1-c3",
        title: "The Clear and the Allegorical",
        pages: 28,
        content:
          "Allah describes the Quran as containing both clear verses (muhkam) and allegorical verses (mutashabih). The clear verses are the foundation of the book — their meanings are unambiguous and form the basis of belief and practice. The allegorical verses may admit multiple interpretations and require careful study.\n\nThe early scholars exercised great caution with the allegorical verses, particularly those describing divine attributes. They affirmed what Allah affirmed for Himself without likening Him to creation, without distortion, and without excessive questioning. Their approach preserved both the transcendence of Allah and the integrity of the revealed text.\n\nThis balanced methodology stands in contrast to both the extreme of anthropomorphism and the extreme of complete denial. The believer affirms the meaning while entrusting the reality to Allah, following the path of the early generations (al-salaf al-salih).",
      },
    ],
  },
  {
    id: "aqeedah-1",
    title: "The Creed of the Pious Predecessors",
    author: "Imam al-Tahawi",
    category: "Aqeedah",
    description:
      "A concise and authoritative statement of Sunni Islamic theology, articulating the beliefs of Ahl al-Sunnah wal-Jama'ah on the nature of Allah, faith, prophethood, and the unseen.",
    coverColor: "from-teal-600 to-teal-800",
    totalPages: 260,
    isDemo: true,
    chapters: [
      {
        id: "aqeedah-1-c1",
        title: "The Oneness of Allah",
        pages: 40,
        content:
          "The foundation of Islamic creed is the absolute oneness of Allah (Tawhid). This is not merely the affirmation that there is one God, but a comprehensive understanding of Allah's uniqueness in His lordship, His worship, and His names and attributes.\n\nTawhid al-Rububiyyah affirms that Allah alone is the Creator, Sustainer, and Sovereign of all existence. Everything that occurs, occurs by His will and decree. He alone gives life and death, provides and withholds, and to Him belongs the dominion of the heavens and the earth.\n\nTawhid al-Uluhiyyah, also called Tawhid al-Ibadah, affirms that Allah alone deserves worship. All acts of worship — prayer, supplication, sacrifice, vow, hope, fear, love, and reliance — must be directed to Allah alone. This is the call of every prophet: worship Allah, and avoid the worship of false deities.\n\nTawhid al-Asma wa al-Sifat affirms the names and attributes that Allah and His Messenger have established, without distortion, denial, likening to creation, or excessive questioning. Allah is described with the attributes of perfection, above any deficiency or likeness to the creation.",
      },
      {
        id: "aqeedah-1-c2",
        title: "Faith and Its Components",
        pages: 35,
        content:
          "Faith (Iman) is belief in the heart, declaration by the tongue, and action by the limbs. It increases with obedience and decreases with disobedience. The components of faith are six: belief in Allah, His angels, His books, His messengers, the Last Day, and the divine decree — both the good and the difficult.\n\nBelief in Allah encompasses the three categories of Tawhid. Belief in the angels affirms the existence of noble beings created from light who worship Allah and carry out His commands without deviation.\n\nBelief in the books affirms that Allah revealed scriptures to His prophets — the Torah to Moses, the Gospel to Jesus, the Psalms to David, and the Quran to Muhammad ﷺ, which abrogates and supersedes all previous revelations.\n\nBelief in the messengers affirms that Allah sent prophets to every nation, calling to the worship of Allah alone. Muhammad ﷺ is the seal of the prophets, and his message is universal and final.\n\nBelief in the Last Day affirms the reality of resurrection, judgment, paradise, and hellfire. Belief in divine decree affirms that Allah's knowledge encompasses all things, and that everything occurs by His will, while affirming human free will and responsibility.",
      },
      {
        id: "aqeedah-1-c3",
        title: "The Unseen and the Hereafter",
        pages: 32,
        content:
          "Belief in the unseen (al-ghayb) is a defining characteristic of the believer. The unseen includes Allah Himself, the angels, the jinn, the soul, the grave, and the events of the Hereafter. We affirm what the authentic texts have established without demanding empirical proof for that which is beyond the senses.\n\nThe grave is the first stage of the Hereafter. The deceased is questioned by two angels about their Lord, their religion, and their prophet, and the soul experiences either a portion of paradise or a portion of hellfire until the Day of Resurrection.\n\nThe Day of Judgment is a reality of unparalleled magnitude. The trumpet will sound, the earth and mountains will be upheaved, the dead will be raised, and all creation will be gathered before Allah for judgment. The books of deeds will be opened, the scales will be set, and each person will be held accountable for their beliefs, words, and actions.\n\nParadise is the abode of eternal bliss, prepared for the believers, containing what no eye has seen, no ear has heard, and no human heart has imagined. Hellfire is the abode of punishment, prepared for the disbelievers and the unjust, from which the believers who committed major sins will eventually be taken by Allah's mercy.",
      },
    ],
  },
  {
    id: "seerah-1",
    title: "The Life of the Prophet ﷺ",
    author: "Ibn Hisham",
    category: "Seerah",
    description:
      "The earliest and most celebrated biography of Prophet Muhammad ﷺ, chronicling his birth, prophethood, struggles, victories, and legacy with meticulous detail.",
    coverColor: "from-green-700 to-emerald-900",
    totalPages: 410,
    isDemo: true,
    chapters: [
      {
        id: "seerah-1-c1",
        title: "The Birth and Early Life",
        pages: 48,
        content:
          "Muhammad ibn Abdullah ﷺ was born in the Year of the Elephant, in the city of Mecca, into the noble tribe of Quraysh. His father Abdullah had died before his birth, and his mother Aminah passed away when he was but six years old, leaving him in the care of his grandfather Abdul Muttalib and later his uncle Abu Talib.\n\nFrom his earliest years, the Prophet ﷺ was distinguished among his people by his honesty, trustworthiness, and noble character. He was known as al-Sadiq al-Amin — the truthful, the trustworthy. He tended sheep in his youth, as did all the prophets, learning patience and responsibility in the solitude of the mountains surrounding Mecca.\n\nAt the age of twenty-five, he entered the service of Khadijah bint Khuwaylid, a noble and wealthy merchant widow. Impressed by his integrity and ability, she proposed marriage, and their union was one of profound love, loyalty, and partnership that lasted twenty-five years until her death.\n\nThe people of Mecca, despite their polytheism and moral corruption, held the young Muhammad ﷺ in the highest esteem. They brought their disputes to him for arbitration and entrusted him with their most valuable possessions. His reputation for justice and wisdom was established long before the call to prophethood.",
      },
      {
        id: "seerah-1-c2",
        title: "The Revelation",
        pages: 52,
        content:
          "At the age of forty, Muhammad ﷺ retired to the Cave of Hira on the Mountain of Light, seeking contemplation away from the corruptions of his society. It was there, during the month of Ramadan, that the angel Jibril (Gabriel) appeared to him and commanded him to read.\n\n'I cannot read,' replied the Prophet ﷺ, for he was unlettered. The angel embraced him tightly three times, each time commanding him to read, until the first verses of Surah al-Alaq were revealed: 'Read in the name of your Lord who created — created man from a clinging clot. Read, and your Lord is the most Generous — who taught by the pen — taught man that which he knew not.'\n\nTrembling, the Prophet ﷺ returned to Khadijah, who comforted him and took him to her cousin Waraqa ibn Nawfal, a learned Christian scholar who confirmed that the visitor was the same angel who had visited Moses, and that Muhammad ﷺ was the prophet of his nation.\n\nThe revelation continued over twenty-three years — thirteen in Mecca and ten in Medina — gradually establishing the faith, reforming the society, and guiding humanity to the worship of Allah alone. The Prophet ﷺ received the revelation with the utmost care, memorizing it, teaching it to his companions, and ensuring its preservation through both oral and written transmission.",
      },
      {
        id: "seerah-1-c3",
        title: "The Migration and the Foundation of Medina",
        pages: 56,
        content:
          "After thirteen years of patient endurance of persecution in Mecca, during which the early Muslims faced torture, boycott, and social ostracism, the Prophet ﷺ was granted permission to migrate to the city of Yathrib, which would become known as Madinat al-Nabi — the City of the Prophet.\n\nThe migration (Hijrah) in 622 CE marks the beginning of the Islamic calendar and the establishment of the first Islamic community. Upon arrival, the Prophet ﷺ immediately set about building a society based on the principles of faith, brotherhood, and justice.\n\nHe established the mosque as the center of community life — a place of worship, education, consultation, and social gathering. He forged bonds of brotherhood between the migrants (Muhajirun) and the helpers (Ansar), uniting people of different tribes and origins in a community bound by faith rather than blood.\n\nThe Constitution of Medina, drafted under the Prophet's ﷺ guidance, established the rights and responsibilities of all the city's inhabitants, including the Jewish tribes, creating a pluralistic society governed by divine principles. This remarkable document represents one of history's earliest examples of a written constitution guaranteeing religious freedom and collective defense.",
      },
    ],
  },
  {
    id: "history-1",
    title: "The Golden Age of Islamic Civilization",
    author: "Various Scholars",
    category: "History",
    description:
      "An exploration of the remarkable achievements of Islamic civilization from the 8th to the 15th centuries — in science, medicine, philosophy, architecture, and the arts.",
    coverColor: "from-amber-700 to-orange-800",
    totalPages: 380,
    isDemo: true,
    chapters: [
      {
        id: "history-1-c1",
        title: "The House of Wisdom",
        pages: 44,
        content:
          "The House of Wisdom (Bayt al-Hikmah), established in Baghdad during the Abbasid caliphate, became one of the greatest centers of learning in human history. Under the patronage of Caliph Harun al-Rashid and his son al-Mamun, scholars of diverse backgrounds — Muslim, Christian, Jewish, and others — gathered to translate, study, and advance the knowledge of the ancient world.\n\nThe translation movement, which began in earnest in the late 8th century, sought to render the scientific and philosophical works of Greece, Persia, India, and other civilizations into Arabic. This monumental effort preserved countless works that would otherwise have been lost and created a shared language of scholarship across the Islamic world.\n\nThe House of Wisdom was more than a translation center. It was a research institution where original discoveries were made in mathematics, astronomy, medicine, optics, and chemistry. Scholars like al-Khwarizmi developed algebra; al-Razi advanced medicine; Ibn al-Haytham revolutionized optics; and al-Kindi explored philosophy.\n\nThe spirit of inquiry that animated these scholars was rooted in the Islamic worldview itself. The Quran repeatedly encourages the contemplation of creation as a means of knowing the Creator. The Prophet ﷺ had said that the seeking of knowledge is obligatory upon every Muslim, and that one should seek knowledge even as far as China. These teachings created a culture in which learning was revered as an act of worship.",
      },
      {
        id: "history-1-c2",
        title: "Advances in Science and Medicine",
        pages: 50,
        content:
          "Islamic civilization produced extraordinary advances in the sciences that laid the groundwork for the later European Renaissance. In mathematics, al-Khwarizmi's work on algebra gave the field its name (from al-jabr) and introduced the systematic solution of equations. The adoption and transmission of Indian numerals, including the concept of zero, transformed mathematics and eventually reached Europe as 'Arabic numerals.'\n\nIn astronomy, Muslim scholars built observatories across the Islamic world, refined the instruments of observation, and produced astronomical tables of remarkable accuracy. They corrected and expanded upon Ptolemaic models and developed the theoretical foundations that would later inform Copernicus.\n\nMedicine flourished under figures like al-Razi (Rhazes), who distinguished between smallpox and measles, and Ibn Sina (Avicenna), whose Canon of Medicine remained the standard medical textbook in European universities for over five hundred years. These scholars emphasized clinical observation, the testing of treatments, and the importance of public health.\n\nThe hospital (bimaristan) was an Islamic institution that spread across the world. Hospitals in Baghdad, Damascus, Cairo, and Cordoba provided free care to all, regardless of faith or social standing, and included specialized wards, pharmacies, and training facilities for physicians. This commitment to healing as a sacred duty transformed the practice of medicine.",
      },
      {
        id: "history-1-c3",
        title: "Architecture and the Arts",
        pages: 46,
        content:
          "Islamic architecture represents one of the most distinctive and beautiful artistic traditions in human history. From the soaring domes of the Dome of the Rock in Jerusalem to the intricate arches of the Great Mosque of Cordoba, Islamic architecture combined geometric precision, calligraphic beauty, and structural innovation to create spaces that elevate the spirit.\n\nThe mosque, as the central institution of Muslim communal life, evolved distinctive forms across the vast Islamic world. The hypostyle hall of the Prophet's Mosque in Medina, the four-iwan plan of Persian mosques, the central-dome design of Ottoman architecture, and the courtyard-centered design of North African mosques all express regional variations on a shared underlying vision.\n\nCalligraphy, the most revered of Islamic arts, transformed the written word into visual beauty. The Quran itself, as the literal word of Allah, inspired the development of scripts of extraordinary elegance — from the angular Kufic to the flowing Naskh and the intricate Diwani. The calligrapher was held in the highest esteem, for through the pen, the divine message was preserved and beautified.\n\nGeometric patterns and arabesque designs, found in mosques, palaces, and everyday objects, reflect the Islamic understanding of the unity and order of creation. These patterns, infinitely extendable and mathematically precise, evoke the infinite nature of Allah while remaining within the boundaries of aniconism — the avoidance of figurative representation in religious contexts.",
      },
    ],
  },
  {
    id: "fiqh-2",
    title: "The Pillars of Worship",
    author: "Imam al-Ghazali",
    category: "Fiqh",
    description:
      "A detailed exposition of the five pillars of Islam — the Shahada, Salah, Zakat, Sawm, and Hajj — exploring both their legal rulings and their spiritual dimensions.",
    coverColor: "from-emerald-700 to-green-900",
    totalPages: 290,
    isDemo: true,
    chapters: [
      {
        id: "fiqh-2-c1",
        title: "The Declaration of Faith",
        pages: 32,
        content:
          "The Shahada — 'There is no god but Allah, and Muhammad is the Messenger of Allah' — is the foundation of Islam and the gateway to the faith. Its apparent simplicity belies its profound implications, for it is not merely a statement of the tongue but a covenant of the heart that transforms one's entire existence.\n\n'There is no god but Allah' (La ilaha illa Allah) is a declaration of absolute monotheism. It negates the divinity of all that is worshipped besides Allah and affirms that worship, in all its forms, belongs to Allah alone. To utter this phrase sincerely is to free oneself from the worship of desires, wealth, status, and false idols, and to submit entirely to the will of the Creator.\n\n'Muhammad is the Messenger of Allah' (Muhammadun rasul Allah) affirms the prophethood of Muhammad ﷺ and binds the believer to follow his example. It means accepting all that he conveyed from Allah, obeying his commands, avoiding his prohibitions, and loving him above all creation save Allah Himself.\n\nThe conditions of the Shahada, as articulated by the scholars, include knowledge of its meaning, certainty, sincerity, truthfulness, love, submission, acceptance, and rejection of all false deities. One who fulfills these conditions has truly entered the fold of Islam and opened the door to the mercy and pleasure of Allah.",
      },
      {
        id: "fiqh-2-c2",
        title: "The Prayer: Connection with the Divine",
        pages: 48,
        content:
          "Salah, the ritual prayer, is the second pillar of Islam and the most frequently performed act of worship. Five times each day — at dawn, noon, mid-afternoon, sunset, and night — the Muslim turns toward the Kaaba in Mecca and enters into a direct, intimate communion with the Creator.\n\nThe prayer is not merely a physical exercise but a comprehensive act of worship involving the heart, tongue, and limbs. The heart is present with humility and reverence; the tongue recites the words of Allah and words of remembrance; the body performs prescribed movements of standing, bowing, and prostrating — all in submission to the Most High.\n\nThe conditions of valid prayer include purity of body and clothing, ablution (wudu), facing the Qibla, covering the awrah, and the intention. The pillars of prayer include the opening takbir, standing in recitation, reciting al-Fatihah, bowing, prostrating, and the final salam. Each element carries spiritual significance and reflects the believer's submission to Allah.\n\nThe prayer serves as a constant reminder of the divine throughout the day, interrupting the preoccupations of worldly life and returning the believer to the remembrance of the ultimate purpose of existence. The Prophet ﷺ described it as the coolness of his eye, and for the believer, it is a source of comfort, strength, and spiritual renewal.",
      },
      {
        id: "fiqh-2-c3",
        title: "Zakat: Purification Through Giving",
        pages: 38,
        content:
          "Zakat, the obligatory charity, is the third pillar of Islam. It is a fixed portion of one's wealth — generally 2.5% of accumulated savings held for a full lunar year — that is distributed to designated categories of recipients. The very word 'Zakat' carries the meaning of purification and growth, for charity purifies the wealth from the taint of greed and blesses it with increase.\n\nThe Quran specifies eight categories of Zakat recipients: the poor, the needy, those employed to collect it, those whose hearts are to be reconciled, those in bondage, those in debt, in the cause of Allah, and the wayfarer. This comprehensive framework ensures that wealth circulates through society rather than remaining concentrated in the hands of a few.\n\nZakat is distinct from voluntary charity (sadaqah), though both are encouraged. The obligation of Zakat reminds the believer that wealth is a trust from Allah, and that the rights of the poor are embedded within it. The one who withholds Zakat is warned of severe consequences, while the one who gives is promised immense reward.\n\nBeyond its economic function, Zakat cultivates generosity, compassion, and social solidarity. It breaks the attachment to material wealth and trains the believer to hold the blessings of this world in their hand, not in their heart — ever ready to give for the sake of Allah and the welfare of His creation.",
      },
    ],
  },
  {
    id: "tafsir-2",
    title: "The Sciences of the Quran",
    author: "Jalal al-Din al-Suyuti",
    category: "Tafsir",
    description:
      "A comprehensive survey of the Quranic sciences — revelation, compilation, recitation, abrogation, and the miraculous nature of the divine speech.",
    coverColor: "from-yellow-600 to-amber-700",
    totalPages: 340,
    isDemo: true,
    chapters: [
      {
        id: "tafsir-2-c1",
        title: "The Preservation of the Quran",
        pages: 42,
        content:
          "The preservation of the Quran is a fulfillment of the divine promise: 'Indeed, it is We who sent down the Reminder, and indeed, We will preserve it.' The Quran has been transmitted through an unbroken chain of narration, both oral and written, from the time of the Prophet ﷺ to the present day, with such precision that not a single letter has been altered.\n\nDuring the Prophet's ﷺ lifetime, the revelation was recorded by a group of scribes known as the Kuttab al-Wahy, including Zayd ibn Thabit, Ubayy ibn Ka'b, and Mu'adh ibn Jabal. Verses were written on palm leaves, flat stones, animal bones, and parchment, and memorized by thousands of companions.\n\nIn the caliphate of Abu Bakr, the first complete written compilation of the Quran was assembled under the supervision of Zayd ibn Thabit, in response to the loss of many reciters in the Battle of Yamama. This compilation was kept with the caliph and later with his daughter Aisha, may Allah be pleased with them.\n\nDuring the caliphate of Uthman, as the Islamic world expanded and different recitations emerged, a standardized master copy was produced and distributed to the major cities of the Muslim world. All subsequent copies of the Quran trace back to this Uthmanic codex, ensuring the unity of the scripture across the vast expanse of the Muslim community.",
      },
      {
        id: "tafsir-2-c2",
        title: "The Miraculous Nature of the Quran",
        pages: 38,
        content:
          "The Quran is the supreme miracle (mu'jizah) of the Prophet Muhammad ﷺ, an enduring challenge to all of humanity to produce even a single chapter like it. Its linguistic inimitability (i'jaz) — the perfection of its eloquence, rhetoric, and literary form — astounded the masters of Arabic, who recognized it as beyond human composition despite their initial resistance to its message.\n\nThe challenge of the Quran is progressive: first to produce a book like it, then ten surahs, then a single surah. This challenge has stood for over fourteen centuries, unmet by the collective genius of the Arabic-speaking world. The Quran itself declares that even if all humanity and jinn combined their efforts, they could not produce its equal.\n\nBeyond its linguistic miracle, the Quran contains a coherence and depth that reward endless study. Its themes — the oneness of Allah, the purpose of creation, the stories of the prophets, the moral and legal guidance, the descriptions of the Hereafter — are woven together with remarkable unity despite the gradual nature of its revelation.\n\nThe Quran also contains references to the natural world that have fascinated scholars for centuries — descriptions of embryology, cosmology, and the natural order that demonstrate a knowledge beyond what was available to a seventh-century unlettered prophet, pointing to the divine origin of the text.",
      },
    ],
  },
];

export const bookCategories: { id: string; name: string; icon: string; description: string }[] = [
  { id: "Fiqh", name: "Fiqh", icon: "scale", description: "Islamic Jurisprudence & Law" },
  { id: "Tafsir", name: "Tafsir", icon: "book-open", description: "Quranic Exegesis & Commentary" },
  { id: "Aqeedah", name: "Aqeedah", icon: "heart", description: "Islamic Creed & Theology" },
  { id: "Seerah", name: "Seerah", icon: "user", description: "Prophetic Biography" },
  { id: "History", name: "History", icon: "landmark", description: "Islamic Civilization & History" },
];

export function getBookById(id: string): Book | undefined {
  return libraryBooks.find((b) => b.id === id);
}
