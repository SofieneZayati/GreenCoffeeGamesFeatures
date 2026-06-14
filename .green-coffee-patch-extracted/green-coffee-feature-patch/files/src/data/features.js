export const TIERS = [
  { key: "starter", label: "Starter", icon: "ti-seedling" },
  { key: "advanced", label: "Advanced", icon: "ti-rocket" },
  { key: "premium", label: "Premium / Add-ons", icon: "ti-sparkles" },
];

export const GROUPS = [
  {
    id: "presence", label: "Digital presence", icon: "ti-world",
    features: [
      { id: "responsive", tier: "starter", name: "Responsive website", desc: "Mobile-first landing pages, smooth layout and polished UI", critical: true },
      { id: "gallery", tier: "starter", name: "Gallery & contact page", desc: "Photo showcase, location map, phone, email and social links" },
      { id: "opening_hours", tier: "starter", name: "Opening hours manager", desc: "Owner can update weekly hours, holidays and special closures" },
      { id: "dark_theme", tier: "starter", name: "Dark coffee theme", desc: "Professional dark visual identity across the app" },
      { id: "accessibility_basic", tier: "starter", name: "Accessibility basics", desc: "Semantic HTML, keyboard-friendly navigation and contrast-aware UI" },
    ]
  },
  {
    id: "menu", label: "Menu system", icon: "ti-menu-2",
    features: [
      { id: "digital_menu", tier: "starter", name: "Digital menu", desc: "Coffee, drinks, desserts, snacks and categories", critical: true },
      { id: "qr_menu", tier: "starter", name: "QR code menu access", desc: "Scan from table or storefront — no app needed" },
      { id: "admin_menu", tier: "starter", name: "Admin menu manager", desc: "Add, edit, remove items and prices live", critical: true },
      { id: "menu_images", tier: "starter", name: "Menu image upload", desc: "Upload and manage item photos from the admin panel" },
      { id: "item_availability", tier: "starter", name: "Item availability", desc: "Mark products as available, out of stock or hidden today" },
      { id: "modifiers", tier: "advanced", name: "Product modifiers", desc: "Size, milk type, sugar level, extra shot, toppings, hot/iced", critical: true },
    ]
  },
  {
    id: "reservations", label: "Reservations", icon: "ti-calendar",
    features: [
      { id: "res_basic", tier: "starter", name: "Basic reservation form", desc: "Customer submits date, time, guests and notes", critical: true },
      { id: "res_admin", tier: "starter", name: "Reservation admin list", desc: "Admin sees requests and changes status manually" },
      { id: "res_email", tier: "starter", name: "Email confirmations", desc: "Auto emails on booking approval, rejection and cancellation" },
      { id: "res_full", tier: "advanced", name: "Full calendar system", desc: "Real-time availability, approve/reject flow and calendar board" },
      { id: "waitlist", tier: "premium", name: "Waitlist management", desc: "Customer joins a waitlist and gets notified when a table opens" },
      { id: "events", tier: "premium", name: "Event reservations", desc: "Football nights, live music and dedicated event booking" },
    ]
  },
  {
    id: "admin", label: "Admin foundation", icon: "ti-shield-lock",
    features: [
      { id: "admin_auth", tier: "starter", name: "Admin login", desc: "Secure owner/admin access with protected dashboard", critical: true },
      { id: "dashboard_home", tier: "starter", name: "Admin dashboard home", desc: "Today’s reservations, menu status, quick actions and alerts" },
      { id: "rbac", tier: "advanced", name: "Role-based access", desc: "Owner, manager, barista and customer permissions" },
      { id: "audit_log", tier: "advanced", name: "Audit log", desc: "Track who changed prices, accepted orders or edited settings" },
    ]
  },
  {
    id: "accounts", label: "Customer accounts", icon: "ti-user",
    features: [
      { id: "auth", tier: "advanced", name: "Register / login", desc: "Customer authentication with JWT and optional Google login" },
      { id: "password_reset", tier: "advanced", name: "Password reset", desc: "Email-based account recovery and verification flow" },
      { id: "profiles", tier: "advanced", name: "User profiles", desc: "Profile, order history, saved preferences and contact info" },
      { id: "favorites", tier: "advanced", name: "One-click reorder", desc: "Save favourite orders and reorder instantly" },
    ]
  },
  {
    id: "ordering", label: "Ordering", icon: "ti-shopping-cart",
    features: [
      { id: "table_setup", tier: "advanced", name: "Table setup", desc: "Create table numbers, capacities, active status and QR links", critical: true },
      { id: "qr_order", tier: "advanced", name: "Per-table QR codes", desc: "Each table has its own QR so the system identifies exactly where the order came from", critical: true },
      { id: "table_session_qr", tier: "advanced", name: "Session-locked QR ordering", desc: "Each QR scan opens a time-limited table session to reduce fake or remote orders from outside the café", critical: true, isNew: true },
      { id: "inseat", tier: "advanced", name: "In-seat ordering", desc: "Full order flow without leaving the table" },
      { id: "staff_dash", tier: "advanced", name: "Staff order dashboard", desc: "Baristas see and manage incoming orders in real time", critical: true },
      { id: "kds", tier: "premium", name: "Kitchen display system", desc: "Dedicated barista screen with queue, priorities and item status" },
      { id: "split_table", tier: "premium", name: "Table split / merge", desc: "Groups pay separately without manual workarounds" },
    ]
  },
  {
    id: "payments", label: "Payments & receipts", icon: "ti-credit-card",
    features: [
      { id: "online_payment", tier: "advanced", name: "Online payment", desc: "Flouci, Konnect or Paymee integration for Tunisia" },
      { id: "digital_receipts", tier: "advanced", name: "Digital receipts", desc: "Receipt sent by email with downloadable PDF copy" },
    ]
  },
  {
    id: "loyalty", label: "Loyalty & promotions", icon: "ti-star",
    features: [
      { id: "points", tier: "advanced", name: "Points system", desc: "1 TND = 1 point, redeemable for free products" },
      { id: "coupons", tier: "advanced", name: "Coupon & promo codes", desc: "WELCOME10, SUMMER25 and custom codes" },
      { id: "happyhour", tier: "advanced", name: "Happy hour engine", desc: "Auto discounts by time slot, for example 14:00 – 17:00" },
      { id: "campaign_broadcasts", tier: "premium", name: "WhatsApp & email campaigns", desc: "Send promos, coupons and happy-hour announcements to selected customer segments by WhatsApp or email", isNew: true },
      { id: "receipt_loyalty", tier: "advanced", name: "Receipt QR loyalty", desc: "Physical receipt QR scan to earn loyalty points" },
      { id: "tiers", tier: "premium", name: "Customer tiers", desc: "Bronze → Silver → Gold → VIP with faster earning" },
      { id: "wallet", tier: "premium", name: "Digital wallet", desc: "Store coupons, free drinks and reward vouchers" },
      { id: "birthday", tier: "premium", name: "Birthday rewards", desc: "Auto free coffee or coupon on customer birthday" },
      { id: "referral", tier: "premium", name: "Referral system", desc: "Invite a friend — both earn bonus points" },
    ]
  },
  {
    id: "engagement", label: "Engagement", icon: "ti-bell",
    features: [
      { id: "rating", tier: "advanced", name: "Star rating system", desc: "Post-payment ratings with owner analytics" },
      { id: "push", tier: "premium", name: "Push notifications", desc: "Order ready, promos, table alerts and loyalty reminders" },
      { id: "chatbot", tier: "premium", name: "AI chatbot", desc: "Answers menu and café questions instantly, 24/7" },
      { id: "crm_segments", tier: "premium", name: "Customer segments", desc: "Target loyal, inactive, high-spend and new customers" },
    ]
  },
  {
    id: "analytics", label: "Analytics", icon: "ti-chart-bar",
    features: [
      { id: "sales", tier: "advanced", name: "Sales reports", desc: "Revenue charts, best-sellers and order totals" },
      { id: "heatmap", tier: "advanced", name: "Peak-hour heatmap", desc: "See busiest times and plan staffing better" },
      { id: "csv_export", tier: "advanced", name: "CSV export", desc: "Export sales, reservations, customers and loyalty data" },
      { id: "behavior", tier: "premium", name: "Customer behaviour", desc: "Return rate, average order value and customer segments" },
      { id: "ai_recs", tier: "premium", name: "AI recommendations", desc: "People who ordered X also ordered Y" },
      { id: "ai_reviews", tier: "premium", name: "AI review summariser", desc: "Instant insight digest from customer ratings" },
    ]
  },
  {
    id: "ops", label: "Operations & staff", icon: "ti-tool",
    features: [
      { id: "floormap", tier: "advanced", name: "Visual floor map", desc: "Live table status: available, reserved or occupied" },
      { id: "staff_qr", tier: "advanced", name: "Staff QR login", desc: "Barista scans QR to open the dashboard instantly" },
    ]
  },
  {
    id: "infra", label: "Infrastructure & service", icon: "ti-server",
    features: [
      { id: "deployment", tier: "starter", name: "Production deployment", desc: "Frontend, backend, database and environment setup", critical: true },
      { id: "maintenance", tier: "premium", name: "Maintenance contract", desc: "Updates, bug fixes and priority support after launch" },
    ]
  },
];


export const TOTAL_FEATURES = GROUPS.reduce((total, group) => total + group.features.length, 0);
