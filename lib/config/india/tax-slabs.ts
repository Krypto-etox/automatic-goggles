/**
 * Indian income tax slabs, keyed by financial year.
 * Verification source: Income Tax Department / Union Budget 2024
 * (FY 2024-25 / AY 2025-26). Update annually after each Budget.
 */

export interface TaxSlab {
  /** Upper limit of the slab, in rupees. null = unbounded. */
  to: number | null;
  rate: number; // e.g. 0.05 = 5%
}

export interface TaxRegimeConfig {
  standardDeduction: number;
  /** Section 87A rebate: max tax rebate up to taxable income threshold. */
  rebate: { maxRebate: number; incomeThreshold: number };
  slabs: TaxSlab[];
}

export interface TaxConfig {
  fy: string;
  ay: string;
  cess: number; // 4% health & education cess
  newRegime: TaxRegimeConfig;
  oldRegime: TaxRegimeConfig;
}

export const TAX_CONFIG: TaxConfig = {
  fy: '2024-25',
  ay: '2025-26',
  cess: 0.04,
  newRegime: {
    standardDeduction: 75_000,
    rebate: { maxRebate: 25_000, incomeThreshold: 12_00_000 },
    slabs: [
      { to: 3_00_000, rate: 0 },
      { to: 7_00_000, rate: 0.05 },
      { to: 10_00_000, rate: 0.1 },
      { to: 12_00_000, rate: 0.15 },
      { to: 15_00_000, rate: 0.2 },
      { to: null, rate: 0.3 },
    ],
  },
  oldRegime: {
    standardDeduction: 50_000,
    rebate: { maxRebate: 12_500, incomeThreshold: 5_00_000 },
    slabs: [
      { to: 2_50_000, rate: 0 },
      { to: 5_00_000, rate: 0.05 },
      { to: 10_00_000, rate: 0.2 },
      { to: null, rate: 0.3 },
    ],
  },
};

/** Common deductions only available under the old regime. */
export const OLD_REGIME_DEDUCTION_CAPS = {
  section80c: 1_50_000,
  section80d: 1_00_000, // senior-citizen upper bound; default 25k self
} as const;
