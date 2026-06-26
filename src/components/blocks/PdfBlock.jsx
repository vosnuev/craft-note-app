import { useRef } from 'react'

export default function PdfBlock({ block, onChange }) {
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onChange({ ...block, url, name: file.name })
  }

  return (
    <div className="block-pdf">
      <div className="block-label-row">
        <span className="block-label">📄 PDF</span>
        {block.url && (
          <button className="code-edit-btn" onClick={() => onChange({ ...block, url: '' })}>교체</button>
        )}
      </div>
      {block.url ? (
        <div className="pdf-embed-wrap">
          <div className="pdf-filename">📄 {block.name || 'document.pdf'}</div>
          <iframe src={block.url} className="pdf-iframe" title={block.name} />
        </div>
      ) : (
        <div className="image-upload-area" onClick={() => fileRef.current?.click()}>
          <span className="image-upload-icon">📄</span>
          <span>클릭하여 PDF 업로드</span>
          <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFile} />
        </div>
      )}
    </div>
  )
}
