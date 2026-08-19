import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  addDays,
  isLeapYear,
} from 'date-fns';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_MINUTE = 1000 * 60;

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
}

export function calculateAge(dob: Date, today: Date = new Date()): AgeResult {
  const years = differenceInYears(today, dob);
  const afterYears = new Date(dob);
  afterYears.setFullYear(afterYears.getFullYear() + years);
  const months = differenceInMonths(today, afterYears);
  const afterMonths = new Date(afterYears);
  afterMonths.setMonth(afterMonths.getMonth() + months);
  const days = differenceInDays(today, afterMonths);
  const totalDays = Math.floor((today.getTime() - dob.getTime()) / MS_PER_DAY);
  const nextBday = new Date(dob);
  nextBday.setFullYear(today.getFullYear());
  if (nextBday.getTime() < today.getTime()) {
    nextBday.setFullYear(today.getFullYear() + 1);
  }
  const nextBirthdayDays = differenceInDays(nextBday, today);
  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalHours: Math.floor((today.getTime() - dob.getTime()) / MS_PER_HOUR),
    totalMinutes: Math.floor(
      (today.getTime() - dob.getTime()) / MS_PER_MINUTE,
    ),
    nextBirthdayDays,
  };
}

export type DueDateMode = 'lmp' | 'conception' | 'ivf5' | 'ivf3';

export interface PregnancyResult {
  dueDate: Date;
  currentWeek: number;
  trimester: 1 | 2 | 3;
  firstTrimesterEnd: Date;
  secondTrimesterEnd: Date;
}

export function calculateDueDate(
  reference: Date,
  mode: DueDateMode,
): PregnancyResult {
  let lmp: Date;
  switch (mode) {
    case 'lmp':
      lmp = reference;
      break;
    case 'conception':
      lmp = addDays(reference, -14);
      break;
    case 'ivf5':
      lmp = addDays(reference, -19); // 5-day transfer: egg retrieval ~ LMP+14
      break;
    case 'ivf3':
      lmp = addDays(reference, -17);
      break;
  }
  const dueDate = addDays(lmp, 280);
  const today = new Date();
  const daysSinceLmp = Math.max(
    0,
    Math.floor((today.getTime() - lmp.getTime()) / MS_PER_DAY),
  );
  const currentWeek = Math.min(40, Math.floor(daysSinceLmp / 7));
  const trimester: 1 | 2 | 3 =
    currentWeek < 13 ? 1 : currentWeek < 27 ? 2 : 3;
  return {
    dueDate,
    currentWeek,
    trimester,
    firstTrimesterEnd: addDays(lmp, 7 * 13),
    secondTrimesterEnd: addDays(lmp, 7 * 27),
  };
}

export interface RetirementResult {
  retirementDate: Date;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  /** Rough corpus estimate, if requested. */
  estimatedCorpus?: number;
}

export function calculateRetirement(
  dob: Date,
  retirementAge: number,
  today: Date = new Date(),
  monthlyExpense?: number,
): RetirementResult {
  const retirementDate = new Date(dob);
  retirementDate.setFullYear(dob.getFullYear() + retirementAge);
  const years = differenceInYears(retirementDate, today);
  const afterYears = new Date(today);
  afterYears.setFullYear(afterYears.getFullYear() + years);
  const months = differenceInMonths(retirementDate, afterYears);
  const afterMonths = new Date(afterYears);
  afterMonths.setMonth(afterMonths.getMonth() + months);
  const days = differenceInDays(retirementDate, afterMonths);
  const totalDays = Math.max(
    0,
    Math.floor((retirementDate.getTime() - today.getTime()) / MS_PER_DAY),
  );

  let estimatedCorpus: number | undefined;
  if (monthlyExpense && monthlyExpense > 0 && years > 0) {
    const annualExpense = monthlyExpense * 12;
    const inflation = 0.06;
    const lifeExpectancy = 85;
    const yearsAfterRetirement = lifeExpectancy - retirementAge;
    const inflatedAnnual = annualExpense * Math.pow(1 + inflation, years);
    estimatedCorpus = Math.round(
      inflatedAnnual * Math.max(0, yearsAfterRetirement),
    );
  }
  return {
    retirementDate,
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays,
    estimatedCorpus,
  };
}

export function addWorkingDays(start: Date, days: number): Date {
  let date = new Date(start);
  let added = 0;
  while (added < days) {
    date = addDays(date, 1);
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return date;
}

export { isLeapYear };
