$ErrorActionPreference = "Stop"

# Sync assets from D:\images into this Next.js project.
# You can edit the mappings below if your filenames change.

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceDir = "D:\images"

$imagesDest = Join-Path $projectRoot "public\images"
$brochureDest = Join-Path $projectRoot "public\brochure"

New-Item -ItemType Directory -Force $imagesDest | Out-Null
New-Item -ItemType Directory -Force $brochureDest | Out-Null

$imageMap = @{
  # Brand logo
  "web_logo.png"                                        = "web_logo.png"

  # Products (used across Home + Products pages)
  # Hand Wash
  "WhatsApp Image 2026-03-25 at 12.48.59 PM (2).jpeg"  = "handwash-200ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.49.03 PM.jpeg"      = "handwash-500ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.48.58 PM (2).jpeg"  = "handwash-5l.jpeg"

  # Dish Wash Liquid
  "WhatsApp Image 2026-03-25 at 12.48.55 PM.jpeg"      = "dishwash-500ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.49.01 PM.jpeg"      = "dishwash-750ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.49.04 PM.jpeg"      = "dishwash-4_5l.jpeg"

  # Liquid Detergent
  "WhatsApp Image 2026-03-25 at 12.49.01 PM (1).jpeg"  = "detergent-1l.jpeg"
  "WhatsApp Image 2026-03-25 at 12.48.57 PM (2).jpeg"  = "detergent-5l.jpeg"
  "WhatsApp Image 2026-03-25 at 12.49.03 PM (2).jpeg"  = "detergent-matic-5l.jpeg"

  # Toilet Cleaner
  "WhatsApp Image 2026-03-25 at 12.49.02 PM (2).jpeg"  = "toilet-cleaner-500ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.49.00 PM.jpeg"      = "toilet-cleaner-5l.jpeg"

  # Glass Cleaner (only one image available in `D:\images` for this demo set)
  "WhatsApp Image 2026-03-25 at 12.48.56 PM.jpeg"      = "glass-cleaner-500ml.jpeg"

  # Surface Cleaner
  "WhatsApp Image 2026-03-25 at 12.49.03 PM (1).jpeg"  = "surface-cleaner-rose.jpeg"
  "WhatsApp Image 2026-03-25 at 12.48.59 PM.jpeg"      = "surface-cleaner-lemon-500ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.48.56 PM (1).jpeg"  = "surface-cleaner-lemon-1l.jpeg"
  "WhatsApp Image 2026-03-25 at 12.48.56 PM (3).jpeg"  = "surface-cleaner-lavender-500ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.48.57 PM (3).jpeg"  = "surface-cleaner-lavender-1l.jpeg"
  "WhatsApp Image 2026-03-25 at 12.49.02 PM (1).jpeg"  = "surface-cleaner-jasmine-500ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.49.02 PM.jpeg"      = "surface-cleaner-jasmine-1l.jpeg"

  # Personal Care
  "WhatsApp Image 2026-03-25 at 12.48.58 PM (1).jpeg"  = "shampoo-rosemary-200ml.jpeg"
  "WhatsApp Image 2026-03-25 at 12.48.56 PM (2).jpeg"  = "hair-oil-herbal-100ml.jpeg"

  # Hero / About / Distributor visuals (you can replace these later)
  # These are copied from `public/brochure` screenshots after you generate them.
  "public\\brochure\\page_3_screenshot.png"            = "hero-cleaning.png"
  "public\\brochure\\page_2_screenshot.png"            = "about-brand.png"
  "public\\brochure\\page_13_screenshot.png"           = "distributor-box.png"
}

foreach ($src in $imageMap.Keys) {
  $destName = $imageMap[$src]
  $from = if ($src.StartsWith("public\\")) { Join-Path $projectRoot $src } else { Join-Path $sourceDir $src }
  $to = Join-Path $imagesDest $destName

  if (-not (Test-Path $from)) {
    Write-Warning "Missing: $from"
    continue
  }

  Copy-Item -Force $from $to
  Write-Host "Copied: $destName"
}

# Brochure PDF
$pdfFrom = Join-Path $sourceDir "billcoin broch.. a.pdf"
$pdfTo = Join-Path $brochureDest "billcoin-brochure.pdf"
if (Test-Path $pdfFrom) {
  Copy-Item -Force $pdfFrom $pdfTo
  Write-Host "Copied: public/brochure/billcoin-brochure.pdf"
} else {
  Write-Warning "Missing brochure PDF: $pdfFrom"
}

Write-Host ""
Write-Host "Done. Start dev server:"
Write-Host "  npm run dev"
