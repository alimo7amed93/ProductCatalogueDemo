import { sqliteTable, text, integer, real, primaryKey } from "drizzle-orm/sqlite-core";

/** Common time window (TMF 'validFor') stored as two columns */
export const timePeriod = {
  validForStart: integer("valid_for_start", { mode: "timestamp_ms" }),
  validForEnd: integer("valid_for_end", { mode: "timestamp_ms" }),
};


/** ===== TMF620: ProductSpecification ===== */
export const productSpecification = sqliteTable("product_specification", {
  id: text("id").primaryKey(),
  href: text("href"),
  name: text("name").notNull(),
  description: text("description"),
  brand: text("brand"),
  version: text("version"),
  lifecycleStatus: text("lifecycle_status"),
  lastUpdate: integer("last_update", { mode: "timestamp_ms" }),
  ...timePeriod,
});

/** ===== TMF620: ProductOffering ===== */
export const productOffering = sqliteTable("product_offering", {
  id: text("id").primaryKey(),
  href: text("href"),
  name: text("name").notNull(),
  description: text("description"),
  isBundle: integer("is_bundle", { mode: "boolean" }).notNull().default(false),
  isSellable: integer("is_sellable", { mode: "boolean" }).notNull().default(true),
  lifecycleStatus: text("lifecycle_status"),
  lastUpdate: integer("last_update", { mode: "timestamp_ms" }),
  productSpecificationId: text("product_specification_id").references(() => productSpecification.id),
  ...timePeriod,
});

/** ===== TMF620: ProductOfferingPrice ===== */
export const productOfferingPrice = sqliteTable("product_offering_price", {
  id: text("id").primaryKey(),
  href: text("href"),
  name: text("name").notNull(),
  description: text("description"),
  priceType: text("price_type").notNull(), /** oneTime | recurring | usage */
  recurringChargePeriodType: text("recurring_charge_period_type"), /** month | day | etc */
  recurringChargePeriodLength: integer("recurring_charge_period_length"),
  unitOfMeasure: text("uom"), /** e.g. GB, SMS, minute */
  lifecycleStatus: text("lifecycle_status"),
  lastUpdate: integer("last_update", { mode: "timestamp_ms" }),
  currency: text("currency"),
  dutyFreeAmount: real("duty_free_amount"),
  taxIncludedAmount: real("tax_included_amount"),
  percentage: real("percentage"),  /** for discounts or % prices */
  taxRate: real("tax_rate"),
  ...timePeriod,
});

/** Many-to-many: prices attached to offerings */
export const priceToOffering = sqliteTable(
  "price_to_offering",
  {
    priceId: text("price_id").references(() => productOfferingPrice.id, { onDelete: "cascade" }),
    offeringId: text("offering_id").references(() => productOffering.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey({ columns: [t.priceId, t.offeringId] }) })
);
