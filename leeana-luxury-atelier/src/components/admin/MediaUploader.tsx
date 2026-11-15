import React, { useState, useRef } from 'react'
import { Upload, Link as LinkIcon, Camera, Play, Check } from 'lucide-react'

interface MediaUploaderProps {
  label: string
  value: string
  onChange: (value: string) => void
  accept?: 'image' | 'video'
  placeholder?: string
  onCaptureThumbnail?: (thumbnailDataUrl: string) => void
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  label,
  value,
  onChange,
  accept = 'image',
  placeholder = 'Enter asset URL or upload file...',
  onCaptureThumbnail,
}) => {
  const [isUrlMode, setIsUrlMode] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoPreviewRef = useRef<HTMLVideoElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
  }

  const processFile = (file: File) => {
    // For local instant client-side testing, read as Data URL or Object URL
    const reader = new FileReader()
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChange(event.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  // Auto-capture high quality video frame for poster
  const handleExtractFrame = () => {
    if (!videoPreviewRef.current || !onCaptureThumbnail) return
    setIsExtracting(true)

    const video = videoPreviewRef.current
    try {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 720
      canvas.height = video.videoHeight || 1280
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const frameData = canvas.toDataURL('image/jpeg', 0.88)
        onCaptureThumbnail(frameData)
      }
    } catch (err) {
      console.warn('Could not extract frame (CORS or codec restriction):', err)
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[10px] tracking-wider uppercase text-white/40 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
        >
          {isUrlMode ? (
            <>
              <Upload className="w-3 h-3" />
              <span>Switch to File Upload</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>Switch to URL Link</span>
            </>
          )}
        </button>
      </div>

      {isUrlMode ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-all font-mono"
          />
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-white bg-white/10'
              : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept === 'video' ? 'video/mp4,video/webm,video/quicktime' : 'image/*'}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60">
            {accept === 'video' ? <Play className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
          </div>
          <div className="text-[11px] text-white/70 font-light">
            <span className="font-medium text-white">Click to upload</span> or drag and drop
          </div>
          <div className="text-[10px] text-white/30 font-mono">
            {accept === 'video' ? 'MP4, WebM or MOV' : 'JPG, PNG or WebP'}
          </div>
        </div>
      )}

      {/* Live Media Thumbnail Preview */}
      {value && (
        <div className="relative mt-2 p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/60 shrink-0 border border-white/10 relative">
            {accept === 'video' ? (
              <video
                ref={videoPreviewRef}
                src={value}
                muted
                playsInline
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-white font-medium truncate font-mono">
              {value.startsWith('data:') ? 'Uploaded Local Media' : value}
            </div>
            <div className="text-[10px] text-white/40 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Media active</span>
            </div>
          </div>

          {/* If video and parent accepts thumbnail callback */}
          {accept === 'video' && onCaptureThumbnail && (
            <button
              type="button"
              onClick={handleExtractFrame}
              disabled={isExtracting}
              className="apple-press px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black text-[10px] font-medium tracking-wider uppercase transition-all flex items-center gap-1 shrink-0 border border-white/10 cursor-pointer"
              title="Automatically capture this video frame as the cover thumbnail"
            >
              <Camera className="w-3 h-3" />
              <span>Capture Poster</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
