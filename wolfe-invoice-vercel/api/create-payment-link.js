const Stripe = require("stripe");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { amount, currency = "aud", invoiceNumber, description } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const price = await stripe.prices.create({
      currency,
      unit_amount: Math.round(amount * 100),
      product_data: {
        name: description || `Invoice ${invoiceNumber || ""}`.trim(),
      },
    });

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      metadata: {
        invoice_number: invoiceNumber || "",
      },
      after_completion: {
        type: "hosted_confirmation",
        hosted_confirmation: {
          custom_message: "Thank you for your payment. Wolfe Productions",
        },
      },
    });

    return res.status(200).json({ url: paymentLink.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
