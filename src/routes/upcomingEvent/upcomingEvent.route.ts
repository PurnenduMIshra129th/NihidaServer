import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import {
  createUpcomingEventController,
  updateUpcomingEventController,
  deleteUpcomingEventController,
  getAllUpcomingEventsController,
  getUpcomingEventByIdController,
} from '../../controllers/upcomingEvent/upcomingEvent.controller'
import { upcomingEventDTO } from '../../dto/upcomingEvent/upcomingEvent.dto'

const upcomingEventRouter = Router()

upcomingEventRouter.post(
  '/createUpcomingEvent',
  validateInputs(upcomingEventDTO),
  createUpcomingEventController,
)
upcomingEventRouter.put(
  '/updateUpcomingEvent/:id',
  validateInputs(upcomingEventDTO),
  updateUpcomingEventController,
)

upcomingEventRouter.delete(
  '/deleteUpcomingEvent/:id',
  deleteUpcomingEventController,
)

upcomingEventRouter.get('/getAllUpcomingEvent', getAllUpcomingEventsController)

upcomingEventRouter.get(
  '/getUpcomingEventById/:id',
  getUpcomingEventByIdController,
)

export default upcomingEventRouter
