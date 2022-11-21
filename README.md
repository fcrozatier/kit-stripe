# Stripe integration demo in a sveltekit app

This is a demo project to help you integrate Stripe in a sveltekit app:

- No wrapper libraries used (just `sveltekit` and `stripe`)
- Accessibility taken into account

## How to use?

Add you secret stripe api key to `PRIVATE_STRIPE_API_KEY` and your public api key to `PUBLIC_STRIPE_API_KEY` in you `.env` file

.env
```env
PRIVATE_STRIPE_API_KEY="sk_..."
PUBLIC_STRIPE_API_KEY="Pk_..."
```

Then `npm run dev` and you can start testing on `localhost:5173`
