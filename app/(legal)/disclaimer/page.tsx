import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'ToolNest provides estimates, not professional financial, tax or legal advice.',
};

export default function DisclaimerPage() {
  return (
    <>
      <h1>Disclaimer</h1>
      <p>
        The calculators, converters and document generators on ToolNest are
        provided for general informational and educational purposes only.
      </p>
      <h2>Financial & tax tools</h2>
      <p>
        Tax slabs, PF rates, GST rules and other financial data are centralized
        in versioned configuration files and updated after government
        notifications, but they may lag official changes. Results are estimates
        and may differ from your actual liability due to your specific
        circumstances. Cross-check with the official Income Tax Department
        calculator or a chartered accountant before filing returns or making
        financial decisions.
      </p>
      <h2>Legal documents</h2>
      <p>
        Rent agreements, offer letters and other generated documents are
        templates, not legal advice. Stamp duty, registration and
        enforceability vary by state and change over time — consult a qualified
        lawyer before executing any document.
      </p>
      <h2>File conversions</h2>
      <p>
        Conversions run locally and are best-effort. Complex layouts and
        proprietary formats may not convert perfectly; always review the output.
      </p>
      <p className="mt-6 text-muted">
        ToolNest is not affiliated with any government body.
      </p>
    </>
  );
}
