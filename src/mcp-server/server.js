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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/mcp-server.ts
var express_1 = require("express");
var app = (0, express_1.default)();
var fastmcp_1 = require("fastmcp");
var client_1 = require("../db/client");
var schema_1 = require("../db/schema");
var drizzle_orm_1 = require("drizzle-orm");
var auth_1 = require("../lib/auth");
var crypto_1 = require("crypto"); // Import the crypto module for generating IDs
/**
 * Schema metadata to guide LLM or clients
 */
var schemaMetadata = {
    productSpecification: {
        id: 'string',
        href: 'string | null',
        name: 'string',
        description: 'string | null',
        brand: 'string | null',
        version: 'string | null',
        lifecycleStatus: 'string | null',
        lastUpdate: 'number | null',
        validForStart: 'number | null',
        validForEnd: 'number | null'
    },
    productOffering: {
        id: 'string',
        name: 'string',
        description: 'string | null',
        isBundle: 'boolean',
        isSellable: 'boolean',
        lifecycleStatus: 'string | null',
        lastUpdate: 'number | null',
        productSpecificationId: 'string | null',
        validForStart: 'number | null',
        validForEnd: 'number | null'
    },
    productOfferingPrice: {
        id: 'string',
        name: 'string',
        description: 'string | null',
        priceType: 'oneTime | recurring | usage',
        recurringChargePeriodType: 'string | null',
        recurringChargePeriodLength: 'number | null',
        unitOfMeasure: 'string | null',
        lifecycleStatus: 'string | null',
        lastUpdate: 'number | null',
        currency: 'string | null',
        dutyFreeAmount: 'number | null',
        taxIncludedAmount: 'number | null',
        percentage: 'number | null',
        taxRate: 'number | null',
        validForStart: 'number | null',
        validForEnd: 'number | null'
    },
    priceToOffering: {
        priceId: 'string',
        offeringId: 'string'
    }
};
/**
 * FastMCP Server with schema-aware routes
 */
var server = new fastmcp_1.FastMCP({
    auth: function (req) { return (0, auth_1.requireApiAuth)(req); },
    routes: {
        /** ===== Schema Endpoint ===== */
        'get /schema': function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, schemaMetadata];
        }); }); },
        /** ===== ProductSpecification ===== */
        'get /products': function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, client_1.db.select().from(schema_1.productSpecification)];
        }); }); },
        'post /products': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var newProduct;
            var data = _b.data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!data.name)
                            throw new Error("name is required");
                        newProduct = __assign(__assign({}, data), { id: crypto_1.default.randomUUID() });
                        return [4 /*yield*/, client_1.db.insert(schema_1.productSpecification).values(newProduct)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: 'Product created', id: newProduct.id }];
                }
            });
        }); },
        'get /products/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var product;
            var params = _b.params;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.select().from(schema_1.productSpecification).where((0, drizzle_orm_1.eq)(schema_1.productSpecification.id, params.id))];
                    case 1:
                        product = _c.sent();
                        return [2 /*return*/, product[0] || {}];
                }
            });
        }); },
        'put /products/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var params = _b.params, data = _b.data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.update(schema_1.productSpecification).set(data).where((0, drizzle_orm_1.eq)(schema_1.productSpecification.id, params.id))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: 'Updated' }];
                }
            });
        }); },
        'delete /products/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var params = _b.params;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.delete(schema_1.productSpecification).where((0, drizzle_orm_1.eq)(schema_1.productSpecification.id, params.id))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: 'Deleted' }];
                }
            });
        }); },
        /** ===== ProductOffering ===== */
        'get /product-offerings': function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, client_1.db.select().from(schema_1.productOffering)];
        }); }); },
        'post /product-offerings': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var newOffering;
            var data = _b.data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!data.name)
                            throw new Error("name is required");
                        newOffering = __assign(__assign({}, data), { id: crypto_1.default.randomUUID() });
                        return [4 /*yield*/, client_1.db.insert(schema_1.productOffering).values(newOffering)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: 'Product Offering created', id: newOffering.id }];
                }
            });
        }); },
        'get /product-offerings/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var offering;
            var params = _b.params;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.select().from(schema_1.productOffering).where((0, drizzle_orm_1.eq)(schema_1.productOffering.id, params.id))];
                    case 1:
                        offering = _c.sent();
                        return [2 /*return*/, offering[0] || {}];
                }
            });
        }); },
        'put /product-offerings/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var params = _b.params, data = _b.data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.update(schema_1.productOffering).set(data).where((0, drizzle_orm_1.eq)(schema_1.productOffering.id, params.id))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: 'Updated' }];
                }
            });
        }); },
        'delete /product-offerings/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var params = _b.params;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.delete(schema_1.productOffering).where((0, drizzle_orm_1.eq)(schema_1.productOffering.id, params.id))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: 'Deleted' }];
                }
            });
        }); },
        /** ===== ProductOfferingPrice ===== */
        'get /product-offering-prices': function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, client_1.db.select().from(schema_1.productOfferingPrice)];
        }); }); },
        'post /product-offering-prices': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var _c, offeringIds, priceData, newPrice, _i, offeringIds_1, offeringId;
            var data = _b.data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = data.offeringIds, offeringIds = _c === void 0 ? [] : _c, priceData = __rest(data, ["offeringIds"]);
                        if (!priceData.name || !priceData.priceType)
                            throw new Error("name and priceType are required");
                        newPrice = __assign(__assign({}, priceData), { id: crypto_1.default.randomUUID() });
                        return [4 /*yield*/, client_1.db.insert(schema_1.productOfferingPrice).values(newPrice)];
                    case 1:
                        _d.sent();
                        _i = 0, offeringIds_1 = offeringIds;
                        _d.label = 2;
                    case 2:
                        if (!(_i < offeringIds_1.length)) return [3 /*break*/, 5];
                        offeringId = offeringIds_1[_i];
                        return [4 /*yield*/, client_1.db.insert(schema_1.priceToOffering).values({ offeringId: offeringId, priceId: newPrice.id })];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, { message: 'Price created', id: newPrice.id }];
                }
            });
        }); },
        'get /product-offering-prices/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var price, attachedOfferings;
            var params = _b.params;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.select().from(schema_1.productOfferingPrice).where((0, drizzle_orm_1.eq)(schema_1.productOfferingPrice.id, params.id))];
                    case 1:
                        price = _c.sent();
                        if (!price[0]) {
                            return [2 /*return*/, {}];
                        }
                        return [4 /*yield*/, client_1.db.select().from(schema_1.priceToOffering).where((0, drizzle_orm_1.eq)(schema_1.priceToOffering.priceId, params.id))];
                    case 2:
                        attachedOfferings = _c.sent();
                        return [2 /*return*/, __assign(__assign({}, price[0]), { offeringIds: attachedOfferings.map(function (o) { return o.offeringId; }) })];
                }
            });
        }); },
        'put /product-offering-prices/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var offeringIds, priceData, _i, offeringIds_2, offeringId;
            var params = _b.params, data = _b.data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        offeringIds = data.offeringIds, priceData = __rest(data, ["offeringIds"]);
                        return [4 /*yield*/, client_1.db.update(schema_1.productOfferingPrice).set(priceData).where((0, drizzle_orm_1.eq)(schema_1.productOfferingPrice.id, params.id))];
                    case 1:
                        _c.sent();
                        if (!Array.isArray(offeringIds)) return [3 /*break*/, 6];
                        return [4 /*yield*/, client_1.db.delete(schema_1.priceToOffering).where((0, drizzle_orm_1.eq)(schema_1.priceToOffering.priceId, params.id))];
                    case 2:
                        _c.sent();
                        _i = 0, offeringIds_2 = offeringIds;
                        _c.label = 3;
                    case 3:
                        if (!(_i < offeringIds_2.length)) return [3 /*break*/, 6];
                        offeringId = offeringIds_2[_i];
                        return [4 /*yield*/, client_1.db.insert(schema_1.priceToOffering).values({ offeringId: offeringId, priceId: params.id })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, { message: 'Updated' }];
                }
            });
        }); },
        'delete /product-offering-prices/:id': function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var params = _b.params;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, client_1.db.delete(schema_1.productOfferingPrice).where((0, drizzle_orm_1.eq)(schema_1.productOfferingPrice.id, params.id))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: 'Deleted' }];
                }
            });
        }); },
    },
});
// FastMCP exposes a handler for Express
app.use(server.expressHandler());
app.listen(4000, function () {
    console.log('FastMCP server running on http://localhost:4000');
});
