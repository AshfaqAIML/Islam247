// Fatawa (Islamic rulings) — source-attributed, demo content.
// Each fatwa carries its scholar/source, question, answer, reference, and category.
// IMPORTANT: This is curated demo content for educational purposes. For personal
// rulings, always consult a qualified local scholar.

export interface Fatwa {
  id: string;
  question: string;
  answer: string;
  scholar: string;
  scholarArabic?: string;
  source: string; // e.g., "Fatawa Ibn Baz", "IslamQA"
  reference: string; // e.g., "Vol. 5, p. 23" or "#12345"
  category: FatwaCategory;
  topic: string;
  isDemo?: boolean;
}

export type FatwaCategory =
  | "Purification"
  | "Prayer"
  | "Fasting"
  | "Zakat"
  | "Hajj"
  | "Transactions"
  | "Marriage"
  | "Food"
  | "Medical"
  | "Aqeedah"
  | "Social";

export const fatwaCategories: { id: FatwaCategory; name: string; icon: string }[] = [
  { id: "Purification", name: "Purification", icon: "droplet" },
  { id: "Prayer", name: "Prayer", icon: "hand" },
  { id: "Fasting", name: "Fasting", icon: "moon" },
  { id: "Zakat", name: "Zakat", icon: "coins" },
  { id: "Hajj", name: "Hajj", icon: "map" },
  { id: "Transactions", name: "Transactions", icon: "scale" },
  { id: "Marriage", name: "Marriage", icon: "heart" },
  { id: "Food", name: "Food", icon: "utensils" },
  { id: "Medical", name: "Medical", icon: "stethoscope" },
  { id: "Aqeedah", name: "Aqeedah", icon: "book-open" },
  { id: "Social", name: "Social", icon: "users" },
];

export const fatawaData: Fatwa[] = [
  {
    id: "fatwa-1",
    question: "What is the ruling on using perfumes that contain alcohol?",
    answer:
      "The basic principle is that perfumes are permissible, and the presence of a small amount of alcohol that does not intoxicate in large quantities does not make the perfume impure (najis). The majority of scholars hold that industrial alcohol used in perfumes is not intoxicating in itself, so using such perfumes is permissible. However, one should avoid perfumes containing intoxicating alcohol when the matter is unclear, as a precaution. Allah knows best.",
    scholar: "Shaykh Ibn al-Uthaymeen",
    scholarArabic: "ابن عثيمين",
    source: "Majmu Fatawa Ibn Uthaymeen",
    reference: "Vol. 16, Q. 144",
    category: "Purification",
    topic: "Perfumes & Alcohol",
    isDemo: true,
  },
  {
    id: "fatwa-2",
    question: "Is it permissible to pray while wearing clothes that have pictures on them?",
    answer:
      "Prayer in clothes bearing images of creatures with souls (humans or animals) is disliked (makruh), but the prayer is still valid. It is better to pray in plain clothing out of veneration for the prayer. If the image is of something without a soul (like a tree or landscape), there is no dislike. The safest course is to remove or cover images of animate beings during prayer when possible.",
    scholar: "Shaykh Ibn Baz",
    scholarArabic: "ابن باز",
    source: "Majmu Fatawa Ibn Baz",
    reference: "Vol. 10, p. 256",
    category: "Prayer",
    topic: "Clothing with Images",
    isDemo: true,
  },
  {
    id: "fatwa-3",
    question: "Does swallowing saliva break the fast during Ramadan?",
    answer:
      "Swallowing one's own saliva does not break the fast, as it is a natural bodily secretion that one cannot avoid. The scholars are in agreement on this. However, if one intentionally gathers saliva in the mouth and then swallows it, some scholars considered this disliked. Phlegm or mucus that reaches the mouth and is swallowed also does not break the fast according to the majority, though it is better to spit it out when possible.",
    scholar: "Shaykh Ibn Baz",
    scholarArabic: "ابن باز",
    source: "Fatawa Ramadan (Ibn Baz)",
    reference: "p. 78",
    category: "Fasting",
    topic: "Saliva & Phlegm",
    isDemo: true,
  },
  {
    id: "fatwa-4",
    question: "On what types of wealth is Zakat obligatory?",
    answer:
      "Zakat is obligatory on four categories of wealth when they reach the nisab (minimum threshold): (1) gold, silver, and currency — 2.5% of savings held for a full lunar year; (2) trade goods — 2.5% of their market value; (3) livestock — camels, cattle, and sheep that graze freely, with specific rates detailed in the Sunnah; (4) agricultural produce — 10% if naturally irrigated (rain), 5% if irrigated with effort. Zakat is also due on discovered treasures (rikaz) at 20%. Each category has specific conditions detailed in the books of Fiqh.",
    scholar: "Shaykh Ibn al-Uthaymeen",
    scholarArabic: "ابن عثيمين",
    source: "Al-Sharh al-Mumti",
    reference: "Vol. 6, Zakat",
    category: "Zakat",
    topic: "Types of Zakatable Wealth",
    isDemo: true,
  },
  {
    id: "fatwa-5",
    question: "What is the ruling on performing Hajj on behalf of a deceased person?",
    answer:
      "Performing Hajj on behalf of a deceased person is valid and permissible if the deceased did not perform the obligatory Hajj during their lifetime, or if they made a vow (nadhr) to perform it. This is established by the hadith of Ibn Abbas where a woman asked the Prophet ﷺ about performing Hajj for her mother who had died without performing it, and he said: 'Yes, perform Hajj on her behalf.' The person performing the Hajj must have already performed their own obligatory Hajj first.",
    scholar: "Shaykh Ibn Baz",
    scholarArabic: "ابن باز",
    source: "Majmu Fatawa Ibn Baz",
    reference: "Vol. 16, Hajj",
    category: "Hajj",
    topic: "Hajj on Behalf of Deceased",
    isDemo: true,
  },
  {
    id: "fatwa-6",
    question: "Is it permissible to buy goods on installments when the total price is higher than the cash price?",
    answer:
      "Yes, selling goods on installments at a higher price than the cash price is permissible by the consensus of the majority of scholars, as long as the total price is agreed upon at the time of the contract. This is a valid form of sale (bay murabahah or bay bi-thaman ajil). The condition is that the price and the installment schedule are clearly specified and fixed — it is not permissible for the price to increase if the buyer is late in payment. Late fees that increase the principal are considered riba (usury).",
    scholar: "Shaykh Ibn al-Uthaymeen",
    scholarArabic: "ابن عثيمين",
    source: "Majmu Fatawa Ibn Uthaymeen",
    reference: "Vol. 18, Transactions",
    category: "Transactions",
    topic: "Installment Sales",
    isDemo: true,
  },
  {
    id: "fatwa-7",
    question: "What is the ruling on a husband and wife living separately by mutual agreement?",
    answer:
      "Living separately by mutual agreement is permissible if both spouses consent and it does not cause harm. However, the default in Islam is that the wife has the right to live with her husband and he is obligated to provide housing. If they agree to live apart (for example, due to work circumstances) without either party being wronged, this is allowed. The husband remains obligated to provide nafaqah (maintenance) regardless of the living arrangement. What is prohibited is for the husband to abandon his wife without cause, or for either party to use separation as a means of harm.",
    scholar: "Shaykh Ibn Baz",
    scholarArabic: "ابن باز",
    source: "Majmu Fatawa Ibn Baz",
    reference: "Vol. 20, Marriage",
    category: "Marriage",
    topic: "Separate Living",
    isDemo: true,
  },
  {
    id: "fatwa-8",
    question: "Is it permissible to eat meat slaughtered by the People of the Book (Jews and Christians)?",
    answer:
      "Yes, Allah has permitted the food of the People of the Book: 'This day are (all) good things made lawful for you. The food of those who have received the Scripture is lawful for you' (5:5). The 'food' here includes their slaughtered meat, provided the animal itself is lawful (not pork, etc.) and it was slaughtered in a manner where the name of Allah was invoked or at least not dedicated to other than Allah. If it is known that the meat was dedicated to other than Allah (such as a Christmas turkey dedicated to Jesus), it becomes prohibited. When the method of slaughter is unknown, the default is permissibility.",
    scholar: "Shaykh Ibn al-Uthaymeen",
    scholarArabic: "ابن عثيمين",
    source: "Majmu Fatawa Ibn Uthaymeen",
    reference: "Vol. 22, Food",
    category: "Food",
    topic: "Slaughter of People of the Book",
    isDemo: true,
  },
  {
    id: "fatwa-9",
    question: "Is it permissible to use medications that contain alcohol or pork-derived ingredients?",
    answer:
      "The general principle is that prohibited substances become permissible for medical treatment when three conditions are met: (1) the illness is genuine and the treatment is effective for it, (2) no permissible alternative is available, and (3) this is established by a trustworthy Muslim physician (or medical knowledge). If a permissible alternative exists, it is obligatory to use it instead. If no alternative exists and the medication is genuinely needed, it is permissible as a necessity, and necessities are measured by their extent. Preventive medicine (vaccines) follows the same principles when genuine.",
    scholar: "Shaykh Ibn Baz",
    scholarArabic: "ابن باز",
    source: "Majmu Fatawa Ibn Baz",
    reference: "Vol. 4, Medicine",
    category: "Medical",
    topic: "Prohibited Ingredients in Medicine",
    isDemo: true,
  },
  {
    id: "fatwa-10",
    question: "What is the correct belief regarding the attributes of Allah?",
    answer:
      "The belief of Ahl al-Sunnah wal-Jama'ah regarding Allah's names and attributes is to affirm what Allah and His Messenger affirmed for Him, without distortion (tahrif), denial (tatil), likening to creation (tashbih), or excessive questioning (takayyuf). We affirm the meanings while leaving the 'how' (kayfiyyah) to Allah, as Imam Malik said regarding istawa (rising above the throne): 'The rising is known, the how is unknown, believing in it is obligatory, and asking about it is an innovation.' This is the way of the early generations (the Salaf).",
    scholar: "Shaykh Ibn Baz",
    scholarArabic: "ابن باز",
    source: "Majmu Fatawa Ibn Baz",
    reference: "Vol. 1, Aqeedah",
    category: "Aqeedah",
    topic: "Divine Attributes",
    isDemo: true,
  },
  {
    id: "fatwa-11",
    question: "What is the ruling on backbiting, and is there any exception?",
    answer:
      "Backbiting (ghibah) — mentioning your brother or sister in a way they would dislike — is prohibited by the Quran: 'And do not backbite one another. Would one of you like to eat the flesh of his dead brother? You would detest it' (49:12). The scholars mentioned six exceptions where mentioning a person's fault is not backbiting: (1) oppression — seeking help against a wrongdoer from a judge; (2) seeking a fatwa; (3) seeking advice on marriage or business; (4) warning Muslims about a person of innovation or wrongdoing; (5) identifying a person by a known descriptor (e.g., 'the blind one'); (6) openly sinful people in their open sin. Even in these cases, one should not exceed necessity.",
    scholar: "Shaykh Ibn al-Uthaymeen",
    scholarArabic: "ابن عثيمين",
    source: "Sharh Riyad al-Salihin",
    reference: "Vol. 1, Ch. Backbiting",
    category: "Social",
    topic: "Backbiting",
    isDemo: true,
  },
  {
    id: "fatwa-12",
    question: "How should a Muslim deal with parents who are not Muslim, or who call them to disobedience of Allah?",
    answer:
      "A Muslim must treat their non-Muslim parents with kindness, respect, and good companionship, as Allah commanded: 'And We have enjoined upon man goodness to parents' (29:8). However, if they strive to make the Muslim child associate partners with Allah or disobey Him, the child must not obey them in sin: 'But if they endeavor to make you associate with Me that of which you have no knowledge, do not obey them' (31:15). Even while not obeying them in sin, the child should still maintain good relations, supplicate for their guidance, and treat them with kindness in worldly matters. Calling them to Islam should be done with wisdom, good instruction, and patience.",
    scholar: "Shaykh Ibn Baz",
    scholarArabic: "ابن باز",
    source: "Majmu Fatawa Ibn Baz",
    reference: "Vol. 4, Family",
    category: "Social",
    topic: "Non-Muslim Parents",
    isDemo: true,
  },
];

export function getFatwaById(id: string): Fatwa | undefined {
  return fatawaData.find((f) => f.id === id);
}
