import { NextResponse } from 'next/server';
import { requireApiAuth } from '../../../lib/auth';

const schema_metadata = {
  productSpecification: {
    id: "string",
    href: "string | null",
    name: "string",
    description: "string | null",
    brand: "string | null",
    version: "string | null",
    lifecycleStatus: "string | null",
    lastUpdate: "number | null",
    validForStart: "number | null",
    validForEnd: "number | null",
  },
  productOffering: {
    id: "string",
    name: "string",
    description: "string | null",
    isBundle: "boolean",
    isSellable: "boolean",
    lifecycleStatus: "string | null",
    lastUpdate: "number | null",
    productSpecificationId: "string | null",
    validForStart: "number | null",
    validForEnd: "number | null",
  },
  productOfferingPrice: {
    id: "string",
    name: "string",
    description: "string | null",
    priceType: "oneTime | recurring | usage",
    recurringChargePeriodType: "string | null",
    recurringChargePeriodLength: "number | null",
    unitOfMeasure: "string | null",
    lifecycleStatus: "string | null",
    lastUpdate: "number | null",
    currency: "string | null",
    dutyFreeAmount: "number | null",
    taxIncludedAmount: "number | null",
    percentage: "number | null",
    taxRate: "number | null",
    validForStart: "number | null",
    validForEnd: "number | null",
  },
  priceToOffering: {
    priceId: "string",
    offeringId: "string",
  },
};

export async function GET(req: Request) {
  if (!requireApiAuth(req)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json(schema_metadata);
}
