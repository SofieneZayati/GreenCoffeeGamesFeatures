export const PRESETS = [
  {
    id: "launch_mvp",
    icon: "ti-rocket",
    tone: "starter",
    featureIds: [
      "responsive", "brand_story", "gallery", "opening_hours", "maps_contact", "social_links", "dark_theme", "accessibility_basic",
      "digital_menu", "menu_categories", "menu_descriptions", "qr_menu", "featured_items", "allergen_notes",
      "res_basic", "res_owner_notify", "res_admin_basic", "res_email_basic",
      "admin_auth", "admin_menu", "menu_images", "item_availability", "dashboard_home",
      "deployment", "handover",
    ],
  },
  {
    id: "qr_ordering",
    icon: "ti-qrcode",
    tone: "advanced",
    featureIds: [
      "responsive", "gallery", "opening_hours", "maps_contact", "digital_menu", "menu_categories", "menu_descriptions", "qr_menu", "featured_items", "admin_auth", "admin_menu", "menu_images", "item_availability", "dashboard_home",
      "modifiers", "table_setup", "qr_order", "table_session_qr", "inseat", "order_notes", "staff_dash", "floormap", "staff_qr", "shift_notes", "payment_status", "digital_receipts", "deployment", "handover",
    ],
  },
  {
    id: "loyalty_growth",
    icon: "ti-heart-handshake",
    tone: "growth",
    featureIds: [
      "responsive", "gallery", "opening_hours", "maps_contact", "digital_menu", "qr_menu", "featured_items", "admin_auth", "admin_menu", "res_basic", "res_owner_notify", "deployment", "handover",
      "auth", "password_reset", "profiles", "reservation_history", "favorites", "points", "coupons", "happyhour", "receipt_loyalty", "rating", "feedback_qr", "sales", "reservation_stats", "heatmap", "qr_scan_analytics",
    ],
  },
  {
    id: "premium_wow",
    icon: "ti-sparkles",
    tone: "premium",
    featureIds: [
      "responsive", "brand_story", "gallery", "opening_hours", "maps_contact", "social_links", "dark_theme", "accessibility_basic",
      "digital_menu", "menu_categories", "menu_descriptions", "qr_menu", "featured_items", "allergen_notes", "modifiers",
      "res_basic", "res_owner_notify", "res_admin_basic", "res_email_basic", "admin_auth", "admin_menu", "menu_images", "item_availability", "dashboard_home",
      "auth", "password_reset", "profiles", "reservation_history", "favorites", "res_full", "res_calendar", "res_customer_modify", "res_reminders", "waitlist", "events",
      "table_setup", "qr_order", "table_session_qr", "inseat", "order_notes", "staff_dash", "floormap", "staff_qr", "shift_notes", "kds", "order_ready_screen", "split_table",
      "online_payment", "payment_status", "digital_receipts", "points", "coupons", "happyhour", "receipt_loyalty", "wallet", "birthday", "tiers",
      "sales", "reservation_stats", "heatmap", "qr_scan_analytics", "csv_export", "behavior", "ai_reviews", "rating", "feedback_qr", "campaign_broadcasts", "crm_segments", "push", "referral",
      "menu_ai_descriptions", "chatbot", "ai_recs", "stock_alerts", "automation_messages", "rbac", "secure_dashboard", "audit_log", "backup_export", "deployment", "handover", "maintenance",
    ],
  },
];

export function getPresetById(presetId) {
  return PRESETS.find((preset) => preset.id === presetId);
}
