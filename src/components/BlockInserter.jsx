const BLOCK_TYPES = [
  { type: 'text',     icon: '¶',  label: '텍스트',     color: '#8E8E93' },
  { type: 'heading',  icon: 'H',  label: '제목',       color: '#1C1C1E' },
  { type: 'table',    icon: '⊞',  label: '표',         color: '#007AFF' },
  { type: 'image',    icon: '🖼',  label: '이미지',     color: '#34C759' },
  { type: 'pdf',      icon: '📄', label: 'PDF',        color: '#FF3B30' },
  { type: 'calendar', icon: '📅', label: '캘린더',     color: '#FF9500' },
  { type: 'todo',     icon: '✅', label: 'Todo',       color: '#30B0C7' },
  { type: 'kanban',   icon: '📋', label: 'Kanban',     color: '#AF52DE' },
  { type: 'math',     icon: '∑',  label: '수식',       color: '#FF2D55' },
  { type: 'markdown', icon: 'M↓', label: 'Markdown',  color: '#636366' },
  { type: 'code',     icon: '<>', label: '코드',       color: '#5856D6' },
  { type: 'divider',  icon: '—',  label: '구분선',     color: '#C7C7CC' },
]

export default function BlockInserter({ onInsert, isDrawMode }) {
  if (isDrawMode) return null

  return (
    <div className="block-inserter">
      {BLOCK_TYPES.map(bt => (
        <button
          key={bt.type}
          className="inserter-btn"
          onClick={() => onInsert(bt.type)}
          title={bt.label}
        >
          <span className="inserter-icon" style={{ color: bt.color }}>{bt.icon}</span>
          <span className="inserter-label">{bt.label}</span>
        </button>
      ))}
    </div>
  )
}
