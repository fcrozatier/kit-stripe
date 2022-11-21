<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<article class="layout-center">
  <p>
    {#if data.paymentIntent.status === "succeeded"}
      Success !
    {:else if data.paymentIntent.status === "processing"}
      Payment processing. We'll update you when payment is received
    {:else if data.paymentIntent.status === "requires_payment_method"}
      Payment failed. Please try another payment method
    {:else}
      Something went wrong
    {/if}
  </p>
</article>
