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

    let response = await getById(id);

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

const getById = async (id) => {
  let user = User.findOne({
    where: {
      id,
    },
  });
  return user;
};

const getByToken = async (req, res) => {
  try {
    let usuarios = await getUserByToken(req.headers.authorization);
    let idUser = usuarios.id;
    const usuario = await getById(idUser);
    return res.status(200).send({
      message: "Usuário Carregado com sucesso!",
      data: usuario,
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: error.message,
    });
  }
};

const persist = async (req, res) => {
  try {
    let user = await getUserByToken(req.headers.authorization);
    if (!user) {
      return await create(req.body, res);
    }

    return await update(user.id, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro`,
      error: error.message,
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

const resetCart = async (req, res) => {
  try {
    let usuarios = await getUserByToken.getUserByToken(
      req.headers.authorization
    );
    let idUser = usuarios.id;
    let currentCart = await User.findOne({
      where: {
        id: idUser,
      },
    });
    currentCart.cart = null;
    await currentCart.save();
    return res.status(200).send({
      type: "success",
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: error.message,
    });
  }
};

const addtoCart = async (req, res) => {
  try {
    let { id, idCategory, name, description, image, price } = req.body;
    let usuarios = await getUserByToken(req.headers.authorization);
    let idUser = usuarios.id;
    let carrinho = await User.findOne({
      where: {
        id: idUser,
      },
    });
    let usuarioJSON = carrinho.toJSON();
    let usuarioCart = usuarioJSON.cart;
    if (!carrinho.cart) {
      carrinho.cart = [
        { produto: id, idCategory, name, description, image, price },
      ];
      await carrinho.save();
      return res.status(200).send({
        type: "success",
        message: "Produto adicionado ao carrinho!",
        data: carrinho,
      });
    } else {
      for (let produto of usuarioCart) {
        if (produto.id == id) {
          carrinho.cart = usuarioCart;
          await carrinho.save();
          return res.status(200).send({
            type: "success",
            message: "Produto adicionado ao carrinho!",
            data: carrinho,
          });
        }
      }
      usuarioCart.push({
        produto: id,
        idCategory,
        name,
        description,
        image,
        price,
      });
      carrinho.cart = usuarioCart;
      console.log(carrinho.cart);
      await carrinho.save();
      return res.status(200).send({
        type: "success",
        message: "Produto adicionado ao carrinho!",
        data: carrinho,
      });
    }
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    let { produto } = req.body;
    let usuario = await getUserByToken(req.headers.authorization);
    let idUser = usuario.id;
    let currentCart = await User.findOne({
      where: {
        id: idUser,
      },
    });
    let userJSON = currentCart.toJSON();
    let userCart = userJSON.cart;
    if (userCart.length >= 1) {
      userCart.forEach(async (cartItem, i) => {
        if (cartItem.produto == produto) {
          userCart.splice(i, 1);
          currentCart.cart = userCart;
          await currentCart.save();
        }
      });
      return res.status(200).send({
        type: "success",
        message: "Produto removido",
        data: `Produto ${produto} removido`,
      });
    } else {
      userCart = null;
      currentCart.cart = userCart;
      await currentCart.save();
      return res.status(200).send({
        type: "success",
        message: "Produto removido",
        data: `Produto ${produto} removido`,
      });
    }
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  getByToken,
  login,
  resetCart,
  addtoCart,
  removeItem,
};
