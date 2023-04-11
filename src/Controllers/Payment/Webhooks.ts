import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe";
import { prismaclient } from "../../Prisma";

class WebhooksController {
  async handle(request: Request, response: Response) {
    let event: Stripe.Event = request.body;

    const signature = request.headers["stripe-signature"];
    let endpointSecret = process.env.ENDPOINT_SECRET;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature as string,
        endpointSecret as string
      );
    } catch (error) {
      response.json(error);
    }

    switch (event.type) {
      case "customer.subscription.deleted":
        const checkoutSessionuser = event.data.object as Stripe.Subscription;
        const finduserdelete = await prismaclient.users.findFirst({
          where: {
            id_stripe: checkoutSessionuser.customer?.toString(),
          },
        });
        try {
          await prismaclient.users.update({
            where: {
              id: finduserdelete?.id,
            },
            data: {
              assinante: false,
            },
          });
        } catch (error) {
          response.json(error);
        }
        break;

      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        console.log(checkoutSession);

        const finduser = await prismaclient.users.findFirst({
          where: {
            id_stripe: checkoutSession.customer?.toString(),
          },
        });
        try {
          await prismaclient.users.update({
            where: {
              id: finduser?.id,
            },
            data: {
              assinante: true,
            },
          });
        } catch (error) {
          response.json(error);
        }

        break;
      default:
        console.log(`Evento desconhecido ${event.type}`);
    }
    response.send();
  }
}

export { WebhooksController };
