import type { PageServerLoad } from "./$types";
import { PRIVATE_STRIPE_API_KEY } from "$env/static/private";
import Stripe from "stripe";
import { error } from "@sveltejs/kit";

const stripe = new Stripe(PRIVATE_STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});

export const load: PageServerLoad = async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1500,
    currency: "eur",
    payment_method_types: ["card"],
  });

  if (!paymentIntent.client_secret) {
    throw error(400);
  }

  return { clientSecret: paymentIntent.client_secret };
};
