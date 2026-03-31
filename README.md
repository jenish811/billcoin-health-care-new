# Billcoin Health Care — Brand Website

Modern, responsive, premium information website built with:
- Next.js (App Router) + React + TypeScript
- Tailwind CSS (v4 token-based theming in `app/globals.css`)
- Framer Motion animations

## Image Setup (Important)
Place all images in `public/images/`.

The UI references these easy-to-edit placeholder paths (update anytime in `data/products.ts`):
- `public/images/handwash-1.jpeg`
- `public/images/dishwash-1.jpeg`
- `public/images/detergent-1.jpeg`
- `public/images/toilet-cleaner-1.jpeg`
- `public/images/glass-cleaner-1.jpeg`
- `public/images/surface-cleaner-rose.jpeg`
- `public/images/surface-cleaner-lemon.jpeg`
- `public/images/surface-cleaner-lavender.jpeg`
- `public/images/surface-cleaner-jasmine.jpeg`
- `public/images/hero-cleaning.png`
- `public/images/about-brand.png`
- `public/images/distributor-box.png`

Brochure assets:
- `public/brochure/billcoin-brochure.pdf`
- `public/brochure/page_1_screenshot.png` … `public/brochure/page_13_screenshot.png`

## Run Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Using Images From `D:\images` (Optional)
If your assets already exist at `D:\images`, you can copy/rename them into the project with:
```powershell
cd "d:\web demo\billcoin-health-care"
powershell -ExecutionPolicy Bypass -File .\scripts\sync-assets-from-d-images.ps1
```

## Edit Content
- Products + categories: `data/products.ts`
- Home/About page content blocks: `data/content.ts`
- Brand + contact details: `data/site.ts`

## Pages
- Home: `app/page.tsx`
- Products: `app/products/page.tsx`
- About: `app/about/page.tsx`
- Contact: `app/contact/page.tsx`
