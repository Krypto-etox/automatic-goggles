import {
  PF_RATES,
} from '@/lib/config/india/pf-nps-rates';
import { estimateMonthlyPT } from '@/lib/config/india/professional-tax';
import {
  computeNewRegime,
  computeOldRegime,
  type OldRegimeDeductions,
} from './tax';

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface SalaryInput {
  ctcAnnual: number;
  basicPct?: number; // fraction of CTC, default 0.4
  state?: string;
  regime?: 'old' | 'new';
  monthlyRentPaid?: number;
  extraDeductions?: number;
}

export interface SalaryBreakup {
  annualGross: number;
  basic: number;
  hra: number;
  specialAllowance: number;
  employerPf: number;
  gratuityProvision: number;
  employeePf: number;
  professionalTaxAnnual: number;
  incomeTaxAnnual: number;
  annualInHand: number;
  monthlyInHand: number;
  totalDeductions: number;
  regime: 'old' | 'new';
}

/**
 * Break CTC into components and estimate monthly in-hand salary.
 * Assumes a standard structure:
 *   Basic = basePct × CTC
 *   HRA = 50% of Basic (metro proxy)
 *   Special = remainder
 *   Employer PF = 12% of Basic (13.6% effectively w/ EDLI, simplified)
 *   Gratuity provision = 4.81% of Basic (≈ 15/26 × 1/12)
 */
export function calculateInHand(input: SalaryInput): SalaryBreakup {
  const {
    ctcAnnual,
    basicPct = 0.4,
    state = 'None',
    regime = 'new',
  } = input;
  if (ctcAnnual <= 0) {
    return {
      annualGross: 0,
      basic: 0,
      hra: 0,
      specialAllowance: 0,
      employerPf: 0,
      gratuityProvision: 0,
      employeePf: 0,
      professionalTaxAnnual: 0,
      incomeTaxAnnual: 0,
      annualInHand: 0,
      monthlyInHand: 0,
      totalDeductions: 0,
      regime,
    };
  }

  const basic = round2(ctcAnnual * basicPct);
  const hra = round2(basic * 0.5);
  const employerPf = round2(basic * PF_RATES.employeeRate);
  const gratuityProvision = round2((basic * 15) / 26 / 12);
  const specialAllowance = round2(
    ctcAnnual - basic - hra - employerPf - gratuityProvision,
  );
  const annualGross = round2(basic + hra + Math.max(0, specialAllowance));

  const employeePf = round2(basic * PF_RATES.employeeRate);
  const monthlyGross = annualGross / 12;
  const monthlyPT = estimateMonthlyPT(state, monthlyGross);
  const professionalTaxAnnual = round2(monthlyPT * 12);

  let incomeTaxAnnual: number;
  if (regime === 'old') {
    const monthlyBasic = basic / 12;
    const hraExemption = Math.min(
      hra,
      Math.max(0, (input.monthlyRentPaid ?? 0) - 0.1 * monthlyBasic),
      0.5 * monthlyBasic,
    );
    const deductions: OldRegimeDeductions = {
      section80c: Math.min(1_50_000, employeePf),
      hra: hraExemption * 12,
      otherDeductions: input.extraDeductions ?? 0,
    };
    incomeTaxAnnual = computeOldRegime(annualGross, deductions).totalTax;
  } else {
    incomeTaxAnnual = computeNewRegime(annualGross).totalTax;
  }

  const totalDeductions = round2(
    employeePf + professionalTaxAnnual + incomeTaxAnnual,
  );
  const annualInHand = round2(annualGross - totalDeductions);
  const monthlyInHand = round2(annualInHand / 12);

  return {
    annualGross,
    basic,
    hra,
    specialAllowance,
    employerPf,
    gratuityProvision,
    employeePf,
    professionalTaxAnnual,
    incomeTaxAnnual: round2(incomeTaxAnnual),
    annualInHand,
    monthlyInHand,
    totalDeductions,
    regime,
  };
}
