require("dotenv").config({ path: ".env.local" });`nconst mysql = require("mysql2/promise");

function need(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error("Mangler miljøvariabel: " + name);
  }
  return value;
}

async function main() {
  const conn = await mysql.createConnection({
    host: need("DB_HOST"),
    port: Number(process.env.DB_PORT || 3306),
    user: need("DB_USER"),
    password: need("DB_PASSWORD"),
    database: need("DB_NAME"),
  });

  console.log("DB: OK koblet til", process.env.DB_NAME);
  console.log("");

  const tableQueries = [
    "ct_user%",
    "ct_dealer%",
    "ct_feature%",
    "ct_app%",
    "ct_v_feature%",
    "ct_membership%",
    "ct_role%"
  ];

  for (const q of tableQueries) {
    const [rows] = await conn.query("SHOW TABLES LIKE ?", [q]);
    console.log("TABLES LIKE", q);
    if (!rows.length) {
      console.log("  - Ingen treff");
    } else {
      for (const row of rows) {
        console.log("  -", Object.values(row)[0]);
      }
    }
    console.log("");
  }

  const importantTables = [
    "ct_users",
    "ct_user_profiles",
    "ct_user_roles",
    "ct_dealers",
    "ct_dealer_objects",
    "ct_dealer_inventory",
    "ct_dealer_object_channels",
    "ct_dealer_fee_agreements",
    "ct_app_pages",
    "ct_app_features",
    "ct_app_page_features",
    "ct_feature_access_rules",
    "ct_v_feature_access_resolved",
    "ct_feature_action_routes"
  ];

  for (const table of importantTables) {
    try {
      const [cols] = await conn.query("DESCRIBE `" + table + "`");
      console.log("DESCRIBE", table);
      for (const col of cols) {
        console.log("  -", col.Field, col.Type, col.Null, col.Key, col.Default);
      }
      console.log("");
    } catch (err) {
      console.log("MANGLER / FEIL:", table);
      console.log("  ", err.message);
      console.log("");
    }
  }

  try {
    const [users] = await conn.query(
      "SELECT * FROM ct_users WHERE email = ? LIMIT 5",
      ["tsandvin@gmail.com"]
    );

    console.log("BRUKER tsandvin@gmail.com");
    if (!users.length) {
      console.log("  - Ikke funnet i ct_users");
    } else {
      console.log(JSON.stringify(users, null, 2));
    }
    console.log("");
  } catch (err) {
    console.log("Kunne ikke sjekke ct_users:", err.message);
  }

  await conn.end();
}

main().catch((err) => {
  console.error("DB-SJEKK FEILET:");
  console.error(err.message);
  process.exit(1);
});
