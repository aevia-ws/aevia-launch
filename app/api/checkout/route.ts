import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy", {
  apiVersion: "2026-04-22.dahlia",
});

const SITE_PRICES: Record<string, { label: string; price: number }> = {
  landing:       { label: "Landing Page",          price: 599  },
  saas:          { label: "SaaS Product",           price: 899  },
  agency:        { label: "Creative Agency",        price: 899  },
  vitrine:       { label: "Site Vitrine",           price: 899  },
  consultant:    { label: "Consultant / Coach",     price: 599  },
  portfolio:     { label: "Portfolio",              price: 599  },
  ecommerce:     { label: "E-Commerce",             price: 1499 },
  restaurant:    { label: "Restaurant / Food",      price: 899  },
  hotel:         { label: "Hôtel / B&B",            price: 899  },
  healthcare:    { label: "Santé / Clinique",       price: 899  },
  realestate:    { label: "Immobilier",             price: 899  },
  fitness:       { label: "Fitness / Wellness",     price: 899  },
  event:         { label: "Événement",              price: 599  },
  nonprofit:     { label: "Non-profit / ONG",       price: 599  },
  startup:       { label: "Startup Launch",         price: 599  },
  luxury:        { label: "Luxury / Couture",       price: 1499 },
  brutalist:     { label: "Brutalist Editorial",    price: 899  },
  magazine:      { label: "Magazine / Éditorial",   price: 899  },
  aurora:        { label: "Aurora / Wellness",      price: 899  },
  "3d-tech":     { label: "3D Tech / Web3",         price: 1499 },
  "minimal-pro": { label: "Minimal Pro",            price: 899  },
};

const MAINTENANCE_PRICE_CENTS = 5900; // 59€ in cents
const MAINTENANCE_LABEL = "Maintenance mensuelle";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, theme, maintenance } = body as {
      type?: string;
      name?: string;
      theme?: string;
      maintenance?: string | number | boolean;
    };

    // Validate required fields
    const siteType = (typeof type === "string" && type) ? type : "landing";
    const siteName = (typeof name === "string" && name.trim()) ? name.trim() : "Votre site";
    const siteTheme = (typeof theme === "string" && theme) ? theme : siteType;
    const withMaintenance =
      maintenance === 1 || maintenance === "1" || maintenance === true;

    const siteInfo = SITE_PRICES[siteType] ?? SITE_PRICES["landing"];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const successUrl =
      `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}` +
      `&name=${encodeURIComponent(siteName)}` +
      `&type=${encodeURIComponent(siteType)}`;

    const cancelUrl =
      `${baseUrl}/order` +
      `?type=${encodeURIComponent(siteType)}` +
      `&name=${encodeURIComponent(siteName)}` +
      `&theme=${encodeURIComponent(siteTheme)}` +
      `&maintenance=${withMaintenance ? "1" : "0"}`;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: siteInfo.label,
            description: "Création complète — livraison en 2 heures",
          },
          unit_amount: siteInfo.price * 100,
        },
        quantity: 1,
      },
    ];

    if (withMaintenance) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: MAINTENANCE_LABEL,
            description: "Mises à jour, hébergement & support",
          },
          // Recurring maintenance billed monthly — use a one-time line item
          // to avoid Stripe subscription complexity; displayed as monthly on order page
          unit_amount: MAINTENANCE_PRICE_CENTS,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        type: siteType,
        name: siteName,
        theme: siteTheme,
        maintenance: withMaintenance ? "1" : "0",
      },
      // Surface billing address collection for proper invoicing
      billing_address_collection: "auto",
      // Allow promotion codes
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe session creation failed:", err);
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 },
    );
  }
}
