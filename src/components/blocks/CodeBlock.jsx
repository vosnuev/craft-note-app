import { useState, useEffect, useRef } from 'react'
import hljs from 'highlight.js'

const LANGUAGES = ['javascript','typescript','python','html','css','json','sql','bash','java','cpp','rust','go','markdown','plaintext']

export default function CodeBlock({ block, onChange }) {
  const [editing, setEditing] = useState(!block.code)
  const codeRef = useRef(null)

  useEffect(() => {
    if (!editing && codeRef.current) {
      codeRef.current.innerHTML = hljs.highlight(block.code || '', {
        language: block.language || 'plaintext', ignoreIllegals: true
      }).value
    }
  }, [editing, block.code, block.language])

  return (
    <div className="block-code">
      <div className="block-code-header">
        <select
          value={block.language || 'javascript'}
          onChange={e => onChange({ ...block, language: e.target.value })}
          className="code-lang-select"
        >
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <button className="code-edit-btn" onClick={() => setEditing(e => !e)}>
          {editing ? '미리보기' : '편집'}
        </button>
      </div>
      {editing ? (
        <textarea
          className="code-textarea"
          value={block.code || ''}
          onChange={e => onChange({ ...block, code: e.target.value })}
          placeholder="코드를 입력하세요..."
          spellCheck={false}
          rows={Math.max(4, (block.code || '').split('\n').length + 1)}
        />
      ) : (
        <pre className="code-pre"><code ref={codeRef} /></pre>
      )}
    </div>
  )
}
