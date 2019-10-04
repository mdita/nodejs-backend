import { NextFunction, Request, Response } from 'express'
import PhoneRepository from '../repository/PhoneRepository'

export default class AddPhoneEndpoint {
    constructor(
      private phoneRepository: PhoneRepository
    ) {

    }

    public addPhone = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body ? req.body : undefined

        if ((data && Object.keys(data).length === 0)) {
          return res.status(400).json({ error: 'Bad request' });
        }

        const result: boolean = await this.phoneRepository.store(data);
        res.status(200).json({ added: result });
      } catch (err) {
        next(err)
      }
    }
}
