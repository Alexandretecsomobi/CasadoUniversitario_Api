import { prismaclient } from "../Prisma";

type ClientService = {
    iduser: string
    nome: string
    valor: string
    corte: string
    data:string
    hora:string
    isok:boolean
}


class ClientesAtendidos {
    async create({ iduser, nome,  valor,corte ,data,hora}: ClientService) {
        const create = await prismaclient.clientesAtendidos.create({
            data: {
                nome,
                iduser,
                valor,
                corte,
                data,
                hora
            }
        })
        return create
    }
    async findAll(iduser: string) {
        const findall = await prismaclient.clientesAtendidos.findMany({
            where: {
                iduser: iduser
            }
        })
        return findall
    }
    async findUnique(id: string) {
        const findunique = await prismaclient.clientesAtendidos.findMany({
            where: {
                id: id
            }
        })
        return findunique
    };
    async findDate(iduser: string,data:string) {
        const finddate = await prismaclient.clientesAtendidos.findMany({
            where: {
                iduser: iduser,
                data:data
            }
        })
        return finddate
    };

    async update(id: string, { iduser, nome,  valor,corte,data,hora,isok }: ClientService) {
        const update = await prismaclient.clientesAtendidos.update({
            where: {
                id: id
            },
            data: {
                nome,
                valor,
                iduser,
                corte,
                data,
                hora,
                isok
            }
        })
        return update
    };

    async del(id: string) {
        const del = await prismaclient.clientesAtendidos.delete({
            where: {
                id: id
            }
        })
        return del
    }
}

export { ClientesAtendidos }