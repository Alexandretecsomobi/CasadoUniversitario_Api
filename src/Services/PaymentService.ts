import { Request, Response } from "express";
import Stripe from "stripe";
import { prismaclient } from "../Prisma";
type user = {
  userid: string;
};

class PaymentService {
  async create({ userid }: user) {
    const stripe = new Stripe(String(process.env.STRIPE_API_KEY), {
      apiVersion: "2022-11-15",
      appInfo: {
        name: "BarberApp",
        version: "1",
      },
    });
    const findUser = await prismaclient.users.findFirst({
      where: {
        id: userid,
      },
    });

    let costumerid = findUser?.id_stripe;

    if (!costumerid) {
      const Stripecustumer = await stripe.customers.create({
        email: findUser?.email,
      });
      await prismaclient.users.update({
        where: {
          id: userid,
        },
        data: {
          id_stripe: Stripecustumer.id,
        },
      });
      costumerid = Stripecustumer.id;
    }

    const stripeCheckout = await stripe.checkout.sessions.create({
      customer: costumerid,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: process.env.PRICE_KEY, quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: "https://barberapp-web.onrender.com/dashboard",
      cancel_url: "https://barberapp-web.onrender.com/dashboard",
    });

    return { sessionId: stripeCheckout.id };
  }
}
export { PaymentService };
