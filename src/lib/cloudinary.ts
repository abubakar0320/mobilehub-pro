import { v2 as cloudinary } from 'cloudinary'
import { generateSlug } from './slugify'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface UploadResult {
  url: string
  thumbnailUrl: string
  publicId: string
}

export async function uploadPhoneImage(
  file: File | Buffer | string,
  phoneName: string,
  imageType: 'main' | 'back' | 'side' | 'gallery' | string
): Promise<UploadResult> {

  const slug = generateSlug(phoneName)
  const folder = `mobilehub/phones/${slug}`
  const publicId = `${folder}/${imageType}`

  const result = await cloudinary.uploader.upload(file as string, {
    public_id: publicId,
    overwrite: true,
    transformation: [
      { width: 800, height: 800, crop: 'pad', background: 'white' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  })

  // Auto-generate thumbnail
  const thumbnailUrl = cloudinary.url(result.public_id, {
    width: 400,
    height: 400,
    crop: 'pad',
    background: 'white',
    quality: 'auto',
    fetch_format: 'auto'
  })

  return {
    url: result.secure_url,
    thumbnailUrl,
    publicId: result.public_id
  }
}

export async function uploadMultipleImages(
  files: { file: File | string; type: string }[],
  phoneName: string
) {
  const uploads = await Promise.all(
    files.map(({ file, type }) => uploadPhoneImage(file, phoneName, type))
  )
  return uploads
}
