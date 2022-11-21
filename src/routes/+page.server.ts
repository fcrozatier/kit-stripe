import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { stripe } from "$lib/stripe";

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
