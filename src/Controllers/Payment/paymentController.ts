import {Request, Response } from 'express'
import { PaymentService } from '../../Services/PaymentService'

class SubscribeController{
  async handle(request: Request, response: Response){
    const {user_id} = request.body

    const subscribeService = new PaymentService()

    const subscribe = await subscribeService.create({
      userid :user_id
    })

    return response.json(subscribe);

  }
}

export { SubscribeController }