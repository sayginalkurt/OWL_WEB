import Script from "next/script";

export function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function buildJsonLd(data: object, id?: string) {
  return <JsonLd id={id ?? "jsonld"} data={data} />;
}
