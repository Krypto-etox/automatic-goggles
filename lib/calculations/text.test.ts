import { describe, it, expect } from 'vitest';
import {
  countText,
  convertCase,
  deduplicate,
  readabilityScore,
} from './text';

describe('countText', () => {
  it('counts words and characters', () => {
    const s = countText('Hello world. This is a test!');
    expect(s.words).toBe(6);
    expect(s.charactersNoSpaces).toBe(23);
    expect(s.sentences).toBe(2);
  });

  it('handles empty input', () => {
    const s = countText('   ');
    expect(s.words).toBe(0);
    expect(s.paragraphs).toBe(0);
  });
});

describe('convertCase', () => {
  it('converts between cases', () => {
    expect(convertCase('hello world example', 'camel')).toBe('helloWorldExample');
    expect(convertCase('hello world example', 'pascal')).toBe('HelloWorldExample');
    expect(convertCase('hello world', 'snake')).toBe('hello_world');
    expect(convertCase('hello world', 'kebab')).toBe('hello-world');
    expect(convertCase('hello world', 'constant')).toBe('HELLO_WORLD');
    expect(convertCase('hello-world_test', 'title')).toBe('Hello World Test');
  });
});

describe('deduplicate', () => {
  it('removes duplicate lines keeping order', () => {
    expect(
      deduplicate('a\nb\na\nc\nb', {
        mode: 'lines',
        keepOrder: true,
        ignoreCase: false,
        removeEmpty: true,
        sortOutput: false,
      }),
    ).toBe('a\nb\nc');
  });

  it('ignores case when requested', () => {
    expect(
      deduplicate('Apple\napple\nAPPLE', {
        mode: 'lines',
        keepOrder: true,
        ignoreCase: true,
        removeEmpty: true,
        sortOutput: false,
      }),
    ).toBe('Apple');
  });
});

describe('readabilityScore', () => {
  it('returns a score and grade', () => {
    const r = readabilityScore(
      'The cat sat on the mat. It was a sunny day and the birds were singing.',
    );
    expect(r.words).toBeGreaterThan(0);
    expect(r.fleschReadingEase).toBeGreaterThan(0);
    expect(r.label).toBeTruthy();
  });
});
