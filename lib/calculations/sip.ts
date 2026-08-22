const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface SipInput {
  monthlyAmount: number;
  annualReturnPct: number;
  years: number;
}

export interface YearlyPoint {
  year: number;
  invested: number;
  value: number;
}

export interface SipResult {
  invested: number;
  futureValue: number;
  estimatedReturns: number;
  yearly: YearlyPoint[];
}

/**
 * SIP future value (annuity-due, contribution at start of month):
 *   FV = P × [((1+i)^n − 1)/i] × (1+i)
 */
export function calculateSIP(input: SipInput): SipResult {
  const { monthlyAmount, annualReturnPct, years } = input;
  const monthlyRate = annualReturnPct / 12 / 100;
  const months = Math.round(years * 12);
  if (monthlyAmount <= 0 || months <= 0) {
    return { invested: 0, futureValue: 0, estimatedReturns: 0, yearly: [] };
  }

  const yearly: YearlyPoint[] = [];
  let balance = 0;
  let invested = 0;

  for (let m = 1; m <= months; m++) {
    balance = (balance + monthlyAmount) * (1 + monthlyRate);
    invested += monthlyAmount;
    if (m % 12 === 0) {
      yearly.push({
        year: m / 12,
        invested: round2(invested),
        value: round2(balance),
      });
    }
  }

  const futureValue = round2(balance);
  return {
    invested: round2(invested),
    futureValue,
    estimatedReturns: round2(futureValue - invested),
    yearly,
  };
}

export interface LumpsumInput {
  amount: number;
  annualReturnPct: number;
  years: number;
}

export interface LumpsumResult {
  invested: number;
  futureValue: number;
  estimatedReturns: number;
  yearly: YearlyPoint[];
}

/** FV = P × (1+r)^n */
export function calculateLumpsum(input: LumpsumInput): LumpsumResult {
  const { amount, annualReturnPct, years } = input;
  if (amount <= 0 || years <= 0) {
    return { invested: 0, futureValue: 0, estimatedReturns: 0, yearly: [] };
  }
  const r = annualReturnPct / 100;
  const yearly: YearlyPoint[] = [];
  for (let y = 1; y <= years; y++) {
    const value = amount * Math.pow(1 + r, y);
    yearly.push({ year: y, invested: amount, value: round2(value) });
  }
  const futureValue = round2(amount * Math.pow(1 + r, years));
  return {
    invested: amount,
    futureValue,
    estimatedReturns: round2(futureValue - amount),
    yearly,
  };
}
