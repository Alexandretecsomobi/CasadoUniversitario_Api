import { Request, Response } from "express";
import { prismaclient } from "../Prisma";
import { ClientesAtendidos } from "../Services/ClientesAtendidosService";

const service = new ClientesAtendidos();

class ClientesAtendidosController {
    async create(req: Request, res: Response) {
        const { iduser, corte, valor, nome,data,hora,isok } = req.body;

        const isLogin = await prismaclient.sessao.findFirst({
            where: {
                iduser: iduser
            }
        })

        if (isLogin) {
            const create = await service.create({
                iduser,
                corte,
                valor,
                nome,
                data,
                hora,
                isok
            });
            return res.json(create);
        } else {
            return res.json({menssage:'Usuario não está logado!'})
        }
    }
    async update(req: Request, res: Response) {
        const { iduser, corte, valor, nome,isok,data,hora } = req.body;
        const { id } = req.params;
        const update = await service.update(id, {
            iduser,
            corte,
            valor,
            nome,
            data,
            hora,
            isok
        })

        return res.json(update);
    }

    async findAll(req: Request, res: Response) {
        const { iduser } = req.query;

        const findall = await service.findAll(iduser as any);
        return res.json(findall);

    }
    async finddate(req: Request, res: Response) {
        const { iduser,data } = req.query;
        const findalldate = await service.findDate(iduser as any, data as any);
        return res.json(findalldate);
    }
    
    async findUnique(req: Request, res: Response) {
        const { id } = req.query;

        const findUnique = await service.findUnique(id as any);
        return res.json(findUnique);
    }
    async del(req: Request, res: Response) {
        const { id } = req.params;

        const del = await service.del(id as any);
        return res.json(del);
    }
}
export { ClientesAtendidosController };
