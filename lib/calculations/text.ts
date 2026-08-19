export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
}

const WPM_READING = 225;
const WPM_SPEAKING = 130;

/** Count words, characters, sentences and paragraphs for a block of text. */
export function countText(text: string): TextStats {
  const trimmed = text.trim();
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const sentences = trimmed
    ? (trimmed.match(/[^.!?…]+[.!?…]+(\s|$)|[^.!?…]+$/g) || [])
        .map((s) => s.trim())
        .filter(Boolean).length
    : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean).length
    : 0;
  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTimeMinutes: words / WPM_READING,
    speakingTimeMinutes: words / WPM_SPEAKING,
  };
}

export type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant'
  | 'alternating';

function splitWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\-\s]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

export function convertCase(input: string, type: CaseType): string {
  const words = splitWords(input);
  if (!words.length) return input;
  switch (type) {
    case 'upper':
      return input.toUpperCase();
    case 'lower':
      return input.toLowerCase();
    case 'title':
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    case 'sentence':
      return input
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case 'camel':
      return words
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join('');
    case 'pascal':
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    case 'snake':
      return words.join('_');
    case 'kebab':
      return words.join('-');
    case 'constant':
      return words.join('_').toUpperCase();
    case 'alternating':
      return input
        .toLowerCase()
        .split('')
        .map((c, i) => (i % 2 === 1 ? c.toUpperCase() : c))
        .join('');
    default:
      return input;
  }
}

export interface DedupeOptions {
  mode: 'lines' | 'words';
  keepOrder: boolean;
  ignoreCase: boolean;
  removeEmpty: boolean;
  sortOutput: boolean;
}

export function deduplicate(input: string, options: DedupeOptions): string {
  const tokens =
    options.mode === 'lines' ? input.split(/\r?\n/) : input.split(/\s+/);
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of tokens) {
    if (options.removeEmpty && raw.trim() === '') continue;
    const key = options.ignoreCase ? raw.toLowerCase() : raw;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(raw);
    }
  }
  if (options.sortOutput) {
    result.sort((a, b) =>
      options.ignoreCase
        ? a.toLowerCase().localeCompare(b.toLowerCase())
        : a.localeCompare(b),
    );
  }
  return options.mode === 'lines' ? result.join('\n') : result.join(' ');
}

// ---- Lorem Ipsum -----------------------------------------------------------

const LOREM_WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(
    ' ',
  );

const CORP_WORDS =
  'leverage agile frameworks robust synopsis high level overviews iterative approaches corporate strategy actionable insights touchpoints offshoring disruption paradigm shift ecosystem bandwidth scalability best practices bleeding edge core competencies'.split(
    ' ',
  );

const HIPSTER_WORDS =
  'artisan vinyl pabst ennui chartreuse gentrify ethical brunch tote bag kombucha flannel meggings humblebrag shabby chic cold-pressed succulents single-origin coffee bespoke pour-over bicycle rights'.split(
    ' ',
  );

function rng() {
  return crypto.getRandomValues(new Uint32Array(1))[0]! / 2 ** 32;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

function sentence(vocab: string[]): string {
  const len = 8 + Math.floor(rng() * 10);
  const words = Array.from({ length: len }, () => pick(vocab));
  words[0] = words[0]!.charAt(0).toUpperCase() + words[0]!.slice(1);
  return words.join(' ') + '.';
}

export type LoremVariant = 'latin' | 'corporate' | 'hipster';
export type LoremUnit = 'paragraphs' | 'sentences' | 'words';

export function generateLorem(
  count: number,
  unit: LoremUnit,
  variant: LoremVariant = 'latin',
): string {
  const vocab =
    variant === 'corporate'
      ? CORP_WORDS
      : variant === 'hipster'
        ? [...LOREM_WORDS, ...HIPSTER_WORDS]
        : LOREM_WORDS;
  if (unit === 'words') {
    return Array.from({ length: count }, () => pick(vocab)).join(' ');
  }
  if (unit === 'sentences') {
    return Array.from({ length: count }, () => sentence(vocab)).join(' ');
  }
  return Array.from({ length: count }, () => {
    const n = 3 + Math.floor(rng() * 4);
    return Array.from({ length: n }, () => sentence(vocab)).join(' ');
  }).join('\n\n');
}

// ---- Readability -----------------------------------------------------------

export interface ReadabilityResult {
  fleschReadingEase: number;
  gradeLevel: number;
  label: string;
  words: number;
  sentences: number;
  syllables: number;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function readabilityScore(text: string): ReadabilityResult {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w));
  const wordCount = words.length;
  const sentenceCount = Math.max(
    1,
    (text.match(/[.!?]+(\s|$)/g) || []).length || 1,
  );
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0);
  if (wordCount === 0) {
    return {
      fleschReadingEase: 0,
      gradeLevel: 0,
      label: 'N/A',
      words: 0,
      sentences: 0,
      syllables: 0,
    };
  }
  const ease =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllables / wordCount);
  // Flesch-Kincaid Grade Level
  const grade =
    0.39 * (wordCount / sentenceCount) +
    11.8 * (syllables / wordCount) -
    15.59;
  let label = 'Very difficult';
  if (ease >= 90) label = 'Very easy';
  else if (ease >= 80) label = 'Easy';
  else if (ease >= 70) label = 'Fairly easy';
  else if (ease >= 60) label = 'Standard';
  else if (ease >= 50) label = 'Fairly difficult';
  else if (ease >= 30) label = 'Difficult';
  return {
    fleschReadingEase: Math.round(ease * 10) / 10,
    gradeLevel: Math.round(grade * 10) / 10,
    label,
    words: wordCount,
    sentences: sentenceCount,
    syllables,
  };
}
