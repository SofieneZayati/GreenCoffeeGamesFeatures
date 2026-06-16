import { useEffect, useMemo, useState } from "react";
import { GROUPS, TOTAL_FEATURES } from "./data/features";
import { getCopy, getTranslatedGroups, getTranslatedTiers, normalizeLanguage } from "./data/i18n";
import { Drawer } from "./components/Drawer";
import { FeatureGroup } from "./components/FeatureGroup";
import { Intro } from "./components/Intro";
import { QuoteView } from "./components/QuoteView";
import { FilterBar } from "./components/FilterBar";
import { TopBar } from "./components/TopBar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { createProposal, STORAGE_KEYS } from "./utils/proposals";
import { CONTACT_SIGNATURE } from "./data/contact";
import "./styles.css";

function Toast({ message }) {
  return <div className={`toast${message ? " show" : ""}`} role="status" aria-live="polite">{message}</div>;
}

export default function App() {
  const [selectedIds, setSelectedIds] = useLocalStorage(STORAGE_KEYS.currentSelection, []);
  const [proposals, setProposals] = useLocalStorage(STORAGE_KEYS.savedProposals, []);
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, "dark");
  const [language, setLanguage] = useLocalStorage(STORAGE_KEYS.language, "en");
  const [proposalName, setProposalName] = useState("");
  const [collapsedGroupIds, setCollapsedGroupIds] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [activeQuote, setActiveQuote] = useState(null);
  const [languageSwitching, setLanguageSwitching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const safeLanguage = normalizeLanguage(language);
  const copy = useMemo(() => getCopy(safeLanguage), [safeLanguage]);
  const translatedGroups = useMemo(() => getTranslatedGroups(safeLanguage), [safeLanguage]);
  const translatedTiers = useMemo(() => getTranslatedTiers(safeLanguage), [safeLanguage]);
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const collapsedSet = useMemo(() => new Set(collapsedGroupIds), [collapsedGroupIds]);
  const visibleGroups = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return translatedGroups
      .map((group) => {
        const features = group.features.filter((feature) => {
          const matchesTier =
            tierFilter === "all" ||
            feature.tier === tierFilter ||
            (tierFilter === "core" && feature.critical) ||
            (tierFilter === "new" && feature.isNew);
          const haystack = `${group.label} ${feature.name} ${feature.desc}`.toLowerCase();
          const matchesSearch = !query || haystack.includes(query);
          return matchesTier && matchesSearch;
        });
        return { ...group, features };
      })
      .filter((group) => group.features.length > 0);
  }, [translatedGroups, searchTerm, tierFilter]);
  const visibleFeatureCount = useMemo(
    () => visibleGroups.reduce((total, group) => total + group.features.length, 0),
    [visibleGroups]
  );

  useEffect(() => {
    const safeTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = safeTheme;
    document.documentElement.lang = safeLanguage;
  }, [theme, safeLanguage]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2400);
  }

  function updateSelection(updater) {
    setSelectedIds((current) => {
      const nextSet = new Set(current);
      updater(nextSet);
      return [...nextSet];
    });
  }

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  function changeLanguage(nextLanguage) {
    const normalizedLanguage = normalizeLanguage(nextLanguage);
    if (normalizedLanguage === safeLanguage) return;

    setLanguageSwitching(false);
    window.requestAnimationFrame(() => {
      setLanguage(normalizedLanguage);
      setLanguageSwitching(true);
      window.setTimeout(() => setLanguageSwitching(false), 520);
    });
  }

  function toggleFeature(featureId) {
    updateSelection((nextSet) => {
      if (nextSet.has(featureId)) nextSet.delete(featureId);
      else nextSet.add(featureId);
    });
  }

  function toggleGroup(groupId) {
    setCollapsedGroupIds((current) => {
      const nextSet = new Set(current);
      if (nextSet.has(groupId)) nextSet.delete(groupId);
      else nextSet.add(groupId);
      return [...nextSet];
    });
  }

  function selectAllInGroup(groupId, visibleFeatureIds = null) {
    const group = GROUPS.find((item) => item.id === groupId);
    if (!group) return;
    const ids = Array.isArray(visibleFeatureIds) && visibleFeatureIds.length
      ? visibleFeatureIds
      : group.features.map((feature) => feature.id);
    updateSelection((nextSet) => {
      const allSelected = ids.every((featureId) => nextSet.has(featureId));
      for (const featureId of ids) {
        if (allSelected) nextSet.delete(featureId);
        else nextSet.add(featureId);
      }
    });
  }


  function persistProposal(status = "draft") {
    if (selectedIds.length === 0) {
      showToast(copy.toasts.selectFeatureFirst);
      return null;
    }
    const proposal = createProposal({ name: proposalName, selectedIds, status, language: safeLanguage });
    setProposals((current) => [proposal, ...current].slice(0, 30));
    showToast(status === "confirmed" ? copy.toasts.quoteSaved : copy.toasts.choiceSaved);
    return proposal;
  }

  function handleCreateQuote() {
    const proposal = persistProposal("confirmed");
    if (!proposal) return;
    setDrawerOpen(false);
    setActiveQuote(proposal);
  }

  function handleLoadProposal(proposalId) {
    const proposal = proposals.find((item) => item.id === proposalId);
    if (!proposal) return;
    setSelectedIds(proposal.featureIds || []);
    setProposalName(proposal.name || "");
    showToast(copy.toasts.loaded);
  }

  function handleDeleteProposal(proposalId) {
    setProposals((current) => current.filter((proposal) => proposal.id !== proposalId));
    showToast(copy.toasts.deleted);
  }

  function handleClearSelections() {
    setSelectedIds([]);
    showToast(copy.toasts.cleared);
  }

  if (activeQuote) {
    return <QuoteView proposal={activeQuote} language={safeLanguage} copy={copy} onBack={() => setActiveQuote(null)} />;
  }

  return (
    <>
      <h1 className="sr-only">{copy.appTitle}</h1>
      <main className="shell">
        <TopBar
          selectedCount={selectedIds.length}
          theme={theme === "light" ? "light" : "dark"}
          language={safeLanguage}
          tiers={translatedTiers}
          copy={copy}
          onToggleTheme={toggleTheme}
          onChangeLanguage={changeLanguage}
          onOpenDrawer={() => setDrawerOpen(true)}
        />
        <section className={`language-stage${languageSwitching ? " is-switching" : ""}`} data-language={safeLanguage}>
          <Intro copy={copy} />
          <FilterBar
            copy={copy}
            searchTerm={searchTerm}
            tierFilter={tierFilter}
            visibleCount={visibleFeatureCount}
            totalFeatures={TOTAL_FEATURES}
            onSearchChange={setSearchTerm}
            onTierChange={setTierFilter}
          />
          <div className="left" role="list">
            {visibleGroups.length > 0 ? (
              visibleGroups.map((group, index) => (
                <FeatureGroup
                  key={group.id}
                  group={group}
                  index={index}
                  tiers={translatedTiers}
                  copy={copy}
                  selectedSet={selectedSet}
                  collapsed={collapsedSet.has(group.id)}
                  onToggleFeature={toggleFeature}
                  onToggleGroup={toggleGroup}
                  onSelectAll={selectAllInGroup}
                />
              ))
            ) : (
              <div className="empty-results" role="status">
                <i className="ti ti-filter-x" aria-hidden="true" />
                <strong>{copy.filters.emptyTitle}</strong>
                <span>{copy.filters.emptyCopy}</span>
              </div>
            )}
          </div>
          <footer className="creator-credit" aria-label="Project contact">
            <div className="creator-credit-mark" aria-hidden="true">
              <i className="ti ti-cup" />
            </div>
            <div className="creator-credit-main">
              <span className="creator-credit-label">Prepared by</span>
              <strong>{CONTACT_SIGNATURE.name}</strong>
            </div>
            <div className="creator-credit-contact">
              <a href={`tel:${CONTACT_SIGNATURE.phone.replaceAll(" ", "")}`}>
                <span>Phone</span>
                {CONTACT_SIGNATURE.phone}
              </a>
              <a href={`mailto:${CONTACT_SIGNATURE.email}`}>
                <span>Email</span>
                {CONTACT_SIGNATURE.email}
              </a>
            </div>
          </footer>
        </section>
      </main>
      <Drawer
        open={drawerOpen}
        selectedIds={selectedIds}
        proposalName={proposalName}
        proposals={proposals}
        language={safeLanguage}
        copy={copy}
        onClose={() => setDrawerOpen(false)}
        onProposalNameChange={setProposalName}
        onSaveProposal={persistProposal}
        onCreateQuote={handleCreateQuote}
        onLoadProposal={handleLoadProposal}
        onDeleteProposal={handleDeleteProposal}
        onClearSelections={handleClearSelections}
      />
      <Toast message={toast} />
    </>
  );
}
