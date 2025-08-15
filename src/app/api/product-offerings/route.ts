import { db } from '../../../db/client';
import { productOffering } from '../../../db/schema';
import { NextResponse } from 'next/server';
import { requireApiAuth } from "../../../lib/auth";

export async function GET(req: Request) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const offerings = await db.select().from(productOffering);
    return NextResponse.json(offerings);
}

export async function POST(req: Request) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    await db.insert(productOffering).values(data);
    return NextResponse.json({ message: 'Product Offering created' }, { status: 201 });
}
