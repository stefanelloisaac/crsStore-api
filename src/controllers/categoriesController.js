import Category from "../models/Category";
import Product from "../models/Product";

const getAll = async (req, res) => {
  try {
    const response = await Category.findAll({
      order: [["id", "asc"]],
    });
    let responseArray = [];
    for (let category of response) {
      let products = await Product.findAll({
        where: {
          idCategory: category.id,
        },
      });
      category = category.toJSON();
      category.products = products;
      if (products.length) {
        responseArray.push(category);
      }
    }
    console.log(responseArray);
    return res.status(200).send({
      type: "success", // success, error, warning, info
      message: "Registros recuperados com sucesso", // mensagem para o front exibir
      data: responseArray, // json com informações de resposta
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "Ops! Ocorreu um erro!",
      data: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;

    if (!id) {
      let response = await Category.findAll({
        order: [["id", "asc"]],
      });
      return res.status(200).send({
        type: "success",
        message: "Registros carregados com sucesso",
        data: response,
      });
    }

    let response = await Category.findOne({ where: { id } });

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

const create = async (dados, res) => {
  let { name } = dados;

  let response = await Category.create({
    name,
  });

  return res.status(200).send({
    type: "success",
    message: `Cadastro realizado com sucesso`,
    data: response,
  });
};

const update = async (id, dados, res) => {
  let response = await Category.findOne({ where: { id } });

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

    let response = await Category.findOne({ where: { id } });

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
  getAllCategories,
  persist,
  destroy,
  getAll
};
