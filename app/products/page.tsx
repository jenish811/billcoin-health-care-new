import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductsExplorer } from "@/components/sections/ProductsExplorer";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Billcoin Health Care products across hand wash, dish wash, detergents, toilet cleaners, glass cleaners, and surface cleaners.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;

  return (
    <section className="section-y">
      <Container>
        <ProductsExplorer initialCategory={category} />
      </Container>
    </section>
  );
}

