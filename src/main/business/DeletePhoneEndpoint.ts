import { NextFunction, Request, Response } from 'express'
import PhoneRepository from '../repository/PhoneRepository'

export default class DeletePhoneEndpoint {
    constructor(
      private phoneRepository: PhoneRepository
    ) {

    }

    public deletePhone = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        if (!id) {
          return res.status(400).json({ error: 'Bad request' });
        }

        const result: boolean = await this.phoneRepository.delete(id);
        res.status(200).json({ deleted: result });
      } catch (err) {
        next(err)
      }
    }
}
