import { db } from '../../../../db/client';
import { productOfferingPrice, priceToOffering } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { requireApiAuth } from "../../../../lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const price = await db
        .select()
        .from(productOfferingPrice)
        .where(eq(productOfferingPrice.id, params.id));

    // Include attached offerings
    const attachedOfferings = await db
        .select()
        .from(priceToOffering)
        .where(eq(priceToOffering.priceId, params.id));

    return NextResponse.json({ 
        ...price[0], 
        offeringIds: attachedOfferings.map(o => o.offeringId) 
    });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { offeringIds, ...priceData } = await req.json();

    // Update price
    await db.update(productOfferingPrice).set(priceData).where(eq(productOfferingPrice.id, params.id));

    if (Array.isArray(offeringIds)) {
        // Remove old links
        await db.delete(priceToOffering).where(eq(priceToOffering.priceId, params.id));

        // Insert new links
        for (const offeringId of offeringIds) {
            await db.insert(priceToOffering).values({ offeringId, priceId: params.id });
        }
    }

    return NextResponse.json({ message: 'Updated' });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Cascading deletes remove links automatically
    await db.delete(productOfferingPrice).where(eq(productOfferingPrice.id, params.id));

    return NextResponse.json({ message: 'Deleted' });
}
