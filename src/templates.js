const uid = () => Math.random().toString(36).slice(2)

export const TEMPLATES = {
  tpl_weekly: () => [
    { id: uid(), type: 'heading', level: 1, text: '📅 주간 시간표' },
    {
      id: uid(), type: 'table',
      headers: ['시간', '월', '화', '수', '목', '금', '토', '일'],
      rows: [
        '09:00','10:00','11:00','12:00','13:00',
        '14:00','15:00','16:00','17:00','18:00',
        '19:00','20:00',
      ].map(t => [t, '', '', '', '', '', '', ''])
    },
  ],

  tpl_daily: () => [
    { id: uid(), type: 'heading', level: 1, text: '📋 일일 계획' },
    { id: uid(), type: 'todo', items: [
      { id: uid(), text: '오늘의 목표', done: false },
      { id: uid(), text: '중요 업무', done: false },
      { id: uid(), text: '운동', done: false },
    ]},
    { id: uid(), type: 'heading', level: 2, text: '📝 메모' },
    { id: uid(), type: 'text', text: '' },
  ],

  tpl_project: () => [
    { id: uid(), type: 'heading', level: 1, text: '🚀 프로젝트 보드' },
    { id: uid(), type: 'kanban', columns: [
      { id: uid(), title: 'To Do',       cards: [{ id: uid(), text: '요구사항 정의' }] },
      { id: uid(), title: 'In Progress', cards: [{ id: uid(), text: '개발 중' }] },
      { id: uid(), title: 'Done',        cards: [{ id: uid(), text: '기획 완료' }] },
    ]},
    { id: uid(), type: 'heading', level: 2, text: '📅 일정' },
    { id: uid(), type: 'calendar', year: new Date().getFullYear(), month: new Date().getMonth(), notes: {} },
  ],
}

export function createBlock(type) {
  const id = uid()
  switch (type) {
    case 'text':     return { id, type: 'text', text: '' }
    case 'heading1': return { id, type: 'heading', level: 1, text: '' }
    case 'heading2': return { id, type: 'heading', level: 2, text: '' }
    case 'heading3': return { id, type: 'heading', level: 3, text: '' }
    case 'divider':  return { id, type: 'divider' }
    case 'code':     return { id, type: 'code', language: 'javascript', code: '' }
    case 'math':     return { id, type: 'math', formula: '' }
    case 'markdown': return { id, type: 'markdown', text: '' }
    case 'table':    return { id, type: 'table', headers: ['열 1','열 2','열 3'], rows: [['','',''],['','','']] }
    case 'image':    return { id, type: 'image', url: '', caption: '' }
    case 'pdf':      return { id, type: 'pdf', url: '', name: '' }
    case 'todo':     return { id, type: 'todo', items: [{ id: uid(), text: '', done: false }] }
    case 'kanban':   return { id, type: 'kanban', columns: [
      { id: uid(), title: 'To Do', cards: [] },
      { id: uid(), title: 'In Progress', cards: [] },
      { id: uid(), title: 'Done', cards: [] },
    ]}
    case 'calendar': return { id, type: 'calendar', year: new Date().getFullYear(), month: new Date().getMonth(), notes: {} }
    default:         return { id, type: 'text', text: '' }
  }
}
