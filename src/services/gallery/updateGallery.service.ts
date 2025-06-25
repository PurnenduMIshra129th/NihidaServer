import mongoose from 'mongoose'
import { galleryModel } from '../../schema/gallery/gallery.schema'
import { IUpdateGallery } from '../../types/gallery/gallery.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const updateGalleryService = async (data: IUpdateGallery) => {
  try {
    const {
      id,
      title,
      category,
      description,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    } = data

    const gallery = await galleryModel.findById(id)
    if (!gallery) {
      return sendErrorData(404, 'gallery not found')
    }
    if (title) gallery.title = title
    if (category) gallery.category = category
    if (description) gallery.description = description
    if (date) gallery.date = new Date(date)
    if (visibility) gallery.visibility = visibility
    if (tags) gallery.tags = tags
    if (highlighted) gallery.highlighted = highlighted
    if (uploadedBy) gallery.uploadedBy = new mongoose.Types.ObjectId(uploadedBy)

    await gallery.save()
    return sendSuccessData('Gallery updated successfully', gallery)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
