import { Request, Response } from "express";
import { CortesService } from "../Services/CortesService";

const service = new CortesService();
class CortesController {
  async create(req: Request, res: Response) {
    const { iduser, corte, valor, foto1, foto2 } = req.body;

    const create = await service.create({
      iduser,
      corte,
      valor,
      foto1,
      foto2,
    });
    return res.json(create);
  }

  async update(req: Request, res: Response) {
    const { iduser, corte, valor } = req.body;
    const { id } = req.params;
    const create = await service.update(
      {
        iduser,
        corte,
        valor,
      },
      id
    );
    return res.json(create);
  }

  async findAll(req: Request, res: Response) {
    const { iduser } = req.query;

    const findall = await service.findAll(iduser as any);
    return res.json(findall);
  }
  async findUnique(req: Request, res: Response) {
    const { id } = req.query;

    const findUnique = await service.findUnique(id as any);
    return res.json(findUnique);
  }
  async resolverField(req: Request, res: Response) {
    const { corte } = req.query;
    const findUnique = await service.resolverField(corte as any);
    return res.json(findUnique);
  }
  async del(req: Request, res: Response) {
    const { id } = req.params;

    const del = await service.del(id as any);
    return res.json(del);
  }
}
export { CortesController };
