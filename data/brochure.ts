export const brochure = {
  pdf: "/brochure/billcoin-brochure.pdf",
  pages: Array.from({ length: 13 }, (_, i) => ({
    page: i + 1,
    image: `/brochure/page_${i + 1}_screenshot.png`,
  })),
} as const;

