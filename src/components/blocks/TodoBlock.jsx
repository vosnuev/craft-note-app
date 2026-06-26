import { useState } from 'react'

export default function TodoBlock({ block, onChange }) {
  const [newText, setNewText] = useState('')
  const items = block.items || []

  const toggle = (id) => onChange({
    ...block, items: items.map(i => i.id === id ? { ...i, done: !i.done } : i)
  })
  const add = () => {
    if (!newText.trim()) return
    onChange({ ...block, items: [...items, { id: Date.now() + '', text: newText.trim(), done: false }] })
    setNewText('')
  }
  const del = (id) => onChange({ ...block, items: items.filter(i => i.id !== id) })
  const updateText = (id, text) => onChange({
    ...block, items: items.map(i => i.id === id ? { ...i, text } : i)
  })

  const done = items.filter(i => i.done).length

  return (
    <div className="block-todo">
      <div className="block-label-row">
        <span className="block-label">✅ Todo</span>
        <span className="todo-progress">{done}/{items.length}</span>
      </div>
      {items.length > 0 && (
        <div className="todo-bar-bg">
          <div className="todo-bar-fill" style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} />
        </div>
      )}
      <div className="todo-list">
        {items.map(item => (
          <div key={item.id} className={`todo-item ${item.done ? 'done' : ''}`}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} className="todo-check" />
            <input
              className="todo-text-input"
              value={item.text}
              onChange={e => updateText(item.id, e.target.value)}
            />
            <button className="del-row-btn" onClick={() => del(item.id)}>×</button>
          </div>
        ))}
      </div>
      <div className="todo-add-row">
        <input
          className="todo-new-input"
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="+ 새 항목 추가 (Enter)"
        />
      </div>
    </div>
  )
}
