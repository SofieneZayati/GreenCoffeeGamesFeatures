import { GROUPS } from "../data/features";
import { getCommercialTiers, getCopy, getLocale, getPackageLabel, getTranslatedGroups } from "../data/i18n";

export const STORAGE_KEYS = {
  currentSelection: "gc_react_current_selection_v1",
  savedProposals: "gc_react_saved_proposals_v1",
  theme: "gc_react_theme_v1",
  language: "gc_react_language_v1",
};

export const COMMERCIAL_TIERS = [
  {
    key: "starter",
    label: "Starter MVP",
    shortLabel: "Starter",
    price: "1 200 TND",
    minPrice: 1200,
    timeline: "6 - 8 weeks",
    className: "starter",
  },
  {
    key: "advanced",
    label: "Advanced Operations",
    shortLabel: "Advanced",
    price: "From 2 000 TND",
    minPrice: 2000,
    timeline: "12 - 16 weeks",
    className: "advanced",
  },
  {
    key: "premium",
    label: "Premium Add-ons",
    shortLabel: "Premium",
    price: "Custom quote",
    minPrice: 0,
    timeline: "By module",
    className: "premium",
  },
];

export function allFeatures(language = "en") {
  return getTranslatedGroups(language).flatMap((group) =>
    group.features.map((feature) => ({ ...feature, group: group.label, groupId: group.id }))
  );
}

export function getSelectedFeatures(selectedIds, language = "en") {
  const selectedSet = new Set(selectedIds || []);
  return allFeatures(language).filter((feature) => selectedSet.has(feature.id));
}

export function getSelectedGroups(selectedIds, language = "en") {
  const selectedSet = new Set(selectedIds || []);
  return getTranslatedGroups(language).map((group) => ({
    id: group.id,
    label: group.label,
    features: group.features.filter((feature) => selectedSet.has(feature.id)),
  })).filter((group) => group.features.length > 0);
}

export function countTier(selectedIds, tier) {
  return getSelectedFeatures(selectedIds).filter((feature) => feature.tier === tier).length;
}

export function getTierCounts(selectedIds) {
  return {
    starter: countTier(selectedIds, "starter"),
    advanced: countTier(selectedIds, "advanced"),
    premium: countTier(selectedIds, "premium"),
  };
}

export function recommendedPackageKey(selectedIds) {
  const counts = getTierCounts(selectedIds);
  if (counts.premium > 0) return "premium";
  if (counts.advanced > 0) return "advanced";
  if (counts.starter > 0) return "starter";
  return "none";
}

export function recommendedPackage(selectedIds, language = "en") {
  const copy = getCopy(language);
  const key = recommendedPackageKey(selectedIds);
  if (key === "none") return copy.packages.none;
  return copy.packages[key]?.shortLabel || copy.packages.none;
}

export function cleanProposalName(rawName, selectedIds, language = "en") {
  const value = String(rawName || "").trim().replace(/\s+/g, " ");
  if (value) return value;
  const stamp = new Date().toLocaleDateString(getLocale(language), {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const pkg = recommendedPackage(selectedIds, language);
  const copy = getCopy(language);
  return pkg === copy.packages.none ? `Green Coffee Games proposal - ${stamp}` : `${pkg} proposal - ${stamp}`;
}

export function createProposal({ name, selectedIds, status = "draft", language = "en" }) {
  const features = getSelectedFeatures(selectedIds, language);
  const tierCounts = getTierCounts(selectedIds);
  return {
    id: `proposal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: cleanProposalName(name, selectedIds, language),
    status,
    language,
    createdAt: new Date().toISOString(),
    package: recommendedPackage(selectedIds, language),
    packageKey: recommendedPackageKey(selectedIds),
    total: features.length,
    tierCounts,
    categoryCount: getSelectedGroups(selectedIds, language).length,
    featureIds: features.map((feature) => feature.id),
    features: features.map((feature) => ({
      id: feature.id,
      name: feature.name,
      desc: feature.desc,
      tier: feature.tier,
      group: feature.group,
      groupId: feature.groupId,
      critical: Boolean(feature.critical),
      isNew: Boolean(feature.isNew),
    })),
  };
}

export function getProposalFeatures(proposal, language = "en") {
  const featureLookup = new Map(allFeatures(language).map((feature) => [feature.id, feature]));
  const stored = Array.isArray(proposal?.features) && proposal.features.length
    ? proposal.features
    : (proposal?.featureIds || []).map((id) => ({ id }));

  return stored.map((item) => {
    const base = featureLookup.get(item.id) || {};
    const merged = { ...item, ...base };
    if (!merged.id || !merged.name) return null;
    return {
      id: merged.id,
      name: merged.name,
      desc: merged.desc || "",
      tier: merged.tier || "starter",
      group: merged.group || base.group || "Selected modules",
      groupId: merged.groupId || base.groupId,
      critical: Boolean(item.critical || base.critical),
      isNew: Boolean(item.isNew || base.isNew),
    };
  }).filter(Boolean);
}

export function getProposalGroups(proposal, language = "en") {
  const grouped = new Map();
  for (const feature of getProposalFeatures(proposal, language)) {
    if (!grouped.has(feature.group)) grouped.set(feature.group, []);
    grouped.get(feature.group).push(feature);
  }
  return [...grouped.entries()].map(([label, features]) => ({ label, features }));
}

export function getProposalTierCounts(proposal, language = "en") {
  const counts = { starter: 0, advanced: 0, premium: 0 };
  for (const feature of getProposalFeatures(proposal, language)) {
    if (counts[feature.tier] !== undefined) counts[feature.tier] += 1;
  }
  return counts;
}

export function getProposalPackage(proposal, language = "en") {
  if (proposal?.packageKey) return getPackageLabel(proposal.packageKey, language);
  return getPackageLabel(proposal?.package, language);
}

export function getCommercialModel(proposal, language = "en") {
  const copy = getCopy(language);
  const counts = getProposalTierCounts(proposal, language);
  const commercialTiers = getCommercialTiers(language);
  const selectedTiers = commercialTiers.filter((tier) => (counts[tier.key] || 0) > 0);
  const hasStarter = counts.starter > 0;
  const hasAdvanced = counts.advanced > 0;
  const hasPremium = counts.premium > 0;
  const minTotal = selectedTiers.reduce((total, tier) => total + (tier.minPrice || 0), 0);

  let realisation = "-";
  if (hasStarter && hasAdvanced && hasPremium) realisation = language === "fr" ? "18 - 24 semaines + add-ons" : "18 - 24 weeks + add-ons";
  else if (hasStarter && hasAdvanced) realisation = language === "fr" ? "18 - 24 semaines" : "18 - 24 weeks";
  else if (hasStarter && hasPremium) realisation = language === "fr" ? "6 - 8 semaines + add-ons" : "6 - 8 weeks + add-ons";
  else if (hasAdvanced && hasPremium) realisation = language === "fr" ? "12 - 16 semaines + add-ons" : "12 - 16 weeks + add-ons";
  else if (hasStarter) realisation = copy.packages.starter.timeline;
  else if (hasAdvanced) realisation = copy.packages.advanced.timeline;
  else if (hasPremium) realisation = copy.packages.premium.timeline;

  return {
    counts,
    selectedTiers,
    minTotal,
    hasPremium,
    estimateMain: selectedTiers.length ? (minTotal ? `${minTotal.toLocaleString("fr-FR")} TND` : copy.model.customQuote) : copy.model.zero,
    estimateNote: !selectedTiers.length ? copy.model.noModules : (hasPremium ? copy.model.minimumPlusAddons : copy.model.minimumEstimate),
    realisation,
    projectType: hasPremium ? copy.model.quoteAddons : copy.model.fixedBaseline,
    total: getProposalFeatures(proposal, language).length,
    categoryCount: getProposalGroups(proposal, language).length,
  };
}

export function formatDate(value, language = "en") {
  return new Date(value || Date.now()).toLocaleDateString(getLocale(language), {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatDateTime(value, language = "en") {
  return new Date(value || Date.now()).toLocaleString(getLocale(language), {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
