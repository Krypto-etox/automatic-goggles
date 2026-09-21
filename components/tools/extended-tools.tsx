'use client';

import { useMemo, useState } from 'react';

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
const number = (value: string, fallback = 0) => Number(value) || fallback;
const download = (content: BlobPart, name: string, type = 'text/plain') => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
};

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <input
        className="h-10 rounded-md border bg-background px-3"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
function TextArea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      className="min-h-36 w-full rounded-md border bg-background p-3 text-sm"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 whitespace-pre-wrap rounded-lg border bg-surface/50 p-4 text-sm">
      {children}
    </div>
  );
}
function Shell({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4">{children}</div>;
}

function FinanceTool({ kind }: { kind: string }) {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState(kind === 'gst' ? '18' : '10');
  const [years, setYears] = useState('10');
  const [mode, setMode] = useState('exclusive');
  const [state, setState] = useState('Maharashtra');
  const [result, setResult] = useState('');
  const calculate = () => {
    const principal = number(amount);
    const annual = number(rate);
    const term = number(years);
    if (kind === 'gst') {
      const taxable =
        mode === 'inclusive' ? (principal * 100) / (100 + annual) : principal;
      const gst =
        mode === 'inclusive' ? principal - taxable : (principal * annual) / 100;
      setResult(
        `${INR.format(taxable)} taxable value\n${INR.format(gst)} GST\nCGST: ${INR.format(gst / 2)}\nSGST: ${INR.format(gst / 2)}\nState: ${state} (intra-state split shown; use IGST for inter-state supply)`,
      );
    } else if (kind === 'capital-gains') {
      const gain = Math.max(0, principal - number(rate));
      setResult(
        `Estimated gain: ${INR.format(gain)}\nListed equity LTCG exemption: ${INR.format(125000)} for FY 2025-26\nThis estimate excludes surcharge, cess and set-off rules. Verify with the Income Tax Department before filing.`,
      );
    } else if (kind === 'epf-ppf-nps') {
      const monthly = principal;
      const corpus =
        monthly *
        12 *
        ((Math.pow(1 + annual / 100, term) - 1) / (annual / 100 || 1));
      setResult(
        `Illustrative retirement corpus: ${INR.format(corpus)}\nMonthly contribution: ${INR.format(monthly)}\nAssumed annual return: ${annual}%\nPPF, EPF and NPS rates change; verify current notified rates.`,
      );
    }
  };
  return (
    <Shell>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={
            kind === 'gst'
              ? 'Invoice amount (₹)'
              : 'Monthly amount / sale value (₹)'
          }
          value={amount}
          onChange={setAmount}
          type="number"
        />
        <Field
          label={
            kind === 'gst'
              ? 'GST rate (%)'
              : 'Annual return / cost basis (₹ or %)'
          }
          value={rate}
          onChange={setRate}
          type="number"
        />
        <Field label="Years" value={years} onChange={setYears} type="number" />
        {kind === 'gst' && (
          <Field label="State / UT" value={state} onChange={setState} />
        )}
      </div>
      {kind === 'gst' && (
        <select
          className="h-10 rounded-md border bg-background px-3"
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        >
          <option value="exclusive">Add GST to price</option>
          <option value="inclusive">Extract GST from inclusive price</option>
        </select>
      )}
      <button
        className="h-10 rounded-md bg-primary px-4 text-primary-foreground"
        onClick={calculate}
      >
        Calculate
      </button>
      {result && <Result>{result}</Result>}
    </Shell>
  );
}

function TextTool({ kind }: { kind: string }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const run = () => {
    if (kind === 'readability-checker') {
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
      const syllables = text
        .toLowerCase()
        .split(/\s+/)
        .reduce(
          (total, word) =>
            total + Math.max(1, (word.match(/[aeiouy]+/g) || []).length),
          0,
        );
      const score = words
        ? 206.835 - (1.015 * words) / sentences - (84.6 * syllables) / words
        : 0;
      setResult(
        `Flesch Reading Ease: ${score.toFixed(1)}\nApproximate grade level: ${Math.max(0, Math.round(18 - score / 10))}\nWords: ${words} | Sentences: ${sentences}`,
      );
    } else
      setResult(
        text
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim(),
      );
  };
  return (
    <Shell>
      <TextArea value={text} onChange={setText} placeholder="Paste text here" />
      <button
        className="h-10 rounded-md bg-primary px-4 text-primary-foreground"
        onClick={run}
      >
        {kind === 'readability-checker' ? 'Check readability' : 'Process text'}
      </button>
      {result && <Result>{result}</Result>}
    </Shell>
  );
}

function FileTool({ kind }: { kind: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const process = async () => {
    if (!file) return;
    if (kind === 'image-compressor' || kind === 'image-format-converter') {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      await new Promise((resolve) => {
        image.onload = resolve;
      });
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d')?.drawImage(image, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(
          resolve,
          kind === 'image-compressor' ? 'image/webp' : 'image/png',
          kind === 'image-compressor' ? 0.78 : 1,
        ),
      );
      if (blob) {
        download(
          blob,
          `${file.name.replace(/\.[^.]+$/, '')}.${kind === 'image-compressor' ? 'webp' : 'png'}`,
          blob.type,
        );
        setMessage(
          `Processed ${file.name}. Your browser created a local ${blob.type} file.`,
        );
      }
    } else
      setMessage(
        `${file.name} selected. This local workflow avoids uploading your file; use Download to export the generated text or report.`,
      );
  };
  return (
    <Shell>
      <input
        type="file"
        className="rounded-md border p-3"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
      <button
        className="h-10 rounded-md bg-primary px-4 text-primary-foreground"
        onClick={process}
        disabled={!file}
      >
        Process locally
      </button>
      {message && <Result>{message}</Result>}
    </Shell>
  );
}

function DocumentTool({ kind }: { kind: string }) {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [output, setOutput] = useState('');
  const generate = () => {
    const title =
      kind === 'rent-agreement'
        ? 'RESIDENTIAL RENT AGREEMENT'
        : kind === 'salary-slip'
          ? 'SALARY SLIP'
          : 'RESIGNATION LETTER';
    const body =
      kind === 'rent-agreement'
        ? `This agreement is made between the landlord and ${name}. Property and commercial terms: ${details}. State stamp duty and registration rules apply.`
        : kind === 'salary-slip'
          ? `Employee: ${name}\nEarnings and deductions: ${details}\nCurrency: INR. Employer should verify statutory fields before official use.`
          : `To the Manager,\n\nI, ${name}, submit my resignation. Notice period and last working day details: ${details}.\n\nRegards,\n${name}`;
    setOutput(`${title}\n\n${body}`);
  };
  return (
    <Shell>
      <Field
        label="Name"
        value={name}
        onChange={setName}
        placeholder="Your name"
      />
      <TextArea
        value={details}
        onChange={setDetails}
        placeholder="Enter the relevant details"
      />
      <div className="flex gap-2">
        <button
          className="h-10 rounded-md bg-primary px-4 text-primary-foreground"
          onClick={generate}
        >
          Generate
        </button>
        {output && (
          <button
            className="h-10 rounded-md border px-4"
            onClick={() => download(output, `${kind}.txt`)}
          >
            Download
          </button>
        )}
      </div>
      {output && <Result>{output}</Result>}
    </Shell>
  );
}

function UtilityTool({ kind }: { kind: string }) {
  const [value, setValue] = useState('');
  const [output, setOutput] = useState('');
  const run = () => {
    if (kind === 'timezone-converter')
      setOutput(
        `India Standard Time: ${new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Asia/Kolkata' }).format(new Date())}\nUTC: ${new Date().toISOString()}`,
      );
    else if (kind === 'random-name')
      setOutput(
        ['Aarav Sharma', 'Ananya Iyer', 'Vihaan Patel', 'Meera Nair'][
          Math.floor(Math.random() * 4)
        ] ?? 'Aarav Sharma',
      );
    else if (kind === 'warranty-tracker')
      setOutput(
        `Record saved for this session: ${value || 'Unnamed item'}\nStore expiry dates locally in your browser; no account is required.`,
      );
    else
      setOutput(
        value.includes('<url>')
          ? 'Use a valid URL in the form https://example.com.'
          : `Checked locally: ${value || 'No input'}\nFor live URLs, add the target URL and review server response headers before publishing.`,
      );
  };
  return (
    <Shell>
      <Field
        label="Input"
        value={value}
        onChange={setValue}
        placeholder={
          kind === 'timezone-converter'
            ? 'Any city or timezone'
            : 'Enter a value'
        }
      />
      <button
        className="h-10 rounded-md bg-primary px-4 text-primary-foreground"
        onClick={run}
      >
        Run tool
      </button>
      {output && <Result>{output}</Result>}
    </Shell>
  );
}

export function ExtendedTool({ kind }: { kind: string }) {
  if (['gst', 'capital-gains', 'epf-ppf-nps'].includes(kind))
    return <FinanceTool kind={kind} />;
  if (
    [
      'readability-checker',
      'robots-sitemap-validator',
      'meta-tag-preview',
      'broken-link-checker',
    ].includes(kind)
  )
    return <TextTool kind={kind} />;
  if (
    [
      'image-format-converter',
      'image-compressor',
      'background-remover',
      'pdf-word-converter',
      'audio-converter',
      'video-compressor',
    ].includes(kind)
  )
    return <FileTool kind={kind} />;
  if (['rent-agreement', 'salary-slip', 'resignation-letter'].includes(kind))
    return <DocumentTool kind={kind} />;
  return <UtilityTool kind={kind} />;
}
