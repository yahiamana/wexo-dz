"use client"

import { CldUploadWidget } from 'next-cloudinary'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button 
                type="button" 
                onClick={() => onRemove(url)} 
                variant="secondary" 
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white border-none"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ? (
        <CldUploadWidget 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={onUpload}
        >
          {({ open }) => {
            const onClick = () => {
               open()
            }

            return (
              <Button 
                type="button" 
                disabled={disabled} 
                variant="secondary" 
                onClick={onClick}
                className="flex items-center gap-2"
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload an Image
              </Button>
            )
          }}
        </CldUploadWidget>
      ) : (
        <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md text-sm">
          <strong>Configuration Error:</strong> Cloudinary Upload Preset is missing. 
          Please add <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> to your .env file.
        </div>
      )}
    </div>
  )
}

export default ImageUpload
