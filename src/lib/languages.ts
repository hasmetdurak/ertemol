export interface Language {
  code: string
  name: string
  flag: string
}

export const languages: Language[] = [
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'sw', name: 'Swahili', flag: '🇹🇿' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
]

export function getLanguage(code: string): Language | undefined {
  return languages.find((l) => l.code === code)
}
