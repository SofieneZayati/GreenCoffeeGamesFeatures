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

  return (
    <div className="topbar">
      <div className="logo">
        <div className="logo-mark">
          <img src="/logo.jpg" alt="Green Coffee Games logo" />
        </div>
        <div>
          <div className="logo-text">Green Coffee Games</div>
          <div className="logo-sub">{copy.topbar.subtitle}</div>
        </div>
      </div>

      <div className="topbar-center">
        <div className="progress-wrap">
          <div className="progress-bar" role="progressbar" aria-label={copy.topbar.progressLabel} aria-valuenow={selectedCount} aria-valuemax={TOTAL_FEATURES}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">{selectedCount} / {TOTAL_FEATURES}</span>
        </div>
      </div>

      <div className="tier-legend" aria-label="Tier legend">
        {tiers.map((tier) => (
          <span className={`legend-pill ${tier.key}`} key={tier.key}>{tier.label}</span>
        ))}
      </div>

      <div className="topbar-right">
        <button className="mode-btn" type="button" onClick={onToggleTheme} aria-label={`${copy.controls.themeLabel}: ${themeText}`}>
          <i className={`ti ${themeIcon}`} aria-hidden="true" />
          <span>{themeText}</span>
        </button>
        <div className="lang-tabs" role="tablist" aria-label={copy.controls.languageLabel}>
          {LANGUAGES.map((item) => (
            <button
              key={item.key}
              className={`lang-tab${language === item.key ? " active" : ""}`}
              type="button"
              role="tab"
              aria-selected={language === item.key}
              onClick={() => onChangeLanguage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="icon-btn" type="button" onClick={onOpenDrawer} aria-label={copy.controls.summary}>
          <i className="ti ti-layout-sidebar-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
