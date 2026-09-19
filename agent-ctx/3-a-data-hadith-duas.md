# Task 3-a — data-hadith-duas Agent Work Record

## Files Created
- `/home/z/my-project/src/lib/data/hadith.ts`
- `/home/z/my-project/src/lib/data/duas.ts`

## Summary
- `hadith.ts`: exports `hadithCollections` (4 collections: Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami at-Tirmidhi) and `getHadithById(id)`. 17 authentic hadiths total with Arabic + English + narrator + grade + book + chapter.
- `duas.ts`: exports `duaCategories` (6 categories: Morning & Evening Azkar, After Prayer, Sleep, Eating, Travel, Protection) and `getDuaById(id)`. 20 authentic duas with Arabic + transliteration + translation + reference + count + virtue.

## Type Compatibility
Both arrays are typed against the existing `HadithCollection`, `Hadith`, `DuaCategory`, and `Dua` interfaces in `src/lib/types.ts`. `bun run lint` and `tsc --noEmit` both pass clean.

## Notes for Downstream Agents
- Hadith IDs follow the pattern `{collection-short}-{number}` (e.g., `bukhari-1`, `muslim-55`, `abudawud-4941`, `tirmidhi-1987`).
- Dua IDs are descriptive slugs (e.g., `sayyid-al-istighfar`, `bismillah-eating`, `three-surahs-protection`).
- Category icons are string names matching Lucide icon names: `sunrise`, `heart`, `moon`, `utensils`, `plane`, `shield`.
- Arabic strings use diacritics (tashkeel) for proper display; ensure the reader UI sets an appropriate Arabic font and `dir="rtl"` on Arabic text blocks.
- All hadiths include `book` and `chapter` fields; all duas include `virtue` (optional in the type but provided for all entries).
