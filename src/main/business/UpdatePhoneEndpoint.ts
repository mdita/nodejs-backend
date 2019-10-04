import { NextFunction, Request, Response } from 'express'
import PhoneRepository from '../repository/PhoneRepository'

export default class UpdatePhonesEndpoint {
    constructor(
      private phoneRepository: PhoneRepository
    ) {

    }

    public updatePhone = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const data = req.body ? req.body : undefined

        if (!id || (data && Object.keys(data).length === 0)) {
          return res.status(400).json({ error: 'Bad request' })
        }

        const result: boolean = await this.phoneRepository.update(id, data);
        res.status(200).json({ updated: result });
      } catch (err) {
        next(err)
      }
    }
}
