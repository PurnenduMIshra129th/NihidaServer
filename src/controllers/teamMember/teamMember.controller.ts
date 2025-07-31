import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { teamMemberModel } from '../../schema/teamMember/teamMember.schema'
import { createTeamMemberService } from '../../services/teamMember/createTeamMember.service'
import { deleteTeamMemberService } from '../../services/teamMember/deleteTeamMember.service'
import { updateTeamMemberService } from '../../services/teamMember/updateTeamMember.service'

export const createTeamMemberController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      name,
      designation,
      bio,
      contact,
      socials,
      focusArea,
      dateJoined,
      tags,
      visibility,
      createdBy,
    } = req?.body
    const argObj = {
      name,
      designation,
      bio,
      contact,
      socials,
      focusArea,
      dateJoined,
      tags,
      visibility,
      createdBy,
    }
    const result = await createTeamMemberService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const updateTeamMemberController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid teamMember ID format').send(res)
    }
    const {
      name,
      designation,
      bio,
      contact,
      socials,
      focusArea,
      dateJoined,
      tags,
      visibility,
      createdBy,
    } = req.body

    const argObj = {
      id,
      name,
      designation,
      bio,
      contact,
      socials,
      focusArea,
      dateJoined,
      tags,
      visibility,
      createdBy,
    }
    const result = await updateTeamMemberService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
export const deleteTeamMemberController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid teamMember ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteTeamMemberService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getAllTeamMemberController = async (_: Request, res: Response) => {
  try {
    const teamMemberList = await teamMemberModel.find().sort({ createdAt: -1 })
    if (teamMemberList?.length > 0) {
      return new SuccessResponse(
        'TeamMember retrieved successfully',
        teamMemberList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'TeamMember not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getTeamMemberByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid teamMember ID format').send(res)
    }

    const teamMember = await teamMemberModel.findById(id)
    if (!teamMember) {
      return new ErrorResponse(404, 'TeamMember not found').send(res)
    }

    return new SuccessResponse(
      'TeamMember retrieved successfully',
      teamMember,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
