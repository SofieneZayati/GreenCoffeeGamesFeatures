# Green Coffee — Corrected Client Feature Selector

React/Vite feature selector for Green Coffee. This corrected version is structured for a real client conversation: Starter stays simple, Advanced contains accounts/operations, and Premium is reserved for impressive future add-ons.

## Corrected structure

1. Website & brand
2. Digital menu & QR menu
3. Simple reservation & contact
4. Basic admin menu manager
5. Customer accounts
6. Advanced reservation system
7. Table QR ordering
8. Staff dashboard & operations
9. Payments & receipts
10. Loyalty & promotions
11. Analytics & reports
12. Marketing & customer feedback
13. AI & automation
14. Security, roles & back office
15. Launch & service

## Important correction

- Starter reservation is now only a simple request: name, phone, date, time, guests, and note.
- Anything requiring customer account/login is now Advanced: reservation history, modify/cancel reservation, reminders, and managed reservation calendar.
- Quote pricing logic is corrected: Advanced is treated as the bigger baseline package, not Starter + Advanced added together.

## Highlights

- Smart preset packages: Launch MVP, QR Ordering, Loyalty Growth, Premium WOW.
- Search and filter console for quickly finding modules by keyword, tier, core status, or new features.
- EN/FR mixed-language UI suitable for Tunisian client conversations.
- White/dark mode with smooth UI transitions.
- Saved selections stored in browser localStorage.
- Clean summary drawer with pricing guide and selected feature counts.
- Quote/PDF view with selected features, commercial lines, starting estimate, realisation, approval area, and scope exclusions.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Deployment notes

Send the client a deployed link, not the source zip. For Vercel/Netlify, upload this clean project without `node_modules`, `.git`, or old `dist` folders. The build command is:

```bash
npm run build
```

The output folder is:

```bash
dist
```
