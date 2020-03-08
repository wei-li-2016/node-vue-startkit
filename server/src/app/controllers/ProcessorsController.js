import Processors from "../models/Processors";
import * as Yup from "yup";

class ProcessorsController {
  async index(req, res) {
    const cpus = await Processors.findAll();
    return res.json(cpus);
  }
}

export default new ProcessorsController();
