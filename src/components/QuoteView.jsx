import { getCommercialTiers } from "../data/i18n";
import { formatDate, getProposalGroups } from "../utils/proposals";

const TIER_ORDER = ["starter", "advanced", "premium"];

function pluralizeSelected(template, count, language) {
  const plural = count === 1 ? "" : "s";
  if (language === "fr") return template.replace("{count}", count).replaceAll("{plural}", plural);
  return template.replace("{count}", count).replace("{plural}", plural);
}

function FeatureMatrix({ groups, copy, tiers, language }) {
  const tierLabels = Object.fromEntries(tiers.map((tier) => [tier.key, tier.shortLabel || tier.label]));

  if (!groups.length) {
    return <p className="quote-empty">{copy.quote.noSelectedModules}</p>;
  }

  return (
    <table className="quote-table quote-matrix">
      <thead>
        <tr>
          <th>{copy.quote.category}</th>
          {TIER_ORDER.map((tier) => <th key={tier}>{tierLabels[tier]}</th>)}
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => {
          const byTier = { starter: [], advanced: [], premium: [] };
          for (const feature of group.features) {
            if (byTier[feature.tier]) byTier[feature.tier].push(feature);
          }
          return (
            <tr key={group.label}>
              <th scope="row">
                {group.label}
                <small>{pluralizeSelected(copy.quote.selectedCount, group.features.length, language)}</small>
              </th>
              {TIER_ORDER.map((tier) => (
                <td key={tier}>
                  {byTier[tier].length ? (
                    <ul>
                      {byTier[tier].map((feature) => (
                        <li key={feature.id}>
                          {feature.name}
                          {feature.critical && <span> ({copy.quote.core})</span>}
                          {feature.isNew && <span> ({copy.quote.new})</span>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="quote-dash">{copy.quote.dash}</span>
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function QuoteView({ proposal, language, copy, onBack }) {
  const groups = getProposalGroups(proposal, language);
  const quoteDate = formatDate(proposal.createdAt, language);
  const commercialTiers = getCommercialTiers(language);
  const totalFeatures = groups.reduce((total, group) => total + group.features.length, 0);
  const categoryCount = groups.length;

  return (
    <div className="quote-screen">
      <div className="quote-toolbar">
        <button className="quote-toolbar-btn light" type="button" onClick={onBack}>
          <i className="ti ti-arrow-left" aria-hidden="true" /> {copy.quote.back}
        </button>
        <button className="quote-toolbar-btn primary" type="button" onClick={() => window.print()}>
          <i className="ti ti-printer" aria-hidden="true" /> {copy.quote.print}
        </button>
      </div>

      <main className="quote-sheet feature-selection-sheet">
        <header className="quote-header">
          <div className="quote-brand">
            <div className="quote-logo">
              <img src="/logo.jpg" alt="Green Coffee Games logo" />
            </div>
            <div>
              <div className="quote-eyebrow">{copy.quote.eyebrow}</div>
              <h1>{copy.quote.title}</h1>
              <p>{copy.quote.subtitle}</p>
            </div>
          </div>
          <div className="quote-status">
            <span>{(proposal.status === "confirmed" ? copy.drawer.confirmed : copy.drawer.draft).toUpperCase()}</span>
            <small>{quoteDate}</small>
          </div>
        </header>

        <section className="quote-hero selection-hero">
          <div className="quote-card">
            <span className="quote-label">{copy.quote.proposal}</span>
            <h2>{proposal.name}</h2>
            <p>{copy.quote.quoteDate}: {quoteDate}</p>
          </div>
          <div className="quote-card selection-summary-card">
            <span className="quote-label">{copy.drawer.selection}</span>
            <strong>{totalFeatures}</strong>
            <p>{copy.quote.modules} • {categoryCount} {copy.quote.categories.toLowerCase()}</p>
          </div>
        </section>

        <section className="quote-metrics feature-metrics">
          <div><span>{copy.quote.modules}</span><strong>{totalFeatures}</strong></div>
          <div><span>{copy.quote.categories}</span><strong>{categoryCount}</strong></div>
        </section>

        <section className="quote-section quote-features">
          <h3>{copy.quote.selectedFeatures}</h3>
          <FeatureMatrix groups={groups} copy={copy} tiers={commercialTiers} language={language} />
          <p className="quote-hint">{copy.quote.hint}</p>
        </section>

        <section className="quote-approval compact-section">
          <strong>{copy.quote.approval}</strong>
          <div className="quote-signatures">
            <div>{copy.quote.clientSignature}</div>
            <div>{copy.quote.date}</div>
          </div>
        </section>

        <footer className="quote-footer">
          <span>{copy.quote.footerLeft}</span>
          <span>{copy.quote.footerRight}</span>
        </footer>
      </main>
    </div>
  );
}
