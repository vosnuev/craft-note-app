import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function MathBlock({ block, onChange }) {
  const [editing, setEditing] = useState(!block.formula)
  const renderRef = useRef(null)

  useEffect(() => {
    if (!editing && renderRef.current && block.formula) {
      try {
        katex.render(block.formula, renderRef.current, { displayMode: true, throwOnError: false })
      } catch {
        renderRef.current.textContent = block.formula
      }
    }
  }, [editing, block.formula])

  return (
    <div className="block-math">
      <div className="block-math-header">
        <span className="block-label">📐 수식</span>
        <button className="code-edit-btn" onClick={() => setEditing(e => !e)}>
          {editing ? '렌더링' : '편집'}
        </button>
      </div>
      {editing ? (
        <input
          className="math-input"
          value={block.formula || ''}
          onChange={e => onChange({ ...block, formula: e.target.value })}
          placeholder="LaTeX 수식 입력 (예: E = mc^2)"
        />
      ) : (
        <div ref={renderRef} className="math-render" onClick={() => setEditing(true)} />
      )}
    </div>
  )
}
