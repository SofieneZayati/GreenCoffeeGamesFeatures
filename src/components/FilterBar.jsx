export function FilterBar({ copy, searchTerm, tierFilter, visibleCount, totalFeatures, onSearchChange, onTierChange }) {
  const filters = [
    { key: "all", label: copy.filters.all, icon: "ti-layout-grid" },
    { key: "starter", label: copy.packages.starter.shortLabel, icon: "ti-seedling" },
    { key: "advanced", label: copy.packages.advanced.shortLabel, icon: "ti-rocket" },
    { key: "premium", label: copy.packages.premium.shortLabel, icon: "ti-sparkles" },
    { key: "core", label: copy.filters.core, icon: "ti-shield-check" },
    { key: "new", label: copy.filters.new, icon: "ti-bolt" },
  ];

  return (
    <section className="filter-console" aria-label={copy.filters.aria}>
      <div className="search-wrap">
        <i className="ti ti-search" aria-hidden="true" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={copy.filters.searchPlaceholder}
        />
        {searchTerm && (
          <button className="search-clear" type="button" onClick={() => onSearchChange("")} aria-label={copy.filters.clearSearch}>
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="filter-pills" role="list" aria-label={copy.filters.filterBy}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-pill${tierFilter === filter.key ? " active" : ""}`}
            type="button"
            onClick={() => onTierChange(filter.key)}
          >
            <i className={`ti ${filter.icon}`} aria-hidden="true" />
            {filter.label}
          </button>
        ))}
      </div>
      <div className="filter-result-count" aria-live="polite">
        <strong>{visibleCount}</strong> / {totalFeatures} {copy.common.features}
      </div>
    </section>
  );
}
