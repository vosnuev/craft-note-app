import { useState, useEffect, useRef } from 'react'

const MENU_ITEMS = [
  { category: '기본', items: [
    { type: 'text',     icon: '¶',  label: '텍스트',       desc: '일반 텍스트 블록' },
    { type: 'heading1', icon: 'H1', label: '제목 1',       desc: '큰 제목' },
    { type: 'heading2', icon: 'H2', label: '제목 2',       desc: '중간 제목' },
    { type: 'heading3', icon: 'H3', label: '제목 3',       desc: '작은 제목' },
    { type: 'divider',  icon: '—',  label: '구분선',       desc: '구분선 삽입' },
  ]},
  { category: '미디어', items: [
    { type: 'image',    icon: '🖼', label: '이미지',       desc: '이미지 업로드' },
    { type: 'pdf',      icon: '📄', label: 'PDF',          desc: 'PDF 파일 삽입' },
  ]},
  { category: '구성', items: [
    { type: 'table',    icon: '⊞',  label: '표',           desc: '표 삽입' },
    { type: 'todo',     icon: '✅', label: 'Todo 목록',    desc: '할일 체크리스트' },
    { type: 'kanban',   icon: '📋', label: 'Kanban',       desc: '칸반 보드' },
    { type: 'calendar', icon: '📅', label: '캘린더',       desc: '달력 및 일정' },
  ]},
  { category: '코드 & 수식', items: [
    { type: 'code',     icon: '<>', label: '코드 블록',    desc: '코드 삽입 (15개 언어)' },
    { type: 'math',     icon: '∑',  label: '수식 (LaTeX)', desc: 'LaTeX 수식 렌더링' },
    { type: 'markdown', icon: 'M↓', label: 'Markdown',    desc: '마크다운 렌더링' },
  ]},
  { category: '📁 템플릿', items: [
    { type: 'tpl_weekly',  icon: '🗓', label: '주간 시간표',   desc: '시간대별 9:00~20:00 주간 계획표' },
    { type: 'tpl_daily',   icon: '📋', label: '일일 계획표',   desc: 'Todo + 메모 + 목표 템플릿' },
    { type: 'tpl_project', icon: '🚀', label: '프로젝트 보드', desc: 'Kanban + 목표 + 일정 템플릿' },
  ]},
]

const ALL_ITEMS = MENU_ITEMS.flatMap(g => g.items)

export default function SlashMenu({ x, y, query, onSelect, onClose }) {
  const [focused, setFocused] = useState(0)
  const menuRef = useRef(null)

  const filtered = query
    ? ALL_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : null

  const visibleGroups = filtered
    ? [{ category: '검색 결과', items: filtered }]
    : MENU_ITEMS

  const flatVisible = visibleGroups.flatMap(g => g.items)

  useEffect(() => { setFocused(0) }, [query])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => (f + 1) % flatVisible.length) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => (f - 1 + flatVisible.length) % flatVisible.length) }
      if (e.key === 'Enter')     { e.preventDefault(); if (flatVisible[focused]) onSelect(flatVisible[focused].type) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [focused, flatVisible, onSelect, onClose])

  // Scroll focused item into view
  useEffect(() => {
    const el = menuRef.current?.querySelector(`[data-idx="${focused}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [focused])

  // Auto-adjust position to not go off screen
  const style = {
    position: 'fixed',
    top: Math.min(y, window.innerHeight - 360),
    left: Math.min(x, window.innerWidth - 280),
    zIndex: 1000,
  }

  if (filtered && filtered.length === 0) return (
    <div className="slash-menu" style={style}>
      <div className="slash-no-result">'{query}' 에 해당하는 블록 없음</div>
    </div>
  )

  let globalIdx = 0
  return (
    <div className="slash-menu" style={style} ref={menuRef}>
      {visibleGroups.map((group) => (
        <div key={group.category}>
          <div className="slash-category">{group.category}</div>
          {group.items.map((item) => {
            const idx = globalIdx++
            return (
              <div
                key={item.type}
                data-idx={idx}
                className={`slash-item ${idx === focused ? 'focused' : ''}`}
                onMouseEnter={() => setFocused(idx)}
                onClick={() => onSelect(item.type)}
              >
                <span className="slash-item-icon">{item.icon}</span>
                <div className="slash-item-info">
                  <span className="slash-item-label">{item.label}</span>
                  <span className="slash-item-desc">{item.desc}</span>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
