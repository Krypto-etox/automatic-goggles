'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Field } from '@/components/shared/inputs';
import { buildWifiString } from '@/lib/calculations/qr';
import { QrDisplay } from '@/components/qr-display';

export function WifiQrGenerator() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState(false);

  const value = useMemo(
    () => (ssid ? buildWifiString({ ssid, password, encryption, hidden }) : ''),
    [ssid, password, encryption, hidden],
  );

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <Field label="Network name (SSID)" htmlFor="ssid">
          <Input
            id="ssid"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="MyWiFi"
          />
        </Field>
        <Field label="Encryption" htmlFor="enc">
          <Select
            value={encryption}
            onValueChange={(v) => setEncryption(v as 'WPA' | 'WEP' | 'nopass')}
          >
            <SelectTrigger id="enc">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="nopass">No password</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        {encryption !== 'nopass' ? (
          <Field label="Password" htmlFor="pw">
            <Input
              id="pw"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
        ) : null}
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={hidden} onCheckedChange={setHidden} />
          Hidden network
        </label>
      </div>
      <div>
        <QrDisplay value={value} downloadName="wifi-qr" />
      </div>
    </div>
  );
}
