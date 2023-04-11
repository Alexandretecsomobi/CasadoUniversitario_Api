import { Request, Response } from "express";
import { CancelSignatureService } from "../../Services/CancelSubscriberService";


class CancelSignatureController{
    async cancel(req:Request,res:Response){
        const service = new CancelSignatureService()
        const {user_id} = req.body

        const cancelSignature = await service.cancel({user_id})
        return res.json(cancelSignature)
    }
}

export {CancelSignatureController}