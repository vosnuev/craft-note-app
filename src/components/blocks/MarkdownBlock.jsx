import { useState } from 'react'
import { marked } from 'marked'

export default function MarkdownBlock({ block, onChange }) {
  const [editing, setEditing] = useState(!block.text)

  return (
    <div className="block-markdown">
      <div className="block-math-header">
        <span className="block-label">📝 Markdown</span>
        <button className="code-edit-btn" onClick={() => setEditing(e => !e)}>
          {editing ? '미리보기' : '편집'}
        </button>
      </div>
      {editing ? (
        <textarea
          className="code-textarea"
          value={block.text || ''}
          onChange={e => onChange({ ...block, text: e.target.value })}
          placeholder="# 제목&#10;**굵게** *기울임* `코드`&#10;- 목록"
          rows={Math.max(4, (block.text || '').split('\n').length + 1)}
        />
      ) : (
        <div
          className="markdown-render"
          dangerouslySetInnerHTML={{ __html: marked(block.text || '') }}
          onClick={() => setEditing(true)}
        />
      )}
    </div>
  )
}
