import { db } from '../../../../db/client';
import { productOffering } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { requireApiAuth } from "../../../../lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const offering = await db
        .select()
        .from(productOffering)
        .where(eq(productOffering.id, params.id));
    return NextResponse.json(offering[0] || {});
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    await db.update(productOffering).set(data).where(eq(productOffering.id, params.id));
    return NextResponse.json({ message: 'Updated' });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    await db.delete(productOffering).where(eq(productOffering.id, params.id));
    return NextResponse.json({ message: 'Deleted' });
}
