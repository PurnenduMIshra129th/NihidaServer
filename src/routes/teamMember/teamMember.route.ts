import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { teamMemberDTO } from '../../dto/teamMember/teamMember.dto'
import {
  createTeamMemberController,
  updateTeamMemberController,
  deleteTeamMemberController,
  getAllTeamMemberController,
  getTeamMemberByIdController,
} from '../../controllers/teamMember/teamMember.controller'
const teamMemberRouter = Router()

teamMemberRouter.post(
  '/createTeamMember',
  validateInputs(teamMemberDTO),
  createTeamMemberController,
)
teamMemberRouter.put(
  '/updateTeamMember/:id',
  validateInputs(teamMemberDTO),
  updateTeamMemberController,
)
teamMemberRouter.delete('/deleteTeamMember/:id', deleteTeamMemberController)

teamMemberRouter.get('/getAllTeamMember', getAllTeamMemberController)

teamMemberRouter.get('/getTeamMemberById/:id', getTeamMemberByIdController)

export default teamMemberRouter
