import { TAX_CONFIG, type TaxRegimeConfig } from '@/lib/config/india/tax-slabs';

export interface OldRegimeDeductions {
  section80c?: number;
  section80d?: number;
  hra?: number;
  otherDeductions?: number;
}

export interface TaxResult {
  regime: 'old' | 'new';
  grossIncome: number;
  standardDeduction: number;
  deductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  slabs: { from: number; to: number | null; rate: number; tax: number }[];
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function computeSlabTax(
  taxableIncome: number,
  config: TaxRegimeConfig,
): { tax: number; breakdown: TaxResult['slabs'] } {
  let tax = 0;
  let lower = 0;
  const breakdown: TaxResult['slabs'] = [];
  for (const slab of config.slabs) {
    const upper = slab.to ?? Infinity;
    if (taxableIncome > lower) {
      const taxableInSlab = Math.min(taxableIncome, upper) - lower;
      const slabTax = taxableInSlab * slab.rate;
      tax += slabTax;
      breakdown.push({
        from: lower,
        to: slab.to,
        rate: slab.rate,
        tax: round2(slabTax),
      });
    } else {
      breakdown.push({ from: lower, to: slab.to, rate: slab.rate, tax: 0 });
    }
    lower = upper;
  }
  return { tax: round2(tax), breakdown };
}

function applyRebate(
  taxableIncome: number,
  taxBeforeRebate: number,
  config: TaxRegimeConfig,
): number {
  if (taxableIncome <= config.rebate.incomeThreshold) {
    return Math.min(taxBeforeRebate, config.rebate.maxRebate);
  }
  return 0;
}

export function computeOldRegime(
  grossIncome: number,
  deductions: OldRegimeDeductions = {},
): TaxResult {
  const config = TAX_CONFIG.oldRegime;
  const standardDeduction = Math.min(config.standardDeduction, grossIncome);
  const claimed =
    (deductions.section80c ?? 0) +
    (deductions.section80d ?? 0) +
    (deductions.hra ?? 0) +
    (deductions.otherDeductions ?? 0);
  const taxableIncome = Math.max(
    0,
    round2(grossIncome - standardDeduction - claimed),
  );
  const { tax: taxBeforeRebate, breakdown } = computeSlabTax(
    taxableIncome,
    config,
  );
  const rebate = applyRebate(taxableIncome, taxBeforeRebate, config);
  const taxAfterRebate = round2(taxBeforeRebate - rebate);
  const cess = round2(taxAfterRebate * TAX_CONFIG.cess);
  return {
    regime: 'old',
    grossIncome,
    standardDeduction: round2(standardDeduction),
    deductions: round2(claimed),
    taxableIncome,
    taxBeforeRebate,
    rebate: round2(rebate),
    taxAfterRebate,
    cess,
    totalTax: round2(taxAfterRebate + cess),
    slabs: breakdown,
  };
}

export function computeNewRegime(grossIncome: number): TaxResult {
  const config = TAX_CONFIG.newRegime;
  const standardDeduction = Math.min(config.standardDeduction, grossIncome);
  const taxableIncome = Math.max(0, round2(grossIncome - standardDeduction));
  const { tax: taxBeforeRebate, breakdown } = computeSlabTax(
    taxableIncome,
    config,
  );
  const rebate = applyRebate(taxableIncome, taxBeforeRebate, config);
  const taxAfterRebate = round2(taxBeforeRebate - rebate);
  const cess = round2(taxAfterRebate * TAX_CONFIG.cess);
  return {
    regime: 'new',
    grossIncome,
    standardDeduction: round2(standardDeduction),
    deductions: 0,
    taxableIncome,
    taxBeforeRebate,
    rebate: round2(rebate),
    taxAfterRebate,
    cess,
    totalTax: round2(taxAfterRebate + cess),
    slabs: breakdown,
  };
}

export interface RegimeComparison {
  old: TaxResult;
  new: TaxResult;
  betterRegime: 'old' | 'new';
  savings: number;
}

export function compareRegimes(
  grossIncome: number,
  deductions: OldRegimeDeductions = {},
): RegimeComparison {
  const oldResult = computeOldRegime(grossIncome, deductions);
  const newResult = computeNewRegime(grossIncome);
  const savings = round2(Math.abs(oldResult.totalTax - newResult.totalTax));
  const betterRegime =
    newResult.totalTax < oldResult.totalTax ? 'new' : 'old';
  return { old: oldResult, new: newResult, betterRegime, savings };
}
