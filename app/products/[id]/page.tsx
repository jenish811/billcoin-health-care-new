import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";
import { siteConfig } from "@/data/site";
import { products } from "@/data/products";

type Params = { id: string };

export async function generateStaticParams(): Promise<Params[]> {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.title} | Products`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const productUrl = `https://${siteConfig.contact.website}/products/${product.id}`;
  const sp = (await searchParams) ?? {};
  const initialVariantId = typeof sp.variant === "string" ? sp.variant : undefined;

  return (
    <section className="section-y">
      <Container>
        <ProductDetailsClient
          product={product}
          productUrl={productUrl}
          initialVariantId={initialVariantId}
        />
      </Container>
    </section>
  );
}
