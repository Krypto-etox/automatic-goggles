export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted data from the registry/config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
