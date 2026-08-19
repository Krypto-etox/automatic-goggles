export interface UpiPayload {
  pa: string; // VPA
  pn: string; // payee name
  am?: string;
  cu?: string; // currency, default INR
  tn?: string; // note
}

/** Build a UPI deep link per the UPI Linking Specification. */
export function buildUpiUri(p: UpiPayload): string {
  const params = new URLSearchParams();
  params.set('pa', p.pa);
  params.set('pn', p.pn);
  if (p.am) params.set('am', p.am);
  params.set('cu', p.cu ?? 'INR');
  if (p.tn) params.set('tn', p.tn);
  return `upi://pay?${params.toString()}`;
}

export interface WifiPayload {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1');
}

/** Build the WiFi QR string per the standard meCard-like spec. */
export function buildWifiString(p: WifiPayload): string {
  if (p.encryption === 'nopass') {
    return `WIFI:T:nopass;S:${escapeWifi(p.ssid)};H:${p.hidden ? 'true' : 'false'};;`;
  }
  return (
    `WIFI:T:${p.encryption};S:${escapeWifi(p.ssid)};` +
    `P:${escapeWifi(p.password)};H:${p.hidden ? 'true' : 'false'};;`
  );
}

export interface VCardPayload {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  organization?: string;
  title?: string;
  website?: string;
  address?: string;
}

/** Build a vCard 3.0 string. */
export function buildVCard(p: VCardPayload): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${p.lastName ?? ''};${p.firstName};;;`,
    `FN:${[p.firstName, p.lastName].filter(Boolean).join(' ')}`,
  ];
  if (p.organization) lines.push(`ORG:${p.organization}`);
  if (p.title) lines.push(`TITLE:${p.title}`);
  if (p.phone) lines.push(`TEL;TYPE=CELL:${p.phone}`);
  if (p.email) lines.push(`EMAIL:${p.email}`);
  if (p.website) lines.push(`URL:${p.website}`);
  if (p.address) lines.push(`ADR;TYPE=WORK:;;${p.address};;;;`);
  lines.push('END:VCARD');
  return lines.join('\n');
}
