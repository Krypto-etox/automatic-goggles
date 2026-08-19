import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How ToolNest handles your data: most processing happens in your browser; files are never uploaded.',
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="text-muted">Last updated: August 2026</p>
      <p>
        ToolNest is designed around privacy. Most tools — file and image
        converters, QR generators, finance and text calculators — run entirely
        in your browser. The data you enter never leaves your device.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Analytics:</strong> aggregate, privacy-friendly usage metrics
          (page views, country, device type) via Vercel Analytics. No personal
          identifiers are stored.
        </li>
        <li>
          <strong>Server routes:</strong> the broken-link checker and meta-tag
          preview receive only the URL you submit, to fetch it server-side and
          bypass browser CORS restrictions. We do not log the contents of the
          pages returned.
        </li>
        <li>
          <strong>Local storage:</strong> optional features such as the warranty
          tracker save data only in your browser via <code>localStorage</code>.
        </li>
      </ul>
      <h2>Cookies</h2>
      <p>
        We do not use advertising cookies. A single preference cookie remembers
        your light/dark theme choice. If advertising is added in the future,
        this policy will be updated and consent requested where required.
      </p>
      <h2>Your data</h2>
      <p>
        Because files and inputs are processed locally, there is nothing for you
        to request deletion of. Clearing your browser data removes anything
        stored locally.
      </p>
    </>
  );
}
