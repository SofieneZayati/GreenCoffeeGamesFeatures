import { PRESETS } from "../data/presets";
import { getTierCounts, recommendedPackage } from "../utils/proposals";

function percent(value, total) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

export function SmartPlanner({ copy, language, selectedIds, totalFeatures, onApplyPreset, onOpenDrawer }) {
  const counts = getTierCounts(selectedIds);
  const selectedCount = selectedIds.length;
  const completion = percent(selectedCount, totalFeatures);
  const packageName = recommendedPackage(selectedIds, language);
  const hasSelection = selectedCount > 0;
  const focus = counts.premium ? copy.smart.focusPremium : counts.advanced ? copy.smart.focusAdvanced : counts.starter ? copy.smart.focusStarter : copy.smart.focusEmpty;

  return (
    <section className="smart-planner" aria-label={copy.smart.aria}>
      <div className="smart-panel smart-main-panel">
        <div className="smart-orb" aria-hidden="true">
          <i className="ti ti-brain" />
        </div>
        <div className="smart-copy">
          <span className="section-kicker"><i className="ti ti-wand" aria-hidden="true" /> {copy.smart.kicker}</span>
          <h2>{copy.smart.title}</h2>
          <p>{copy.smart.subtitle}</p>
          <div className="smart-status-grid">
            <div>
              <span>{copy.smart.currentBuild}</span>
              <strong>{hasSelection ? packageName : copy.smart.notStarted}</strong>
            </div>
            <div>
              <span>{copy.smart.scopeFocus}</span>
              <strong>{focus}</strong>
            </div>
            <div>
              <span>{copy.smart.selectionPower}</span>
              <strong>{completion}%</strong>
            </div>
          </div>
        </div>
        <button className="smart-cta" type="button" onClick={onOpenDrawer}>
          <i className="ti ti-file-analytics" aria-hidden="true" />
          {copy.smart.viewSummary}
        </button>
      </div>

      <div className="preset-grid" aria-label={copy.smart.presetsLabel}>
        {PRESETS.map((preset) => {
          const presetCopy = copy.presets[preset.id];
          return (
            <button className={`preset-card ${preset.tone}`} type="button" key={preset.id} onClick={() => onApplyPreset(preset.id)}>
              <span className="preset-icon"><i className={`ti ${preset.icon}`} aria-hidden="true" /></span>
              <span className="preset-copy">
                <strong>{presetCopy.title}</strong>
                <span>{presetCopy.desc}</span>
              </span>
              <span className="preset-count">{preset.featureIds.length}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
