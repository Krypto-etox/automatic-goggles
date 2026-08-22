'use client';

import { Download } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';

interface DownloadButtonProps extends Omit<ButtonProps, 'content' | 'onClick'> {
  content: Blob | string;
  filename: string;
  mime?: string;
  label?: string;
}

export function DownloadButton({
  content,
  filename,
  mime = 'text/plain',
  label = 'Download',
  ...props
}: DownloadButtonProps) {
  function handleDownload() {
    const blob =
      typeof content === 'string'
        ? new Blob([content], { type: mime })
        : content;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <Button type="button" onClick={handleDownload} {...props}>
      <Download />
      <span>{label}</span>
    </Button>
  );
}
