export const GRATUITY_CAP = 20_00_000;

export interface GratuityInput {
  lastDrawnSalary: number; // basic + DA
  yearsOfService: number;
  coveredByAct: boolean; // Payment of Gratuity Act
}

export interface GratuityResult {
  eligible: boolean;
  roundedYears: number;
  divisor: number;
  gratuity: number;
  taxFree: number;
  taxable: number;
}

/**
 * Rounds years of service per the Act: 6 months or more in the final
 * year rounds up; less rounds down.
 */
export function roundServiceYears(yearsOfService: number): number {
  const whole = Math.floor(yearsOfService);
  const fraction = yearsOfService - whole;
  return fraction >= 0.5 ? whole + 1 : whole;
}

/**
 * Gratuity:
 *   covered: (15 × last salary × years) / 26, capped at ₹20L
 *   not covered: same with /30
 */
export function calculateGratuity(input: GratuityInput): GratuityResult {
  const eligible = input.yearsOfService >= 5;
  const roundedYears = roundServiceYears(input.yearsOfService);
  const divisor = input.coveredByAct ? 26 : 30;
  if (!eligible) {
    return {
      eligible: false,
      roundedYears,
      divisor,
      gratuity: 0,
      taxFree: 0,
      taxable: 0,
    };
  }
  const raw = (15 * input.lastDrawnSalary * roundedYears) / divisor;
  const gratuity = Math.round(raw);
  const taxFree = Math.min(gratuity, GRATUITY_CAP);
  const taxable = Math.max(0, gratuity - GRATUITY_CAP);
  return { eligible, roundedYears, divisor, gratuity, taxFree, taxable };
}
