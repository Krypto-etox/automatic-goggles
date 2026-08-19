export interface HraInput {
  basic: number;
  hraReceived: number;
  rentPaid: number;
  metro: boolean;
}

export interface HraResult {
  actualHra: number;
  rentOver10Percent: number;
  metroPercent: number;
  exemption: number;
  taxableHra: number;
}

/**
 * HRA exemption under Section 10(13A):
 *   min(HRA received, rent paid - 10% of basic, 50%|40% of basic)
 */
export function calculateHRA(input: HraInput): HraResult {
  const { basic, hraReceived, rentPaid, metro } = input;
  const actualHra = Math.max(0, hraReceived);
  const rentOver10Percent = Math.max(0, rentPaid - 0.1 * basic);
  const metroPercent = metro ? 0.5 : 0.4;
  const percentOfBasic = metroPercent * basic;
  const exemption = Math.min(actualHra, rentOver10Percent, percentOfBasic);
  const taxableHra = Math.max(0, actualHra - exemption);
  return {
    actualHra,
    rentOver10Percent,
    metroPercent,
    exemption: Math.round(exemption),
    taxableHra: Math.round(taxableHra),
  };
}
