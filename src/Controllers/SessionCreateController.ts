import { Request, Response } from "express";
import { SessionCreateService } from "../Services/SessionCreateService";

class SessionCreateController {
  async create(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ message: "Missing required data" });
      }
      const service = new SessionCreateService();
      const session = await service.create({ email, senha });

      return res.status(200).json(session);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async findAll(req: Request, res: Response) {
    const service = new SessionCreateService();
    const findall = await service.findAll();

    return res.json(findall);
  }
  async findUnique(req: Request, res: Response) {
    const service = new SessionCreateService();
    const { id } = req.query;
    const findall = await service.findUnique(id as any);

    return res.json(findall);
  }

  async del(req: Request, res: Response) {
    const service = new SessionCreateService();
    const { id } = req.params;
    const del = await service.del(id);

    return res.status(200).json({ message: `sessao #id:${id} encerrada!` });
  }
}
export { SessionCreateController };
