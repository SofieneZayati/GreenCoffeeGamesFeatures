function FeatureCard({ feature, checked, copy, onToggle }) {
  return (
    <button
      className={`feat-card${checked ? " checked" : ""}`}
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-tier={feature.tier}
      onClick={() => onToggle(feature.id)}
    >
      <span className="feat-toggle" aria-hidden="true" />
      <span className="feat-tier-dot" aria-hidden="true" />
      <span className="feat-text">
        <span className="feat-name">
          {feature.name}
          {feature.critical && <span className="feat-critical">{copy.common.coreBadge}</span>}
          {feature.isNew && <span className="feat-new">{copy.common.newBadge}</span>}
        </span>
        <span className="feat-desc">{feature.desc}</span>
      </span>
    </button>
  );
}

function TierColumn({ tier, features, selectedSet, copy, onToggle }) {
  const items = features.filter((feature) => feature.tier === tier.key);
  return (
    <div className="col">
      <div className={`col-header ${tier.key}`}>
        <i className={`ti ${tier.icon}`} aria-hidden="true" />
        {tier.label}
      </div>
      {items.length > 0 ? (
        items.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            checked={selectedSet.has(feature.id)}
            copy={copy}
            onToggle={onToggle}
          />
        ))
      ) : (
        <div className="empty-col">{copy.common.noTierFeature.replace("{tier}", tier.label.toLowerCase())}</div>
      )}
    </div>
  );
}

export function FeatureGroup({ group, index = 0, tiers, copy, selectedSet, collapsed, onToggleFeature, onToggleGroup, onSelectAll }) {
  const selectedCount = group.features.filter((feature) => selectedSet.has(feature.id)).length;
  const allSelected = selectedCount === group.features.length;
  const isOpen = !collapsed;
  const selectLabel = allSelected ? copy.common.deselectAll : copy.common.selectAll;

  return (
    <article className={`group-card${isOpen ? " is-open" : " is-closed"}`} role="listitem" style={{ "--group-index": index }}>
      <div className="group-head" onClick={() => onToggleGroup(group.id)} role="button" tabIndex={0} onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggleGroup(group.id);
        }
      }}>
        <div className="group-head-left">
          <div className="gicon"><i className={`ti ${group.icon}`} aria-hidden="true" /></div>
          <div>
            <div className="gtitle">{group.label}</div>
            <div className="gsub">{group.features.length} {copy.common.features}</div>
          </div>
        </div>
        <div className="group-head-right">
          {selectedCount > 0 && <span className="gcount">{selectedCount}</span>}
          <button
            className="gselall"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSelectAll(group.id);
            }}
            aria-label={`${selectLabel} ${group.label}`}
          >
            {selectLabel}
          </button>
          <span className={`group-toggle${isOpen ? " open" : ""}`} aria-hidden="true" />
        </div>
      </div>

      <div className={`feats collapse-panel${isOpen ? " open" : ""}`} aria-hidden={!isOpen} inert={collapsed ? true : undefined}>
        <div className="feats-inner">
          <div className="feats-cols">
            {tiers.map((tier) => (
              <TierColumn
                key={tier.key}
                tier={tier}
                features={group.features}
                selectedSet={selectedSet}
                copy={copy}
                onToggle={onToggleFeature}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
