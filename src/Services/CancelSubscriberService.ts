import { prismaclient } from "../Prisma";
import Stripe from "stripe";

interface Cancelcredencials{
    user_id:string
}

class CancelSignatureService{
    async cancel({user_id}:Cancelcredencials){
        const stripe = new Stripe(
            "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",
            {
              apiVersion: "2022-11-15",
              appInfo: {
                name: "BarberApp",
                version: "1",
              },
            }
          );

          const findUser = await prismaclient.users.findFirst({
            where: {
              id: user_id,
            }
          });

          let sessionId = findUser?.id_stripe

          if(!sessionId){
            return {message:'user not fund'}
          }

          const portal = await stripe.billingPortal.sessions.create({
            customer:sessionId,
            return_url:'https://barberapp2.netlify.app/dashboard'
          })
          return {sessionId:portal.url}
    }
}

export {CancelSignatureService}