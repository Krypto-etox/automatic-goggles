import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms under which you may use ToolNest’s free tools.',
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Use</h1>
      <p className="text-muted">Last updated: August 2026</p>
      <p>
        By using ToolNest you agree to these terms. The tools are provided free
        of charge, “as is”, without warranty of any kind.
      </p>
      <h2>Acceptable use</h2>
      <p>
        You may not use the server-based tools (broken-link checker, meta-tag
        preview) to abuse, overload, or attack third-party websites, or to
        access content you do not have permission to access.
      </p>
      <h2>No professional advice</h2>
      <p>
        Financial, tax and legal tools produce estimates for educational
        purposes only and are not a substitute for advice from a qualified
        chartered accountant, financial adviser or lawyer. Always verify
        results against official sources.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, ToolNest shall not be liable for
        any direct, indirect or consequential damages arising from the use of
        the tools, including decisions based on their output.
      </p>
    </>
  );
}
