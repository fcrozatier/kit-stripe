import { error, type RequestHandler } from "@sveltejs/kit";
import { stripe } from "$lib/server/stripe";
import { STRIPE_WEBHOOK_SECRET } from "$env/static/private";
import type Stripe from "stripe";

export const POST: RequestHandler = async function ({ request }) {
  const signature = request.headers.get("stripe-signature");
  const payload = Buffer.from(await request.arrayBuffer());

  if (!signature) {
    throw error(400, "no_signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET
    );

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(paymentIntent);
        console.log("payment success");
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      }

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (e) {
    if (e instanceof Error) {
      throw error(400, `Webhook Error: ${e.message}`);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response(null, { status: 200 });
};
