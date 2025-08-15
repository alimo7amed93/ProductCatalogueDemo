"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceToOffering = exports.productOfferingPrice = exports.productOffering = exports.productSpecification = exports.timePeriod = void 0;
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
/** Common time window (TMF 'validFor') stored as two columns */
exports.timePeriod = {
    validForStart: (0, sqlite_core_1.integer)("valid_for_start", { mode: "timestamp_ms" }),
    validForEnd: (0, sqlite_core_1.integer)("valid_for_end", { mode: "timestamp_ms" }),
};
/** ===== TMF620: ProductSpecification ===== */
exports.productSpecification = (0, sqlite_core_1.sqliteTable)("product_specification", __assign({ id: (0, sqlite_core_1.text)("id").primaryKey(), href: (0, sqlite_core_1.text)("href"), name: (0, sqlite_core_1.text)("name").notNull(), description: (0, sqlite_core_1.text)("description"), brand: (0, sqlite_core_1.text)("brand"), version: (0, sqlite_core_1.text)("version"), lifecycleStatus: (0, sqlite_core_1.text)("lifecycle_status"), lastUpdate: (0, sqlite_core_1.integer)("last_update", { mode: "timestamp_ms" }) }, exports.timePeriod));
/** ===== TMF620: ProductOffering ===== */
exports.productOffering = (0, sqlite_core_1.sqliteTable)("product_offering", __assign({ id: (0, sqlite_core_1.text)("id").primaryKey(), href: (0, sqlite_core_1.text)("href"), name: (0, sqlite_core_1.text)("name").notNull(), description: (0, sqlite_core_1.text)("description"), isBundle: (0, sqlite_core_1.integer)("is_bundle", { mode: "boolean" }).notNull().default(false), isSellable: (0, sqlite_core_1.integer)("is_sellable", { mode: "boolean" }).notNull().default(true), lifecycleStatus: (0, sqlite_core_1.text)("lifecycle_status"), lastUpdate: (0, sqlite_core_1.integer)("last_update", { mode: "timestamp_ms" }), productSpecificationId: (0, sqlite_core_1.text)("product_specification_id").references(function () { return exports.productSpecification.id; }) }, exports.timePeriod));
/** ===== TMF620: ProductOfferingPrice ===== */
exports.productOfferingPrice = (0, sqlite_core_1.sqliteTable)("product_offering_price", __assign({ id: (0, sqlite_core_1.text)("id").primaryKey(), href: (0, sqlite_core_1.text)("href"), name: (0, sqlite_core_1.text)("name").notNull(), description: (0, sqlite_core_1.text)("description"), priceType: (0, sqlite_core_1.text)("price_type").notNull(), recurringChargePeriodType: (0, sqlite_core_1.text)("recurring_charge_period_type"), recurringChargePeriodLength: (0, sqlite_core_1.integer)("recurring_charge_period_length"), unitOfMeasure: (0, sqlite_core_1.text)("uom"), lifecycleStatus: (0, sqlite_core_1.text)("lifecycle_status"), lastUpdate: (0, sqlite_core_1.integer)("last_update", { mode: "timestamp_ms" }), currency: (0, sqlite_core_1.text)("currency"), dutyFreeAmount: (0, sqlite_core_1.real)("duty_free_amount"), taxIncludedAmount: (0, sqlite_core_1.real)("tax_included_amount"), percentage: (0, sqlite_core_1.real)("percentage"), taxRate: (0, sqlite_core_1.real)("tax_rate") }, exports.timePeriod));
/** Many-to-many: prices attached to offerings */
exports.priceToOffering = (0, sqlite_core_1.sqliteTable)("price_to_offering", {
    priceId: (0, sqlite_core_1.text)("price_id").references(function () { return exports.productOfferingPrice.id; }, { onDelete: "cascade" }),
    offeringId: (0, sqlite_core_1.text)("offering_id").references(function () { return exports.productOffering.id; }, { onDelete: "cascade" }),
}, function (t) { return ({ pk: (0, sqlite_core_1.primaryKey)({ columns: [t.priceId, t.offeringId] }) }); });
