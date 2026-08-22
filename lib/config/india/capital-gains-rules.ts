/**
 * Capital gains thresholds & rates (India).
 * Verification source: Income Tax Act / recent Finance Acts.
 * TODO: VERIFY after each Budget for threshold/index changes.
 */

export const CAPITAL_GAINS_RULES = {
  equity: {
    stcgHoldingMonths: 12,
    stcgRate: 0.15,
    ltcgRate: 0.1,
    ltcgExemption: 1_00_000,
  },
  property: {
    stcgHoldingMonths: 24,
    ltcgRateIndexed: 0.2,
    // Property STCG is added to income; taxed at slab rates (handled by caller).
  },
};

/**
 * Cost Inflation Index (CII) table. Keyed by financial year "YYYY-YY".
 * Source: CBDT notifications. Add new years as notified.
 */
export const COST_INFLATION_INDEX: Record<string, number> = {
  '2001-02': 100,
  '2015-16': 254,
  '2016-17': 264,
  '2017-18': 272,
  '2018-19': 280,
  '2019-20': 289,
  '2020-21': 301,
  '2021-22': 317,
  '2022-23': 331,
  '2023-24': 348,
  '2024-25': 365,
};
