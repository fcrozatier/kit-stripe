import { PRIVATE_STRIPE_API_KEY } from "$env/static/private";
import Stripe from "stripe";

export const stripe = new Stripe(PRIVATE_STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});
