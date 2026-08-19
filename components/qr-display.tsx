'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { DownloadButton } from '@/components/shared/download-button';
import { CopyButton } from '@/components/shared/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function QrDisplay({
  value,
  downloadName = 'qrcode',
  allowSize = true,
}: {
  value: string;
  downloadName?: string;
  allowSize?: boolean;
}) {
  const [dataUrl, setDataUrl] = useState('');
  const [size, setSize] = useState(320);

  useEffect(() => {
    if (!value) {
      setDataUrl('');
      return;
    }
    QRCode.toDataURL(value, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'M',
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(''));
  }, [value, size]);

  return (
    <div className="flex flex-col items-center gap-4">
      {dataUrl ? (
        <div className="rounded-xl border bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="Generated QR code" width={size} height={size} />
        </div>
      ) : (
        <div className="flex h-48 w-48 items-center justify-center rounded-xl border border-dashed text-sm text-muted">
          Fill in details to generate
        </div>
      )}
      {allowSize ? (
        <div className="w-full max-w-xs">
          <Label className="mb-1 block text-xs">Size: {size}px</Label>
          <Input
            type="range"
            min={160}
            max={512}
            step={16}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
      ) : null}
      <div className="flex flex-wrap justify-center gap-2">
        <DownloadButton
          content={dataUrl || ''}
          filename={`${downloadName}.png`}
          mime="image/png"
          disabled={!dataUrl}
          label="Download PNG"
        />
        <CopyButton value={value} label="Copy data" />
      </div>
    </div>
  );
}
