import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { partnerDTO } from '../../dto/partner/partner.dto'
import {
  createPartnerController,
  updatePartnerController,
  deletePartnerController,
  getAllPartnerController,
  getPartnerByIdController,
} from '../../controllers/partner/partner.controller'
const partnerRouter = Router()

partnerRouter.post(
  '/createPartner',
  validateInputs(partnerDTO),
  createPartnerController,
)
partnerRouter.put(
  '/updatePartner/:id',
  validateInputs(partnerDTO),
  updatePartnerController,
)
partnerRouter.delete('/deletePartner/:id', deletePartnerController)

partnerRouter.get('/getAllPartner', getAllPartnerController)

partnerRouter.get('/getPartnerById/:id', getPartnerByIdController)

export default partnerRouter
