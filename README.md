# Stripe integration demo in a sveltekit app

This is a demo project to help you integrate [Stripe](https://stripe.com/en-fr) to your [Sveltekit](https://kit.svelte.dev/) app:

- No wrapper libraries used, just `sveltekit` and `stripe`
- Accessibility taken into account

## How to use?

Add you secret stripe api key to `PRIVATE_STRIPE_API_KEY` and your public api key to `PUBLIC_STRIPE_API_KEY` in the root `.env` file

.env
```
PRIVATE_STRIPE_API_KEY="sk_..."
PUBLIC_STRIPE_API_KEY="Pk_..."
```

Then `npm run dev` and you can start testing on `localhost:5173`
