import { NextFunction, Request, Response } from 'express'
import PhoneRepository, { FetchAllResponse } from '../repository/PhoneRepository'

export default class FetchPhonesEndpoint {
    constructor(
      private phoneRepository: PhoneRepository
    ) {

    }

    public fetchPhones = async (_: Request, res: Response, next: NextFunction) => {
      try {
        const allPhones: FetchAllResponse = await this.phoneRepository.fetchAll();

        res.json(allPhones);
      } catch (err) {
        next(err)
      }
    }
}
