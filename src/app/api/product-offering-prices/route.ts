import { db } from '../../../db/client';
import { productOfferingPrice, priceToOffering } from '../../../db/schema';
import { NextResponse } from 'next/server';
import { requireApiAuth } from "../../../lib/auth";

export async function GET(req: Request) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const prices = await db.select().from(productOfferingPrice);
    return NextResponse.json(prices);
}

export async function POST(req: Request) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { offeringIds = [], ...priceData } = await req.json();

    // Insert price
    await db.insert(productOfferingPrice).values(priceData);

    // Attach to offerings
    for (const offeringId of offeringIds) {
        await db.insert(priceToOffering).values({ offeringId, priceId: priceData.id });
    }

    return NextResponse.json({ message: 'Price created' }, { status: 201 });
}
