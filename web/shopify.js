import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-01";
import { join } from "path";
import { QRCodesDB } from "./qr-codes-db.js";

const dbFile = join(process.cwd(), "database.sqlite");
const sessionDb = new SQLiteSessionStorage(dbFile);
// Initialize SQLite DB
QRCodesDB.db = sessionDb.db;
QRCodesDB.init();

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: sessionDb,
});

