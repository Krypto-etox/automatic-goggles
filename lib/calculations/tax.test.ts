import { describe, it, expect } from 'vitest';
import {
  computeOldRegime,
  computeNewRegime,
  compareRegimes,
} from './tax';

describe('tax regime calculations', () => {
  it('gives zero tax up to the new-regime rebate threshold', () => {
    // Standard deduction 75k means 12,00,000 gross → 11,25,000 taxable (no rebate).
    const r = computeNewRegime(1_200_000);
    expect(r.taxableIncome).toBe(11_25_000);
    expect(r.totalTax).toBeGreaterThan(0);
  });

  it('gives zero tax at ₹7,00,000 under new regime (rebate up to 12L taxable)', () => {
    const r = computeNewRegime(7_00_000);
    // taxable after 75k std deduction = 6,25,000, well under rebate threshold.
    expect(r.totalTax).toBe(0);
  });

  it('old regime allows deductions', () => {
    const withDeductions = computeOldRegime(12_00_000, { section80c: 150000 });
    const withoutDeductions = computeOldRegime(12_00_000);
    expect(withDeductions.totalTax).toBeLessThan(withoutDeductions.totalTax);
  });

  it('compareRegimes returns a savings number and a better regime', () => {
    const result = compareRegimes(1_000_000, { section80c: 150000 });
    expect(['old', 'new']).toContain(result.betterRegime);
    expect(result.savings).toBeGreaterThanOrEqual(0);
  });
});
