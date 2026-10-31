# Mekden Works Website

A responsive React + TypeScript + Vite website for Mekden Works.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder.
3. Open a terminal in this folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite.

## Build for hosting

```bash
npm run build
```

The production website is generated in `dist/`.

## Brand logo

The supplied Mekden Works logo is already included at:

`public/mekden-logo.png`

## Add the seven PDFs

Put the real PDFs inside `public/products/`. Use these exact filenames:

- `01-100-Reel-Hooks.pdf`
- `02-100-Content-Ideas.pdf`
- `03-30-Day-Content-Calendar.pdf`
- `04-50-Reel-Scripts.pdf`
- `05-100-Caption-CTA-Bank.pdf`
- `06-Instagram-Profile-Optimization-Guide.pdf`
- `07-Creator-Growth-Posting-System.pdf`

## Pricing

Pricing is configured in `src/App.tsx`:

- Original price: ₹299
- Current price: ₹149
- Displayed saving: YOU SAVE 50%

The website does not display the saved rupee amount.

## Payment safety / launch status

The checkout is deliberately a preview and is not a live payment integration. Do not publish it as a working checkout until you have an approved payment provider/merchant arrangement and a secure way to verify successful transactions.

After a suitable payment provider is chosen, connect its official checkout/API on a secure backend. Never put secret API keys in frontend code. Do not accept screenshots or a customer-entered reference as proof of payment.

## Contact and social links

Update `STORE_CONFIG` in `src/App.tsx` with the official Instagram URL and contact email before publishing.
