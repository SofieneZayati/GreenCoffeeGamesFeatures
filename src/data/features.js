export const TIERS = [
  { key: "starter", label: "Starter", icon: "ti-seedling" },
  { key: "advanced", label: "Advanced", icon: "ti-rocket" },
  { key: "premium", label: "Premium / Add-ons", icon: "ti-sparkles" },
];

export const GROUPS = [
  {
    id: "presence", label: "Website & brand", icon: "ti-world",
    features: [
      { id: "responsive", tier: "starter", name: "Responsive website", desc: "Mobile-first landing pages with a polished coffee-shop look", critical: true },
      { id: "brand_story", tier: "starter", name: "About Green Coffee section", desc: "Short brand story, atmosphere, values and café introduction" },
      { id: "gallery", tier: "starter", name: "Photo gallery", desc: "Showcase the café, products, ambiance and special moments" },
      { id: "opening_hours", tier: "starter", name: "Opening hours", desc: "Clear weekly schedule, holidays and special closures" },
      { id: "maps_contact", tier: "starter", name: "Map & contact buttons", desc: "Google Maps location, phone, email and one-tap contact actions", critical: true },
      { id: "social_links", tier: "starter", name: "Social media links", desc: "Facebook, Instagram and other client-facing links" },
      { id: "dark_theme", tier: "starter", name: "Premium coffee theme", desc: "Professional dark/light visual identity across the experience" },
      { id: "accessibility_basic", tier: "starter", name: "Accessibility basics", desc: "Keyboard-friendly navigation, readable contrast and semantic structure" },
    ]
  },
  {
    id: "menu", label: "Digital menu & QR menu", icon: "ti-menu-2",
    features: [
      { id: "digital_menu", tier: "starter", name: "Digital menu", desc: "Coffee, drinks, desserts, snacks and menu categories", critical: true },
      { id: "menu_categories", tier: "starter", name: "Menu categories", desc: "Organised sections for coffee, drinks, desserts and snacks" },
      { id: "menu_descriptions", tier: "starter", name: "Product descriptions", desc: "Short text for ingredients, taste notes and product details" },
      { id: "qr_menu", tier: "starter", name: "QR code menu access", desc: "Customers scan from table or storefront — no app needed", critical: true },
      { id: "featured_items", tier: "starter", name: "Featured items", desc: "Highlight best-sellers, new products and seasonal offers" },
      { id: "allergen_notes", tier: "starter", name: "Allergen / ingredient notes", desc: "Simple product notes for milk, nuts, caffeine or special ingredients" },
      { id: "modifiers", tier: "advanced", name: "Product options", desc: "Size, milk type, sugar level, extra shot, toppings and hot/iced options", critical: true },
    ]
  },
  {
    id: "activities", label: "Games, kids park & events", icon: "ti-puzzle",
    features: [
      { id: "card_games_showcase", tier: "starter", name: "Card games showcase", desc: "Show the card games available at the café so clients know they can come to play", isNew: true },
      { id: "kids_park_info", tier: "starter", name: "Paid kids park information", desc: "Present the kids park as a paid area with clear access info, rules and optional photos", isNew: true },
      { id: "football_events_calendar", tier: "advanced", name: "Football events calendar", desc: "Show upcoming big matches, football nights and special café events", isNew: true },
      { id: "big_match_notifications", tier: "premium", name: "Big match client notifications", desc: "Notify customers before important football games by WhatsApp, email or push so they come watch at the café", isNew: true },
    ]
  },
  {
    id: "simple_reservations", label: "Reservations & notifications", icon: "ti-calendar-plus",
    features: [
      { id: "res_basic", tier: "advanced", name: "Reservation request", desc: "Customer sends name, phone, date, time, guests and optional note — reservation flow is handled as an advanced module", critical: true },
      { id: "res_owner_notify", tier: "advanced", name: "Reservation notifications", desc: "Reservation request notifications are sent to the owner by email, WhatsApp-ready message or dashboard" },
      { id: "res_admin_basic", tier: "advanced", name: "Reservation request inbox", desc: "Owner sees requests and manages them from a dedicated reservation inbox" },
      { id: "res_email_basic", tier: "advanced", name: "Reservation confirmations", desc: "Send acceptance, refusal and confirmation messages as part of the reservation workflow" },
    ]
  },
  {
    id: "menu_admin", label: "Basic admin menu manager", icon: "ti-edit",
    features: [
      { id: "admin_auth", tier: "starter", name: "Owner admin login", desc: "Secure owner access to manage the menu and café information", critical: true },
      { id: "admin_menu", tier: "starter", name: "Add / edit / delete menu items", desc: "Owner can update products and prices without touching code", critical: true },
      { id: "menu_images", tier: "starter", name: "Menu image upload", desc: "Upload and manage product photos from the admin panel" },
      { id: "item_availability", tier: "starter", name: "Available / unavailable status", desc: "Hide unavailable products or mark them as out of stock today" },
      { id: "dashboard_home", tier: "starter", name: "Simple admin dashboard", desc: "Quick view for menu status, reservation requests and basic actions" },
    ]
  },
  {
    id: "accounts", label: "Customer accounts", icon: "ti-user",
    features: [
      { id: "auth", tier: "advanced", name: "Customer sign up / login", desc: "Customers can create an account and access a personal area", critical: true },
      { id: "password_reset", tier: "advanced", name: "Password reset", desc: "Safe account recovery through email verification" },
      { id: "profiles", tier: "advanced", name: "Customer profile", desc: "Saved name, phone, preferences and contact information" },
      { id: "reservation_history", tier: "advanced", name: "Reservation history", desc: "Customers can see previous and upcoming reservations from their account", critical: true },
      { id: "favorites", tier: "advanced", name: "Saved favourite orders", desc: "Customers save favourite items and reorder faster later" },
    ]
  },
  {
    id: "advanced_reservations", label: "Advanced reservation system", icon: "ti-calendar-stats",
    features: [
      { id: "res_full", tier: "advanced", name: "Reservation approval system", desc: "Owner accepts, refuses or manages requests with a clearer workflow", critical: true },
      { id: "res_calendar", tier: "advanced", name: "Reservation calendar", desc: "Calendar board for daily and weekly table reservations" },
      { id: "res_customer_modify", tier: "advanced", name: "Customer modify / cancel", desc: "Logged-in customers can update or cancel reservations from their account", critical: true },
      { id: "res_reminders", tier: "advanced", name: "Reservation reminders", desc: "Automatic reminder before the reservation time by email or message" },
      { id: "waitlist", tier: "premium", name: "Waitlist management", desc: "Customer joins a waitlist and gets notified when a table opens" },
      { id: "events", tier: "premium", name: "Event reservations", desc: "Football nights, live music and dedicated event booking" },
    ]
  },
  {
    id: "ordering", label: "Table QR ordering", icon: "ti-shopping-cart",
    features: [
      { id: "table_setup", tier: "advanced", name: "Table setup", desc: "Create table numbers, capacities, active status and QR links", critical: true },
      { id: "qr_order", tier: "advanced", name: "Per-table QR codes", desc: "Each table QR identifies exactly where the order came from", critical: true },
      { id: "table_session_qr", tier: "advanced", name: "Session-locked QR ordering", desc: "Time-limited table session to reduce fake orders from outside the café", critical: true, isNew: true },
      { id: "inseat", tier: "advanced", name: "Order from table", desc: "Customer orders from the table without waiting for staff" },
      { id: "order_notes", tier: "advanced", name: "Order notes", desc: "Customer notes like no sugar, extra milk, no ice or special request" },
    ]
  },
  {
    id: "staff_ops", label: "Staff dashboard & operations", icon: "ti-tool",
    features: [
      { id: "staff_dash", tier: "advanced", name: "Staff order dashboard", desc: "Baristas see and manage incoming table orders in real time", critical: true },
      { id: "floormap", tier: "advanced", name: "Visual floor map", desc: "Live table status: available, reserved, ordering or occupied" },
      { id: "staff_qr", tier: "advanced", name: "Staff QR login", desc: "Barista scans a QR to open the dashboard quickly" },
      { id: "shift_notes", tier: "advanced", name: "Shift handover notes", desc: "Morning and evening staff leave notes, incidents and reminders", isNew: true },
      { id: "kds", tier: "premium", name: "Kitchen / barista display", desc: "Dedicated screen with queue, priorities and item status" },
      { id: "order_ready_screen", tier: "premium", name: "Order-ready display", desc: "Customer-facing screen showing ticket numbers and ready orders", isNew: true },
      { id: "split_table", tier: "premium", name: "Table split / merge", desc: "Groups pay separately without manual workarounds" },
    ]
  },
  {
    id: "payments", label: "Payments & receipts", icon: "ti-credit-card",
    features: [
      { id: "online_payment", tier: "advanced", name: "Online payment", desc: "Flouci, Konnect or Paymee integration for Tunisia" },
      { id: "payment_status", tier: "advanced", name: "Payment status tracking", desc: "Track paid, unpaid, failed and pay-at-cashier orders" },
      { id: "digital_receipts", tier: "advanced", name: "Digital receipts", desc: "Receipt sent by email with downloadable PDF copy" },
    ]
  },
  {
    id: "loyalty", label: "Loyalty & promotions", icon: "ti-star",
    features: [
      { id: "points", tier: "advanced", name: "Loyalty points", desc: "Customers earn points and redeem rewards" },
      { id: "coupons", tier: "advanced", name: "Coupon & promo codes", desc: "WELCOME10, happy-hour codes and custom promotions" },
      { id: "happyhour", tier: "advanced", name: "Happy hour engine", desc: "Automatic discounts by time slot, for example 14:00 – 17:00" },
      { id: "receipt_loyalty", tier: "premium", name: "Receipt QR history & loyalty sync", desc: "Manual or printed receipts include a QR code; when the customer scans it, the receipt is saved in account history and loyalty points are credited automatically" },
      { id: "wallet", tier: "premium", name: "Digital rewards wallet", desc: "Store coupons, free drinks and reward vouchers" },
      { id: "birthday", tier: "premium", name: "Birthday rewards", desc: "Auto free coffee or coupon on customer birthday" },
      { id: "tiers", tier: "premium", name: "Customer VIP tiers", desc: "Bronze, Silver, Gold and VIP levels with stronger rewards" },
    ]
  },
  {
    id: "analytics", label: "Analytics & reports", icon: "ti-chart-bar",
    features: [
      { id: "sales", tier: "advanced", name: "Sales reports", desc: "Revenue charts, best-sellers and order totals" },
      { id: "reservation_stats", tier: "advanced", name: "Reservation statistics", desc: "Accepted, refused, cancelled and busiest reservation times" },
      { id: "heatmap", tier: "advanced", name: "Peak-hour heatmap", desc: "See busiest times and plan staffing better" },
      { id: "qr_scan_analytics", tier: "advanced", name: "QR scan analytics", desc: "Track QR scans by hour, table and campaign", isNew: true },
      { id: "csv_export", tier: "advanced", name: "Export reports", desc: "Export sales, reservations, customers and loyalty data" },
      { id: "behavior", tier: "premium", name: "Customer behaviour insights", desc: "Return rate, average order value and customer segments" },
      { id: "ai_reviews", tier: "premium", name: "AI review summariser", desc: "Instant insight digest from customer ratings" },
    ]
  },
  {
    id: "marketing_feedback", label: "Marketing & customer feedback", icon: "ti-bell",
    features: [
      { id: "rating", tier: "advanced", name: "Star rating system", desc: "Simple ratings after visit or order with owner view" },
      { id: "feedback_qr", tier: "advanced", name: "Table feedback QR", desc: "Guests scan a table QR to leave quick feedback before they leave", isNew: true },
      { id: "campaign_broadcasts", tier: "premium", name: "WhatsApp & email campaigns", desc: "Send promos, coupons and announcements to selected customers", isNew: true },
      { id: "crm_segments", tier: "premium", name: "Customer segments", desc: "Target loyal, inactive, high-spend and new customers" },
      { id: "push", tier: "premium", name: "Push notifications", desc: "Order ready, promos, table alerts and loyalty reminders" },
      { id: "referral", tier: "premium", name: "Referral system", desc: "Invite a friend — both earn bonus points" },
    ]
  },
  {
    id: "ai_automation", label: "AI & automation", icon: "ti-sparkles",
    features: [
      { id: "menu_ai_descriptions", tier: "premium", name: "AI menu descriptions", desc: "Generate polished product descriptions and translations faster", isNew: true },
      { id: "chatbot", tier: "premium", name: "AI café chatbot", desc: "Answers menu and café questions instantly, 24/7" },
      { id: "ai_recs", tier: "premium", name: "Smart product recommendations", desc: "Suggest combinations like coffee + dessert based on orders" },
      { id: "stock_alerts", tier: "premium", name: "Low-stock alerts", desc: "Warn the team when coffee, milk, desserts or packaging are running low", isNew: true },
      { id: "automation_messages", tier: "premium", name: "Automated customer messages", desc: "Prepare automatic messages for confirmations, offers and follow-ups" },
    ]
  },
  {
    id: "security", label: "Security, roles & back office", icon: "ti-shield-lock",
    features: [
      { id: "rbac", tier: "advanced", name: "Owner / staff roles", desc: "Separate permissions for owner, manager and staff" },
      { id: "secure_dashboard", tier: "advanced", name: "Secure dashboard", desc: "Protected admin area with safer access rules" },
      { id: "audit_log", tier: "premium", name: "Activity log", desc: "Track important actions like price changes, order updates and admin edits" },
      { id: "backup_export", tier: "premium", name: "Backup / export plan", desc: "Safer data handling and export preparation for future growth" },
    ]
  },
  {
    id: "infra", label: "Launch & service", icon: "ti-server",
    features: [
      { id: "deployment", tier: "starter", name: "Production deployment", desc: "Build setup and deployment preparation", critical: true },
      { id: "handover", tier: "starter", name: "Owner handover", desc: "Short walkthrough so the owner knows how to use the system" },
      { id: "maintenance", tier: "premium", name: "Maintenance contract", desc: "Updates, bug fixes and priority support after launch" },
    ]
  },
];

export const TOTAL_FEATURES = GROUPS.reduce((total, group) => total + group.features.length, 0);
