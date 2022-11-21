<script lang="ts">
  import {
    loadStripe,
    type Stripe,
    type Appearance,
    type StripeElements,
    type StripeErrorType,
  } from "@stripe/stripe-js";
  import { PUBLIC_STRIPE_API_KEY } from "$env/static/public";
  import { onMount, tick } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#5925dc",
      colorText: "#0b0b14",
    },
  };

  let stripe: Stripe;
  let elements: StripeElements;

  let isLoading = false;
  let paymentError: StripeErrorType | null = null;

  onMount(async () => {
    const stripeLoaded = await loadStripe(PUBLIC_STRIPE_API_KEY, {
      locale: "en",
    });
    if (stripeLoaded) {
      stripe = stripeLoaded;

      // Mount elements in the next cycle to prevent IntegrationError. This leaves time for the #payment-element div to appear after the {#if stripe} updates.
      await tick();

      elements = stripe.elements({
        appearance,
        clientSecret: data.clientSecret,
      });
      const paymentElement = elements.create("payment");
      paymentElement.mount("#payment-element");
    }
  });

  async function handleSubmit() {
    isLoading = true;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: ".../thanks",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      paymentError = error.type;
    }

    isLoading = false;
  }
</script>

<section class="layout-center">
  <h1>Stripe payment integration demo</h1>
  {#if stripe}
    <form
      method="post"
      on:submit|preventDefault={handleSubmit}
      aria-errormessage="payment-error"
      aria-invalid={paymentError !== null}
    >
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
      </div>
      <button id="submit" disabled={isLoading}>
        {#if isLoading}
          Validating your transaction...
        {:else}
          Confirm payment
        {/if}
      </button>
      <p id="payment-error" class="error-message" aria-live="polite">
        {#if paymentError}
          {#if paymentError === "api_connection_error" || paymentError === "api_error"}
            Connection error. Please try again
          {:else if paymentError === "card_error"}
            Insufficient funds. The transaction failed
          {:else if paymentError === "validation_error"}
            The card validation failed. Please try again
          {:else}
            There was an error. Please try again
          {/if}
        {/if}
      </p>
    </form>
  {:else}
    Loading payment form...
  {/if}
</section>

<style>
  .layout-center {
    max-width: 60ch;
    margin-inline: auto;
    margin-top: 10px;
  }

  #submit {
    display: block;
    min-width: 100%;
    margin-top: 20px;
    padding: 10px 30px;
    border-radius: 4px;
    font-size: 18px;
    background-color: #5925dc;
    color: white;
    border: none;
    cursor: pointer;
  }

  .error-message {
    color: red;
  }
</style>
