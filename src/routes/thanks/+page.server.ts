import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { stripe } from "$lib/server/stripe";

export const load: PageServerLoad = async ({ url }) => {
  const payment_intent = url.searchParams.get("payment_intent");
  const client_secret = url.searchParams.get("payment_intent_client_secret");

  if (!client_secret || !payment_intent) {
    throw error(400);
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent, {
    client_secret,
  });

  return { paymentIntent };
};
