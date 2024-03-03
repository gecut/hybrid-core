const charList = [
  ['ك', 'ک'],
  ['دِ', 'د'],
  ['بِ', 'ب'],
  ['زِ', 'ز'],
  ['ذِ', 'ذ'],
  ['شِ', 'ش'],
  ['سِ', 'س'],
  ['ى', 'ی'],
  ['ي', 'ی'],
  ['١', '۱'],
  ['٢', '۲'],
  ['٣', '۳'],
  ['٤', '۴'],
  ['٥', '۵'],
  ['٦', '۶'],
  ['٧', '۷'],
  ['٨', '۸'],
  ['٩', '۹'],
  ['٠', '۰'],
] as const;

export default function arabicToPersian(text: string): string {
  for (const [arabicCharacter, persianCharacter] of charList) {
    text = text.replaceAll(arabicCharacter, persianCharacter);
  }

  return text;
}
