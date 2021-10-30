import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export async function initiateCheckout({ lineItems } = {}) {
    //console.log("init payment")

    // Make sure we get promise answer
    const stripe = await stripePromise;

    await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
    });
}