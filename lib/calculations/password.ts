export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous?: boolean;
}

const SETS = {
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  lower: 'abcdefghijkmnpqrstuvwxyz',
  numbers: '23456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?',
};
const AMBIGUOUS = /[O0Il1|`'"]/g;

function secureInt(max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0]! % max;
}

export function generatePassword(opts: PasswordOptions): string {
  let pool = '';
  if (opts.uppercase) pool += SETS.upper;
  if (opts.lowercase) pool += SETS.lower;
  if (opts.numbers) pool += SETS.numbers;
  if (opts.symbols) pool += SETS.symbols;
  if (!pool) return '';
  if (opts.excludeAmbiguous) pool = pool.replace(AMBIGUOUS, '');
  let out = '';
  for (let i = 0; i < opts.length; i++) {
    out += pool[secureInt(pool.length)];
  }
  return out;
}

const EFF_WORDS = [
  'apple', 'brave', 'cloud', 'delta', 'eagle', 'flame', 'grape', 'house',
  'ivory', 'jolly', 'knife', 'lemon', 'mango', 'noble', 'ocean', 'piano',
  'quartz', 'river', 'sunny', 'tiger', 'umbra', 'vivid', 'water', 'xenon',
  'yacht', 'zebra', 'anchor', 'butter', 'candle', 'dragon', 'engine', 'forest',
  'garden', 'honey', 'island', 'jacket', 'kettle', 'ladder', 'marble', 'nectar',
  'orange', 'palace', 'rabbit', 'silver', 'thunder', 'velvet', 'willow', 'zenith',
];

export interface PassphraseOptions {
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
}

export function generatePassphrase(opts: PassphraseOptions): string {
  const words: string[] = [];
  for (let i = 0; i < opts.wordCount; i++) {
    let w = EFF_WORDS[secureInt(EFF_WORDS.length)]!;
    if (opts.capitalize) w = w.charAt(0).toUpperCase() + w.slice(1);
    words.push(w);
  }
  let phrase = words.join(opts.separator);
  if (opts.includeNumber) phrase += opts.separator + secureInt(10000);
  return phrase;
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: 'Very weak' | 'Weak' | 'Fair' | 'Strong' | 'Very strong';
  entropy: number;
}

/** Lightweight entropy-based strength estimate (no external dep). */
export function estimateStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: 'Very weak', entropy: 0 };
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 32;
  const entropy = password.length * Math.log2(pool || 1);
  let score: PasswordStrength['score'] = 0;
  if (entropy >= 100) score = 4;
  else if (entropy >= 60) score = 3;
  else if (entropy >= 40) score = 2;
  else if (entropy >= 25) score = 1;
  const labels: PasswordStrength['label'][] = [
    'Very weak',
    'Weak',
    'Fair',
    'Strong',
    'Very strong',
  ];
  return { score, label: labels[score]!, entropy: Math.round(entropy) };
}
