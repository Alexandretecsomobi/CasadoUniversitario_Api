import { prismaclient } from "../Prisma";

interface Userscredencials {
  nome: string;
  barbearia: string;
  email: string;
  senha: string;
  assinante: boolean;
}
interface Userscredencialsupdate {
  nome: string;
  barbearia: string;
  senha: string;
  email: string;
}
interface Userscredencialsupdatepassword {
  senha: string;
  email: string;
  novasenha: string;
}

class Usercreateservice {
  async findUnique(id: string) {
    const findunique = await prismaclient.users.findUnique({
      where: {
        id: id,
      },
      select: {
        assinante: true,
        barbearia: true,
        id: true,
        nome: true,
        email: true,
      },
    });
    return findunique;
  }

  async findAll() {
    const findall = await prismaclient.users.findMany({
      select: {
        assinante: true,
        barbearia: true,
        created_at: true,
        email: true,
        nome: true,
        updated_at: true,
        id: true,
      },
    });
    return findall;
  }
  async execute({ nome, email, senha, barbearia, assinante }: Userscredencials) {
    const userCreate = await prismaclient.users.create({
      data: {
        nome: nome,
        email: email,
        senha: senha,
        barbearia: barbearia,
        assinante: assinante,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        barbearia: true,
        assinante: true,
      },
    });
    return userCreate;
  }

  async update({ nome, senha, barbearia, email }: Userscredencialsupdate, id: string) {
    const finduser = await prismaclient.users.findFirst({
      where: {
        email: email,
        senha: senha,
      },
    });

    if (!finduser) {
      throw new Error("Credencials error");
    }

    if (finduser) {
      const updateuser = await prismaclient.users.update({
        where: {
          id: id,
        },
        data: {
          nome,
          barbearia,
        },
        select: {
          nome: true,
          barbearia: true,
        },
      });
      return updateuser;
    }
  }
  async updatePassword(id: string, { senha, email, novasenha }: Userscredencialsupdatepassword) {
    const finduser = await prismaclient.users.findFirst({
      where: {
        email: email,
        senha: senha,
      },
    });
    if (!finduser) {
      throw new Error("Credencials error");
    }

    if (finduser) {
      const updateuser = await prismaclient.users.update({
        where: {
          id: id,
        },
        data: {
          senha: novasenha,
        },
        select: {
          nome: true,
          barbearia: true,
        },
      });
      return updateuser;
    }
  }
}

export { Usercreateservice };
