import { LANGUAGES } from "../data/i18n";
import { TOTAL_FEATURES } from "../data/features";

export function TopBar({
  selectedCount,
  theme,
  language,
  tiers,
  copy,
  onToggleTheme,
  onChangeLanguage,
  onOpenDrawer,
}) {
  const progress = TOTAL_FEATURES ? (selectedCount / TOTAL_FEATURES) * 100 : 0;
  const themeText = theme === "dark" ? copy.controls.switchToLight : copy.controls.switchToDark;
  const themeIcon = theme === "dark" ? "ti-sun" : "ti-moon";

  function handleLanguageTrackClick(event) {
    if (event.target.closest(".lang-tab")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    const nextLanguage = event.clientX < midpoint ? LANGUAGES[0].key : LANGUAGES[1].key;
    onChangeLanguage(nextLanguage);
  }

  return (
    <header className="topbar cafe-nav">
      <div className="topbar-main">
        <div className="logo cafe-brand">
          <div className="logo-mark cafe-logo-mark">
            <img src="/logo.jpg" alt="Green Coffee Games logo" />
          </div>
          <div className="logo-copy">
            <div className="logo-kicker"><i className="ti ti-cup" aria-hidden="true" /> {copy.topbar.badge}</div>
            <div className="logo-text">Green Coffee</div>
            <div className="logo-sub">{copy.topbar.subtitle}</div>
          </div>
        </div>

        <div className="topbar-status" aria-label={copy.topbar.progressLabel}>
          <span className="status-bean" aria-hidden="true" />
          <div className="status-copy">
            <strong>{selectedCount}</strong>
            <span>{copy.common.features}</span>
          </div>
          <div className="progress-wrap nav-progress">
            <div className="progress-bar" role="progressbar" aria-label={copy.topbar.progressLabel} aria-valuenow={selectedCount} aria-valuemax={TOTAL_FEATURES}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-label">{selectedCount} / {TOTAL_FEATURES}</span>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="mode-btn nav-pill" type="button" onClick={onToggleTheme} aria-label={`${copy.controls.themeLabel}: ${themeText}`}>
            <i className={`ti ${themeIcon}`} aria-hidden="true" />
            <span>{themeText}</span>
          </button>
          <div
            className="lang-tabs nav-lang"
            role="tablist"
            aria-label={copy.controls.languageLabel}
            data-active-lang={language}
            onClick={handleLanguageTrackClick}
          >
            <span className="lang-indicator" aria-hidden="true" />
            {LANGUAGES.map((item) => (
              <button
                key={item.key}
                className={`lang-tab${language === item.key ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={language === item.key}
                onClick={() => onChangeLanguage(item.key)}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <button className="summary-btn nav-summary" type="button" onClick={onOpenDrawer} aria-label={copy.controls.summary}>
            <span className="summary-btn-icon" aria-hidden="true">
              <i className="ti ti-shopping-bag-check" />
            </span>
            <span className="summary-btn-text">{copy.controls.summaryText}</span>
            <span className="summary-btn-count" aria-hidden="true">{selectedCount}</span>
          </button>
        </div>
      </div>

      <nav className="topbar-menu-strip" aria-label="Coffee shop package tiers">
        <span className="menu-strip-label"><i className="ti ti-menu-2" aria-hidden="true" /> {language === "fr" ? "Menu café" : "Café menu"}</span>
        <div className="tier-legend" aria-label="Tier legend">
          {tiers.map((tier) => (
            <span className={`legend-pill ${tier.key}`} key={tier.key}>{tier.label}</span>
          ))}
        </div>
      </nav>
    </header>
  );
}
