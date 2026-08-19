'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/shared/inputs';
import { buildVCard } from '@/lib/calculations/qr';
import { QrDisplay } from '@/components/qr-display';
import { DownloadButton } from '@/components/shared/download-button';

export function VcardQrGenerator() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [title, setTitle] = useState('');
  const [website, setWebsite] = useState('');

  const vcard = useMemo(
    () =>
      first
        ? buildVCard({
            firstName: first,
            lastName: last,
            phone,
            email,
            organization: org,
            title,
            website,
          })
        : '',
    [first, last, phone, email, org, title, website],
  );

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" htmlFor="fn">
            <Input
              id="fn"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </Field>
          <Field label="Last name" htmlFor="ln">
            <Input
              id="ln"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </Field>
        </div>
        <Field label="Phone" htmlFor="tel">
          <Input
            id="tel"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91…"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Organization" htmlFor="org">
            <Input
              id="org"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />
          </Field>
          <Field label="Job title" htmlFor="title">
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
        </div>
        <Field label="Website" htmlFor="url">
          <Input
            id="url"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://"
          />
        </Field>
        {vcard ? (
          <DownloadButton
            content={vcard}
            filename="contact.vcf"
            mime="text/vcard"
            variant="outline"
            label="Download .vcf"
          />
        ) : null}
      </div>
      <div>
        <QrDisplay value={vcard} downloadName="vcard-qr" />
      </div>
    </div>
  );
}
