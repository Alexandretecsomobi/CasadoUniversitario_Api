import { prismaclient } from "../Prisma";

type CortesTypes = {
  iduser?: string;
  corte: string;
  valor: string;
  foto1?: string;
  foto2?: string;
};

class CortesService {
  async create({ iduser, corte, valor, foto1, foto2 }: CortesTypes) {
    const service = await prismaclient.cortes.create({
      data: {
        iduser,
        corte,
        valor,
        foto1,
        foto2,
      },
    });
    return service;
  }
  async update({ iduser, corte, valor }: CortesTypes, id: string) {
    const service = await prismaclient.cortes.update({
      where: {
        id: id,
      },
      data: {
        iduser,
        corte,
        valor,
      },
    });
    return service;
  }
  async findAll(iduser: string) {
    const service = await prismaclient.cortes.findMany({
      where: {
        iduser: iduser,
      },
    });
    return service;
  }
  async findUnique(id: string) {
    const service = await prismaclient.cortes.findUnique({
      where: {
        id: id,
      },
    });
    return service;
  }
  async resolverField(corte: string) {
    const service = await prismaclient.cortes.findMany({
      where: {
       corte:corte
      },
    });
    return service;
  }
  async del(id: string) {
    const service = await prismaclient.cortes.delete({
      where: {
        id: id,
      },
    });
    return service;
  }
}
export { CortesService };
