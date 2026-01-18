'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  className?: string
}

export function ImageUpload({ value, onChange, label, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onChange(data.url)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    setError(null)
  }

  const triggerFileSelect = () => {
    inputRef.current?.click()
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="relative">
        {value ? (
          // Image Preview
          <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={triggerFileSelect}
                disabled={isUploading}
                className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          // Upload Button
          <button
            type="button"
            onClick={triggerFileSelect}
            disabled={isUploading}
            className={cn(
              "w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 transition-all",
              "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50",
              "hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10",
              isUploading && "opacity-50 cursor-wait"
            )}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                <span className="text-sm text-slate-500">Uploading...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Click to upload image
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </>
            )}
          </button>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  )
}
