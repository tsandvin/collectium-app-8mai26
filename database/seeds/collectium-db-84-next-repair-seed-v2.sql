/* ============================================================
   COLLECTIUM DB 8.4 NEXT REPAIR SEED v2
   Dato: 2026-06-05

   Formaal:
   - Registrere Next.js-sider i ct_app_pages
   - Registrere features / DB-brytere i ct_app_features
   - Koble sider til features i ct_app_page_features
   - Registrere tilgang i ct_feature_access_rules med faktisk kolonnemodell:
       feature_id, feature_key, role_code, role_key,
       membership_code, membership_key, access_state,
       access_mode, is_enabled
   - Registrere action/API-routes i ct_feature_action_routes
   - Skille global template/AppShell fra vanlig sideinnhold

   Viktig:
   - Kjor backup forst.
   - Kjor gjerne hele filen i phpMyAdmin.
   - Denne versjonen unngar de gamle kolonnene:
       access_role, membership_level, can_use
     fordi de ikke finnes i ct_feature_access_rules slik tabellen ble vist.

   Laste/arkitektur:
   ct_app_pages
   -> ct_app_page_features
   -> ct_app_features
   -> ct_feature_access_rules
   -> ct_v_feature_access_resolved
   -> ct_feature_action_routes
   -> API
   -> tabell/view
   -> logg
   ============================================================ */

START TRANSACTION;

/* ============================================================
   1. SIDER / PAGES
   ============================================================ */

INSERT INTO ct_app_pages
(page_key, page_name_no, file_path, is_active)
VALUES
('next.home', 'Forside', '/', 1),
('next.startside', 'Startside', '/startside', 1),
('next.landingsside', 'Landingsside', '/landingsside', 1),
('next.login', 'Logg inn', '/login', 1),
('next.sign_in', 'Sign in', '/sign-in', 1),
('next.sign_up', 'Sign up', '/sign-up', 1),
('next.support', 'Support', '/support', 1),

('next.catalog', 'Katalog', '/katalog', 1),
('next.catalog.new', 'Ny katalogpost', '/katalog/ny', 1),

('next.auction', 'Auksjoner', '/auksjoner', 1),
('next.auction.object', 'Auksjonsobjekt', '/auksjoner/[id]', 1),

('next.market.index', 'Index / Finans', '/bors', 1),

('next.messages', 'Meldinger', '/meldinger', 1),
('next.messages.thread', 'Meldingstrad', '/meldinger/[partnerId]', 1),

('next.member.public', 'Medlem', '/medlem/[id]', 1),

('next.minside', 'Min side', '/min-side', 1),
('next.minside.alias', 'Min side legacy alias', '/minside', 1),
('next.minside.profile', 'Min side profil', '/min-side/profil', 1),
('next.minside.collection', 'Min side samling', '/min-side/samling', 1),
('next.minside.activity', 'Min side aktivitet', '/min-side/aktivitet', 1),
('next.minside.finance', 'Min side finans', '/min-side/finans', 1),
('next.minside.dealer', 'Min side forhandler', '/min-side/forhandler', 1),
('next.minside.admin', 'Min side admin', '/min-side/admin', 1),
('next.minside.sharing', 'Min side deling', '/min-side/deling', 1),
('next.minside.settings', 'Min side innstillinger', '/min-side/innstillinger', 1),

('next.admin', 'Admin kontroll', '/admin', 1),
('next.admin.system.unit_test', 'Admin enhetstest', '/admin/system/unit-test', 1)
ON DUPLICATE KEY UPDATE
page_name_no = VALUES(page_name_no),
file_path = VALUES(file_path),
is_active = VALUES(is_active);

/* ============================================================
   2. FEATURES / DB-BRYTERE
   ============================================================ */

INSERT INTO ct_app_features
(feature_key, feature_name_no, feature_group, is_active)
VALUES

/* Global template/layout */
('layout.global.view', 'Global layout visning', 'layout', 1),
('layout.topbar.view', 'Toppmeny visning', 'layout', 1),
('layout.sidebar.view', 'Sidemeny visning', 'layout', 1),
('layout.mobile_menu.view', 'Mobilmeny visning', 'layout', 1),
('layout.page_frame.view', 'PageFrame visning', 'layout', 1),

/* Public */
('home.view', 'Forside visning', 'public', 1),
('startside.view', 'Startside visning', 'public', 1),
('landing.view', 'Landingsside visning', 'public', 1),
('support.view', 'Support visning', 'support', 1),

/* Auth */
('auth.login.view', 'Logg inn visning', 'auth', 1),
('auth.login.submit', 'Send innlogging', 'auth', 1),
('auth.logout', 'Logg ut', 'auth', 1),
('auth.register.view', 'Registrering visning', 'auth', 1),
('auth.register.submit', 'Send registrering', 'auth', 1),
('auth.session.view', 'Session visning', 'auth', 1),

/* Katalog */
('catalog.view', 'Katalog visning', 'catalog', 1),
('catalog.search', 'Sok i katalog', 'catalog', 1),
('catalog.filters', 'Katalogfilter', 'catalog', 1),
('catalog.object.open', 'Apne katalogobjekt', 'catalog', 1),
('catalog.user_state.view', 'Brukerstatus i katalog', 'catalog', 1),
('catalog.market.view', 'Marked i katalog', 'catalog', 1),
('catalog.history.view', 'Historie i katalog', 'catalog', 1),
('catalog.new.submit', 'Send ny katalogpost', 'catalog', 1),

/* Auksjon */
('auction.view', 'Auksjon visning', 'auction', 1),
('auction.object.view', 'Auksjonsobjekt visning', 'auction', 1),
('auction.bid', 'Legg bud', 'auction', 1),
('auction.watch', 'Folg auksjon', 'auction', 1),

/* Finans / index */
('market.index.view', 'Index / finans visning', 'market', 1),
('market.index.compare', 'Sammenlign marked', 'market', 1),

/* Meldinger */
('messages.view', 'Meldinger visning', 'messages', 1),
('messages.thread.view', 'Meldingstrad visning', 'messages', 1),
('messages.send', 'Send melding', 'messages', 1),

/* Min side */
('profile.view', 'Profil visning', 'minside', 1),
('profile.edit', 'Rediger profil', 'minside', 1),
('membership.view', 'Medlemskap visning', 'minside', 1),
('collection.view', 'Min samling visning', 'collection', 1),
('collection.wishlist.view', 'Onskeliste visning', 'collection', 1),
('collection.favorite.view', 'Favoritter visning', 'collection', 1),
('collection.transactions.view', 'Transaksjoner visning', 'collection', 1),
('activity.view', 'Aktivitet visning', 'activity', 1),
('notifications.view', 'Varsler visning', 'activity', 1),
('processes.view', 'Prosesser visning', 'activity', 1),
('sharing.view', 'Deling visning', 'sharing', 1),
('settings.view', 'Innstillinger visning', 'settings', 1),
('settings.features.view', 'Funksjonsoversikt visning', 'settings', 1),

/* Forhandler */
('dealer.dashboard.view', 'Forhandlerdashboard visning', 'dealer', 1),
('dealer.consignments.view', 'Innleveringer visning', 'dealer', 1),
('dealer.inventory.view', 'Forhandlerlager visning', 'dealer', 1),
('dealer.auction.view', 'Forhandlerauksjon visning', 'dealer', 1),
('dealer.shop.view', 'Forhandler nettbutikk visning', 'dealer', 1),

/* Admin */
('admin.dashboard.view', 'Admin dashboard visning', 'admin', 1),
('admin.users.view', 'Admin brukere visning', 'admin', 1),
('admin.membership.view', 'Admin medlemskap visning', 'admin', 1),
('admin.dealers.view', 'Admin forhandlere visning', 'admin', 1),
('admin.catalog.view', 'Admin katalog visning', 'admin', 1),
('admin.auction.view', 'Admin auksjon visning', 'admin', 1),
('admin.routes.view', 'Admin routes visning', 'admin', 1),
('admin.features.view', 'Admin features visning', 'admin', 1),
('admin.logs.view', 'Admin logger visning', 'admin', 1),
('admin.system.view', 'Admin systemstatus visning', 'admin', 1),
('admin.system.unit_test.view', 'Admin enhetstest visning', 'admin', 1),
('admin.system.db_ping', 'Admin database ping', 'admin', 1)
ON DUPLICATE KEY UPDATE
feature_name_no = VALUES(feature_name_no),
feature_group = VALUES(feature_group),
is_active = VALUES(is_active);

/* ============================================================
   3. SIDE -> FEATURE KOBLINGER
   ============================================================ */

INSERT INTO ct_app_page_features
(page_key, feature_key, is_active)
VALUES

/* Forside/start/landing/support */
('next.home', 'layout.global.view', 1),
('next.home', 'layout.topbar.view', 1),
('next.home', 'layout.sidebar.view', 1),
('next.home', 'home.view', 1),

('next.startside', 'layout.global.view', 1),
('next.startside', 'layout.topbar.view', 1),
('next.startside', 'layout.sidebar.view', 1),
('next.startside', 'startside.view', 1),

('next.landingsside', 'layout.global.view', 1),
('next.landingsside', 'layout.topbar.view', 1),
('next.landingsside', 'landing.view', 1),

('next.support', 'layout.global.view', 1),
('next.support', 'layout.topbar.view', 1),
('next.support', 'layout.sidebar.view', 1),
('next.support', 'support.view', 1),

/* Auth */
('next.login', 'layout.global.view', 1),
('next.login', 'layout.topbar.view', 1),
('next.login', 'auth.login.view', 1),
('next.login', 'auth.login.submit', 1),
('next.sign_in', 'auth.login.view', 1),
('next.sign_up', 'auth.register.view', 1),
('next.sign_up', 'auth.register.submit', 1),

/* Katalog */
('next.catalog', 'layout.global.view', 1),
('next.catalog', 'layout.topbar.view', 1),
('next.catalog', 'layout.sidebar.view', 1),
('next.catalog', 'catalog.view', 1),
('next.catalog', 'catalog.search', 1),
('next.catalog', 'catalog.filters', 1),
('next.catalog', 'catalog.object.open', 1),
('next.catalog', 'catalog.user_state.view', 1),
('next.catalog', 'catalog.market.view', 1),
('next.catalog', 'catalog.history.view', 1),
('next.catalog.new', 'catalog.new.submit', 1),

/* Auksjon */
('next.auction', 'layout.global.view', 1),
('next.auction', 'layout.topbar.view', 1),
('next.auction', 'layout.sidebar.view', 1),
('next.auction', 'auction.view', 1),
('next.auction.object', 'auction.object.view', 1),
('next.auction.object', 'auction.bid', 1),
('next.auction.object', 'auction.watch', 1),

/* Finans */
('next.market.index', 'layout.global.view', 1),
('next.market.index', 'layout.topbar.view', 1),
('next.market.index', 'layout.sidebar.view', 1),
('next.market.index', 'market.index.view', 1),
('next.market.index', 'market.index.compare', 1),

/* Meldinger */
('next.messages', 'layout.global.view', 1),
('next.messages', 'layout.topbar.view', 1),
('next.messages', 'layout.sidebar.view', 1),
('next.messages', 'messages.view', 1),
('next.messages.thread', 'messages.thread.view', 1),
('next.messages.thread', 'messages.send', 1),

/* Min side */
('next.minside', 'layout.global.view', 1),
('next.minside', 'layout.topbar.view', 1),
('next.minside', 'layout.sidebar.view', 1),
('next.minside', 'profile.view', 1),
('next.minside', 'membership.view', 1),
('next.minside', 'collection.view', 1),
('next.minside', 'activity.view', 1),
('next.minside', 'notifications.view', 1),
('next.minside', 'processes.view', 1),
('next.minside.profile', 'profile.view', 1),
('next.minside.profile', 'profile.edit', 1),
('next.minside.collection', 'collection.view', 1),
('next.minside.collection', 'collection.wishlist.view', 1),
('next.minside.collection', 'collection.favorite.view', 1),
('next.minside.collection', 'collection.transactions.view', 1),
('next.minside.activity', 'activity.view', 1),
('next.minside.activity', 'notifications.view', 1),
('next.minside.activity', 'processes.view', 1),
('next.minside.finance', 'market.index.view', 1),
('next.minside.finance', 'market.index.compare', 1),
('next.minside.dealer', 'dealer.dashboard.view', 1),
('next.minside.dealer', 'dealer.consignments.view', 1),
('next.minside.dealer', 'dealer.inventory.view', 1),
('next.minside.dealer', 'dealer.auction.view', 1),
('next.minside.dealer', 'dealer.shop.view', 1),
('next.minside.admin', 'admin.dashboard.view', 1),
('next.minside.admin', 'admin.users.view', 1),
('next.minside.admin', 'admin.features.view', 1),
('next.minside.admin', 'admin.routes.view', 1),
('next.minside.sharing', 'sharing.view', 1),
('next.minside.settings', 'settings.view', 1),
('next.minside.settings', 'settings.features.view', 1),

/* Admin */
('next.admin', 'layout.global.view', 1),
('next.admin', 'layout.topbar.view', 1),
('next.admin', 'layout.sidebar.view', 1),
('next.admin', 'admin.dashboard.view', 1),
('next.admin', 'admin.users.view', 1),
('next.admin', 'admin.membership.view', 1),
('next.admin', 'admin.dealers.view', 1),
('next.admin', 'admin.catalog.view', 1),
('next.admin', 'admin.auction.view', 1),
('next.admin', 'admin.routes.view', 1),
('next.admin', 'admin.features.view', 1),
('next.admin', 'admin.logs.view', 1),
('next.admin', 'admin.system.view', 1),
('next.admin', 'admin.system.unit_test.view', 1),
('next.admin', 'admin.system.db_ping', 1),
('next.admin.system.unit_test', 'layout.global.view', 1),
('next.admin.system.unit_test', 'layout.topbar.view', 1),
('next.admin.system.unit_test', 'layout.sidebar.view', 1),
('next.admin.system.unit_test', 'admin.system.unit_test.view', 1),
('next.admin.system.unit_test', 'admin.system.db_ping', 1)
ON DUPLICATE KEY UPDATE
is_active = VALUES(is_active);

/* ============================================================
   4. TILGANGSREGLER

   Denne delen er tilpasset vist tabellstruktur:
   feature_id     bigint unsigned NOT NULL
   feature_key    varchar(120)
   role_code      varchar(40)
   membership_code varchar(40)
   role_key       varchar(50)
   membership_key varchar(80)
   access_state   enum('allow','deny','hidden','locked')
   access_mode    enum('allow','limited','deny')
   is_enabled     tinyint

   Fordi feature_id er NOT NULL, hentes feature_id fra ct_app_features.id.
   WHERE NOT EXISTS hindrer duplikater uten aa kreve unik indeks.
   ============================================================ */

/* Public / guest */
INSERT INTO ct_feature_access_rules
(feature_id, feature_key, role_code, membership_code, role_key, membership_key, access_state, access_mode, is_enabled, reason_no)
SELECT f.id, v.feature_key, v.role_key, v.membership_key, v.role_key, v.membership_key, v.access_state, v.access_mode, 1, v.reason_no
FROM ct_app_features f
JOIN (
  SELECT 'layout.global.view' feature_key, 'guest' role_key, '*' membership_key, 'allow' access_state, 'allow' access_mode, 'Global layout er synlig for offentlig side' reason_no UNION ALL
  SELECT 'layout.topbar.view', 'guest', '*', 'allow', 'allow', 'Toppmeny er synlig for offentlig side' UNION ALL
  SELECT 'layout.sidebar.view', 'guest', '*', 'allow', 'allow', 'Sidemeny er synlig for offentlig side' UNION ALL
  SELECT 'layout.mobile_menu.view', 'guest', '*', 'allow', 'allow', 'Mobilmeny er synlig for offentlig side' UNION ALL
  SELECT 'layout.page_frame.view', 'guest', '*', 'allow', 'allow', 'PageFrame er global template' UNION ALL
  SELECT 'home.view', 'guest', '*', 'allow', 'allow', 'Forside er offentlig' UNION ALL
  SELECT 'startside.view', 'guest', '*', 'allow', 'allow', 'Startside er offentlig' UNION ALL
  SELECT 'landing.view', 'guest', '*', 'allow', 'allow', 'Landingsside er offentlig' UNION ALL
  SELECT 'support.view', 'guest', '*', 'allow', 'allow', 'Support er offentlig' UNION ALL
  SELECT 'auth.login.view', 'guest', '*', 'allow', 'allow', 'Innlogging maa kunne vises for gjest' UNION ALL
  SELECT 'auth.login.submit', 'guest', '*', 'allow', 'allow', 'Gjest maa kunne sende innlogging' UNION ALL
  SELECT 'auth.register.view', 'guest', '*', 'allow', 'allow', 'Registrering maa kunne vises for gjest' UNION ALL
  SELECT 'auth.register.submit', 'guest', '*', 'allow', 'allow', 'Gjest maa kunne registrere seg' UNION ALL
  SELECT 'catalog.view', 'guest', '*', 'allow', 'limited', 'Gjest kan se begrenset katalog' UNION ALL
  SELECT 'catalog.search', 'guest', '*', 'allow', 'limited', 'Gjest kan soke begrenset i katalog' UNION ALL
  SELECT 'catalog.filters', 'guest', '*', 'allow', 'limited', 'Gjest kan se begrensede filter'
) v ON v.feature_key = f.feature_key
WHERE NOT EXISTS (
  SELECT 1
  FROM ct_feature_access_rules r
  WHERE r.feature_key = v.feature_key
    AND COALESCE(r.role_key, r.role_code, '') = v.role_key
    AND COALESCE(r.membership_key, r.membership_code, '') = v.membership_key
);

/* Free/user */
INSERT INTO ct_feature_access_rules
(feature_id, feature_key, role_code, membership_code, role_key, membership_key, access_state, access_mode, is_enabled, reason_no)
SELECT f.id, v.feature_key, v.role_key, v.membership_key, v.role_key, v.membership_key, v.access_state, v.access_mode, 1, v.reason_no
FROM ct_app_features f
JOIN (
  SELECT 'auth.logout' feature_key, 'user' role_key, 'free' membership_key, 'allow' access_state, 'allow' access_mode, 'Innlogget bruker kan logge ut' reason_no UNION ALL
  SELECT 'auth.session.view', 'user', 'free', 'allow', 'allow', 'Innlogget bruker kan lese session' UNION ALL
  SELECT 'profile.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se profil' UNION ALL
  SELECT 'profile.edit', 'user', 'free', 'allow', 'allow', 'Bruker kan redigere profil' UNION ALL
  SELECT 'membership.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se medlemskap' UNION ALL
  SELECT 'collection.view', 'user', 'free', 'allow', 'limited', 'Free kan bruke begrenset Min samling' UNION ALL
  SELECT 'collection.wishlist.view', 'user', 'free', 'allow', 'limited', 'Free kan bruke begrenset onskeliste' UNION ALL
  SELECT 'collection.favorite.view', 'user', 'free', 'allow', 'limited', 'Free kan bruke begrensede favoritter' UNION ALL
  SELECT 'activity.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se aktivitet' UNION ALL
  SELECT 'notifications.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se varsler' UNION ALL
  SELECT 'processes.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se prosesser' UNION ALL
  SELECT 'messages.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se meldinger' UNION ALL
  SELECT 'messages.thread.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se meldingstrad' UNION ALL
  SELECT 'messages.send', 'user', 'free', 'allow', 'allow', 'Bruker kan sende melding' UNION ALL
  SELECT 'settings.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se innstillinger' UNION ALL
  SELECT 'settings.features.view', 'user', 'free', 'allow', 'allow', 'Bruker kan se funksjonsoversikt' UNION ALL
  SELECT 'catalog.user_state.view', 'user', 'free', 'allow', 'limited', 'Bruker kan se egen brukerstatus i katalog' UNION ALL
  SELECT 'catalog.object.open', 'user', 'free', 'allow', 'allow', 'Bruker kan apne objektpresentasjon'
) v ON v.feature_key = f.feature_key
WHERE NOT EXISTS (
  SELECT 1
  FROM ct_feature_access_rules r
  WHERE r.feature_key = v.feature_key
    AND COALESCE(r.role_key, r.role_code, '') = v.role_key
    AND COALESCE(r.membership_key, r.membership_code, '') = v.membership_key
);

/* Bronze */
INSERT INTO ct_feature_access_rules
(feature_id, feature_key, role_code, membership_code, role_key, membership_key, access_state, access_mode, is_enabled, reason_no)
SELECT f.id, v.feature_key, v.role_key, v.membership_key, v.role_key, v.membership_key, v.access_state, v.access_mode, 1, v.reason_no
FROM ct_app_features f
JOIN (
  SELECT 'sharing.view' feature_key, 'user' role_key, 'bronze' membership_key, 'allow' access_state, 'allow' access_mode, 'Bronze kan bruke deling' reason_no
) v ON v.feature_key = f.feature_key
WHERE NOT EXISTS (
  SELECT 1
  FROM ct_feature_access_rules r
  WHERE r.feature_key = v.feature_key
    AND COALESCE(r.role_key, r.role_code, '') = v.role_key
    AND COALESCE(r.membership_key, r.membership_code, '') = v.membership_key
);

/* Silver */
INSERT INTO ct_feature_access_rules
(feature_id, feature_key, role_code, membership_code, role_key, membership_key, access_state, access_mode, is_enabled, reason_no)
SELECT f.id, v.feature_key, v.role_key, v.membership_key, v.role_key, v.membership_key, v.access_state, v.access_mode, 1, v.reason_no
FROM ct_app_features f
JOIN (
  SELECT 'catalog.market.view' feature_key, 'user' role_key, 'silver' membership_key, 'allow' access_state, 'allow' access_mode, 'Silver kan se markedsdata' reason_no UNION ALL
  SELECT 'catalog.history.view', 'user', 'silver', 'allow', 'allow', 'Silver kan se historiedata' UNION ALL
  SELECT 'market.index.view', 'user', 'silver', 'allow', 'allow', 'Silver kan se index/finans' UNION ALL
  SELECT 'market.index.compare', 'user', 'silver', 'allow', 'allow', 'Silver kan sammenligne marked' UNION ALL
  SELECT 'collection.transactions.view', 'user', 'silver', 'allow', 'allow', 'Silver kan se transaksjoner'
) v ON v.feature_key = f.feature_key
WHERE NOT EXISTS (
  SELECT 1
  FROM ct_feature_access_rules r
  WHERE r.feature_key = v.feature_key
    AND COALESCE(r.role_key, r.role_code, '') = v.role_key
    AND COALESCE(r.membership_key, r.membership_code, '') = v.membership_key
);

/* Dealer / Gold */
INSERT INTO ct_feature_access_rules
(feature_id, feature_key, role_code, membership_code, role_key, membership_key, access_state, access_mode, is_enabled, reason_no)
SELECT f.id, v.feature_key, v.role_key, v.membership_key, v.role_key, v.membership_key, v.access_state, v.access_mode, 1, v.reason_no
FROM ct_app_features f
JOIN (
  SELECT 'dealer.dashboard.view' feature_key, 'dealer' role_key, 'gold' membership_key, 'allow' access_state, 'allow' access_mode, 'Forhandler kan se dashboard' reason_no UNION ALL
  SELECT 'dealer.consignments.view', 'dealer', 'gold', 'allow', 'allow', 'Forhandler kan se innleveringer' UNION ALL
  SELECT 'dealer.inventory.view', 'dealer', 'gold', 'allow', 'allow', 'Forhandler kan se lager' UNION ALL
  SELECT 'dealer.auction.view', 'dealer', 'gold', 'allow', 'allow', 'Forhandler kan se auksjon' UNION ALL
  SELECT 'dealer.shop.view', 'dealer', 'gold', 'allow', 'allow', 'Forhandler kan se nettbutikk'
) v ON v.feature_key = f.feature_key
WHERE NOT EXISTS (
  SELECT 1
  FROM ct_feature_access_rules r
  WHERE r.feature_key = v.feature_key
    AND COALESCE(r.role_key, r.role_code, '') = v.role_key
    AND COALESCE(r.membership_key, r.membership_code, '') = v.membership_key
);

/* Admin */
INSERT INTO ct_feature_access_rules
(feature_id, feature_key, role_code, membership_code, role_key, membership_key, access_state, access_mode, is_enabled, reason_no)
SELECT f.id, v.feature_key, v.role_key, v.membership_key, v.role_key, v.membership_key, v.access_state, v.access_mode, 1, v.reason_no
FROM ct_app_features f
JOIN (
  SELECT 'admin.dashboard.view' feature_key, 'admin' role_key, 'admin' membership_key, 'allow' access_state, 'allow' access_mode, 'Admin kan se dashboard' reason_no UNION ALL
  SELECT 'admin.users.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se brukere' UNION ALL
  SELECT 'admin.membership.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se medlemskap' UNION ALL
  SELECT 'admin.dealers.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se forhandlere' UNION ALL
  SELECT 'admin.catalog.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se katalog' UNION ALL
  SELECT 'admin.auction.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se auksjon' UNION ALL
  SELECT 'admin.routes.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se routes' UNION ALL
  SELECT 'admin.features.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se features' UNION ALL
  SELECT 'admin.logs.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se logger' UNION ALL
  SELECT 'admin.system.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se systemstatus' UNION ALL
  SELECT 'admin.system.unit_test.view', 'admin', 'admin', 'allow', 'allow', 'Admin kan se enhetstest' UNION ALL
  SELECT 'admin.system.db_ping', 'admin', 'admin', 'allow', 'allow', 'Admin kan kjore DB ping'
) v ON v.feature_key = f.feature_key
WHERE NOT EXISTS (
  SELECT 1
  FROM ct_feature_access_rules r
  WHERE r.feature_key = v.feature_key
    AND COALESCE(r.role_key, r.role_code, '') = v.role_key
    AND COALESCE(r.membership_key, r.membership_code, '') = v.membership_key
);

/* ============================================================
   5. ACTION / API ROUTES
   ============================================================ */

INSERT INTO ct_feature_action_routes
(feature_key, http_method, api_endpoint, handler_file, read_view, write_table, calculation_type, is_active)
VALUES

/* Auth */
('auth.login.submit', 'POST', '/api/auth/login', 'app/api/auth/login/route.ts', 'ct_users', 'ct_user_sessions', 'write', 1),
('auth.logout', 'POST', '/api/auth/logout', 'app/api/auth/logout/route.ts', 'ct_user_sessions', 'ct_user_sessions', 'write', 1),
('auth.register.submit', 'POST', '/api/auth/register', 'app/api/auth/register/route.ts', NULL, 'ct_users', 'write', 1),
('auth.session.view', 'GET', '/api/auth/session', 'app/api/auth/session/route.ts', 'ct_user_sessions', NULL, 'read', 1),

/* Catalog */
('catalog.search', 'GET', '/api/catalog/search', 'app/api/catalog/search/route.ts', 'ct_v_catalog_objects_resolved', NULL, 'read', 1),
('catalog.filters', 'GET', '/api/catalog/filter', 'app/api/catalog/filter/route.ts', 'ct_v_catalog_filter_counts', NULL, 'read', 1),
('catalog.object.open', 'GET', '/api/catalog/object', 'app/api/catalog/object/route.ts', 'ct_v_catalog_objects_resolved', NULL, 'read', 1),
('catalog.user_state.view', 'GET', '/api/catalog/user-state', 'app/api/catalog/user-state/route.ts', 'ct_v_catalog_user_state', NULL, 'read', 1),
('catalog.market.view', 'GET', '/api/catalog/market', 'app/api/catalog/market/route.ts', 'ct_v_catalog_market_summary', NULL, 'read', 1),
('catalog.history.view', 'GET', '/api/catalog/history', 'app/api/catalog/history/route.ts', 'ct_v_catalog_relations', NULL, 'read', 1),
('catalog.new.submit', 'POST', '/api/catalog/new', 'app/api/catalog/new/route.ts', NULL, 'ct_catalog_object_change_requests', 'write', 1),

/* Collection / Min side */
('profile.view', 'GET', '/api/profile/overview', 'app/api/profile/overview/route.ts', 'ct_users', NULL, 'read', 1),
('profile.edit', 'POST', '/api/profile/update', 'app/api/profile/update/route.ts', 'ct_users', 'ct_user_profiles', 'write', 1),
('membership.view', 'GET', '/api/membership/status', 'app/api/membership/status/route.ts', 'ct_memberships', NULL, 'read', 1),
('collection.view', 'GET', '/api/collection/summary', 'app/api/collection/summary/route.ts', 'ct_collection_items', NULL, 'read', 1),
('collection.wishlist.view', 'GET', '/api/collection/wishlist', 'app/api/collection/wishlist/route.ts', 'ct_user_object_states', NULL, 'read', 1),
('collection.favorite.view', 'GET', '/api/collection/favorites', 'app/api/collection/favorites/route.ts', 'ct_user_object_states', NULL, 'read', 1),
('collection.transactions.view', 'GET', '/api/collection/transactions', 'app/api/collection/transactions/route.ts', 'ct_collection_transactions', NULL, 'read', 1),
('activity.view', 'GET', '/api/activity/feed', 'app/api/activity/feed/route.ts', 'ct_activity_log', NULL, 'read', 1),
('notifications.view', 'GET', '/api/notifications', 'app/api/notifications/route.ts', 'ct_notifications', NULL, 'read', 1),
('processes.view', 'GET', '/api/processes', 'app/api/processes/route.ts', 'ct_processes', NULL, 'read', 1),
('sharing.view', 'GET', '/api/sharing/overview', 'app/api/sharing/overview/route.ts', 'ct_object_share_links', NULL, 'read', 1),
('settings.view', 'GET', '/api/settings/overview', 'app/api/settings/overview/route.ts', 'ct_user_settings', NULL, 'read', 1),
('settings.features.view', 'GET', '/api/settings/features', 'app/api/settings/features/route.ts', 'ct_v_feature_access_resolved', NULL, 'read', 1),

/* Dealer */
('dealer.dashboard.view', 'GET', '/api/dealer/dashboard', 'app/api/dealer/dashboard/route.ts', 'ct_dealers', NULL, 'read', 1),
('dealer.consignments.view', 'GET', '/api/dealer/consignments', 'app/api/dealer/consignments/route.ts', 'ct_dealer_consignments', NULL, 'read', 1),
('dealer.inventory.view', 'GET', '/api/dealer/inventory', 'app/api/dealer/inventory/route.ts', 'ct_dealer_inventory', NULL, 'read', 1),
('dealer.auction.view', 'GET', '/api/dealer/auction', 'app/api/dealer/auction/route.ts', 'ct_auction_lots', NULL, 'read', 1),
('dealer.shop.view', 'GET', '/api/dealer/shop', 'app/api/dealer/shop/route.ts', 'ct_shop_items', NULL, 'read', 1),

/* Auction */
('auction.view', 'GET', '/api/auction/list', 'app/api/auction/list/route.ts', 'ct_auction_lots', NULL, 'read', 1),
('auction.object.view', 'GET', '/api/auction/object', 'app/api/auction/object/route.ts', 'ct_auction_lots', NULL, 'read', 1),
('auction.bid', 'POST', '/api/auction/bid', 'app/api/auction/bid/route.ts', 'ct_auction_lots', 'ct_auction_bids', 'write', 1),
('auction.watch', 'POST', '/api/auction/watch', 'app/api/auction/watch/route.ts', 'ct_auction_lots', 'ct_user_object_states', 'write', 1),

/* Messages */
('messages.view', 'GET', '/api/messages', 'app/api/messages/route.ts', 'ct_messages', NULL, 'read', 1),
('messages.thread.view', 'GET', '/api/messages/thread', 'app/api/messages/thread/route.ts', 'ct_messages', NULL, 'read', 1),
('messages.send', 'POST', '/api/messages/send', 'app/api/messages/send/route.ts', NULL, 'ct_messages', 'write', 1),

/* Market */
('market.index.view', 'GET', '/api/index/market', 'app/api/index/market/route.ts', 'ct_v_catalog_market_summary', NULL, 'read', 1),
('market.index.compare', 'GET', '/api/index/compare', 'app/api/index/compare/route.ts', 'ct_v_market_price_observations_resolved', NULL, 'read', 1),

/* Admin */
('admin.dashboard.view', 'GET', '/api/admin/overview', 'app/api/admin/overview/route.ts', 'ct_v_feature_access_resolved', NULL, 'read', 1),
('admin.users.view', 'GET', '/api/admin/users', 'app/api/admin/users/route.ts', 'ct_users', NULL, 'read', 1),
('admin.membership.view', 'GET', '/api/admin/membership', 'app/api/admin/membership/route.ts', 'ct_memberships', NULL, 'read', 1),
('admin.dealers.view', 'GET', '/api/admin/dealers', 'app/api/admin/dealers/route.ts', 'ct_dealers', NULL, 'read', 1),
('admin.catalog.view', 'GET', '/api/admin/catalog', 'app/api/admin/catalog/route.ts', 'ct_catalog_objects', NULL, 'read', 1),
('admin.auction.view', 'GET', '/api/admin/auction', 'app/api/admin/auction/route.ts', 'ct_auction_lots', NULL, 'read', 1),
('admin.routes.view', 'GET', '/api/admin/routes', 'app/api/admin/routes/route.ts', 'ct_feature_action_routes', NULL, 'read', 1),
('admin.features.view', 'GET', '/api/admin/features', 'app/api/admin/features/route.ts', 'ct_app_features', NULL, 'read', 1),
('admin.logs.view', 'GET', '/api/admin/logs', 'app/api/admin/logs/route.ts', 'ct_activity_log', NULL, 'read', 1),
('admin.system.view', 'GET', '/api/admin/system/status', 'app/api/admin/system/status/route.ts', 'ct_v_feature_access_resolved', NULL, 'read', 1),
('admin.system.unit_test.view', 'GET', '/api/admin/system/unit-test', 'app/api/admin/system/unit-test/route.ts', 'ct_v_feature_access_resolved', NULL, 'read', 1),
('admin.system.db_ping', 'GET', '/api/admin/system/db-ping', 'app/api/admin/system/db-ping/route.ts', NULL, NULL, 'system', 1)
ON DUPLICATE KEY UPDATE
http_method = VALUES(http_method),
api_endpoint = VALUES(api_endpoint),
handler_file = VALUES(handler_file),
read_view = VALUES(read_view),
write_table = VALUES(write_table),
calculation_type = VALUES(calculation_type),
is_active = VALUES(is_active);

COMMIT;

/* ============================================================
   6. KONTROLLSPORRINGER
   Kjor etter COMMIT for aa kontrollere resultatet.
   ============================================================ */

SELECT page_key, page_name_no, file_path, is_active
FROM ct_app_pages
WHERE page_key LIKE 'next.%'
ORDER BY page_key;

SELECT feature_key, feature_name_no, feature_group, is_active
FROM ct_app_features
WHERE feature_key IN (
  'layout.global.view',
  'layout.sidebar.view',
  'support.view',
  'profile.view',
  'collection.view',
  'dealer.dashboard.view',
  'admin.dashboard.view',
  'catalog.view',
  'admin.system.unit_test.view'
)
ORDER BY feature_group, feature_key;

SELECT page_key, feature_key, is_active
FROM ct_app_page_features
WHERE page_key LIKE 'next.minside%'
   OR page_key IN ('next.home', 'next.startside', 'next.login', 'next.support', 'next.catalog', 'next.admin', 'next.admin.system.unit_test')
ORDER BY page_key, feature_key;

SELECT
  r.feature_key,
  COALESCE(r.role_key, r.role_code) AS role_key,
  COALESCE(r.membership_key, r.membership_code) AS membership_key,
  r.access_state,
  r.access_mode,
  r.is_enabled
FROM ct_feature_access_rules r
WHERE r.feature_key IN (
  'catalog.view',
  'catalog.search',
  'catalog.market.view',
  'profile.view',
  'collection.view',
  'dealer.dashboard.view',
  'admin.dashboard.view',
  'admin.system.unit_test.view'
)
ORDER BY r.feature_key, role_key, membership_key;

SELECT feature_key, http_method, api_endpoint, handler_file, read_view, write_table, calculation_type, is_active
FROM ct_feature_action_routes
WHERE feature_key LIKE 'admin.%'
   OR feature_key LIKE 'profile.%'
   OR feature_key LIKE 'collection.%'
   OR feature_key LIKE 'catalog.%'
   OR feature_key LIKE 'dealer.%'
ORDER BY feature_key;
