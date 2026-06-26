import { useRef } from 'react'

export default function ImageBlock({ block, onChange }) {
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange({ ...block, url: ev.target.result, name: file.name })
    reader.readAsDataURL(file)
  }

  return (
    <div className="block-image">
      {block.url ? (
        <div className="image-preview-wrap">
          <img src={block.url} alt={block.caption || ''} className="block-img" />
          <input
            className="image-caption-input"
            value={block.caption || ''}
            onChange={e => onChange({ ...block, caption: e.target.value })}
            placeholder="캡션 추가..."
          />
          <button className="code-edit-btn" onClick={() => onChange({ ...block, url: '' })}>교체</button>
        </div>
      ) : (
        <div className="image-upload-area" onClick={() => fileRef.current?.click()}>
          <span className="image-upload-icon">🖼</span>
          <span>클릭하여 이미지 업로드</span>
          <span className="image-upload-hint">PNG, JPG, GIF, WebP</span>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </div>
      )}
    </div>
  )
}
