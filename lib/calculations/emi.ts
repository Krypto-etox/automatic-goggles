export interface EmiInput {
  principal: number;
  annualRatePct: number;
  tenureMonths: number;
}

export interface AmortizationRow {
  month: number;
  balanceBefore: number;
  emi: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface EmiResult {
  principal: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: AmortizationRow[];
}

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * EMI = [P × r × (1+r)^n] / [(1+r)^n − 1]
 */
export function calculateEMI(input: EmiInput): EmiResult {
  const { principal, annualRatePct, tenureMonths } = input;
  if (principal <= 0 || tenureMonths <= 0) {
    return {
      principal,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      schedule: [],
    };
  }
  const r = annualRatePct / 12 / 100;
  let emi: number;
  if (r === 0) {
    emi = principal / tenureMonths;
  } else {
    const pow = Math.pow(1 + r, tenureMonths);
    emi = (principal * r * pow) / (pow - 1);
  }
  emi = round2(emi);

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  for (let month = 1; month <= tenureMonths; month++) {
    const balanceBefore = balance;
    const interest = round2(balance * r);
    let principalPart = round2(emi - interest);
    if (month === tenureMonths || principalPart >= balance) {
      principalPart = round2(balance);
    }
    balance = round2(Math.max(0, balance - principalPart));
    totalInterest = round2(totalInterest + interest);
    schedule.push({
      month,
      balanceBefore,
      emi: round2(principalPart + interest),
      interest,
      principal: principalPart,
      balance,
    });
  }
  return {
    principal,
    emi,
    totalInterest,
    totalPayment: round2(principal + totalInterest),
    schedule,
  };
}

export interface PrepaymentInput {
  emiResult: EmiResult;
  prepaymentAmount: number;
  /** 1-indexed month after which prepayment is applied. */
  afterMonth: number;
  annualRatePct: number;
  mode: 'reduce-tenure' | 'reduce-emi';
}

export interface PrepaymentResult {
  newSchedule: AmortizationRow[];
  newTenureMonths: number;
  newEmi: number;
  interestSaved: number;
  tenureReducedMonths: number;
}

/**
 * Recompute schedule after a lump-sum prepayment reduces principal.
 */
export function applyPrepayment(input: PrepaymentInput): PrepaymentResult {
  const {
    emiResult,
    prepaymentAmount,
    afterMonth,
    annualRatePct,
    mode,
  } = input;
  const r = annualRatePct / 12 / 100;
  const oldSchedule = emiResult.schedule;
  if (!oldSchedule.length || prepaymentAmount <= 0 || afterMonth < 0) {
    return {
      newSchedule: oldSchedule,
      newTenureMonths: oldSchedule.length,
      newEmi: emiResult.emi,
      interestSaved: 0,
      tenureReducedMonths: 0,
    };
  }
  const splitIdx = Math.min(afterMonth, oldSchedule.length);
  const before = oldSchedule.slice(0, splitIdx);
  const balanceAfter = before.length
    ? (before[before.length - 1]?.balance ?? 0)
    : emiResult.principal;
  let remainingPrincipal = Math.max(0, balanceAfter - prepaymentAmount);
  let remainingMonths = oldSchedule.length - splitIdx;

  let emi = emiResult.emi;
  if (mode === 'reduce-emi' && r > 0 && remainingMonths > 0 && remainingPrincipal > 0) {
    const pow = Math.pow(1 + r, remainingMonths);
    emi = round2((remainingPrincipal * r * pow) / (pow - 1));
  }

  const newSchedule: AmortizationRow[] = [...before];
  let totalInterestNew = before.reduce((s, x) => s + x.interest, 0);
  let month = splitIdx + 1;
  let guard = 0;
  while (remainingPrincipal > 0.5 && guard < 2000) {
    const balanceBefore = remainingPrincipal;
    const interest = round2(remainingPrincipal * r);
    let principalPart = round2(emi - interest);
    if (principalPart <= 0) {
      principalPart = round2(remainingPrincipal);
    }
    if (principalPart >= remainingPrincipal) {
      principalPart = round2(remainingPrincipal);
    }
    remainingPrincipal = round2(Math.max(0, remainingPrincipal - principalPart));
    totalInterestNew = round2(totalInterestNew + interest);
    newSchedule.push({
      month,
      balanceBefore,
      emi: round2(principalPart + interest),
      interest,
      principal: principalPart,
      balance: remainingPrincipal,
    });
    month++;
    guard++;
  }

  const interestSaved = round2(
    emiResult.totalInterest - totalInterestNew,
  );
  const tenureReducedMonths = oldSchedule.length - newSchedule.length;
  return {
    newSchedule,
    newTenureMonths: newSchedule.length,
    newEmi: mode === 'reduce-emi' ? emi : emiResult.emi,
    interestSaved: Math.max(0, interestSaved),
    tenureReducedMonths: Math.max(0, tenureReducedMonths),
  };
}
