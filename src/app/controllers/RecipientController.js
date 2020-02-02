import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      address_complement: Yup.string(),
      state: Yup.string()
        .required()
        .min(2)
        .max(2),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .min(10)
        .max(10),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      id,
      name,
      street,
      number,
      address_complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      address_complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      number: Yup.number(),
      address_complement: Yup.string(),
      state: Yup.string()
        .min(2)
        .max(2),
      city: Yup.string(),
      zip_code: Yup.string()
        .min(10)
        .max(10),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      res.status(400).json({ error: 'Recipient not found.' });
    }

    const {
      name,
      street,
      number,
      address_complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      address_complement,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
