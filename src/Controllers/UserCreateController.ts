import { Request, Response } from "express";
import { Usercreateservice } from "../Services/UserCreateService";

class Usercreatecontroller {
  async handle(req: Request, res: Response) {
    const service = new Usercreateservice();
    const { nome, email, senha, assinante, barbearia } = req.body;

    const create = await service.execute({
      nome,
      email,
      senha,
      assinante,
      barbearia,
    });
    return res.json(create);
  }
  async findAll(req: Request, res: Response) {
    const service = new Usercreateservice();

    const find = await service.findAll();

    return res.json(find);
  }
  async findunique(req: Request, res: Response) {
    const service = new Usercreateservice();
    const { id } = req.query;

    const find = await service.findUnique(id as any);

    return res.json(find);
  }

  async update(req: Request, res: Response) {
    const service = new Usercreateservice();

    const { nome, barbearia, senha, email } = req.body;
    const { id } = req.params;
    const create = await service.update(
      {
        nome,
        barbearia,
        senha,
        email,
      },
      id
    );
    return res.json(create);
  }
  async updatepassword(req: Request, res: Response) {
    const service = new Usercreateservice();

    const { senha, email, novasenha } = req.body;
    const { id } = req.params;
    const create = await service.updatePassword(id, { email, senha, novasenha });
    return res.json(create);
  }
}

export { Usercreatecontroller };
