import Marca from "../models/Marca";
import * as Yup from "yup";

class MarcaController {
  async index(req, res) {
    // const { page = 1 } = req.query;
    const marcas = await Marca.findAll({
      // limit: 20,
      // offset: (page - 1) * 20
      order: [["id", "DESC"]]
    });
    return res.json(marcas);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Nome inválido" });
    }

    const { name } = req.body;

    const brand = await Marca.findOne({
      where: { name }
    });

    if (brand) {
      return res.status(401).json({ error: "A marca já existe" });
    }

    const newBrand = await Marca.create(req.body);

    return res.json({
      newBrand
    });
  }

  async update(req, res) {
    if (!(await req.body.name)) {
      return res.status(400).json({ error: "Nenhum nome informado" });
    }

    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Os dados são inválidos" });
    }
    const { name } = req.body;

    const brandExists = await Marca.findOne({
      where: { name }
    });

    if (brandExists) {
      return res.status(401).json({ error: "A marca já existe" });
    }

    const brand = await Marca.findByPk(req.params.id);

    const { id } = await brand.update(req.body);

    return res.json({ id, name });
  }
}

export default new MarcaController();
