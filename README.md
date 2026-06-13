# Green Coffee Games — React Feature Selector

This is the React refactor of the original single-file HTML feature selector.

## What changed

- The old DOM-heavy script was split into React components.
- The feature data now lives in `src/data/features.js`.
- Added the Green Coffee Games logo to the site header and printable PDF view.
- Added persistent White/Dark mode controls in the top bar.
- Added EN/FR language tabs with French UI and feature translations.
- Selection state and saved proposals are handled with React state + localStorage.
- The old generated-PDF logic is removed.
- PDF export is now a clean React print screen with a `Print / Save as PDF` button.
- No jsPDF, no coordinate-based PDF drawing, no popup quote window.
- The printable PDF summary is pure feature selection: no prices, totals, commercial estimates, or estimated delivery time.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    Drawer.jsx
    FeatureGroup.jsx
    Intro.jsx
    QuoteView.jsx
    TopBar.jsx
  data/
    features.js
    i18n.js
  hooks/
    useLocalStorage.js
  utils/
    proposals.js
  App.jsx
  main.jsx
  styles.css
```

## Feature-selection PDF flow

1. Select the features.
2. Open the right summary panel.
3. Click `Create PDF summary`.
4. Review the clean feature-selection screen.
5. Click `Print / Save as PDF` and choose `Save as PDF` in the browser print dialog. The generated PDF contains only the selected features, with no prices and no estimated realisation time.
