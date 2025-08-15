import { db } from '../../../db/client';
import { productSpecification } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { requireApiAuth } from "../../../lib/auth";

export async function GET(req: Request) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const products = await db.select().from(productSpecification);
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    if (!requireApiAuth(req)) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    await db.insert(productSpecification).values(data);
    return NextResponse.json({ message: 'Product created' }, { status: 201 });
}
