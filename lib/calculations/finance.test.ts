import { describe, it, expect } from 'vitest';
import { calculateHRA } from './hra';
import { calculateGratuity, roundServiceYears } from './gratuity';
import { calculateEMI, applyPrepayment } from './emi';
import { calculateSIP, calculateLumpsum } from './sip';

describe('HRA', () => {
  it('picks the minimum of the three limits in a metro', () => {
    const r = calculateHRA({
      basic: 50000,
      hraReceived: 20000,
      rentPaid: 25000,
      metro: true,
    });
    // 50% of basic = 25000; rent-10% = 20000; HRA = 20000
    expect(r.exemption).toBe(20000);
  });

  it('uses 40% for non-metro', () => {
    const r = calculateHRA({
      basic: 50000,
      hraReceived: 25000,
      rentPaid: 30000,
      metro: false,
    });
    expect(r.metroPercent).toBe(0.4);
    // 40% of basic = 20000 is the minimum
    expect(r.exemption).toBe(20000);
  });
});

describe('gratuity', () => {
  it('rounds up service years at 6+ months', () => {
    expect(roundServiceYears(5.6)).toBe(6);
    expect(roundServiceYears(5.4)).toBe(5);
  });

  it('computes covered gratuity (15/26) and caps at 20L', () => {
    const r = calculateGratuity({
      lastDrawnSalary: 100000,
      yearsOfService: 10,
      coveredByAct: true,
    });
    // (15 * 100000 * 10) / 26 = 576,923
    expect(r.gratuity).toBe(576923);
    expect(r.taxFree).toBe(576923);
  });

  it('returns zero under 5 years', () => {
    const r = calculateGratuity({
      lastDrawnSalary: 100000,
      yearsOfService: 4,
      coveredByAct: true,
    });
    expect(r.eligible).toBe(false);
    expect(r.gratuity).toBe(0);
  });
});

describe('EMI', () => {
  it('computes EMI for a known loan', () => {
    // 50L @ 8% for 20 years: EMI ≈ ₹41,822
    const r = calculateEMI({
      principal: 5_000_000,
      annualRatePct: 8,
      tenureMonths: 240,
    });
    expect(r.emi).toBeCloseTo(41822, 0);
    expect(r.schedule).toHaveLength(240);
    expect(r.schedule[239]?.balance).toBe(0);
  });

  it('prepayment reduces tenure and saves interest', () => {
    const base = calculateEMI({
      principal: 5_000_000,
      annualRatePct: 8,
      tenureMonths: 240,
    });
    const pre = applyPrepayment({
      emiResult: base,
      prepaymentAmount: 500000,
      afterMonth: 12,
      annualRatePct: 8,
      mode: 'reduce-tenure',
    });
    expect(pre.newTenureMonths).toBeLessThan(240);
    expect(pre.interestSaved).toBeGreaterThan(0);
  });
});

describe('SIP / lumpsum', () => {
  it('SIP grows above invested amount', () => {
    const r = calculateSIP({
      monthlyAmount: 10000,
      annualReturnPct: 12,
      years: 10,
    });
    expect(r.invested).toBe(1_200_000);
    expect(r.futureValue).toBeGreaterThan(r.invested);
    expect(r.yearly).toHaveLength(10);
  });

  it('lumpsum compounds at assumed rate', () => {
    const r = calculateLumpsum({
      amount: 100000,
      annualReturnPct: 10,
      years: 5,
    });
    expect(r.futureValue).toBeCloseTo(161051, 0);
  });
});
