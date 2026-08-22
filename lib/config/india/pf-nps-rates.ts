/**
 * Provident fund, PPF and NPS rates.
 * PPF/EPF rates are declared periodically — flag for manual update.
 * Verification source: Ministry of Finance / EPFO notifications.
 */

export const PF_RATES = {
  // PPF rate for FY 2024-25 (declared quarterly). TODO: VERIFY each quarter.
  ppfAnnualRate: 0.071,
  // EPF interest rate for FY 2023-24 (latest notified). TODO: VERIFY for current FY.
  epfAnnualRate: 0.0825,
  // Employee PF contribution as fraction of basic+DA.
  employeeRate: 0.12,
  // Employer split: 3.67% to EPF, 8.33% to EPS.
  employerEpfRate: 0.0367,
  employerEpsRate: 0.0833,
  // Wage ceiling for EPS pension (used for cap, not for standard calc).
  epsWageCeiling: 15_000,
};

export const NPS_DEFAULTS = {
  assumedCagr: 0.1,
  mandatoryAnnuityPct: 0.4,
  taxFreeLumpsumPct: 0.6,
  retirementAge: 60,
};
