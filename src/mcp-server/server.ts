// server/mcp-server.ts
import { createServer } from 'http';
import { FastMCP } from 'fastmcp';
import { db } from '../db/client';
import {
  productSpecification,
  productOffering,
  productOfferingPrice,
  priceToOffering
} from '../db/schema';
import { eq } from 'drizzle-orm';
import { requireApiAuth } from '../lib/auth';
import crypto from 'crypto'; // Import the crypto module for generating IDs

/**
 * Schema metadata to guide LLM or clients
 */
const schemaMetadata = {
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
const server = new FastMCP({
  auth: (req) => requireApiAuth(req),
  routes: {

    /** ===== Schema Endpoint ===== */
    'get /schema': async () => schemaMetadata,

    /** ===== ProductSpecification ===== */
    'get /products': async () => db.select().from(productSpecification),
    'post /products': async ({ data }) => {
      if (!data.name) throw new Error("name is required");
      const newProduct = { ...data, id: crypto.randomUUID() };
      await db.insert(productSpecification).values(newProduct);
      return { message: 'Product created', id: newProduct.id };
    },
    'get /products/:id': async ({ params }) => {
      const product = await db.select().from(productSpecification).where(eq(productSpecification.id, params.id));
      return product[0] || {};
    },
    'put /products/:id': async ({ params, data }) => {
      await db.update(productSpecification).set(data).where(eq(productSpecification.id, params.id));
      return { message: 'Updated' };
    },
    'delete /products/:id': async ({ params }) => {
      await db.delete(productSpecification).where(eq(productSpecification.id, params.id));
      return { message: 'Deleted' };
    },

    /** ===== ProductOffering ===== */
    'get /product-offerings': async () => db.select().from(productOffering),
    'post /product-offerings': async ({ data }) => {
      if (!data.name) throw new Error("name is required");
      const newOffering = { ...data, id: crypto.randomUUID() };
      await db.insert(productOffering).values(newOffering);
      return { message: 'Product Offering created', id: newOffering.id };
    },
    'get /product-offerings/:id': async ({ params }) => {
      const offering = await db.select().from(productOffering).where(eq(productOffering.id, params.id));
      return offering[0] || {};
    },
    'put /product-offerings/:id': async ({ params, data }) => {
      await db.update(productOffering).set(data).where(eq(productOffering.id, params.id));
      return { message: 'Updated' };
    },
    'delete /product-offerings/:id': async ({ params }) => {
      await db.delete(productOffering).where(eq(productOffering.id, params.id));
      return { message: 'Deleted' };
    },

    /** ===== ProductOfferingPrice ===== */
    'get /product-offering-prices': async () => db.select().from(productOfferingPrice),
    'post /product-offering-prices': async ({ data }) => {
      const { offeringIds = [], ...priceData } = data;
      if (!priceData.name || !priceData.priceType) throw new Error("name and priceType are required");
      const newPrice = { ...priceData, id: crypto.randomUUID() };
      await db.insert(productOfferingPrice).values(newPrice);

      for (const offeringId of offeringIds) {
        await db.insert(priceToOffering).values({ offeringId, priceId: newPrice.id });
      }
      return { message: 'Price created', id: newPrice.id };
    },
    'get /product-offering-prices/:id': async ({ params }) => {
      const price = await db.select().from(productOfferingPrice).where(eq(productOfferingPrice.id, params.id));
      if (!price[0]) {
        return {};
      }
      const attachedOfferings = await db.select().from(priceToOffering).where(eq(priceToOffering.priceId, params.id));
      return {
        ...price[0],
        offeringIds: attachedOfferings.map(o => o.offeringId),
      };
    },
    'put /product-offering-prices/:id': async ({ params, data }) => {
      const { offeringIds, ...priceData } = data;
      await db.update(productOfferingPrice).set(priceData).where(eq(productOfferingPrice.id, params.id));

      if (Array.isArray(offeringIds)) {
        await db.delete(priceToOffering).where(eq(priceToOffering.priceId, params.id));
        for (const offeringId of offeringIds) {
          await db.insert(priceToOffering).values({ offeringId, priceId: params.id });
        }
      }
      return { message: 'Updated' };
    },
    'delete /product-offering-prices/:id': async ({ params }) => {
      await db.delete(productOfferingPrice).where(eq(productOfferingPrice.id, params.id));
      return { message: 'Deleted' };
    },
  },
});

server.listen(4000, () => {
  console.log('FastMCP server running on http://localhost:4000');
});