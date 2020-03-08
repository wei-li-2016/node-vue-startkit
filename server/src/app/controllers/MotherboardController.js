import { Op } from "sequelize";
import Motherboard from "../models/Motherboard";
import * as Yup from "yup";

class MotherboardController {
  async index(req, res) {
    // const { page = 1 } = req.query;
    const mbs = await Motherboard.findAll({
      // limit: 5,
      // offset: (page - 1) * 5,
      order: [["id", "DESC"]]
    });
    return res.json(mbs);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      marca_id: Yup.string().required(),
      memory: Yup.string().required(),
      chipset: Yup.string().required(),
      socket: Yup.string().required(),
      format: Yup.string().required(),
      rgb: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const { name } = req.body;

    const mb = await Motherboard.findOne({
      where: { name }
    });

    if (mb) {
      return res.status(400).json({ error: "A placa já existe" });
    }

    const {
      id,
      marca_id,
      memory,
      chipset,
      socket,
      format,
      rgb
    } = await Motherboard.create(req.body);

    return res.json({
      id,
      name,
      marca_id,
      memory,
      chipset,
      socket,
      format,
      rgb
    });
  }

  async update(req, res) {
    if (!(await req.body.name)) {
      return res.status(400).json({ error: "Nenhum nome informado" });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      marca_id: Yup.string().required(),
      memory: Yup.string().required(),
      chipset: Yup.string().required(),
      socket: Yup.string().required(),
      format: Yup.string().required(),
      rgb: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Os dados são inválidos" });
    }
    const { name } = req.body;

    const mbExists = await Motherboard.findOne({
      where: { name }
    });

    if (mbExists && mbExists.id != req.params.id) {
      return res.status(401).json({ error: "A placa já existe" });
    }

    const mb = await Motherboard.findByPk(req.params.id);

    const {
      id,
      marca_id,
      memory,
      chipset,
      socket,
      format,
      rgb
    } = await mb.update(req.body);

    return res.json({
      id,
      name,
      marca_id,
      memory,
      chipset,
      socket,
      format,
      rgb
    });
  }

  async delete(req, res) {
    const motherboard = await Motherboard.findByPk(req.params.id);
    if (!motherboard) {
      return res.status(400).json({ error: "A placa não existe" });
    }

    const id = req.params.id;
    await Motherboard.destroy({
      where: { id }
    });
    return res.status(201).json({ msg: "A placa foi apagada" });
  }

  async show(req, res) {
    const motherboard = await Motherboard.findByPk(req.params.id);
    if (!motherboard) {
      return res.status(400).json({ error: "A placa não existe" });
    }
    return res.json(motherboard);
  }

  async listing(req, res) {
    const mbs = await Motherboard.findAll({
      where: {
        name: {
          [Op.substring]: req.query.name
        }
      }
    });
    return res.json(mbs);
  }
}

export default new MotherboardController();
