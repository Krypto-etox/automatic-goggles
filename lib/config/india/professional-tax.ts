/**
 * State-wise professional tax (PT) slabs for a handful of common states.
 * PT is a state subject and varies. This is a representative, simplified
 * table for estimation only.
 * // TODO: VERIFY each state's current slabs before relying on exact figures.
 */

export interface Ptslab {
  from: number;
  to: number | null;
  tax: number; // monthly, annual where noted
}

export const PROFESSIONAL_TAX: Record<string, { annual: boolean; slabs: Ptslab[] }> = {
  Maharashtra: {
    annual: false,
    slabs: [
      { from: 0, to: 7_500, tax: 0 },
      { from: 7_501, to: 10_000, tax: 175 },
      { from: 10_001, to: null, tax: 200 }, // monthly, for men; women differ historically
    ],
  },
  Karnataka: {
    annual: false,
    slabs: [
      { from: 0, to: 15_000, tax: 0 },
      { from: 15_001, to: null, tax: 200 },
    ],
  },
  'West Bengal': {
    annual: false,
    slabs: [
      { from: 0, to: 10_000, tax: 110 },
      { from: 10_001, to: 15_000, tax: 130 },
      { from: 15_001, to: 25_000, tax: 150 },
      { from: 25_001, to: 40_000, tax: 200 },
      { from: 40_001, to: null, tax: 200 },
    ],
  },
  'Tamil Nadu': {
    annual: false,
    slabs: [
      { from: 0, to: 21_000, tax: 0 },
      { from: 21_001, to: 30_000, tax: 145 },
      { from: 30_001, to: 45_000, tax: 402 },
      { from: 45_001, to: 60_000, tax: 795 },
      { from: 60_001, to: null, tax: 1095 },
    ],
  },
  Gujarat: {
    annual: false,
    slabs: [
      { from: 0, to: 5_999, tax: 0 },
      { from: 6_000, to: 8_999, tax: 80 },
      { from: 9_000, to: 11_999, tax: 150 },
      { from: 12_000, to: null, tax: 200 },
    ],
  },
  None: { annual: false, slabs: [] },
};

export const PT_STATES = Object.keys(PROFESSIONAL_TAX);

/** Estimate monthly PT for a gross monthly salary in a given state. */
export function estimateMonthlyPT(state: string, grossMonthly: number): number {
  const config = PROFESSIONAL_TAX[state];
  if (!config) return 0;
  const slab = config.slabs.find(
    (s) => grossMonthly >= s.from && (s.to === null || grossMonthly <= s.to),
  );
  if (!slab) return 0;
  return config.annual ? slab.tax / 12 : slab.tax;
}
