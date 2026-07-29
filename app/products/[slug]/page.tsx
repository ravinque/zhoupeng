import { notFound } from "next/navigation";
import { productSystems } from "../../catalog-data";
import ProductDetail from "./product-detail";

export const dynamicParams = false;
export function generateStaticParams() {
  return productSystems.map(({ slug }) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!productSystems.some((item) => item.slug === slug)) notFound();
  return <ProductDetail slug={slug} />;
}
