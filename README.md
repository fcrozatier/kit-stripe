# Stripe integration demo in a sveltekit app

This is a demo project to help you integrate [Stripe](https://stripe.com) to your [Sveltekit](https://kit.svelte.dev/) app:

- No wrapper libraries used, just `sveltekit` and `stripe`
- Validation errors
- Redirect url
- Webhooks
- Accessibility

## How to use?

Add you stripe api keys to the `.env` file:

.env
```
PRIVATE_STRIPE_API_KEY="sk_..."
PUBLIC_STRIPE_API_KEY="Pk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

Then `npm run dev` and you can start testing on `localhost:5173`

## Test Stripe Webhook

1. log in with your Stripe account
```sh
stripe login
```

2. Forward events to your webhook
```sh
stripe listen --forward-to localhost:5173/webhook
```

3. Trigger events with the CLI
```sh
stripe trigger payment_intent.succeeded
```

Example events:
- payment_intent.succeeded
- payment_intent.processing
- payment_intent.payment_failed

See all supported events: `stripe trigger --help`