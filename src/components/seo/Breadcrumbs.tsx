import { SITE_URL } from "@/lib/seo";

interface Crumb {
  name: string;
  path: string;
}

export function BreadcrumbsJsonLd({
  items,
}: {
  items: Crumb[];
}): React.ReactElement {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
