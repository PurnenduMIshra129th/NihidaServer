import { galleryModel } from '../../schema/gallery/gallery.schema'
import { ICreateGallery } from '../../types/gallery/gallery.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const createGalleryService = async (data: ICreateGallery) => {
  try {
    const {
      title,
      category,
      description,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    } = data

    const Gallery = new galleryModel({
      title,
      category,
      description,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    })

    await Gallery.save()
    return sendSuccessData('Gallery created successfully', Gallery)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
