import { prismaclient } from "../Prisma";

type SessionCredencials = {
  email: string;
  senha: string;
};

class SessionCreateService {
  async findAll() {
    const find = await prismaclient.sessao.findMany();
    return find;
  }

  async findUnique(id: string) {
    const findUnique = await prismaclient.sessao.findUnique({
      where: {
        id: id,
      },
      select: {
        created_at: true,
        email: true,
        id: true,
      },
    });
    return findUnique;
  }

  async create({ email, senha }: SessionCredencials) {
    const user = await prismaclient.users.findFirst({
      where: {
        email,
        senha,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const session = await prismaclient.sessao.create({
      data: {
        email,
        senha,
        iduser: user.id,
        assinante: user.assinante,
      },
      select: {
        iduser: true,
        id: true,
        assinante: true,
      },
    });

    return session;
  }

  async del(id: string) {
    const delet = await prismaclient.sessao.delete({
      where: {
        id: id,
      },
    });
    return delet;
  }
}
export { SessionCreateService };
