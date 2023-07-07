import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserByToken from "../utils/getUserByToken";

const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;

    if (!id) {
      let response = await User.findAll({
        order: [["id", "asc"]],
      });
      return res.status(200).send({
        type: "success",
        message: "Registros carregados com sucesso",
        data: response,
      });
    }

    let response = await User.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: "error",
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: "success",
      message: "Registro carregado com sucesso",
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro`,
      error: error.message,
    });
  }
};

const getByToken = async (req, res) => {
  try {
    let usuarios = await getUserByToken.getUserByToken(
      req.headers.authorization
    );
    let idUser = usuarios.id;
    return await getById(idUser, req, res);
  } catch (err) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: err.message,
    });
  }
};

const persist = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro`,
      error: error,
    });
  }
};

const create = async (data, res) => {
  try {
    let { username, name, phone, password, role, cpf, email } = data;

    let userExists = await User.findOne({
      where: {
        username,
      },
    });

    if (userExists) {
      return res.status(200).send({
        type: "error",
        message: "Já existe um usuário cadastrado com esse username!",
      });
    }

    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    let response = await User.create({
      username,
      name,
      phone,
      passwordHash,
      role,
      cpf,
      email,
    });
    
    return res.status(200).send({
      type: "success",
      message: "Usuário cadastrastado com sucesso!",
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(200).send({
        type: "error",
        message: "Usuário ou senha incorretos!",
      });
    }

    let token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role }, //payload - dados utilizados na criacao do token
      process.env.TOKEN_KEY, //chave PRIVADA da aplicação
      { expiresIn: "1h" } //options ... em quanto tempo ele expira...
    );

    user.token = token;
    await user.save();

    return res.status(200).send({
      type: "success",
      message: "Bem-vindo! Login realizado com sucesso!",
      data: user,
      token,
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: error,
    });
  }
};

const update = async (id, dados, res) => {
  let response = await User.findOne({ where: { id } });

  if (!response) {
    return res.status(200).send({
      type: "error",
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => (response[field] = dados[field]));

  await response.save();
  return res.status(200).send({
    type: "success",
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const destroy = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;
    if (!id) {
      return res.status(200).send({
        type: "error",
        message: `Informe um id para deletar o registro`,
        data: [],
      });
    }

    let response = await User.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: "error",
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: "success",
      message: `Registro id ${id} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro`,
      error: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  getByToken,
  login,
};
