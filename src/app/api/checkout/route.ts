import { NextResponse } from "next/server";
import Stripe from "stripe";

type Item = { id: string; name: string; price: number; quantity: number };

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY is not configured" }, { status: 500 });
    }
    const { items } = (await req.json()) as { items: Item[] };
    if (!items?.length) {
      return NextResponse.json({ error: "Bag is empty" }, { status: 400 });
    }

    const stripe = new Stripe(secret);
    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((i) => ({
        price_data: {
          currency: "usd",
          product_data: { name: `FitThread — ${i.name}` },
          unit_amount: Math.round(i.price * 100),
        },
        quantity: i.quantity,
      })),
      success_url: `${origin}/success`,
      cancel_url: origin,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
