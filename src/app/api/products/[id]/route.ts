import { db } from '../../../../db/client';
import { productSpecification } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { requireApiAuth } from "../../../../lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const product = await db
    .select()
    .from(productSpecification)
    .where(eq(productSpecification.id, params.id));
  return NextResponse.json(product[0] || {});
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    await db.update(productSpecification).set(data).where(eq(productSpecification.id, params.id));
    return NextResponse.json({ message: 'Updated' });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    await db.delete(productSpecification).where(eq(productSpecification.id, params.id));
    return NextResponse.json({ message: 'Deleted' });
}
