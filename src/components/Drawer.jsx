import { formatDateTime, getProposalPackage, getSelectedGroups, getTierCounts } from "../utils/proposals";

function fillCount(template, count, language) {
  const plural = count === 1 ? "" : "s";
  if (language === "fr") {
    return template.replace("{count}", count).replaceAll("{plural}", plural);
  }
  return template.replace("{count}", count).replace("{plural}", plural);
}

export function Drawer({
  open,
  selectedIds,
  proposalName,
  proposals,
  language,
  copy,
  onClose,
  onProposalNameChange,
  onSaveProposal,
  onCreateQuote,
  onLoadProposal,
  onDeleteProposal,
  onClearSelections,
}) {
  const counts = getTierCounts(selectedIds);
  const groupsCovered = getSelectedGroups(selectedIds, language).length;

  return (
    <>
      <div className={`overlay${open ? " open" : ""}`} onClick={onClose} />
      <aside className={`drawer${open ? " open" : ""}`} aria-label={copy.drawer.aria}>
        <div className="drawer-header">
          <span className="drawer-title">{copy.drawer.title}</span>
          <button className="drawer-close" type="button" onClick={onClose} aria-label={copy.drawer.close}>
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-section-label">{copy.drawer.selection}</div>
          <div className="stat-row"><span className="stat-label">{copy.drawer.totalFeatures}</span><span className="stat-val">{selectedIds.length}</span></div>
          <div className="stat-row"><span className="stat-label">{copy.drawer.starterFeatures}</span><span className="stat-val">{counts.starter}</span></div>
          <div className="stat-row"><span className="stat-label">{copy.drawer.advancedFeatures}</span><span className="stat-val">{counts.advanced}</span></div>
          <div className="stat-row"><span className="stat-label">{copy.drawer.premiumFeatures}</span><span className="stat-val">{counts.premium}</span></div>
          <div className="stat-row"><span className="stat-label">{copy.drawer.categoriesCovered}</span><span className="stat-val">{groupsCovered}</span></div>
          <div className="stat-divider" />

          <div className="drawer-section-label">{copy.drawer.pricingGuide}</div>
          <div className="price-card">
            <div className="price-tier sta">{copy.drawer.starterPackage}</div>
            <div className="price-amount">{copy.drawer.starterAmount}<span className="price-currency">{copy.drawer.currency}</span></div>
            <div className="price-note">{copy.drawer.starterNote}</div>
          </div>
          <div className="price-card advanced-card">
            <div className="price-tier adv">{copy.drawer.advancedPackage}</div>
            <div className="price-amount">{copy.drawer.advancedAmount}<span className="price-currency">{copy.drawer.currency}</span></div>
            <div className="price-note">{copy.drawer.advancedNote}</div>
          </div>
          <div className="price-card premium-card">
            <div className="price-tier pre">{copy.drawer.premiumPackage}</div>
            <div className="price-amount">{copy.drawer.premiumAmount}<span className="price-currency">{copy.drawer.premiumCurrency}</span></div>
            <div className="price-note">{copy.drawer.premiumNote}</div>
          </div>
          <div className="price-note drawer-note">{copy.drawer.printNote}</div>
          <div className="stat-divider" />
        </div>

        <div className="drawer-footer">
          <div className="proposal-panel">
            <div className="drawer-section-label">{copy.drawer.saveQuote}</div>
            <input
              className="form-field"
              type="text"
              maxLength="60"
              placeholder={copy.drawer.proposalPlaceholder}
              value={proposalName}
              onChange={(event) => onProposalNameChange(event.target.value)}
            />
            <div className="action-row two">
              <button className="action-btn secondary" type="button" onClick={() => onSaveProposal("draft")}>
                <i className="ti ti-device-floppy" aria-hidden="true" /> {copy.drawer.saveChoice}
              </button>
              <button className="action-btn primary" type="button" onClick={onCreateQuote}>
                <i className="ti ti-file-invoice" aria-hidden="true" /> {copy.drawer.createQuote}
              </button>
            </div>
            <div className="autosave-note"><span className="status-dot" aria-hidden="true" /><span>{selectedIds.length ? fillCount(copy.drawer.autosaveSelected, selectedIds.length, language) : copy.drawer.autosaveEmpty}</span></div>
            <div className="drawer-section-label saved-heading">{copy.drawer.savedChoices}</div>
            <div className="saved-list">
              {proposals.length === 0 ? (
                <div className="saved-empty">{copy.drawer.savedEmpty}</div>
              ) : (
                proposals.map((proposal) => (
                  <article className="saved-item" key={proposal.id}>
                    <div className="saved-top">
                      <div>
                        <div className="saved-name">{proposal.name || copy.drawer.untitledProposal}</div>
                        <div className="saved-meta">{getProposalPackage(proposal, language)} • {proposal.total || 0} {copy.common.features} • {formatDateTime(proposal.createdAt, language)}</div>
                      </div>
                      <span className={`saved-badge ${proposal.status === "confirmed" ? "confirmed" : ""}`}>{proposal.status === "confirmed" ? copy.drawer.confirmed : copy.drawer.draft}</span>
                    </div>
                    <div className="saved-actions">
                      <button className="mini-btn" type="button" onClick={() => onLoadProposal(proposal.id)}>{copy.common.load}</button>
                      <button className="mini-btn" type="button" onClick={() => onDeleteProposal(proposal.id)}>{copy.common.delete}</button>
                    </div>
                  </article>
                ))
              )}
            </div>
            <button className="clear-btn" type="button" onClick={onClearSelections}>{copy.drawer.clear}</button>
          </div>
        </div>
      </aside>
    </>
  );
}
