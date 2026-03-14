import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCT_INFO } from "@/lib/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 },
      );
    }

    const product = id === PRODUCT_INFO.id ? PRODUCT_INFO : null;

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const name = product.name as string;
    const price = product.price as number;
    const description = product.description || "";

    const origin = request.headers.get("origin") ?? "";
    const image = product.image
      ? `${origin}${product.image.startsWith("/") ? "" : "/"}${product.image}`
      : undefined;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name,
              ...(description ? { description } : {}),
              ...(image ? { images: [image] } : {}),
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/`,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Stripe session creation failed", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
