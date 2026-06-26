import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Toolbar from './components/Toolbar.jsx'
import ContentArea from './components/ContentArea.jsx'

const uid = () => Math.random().toString(36).slice(2)

const INITIAL_DATA = [
  {
    id: 'nb1', name: 'My Notebook', icon: '📓',
    sections: [
      {
        id: 'sec1', name: 'Planning', color: '#007AFF',
        pages: [
          {
            id: 'p1', name: 'Weekly Planner',
            blocks: [
              { id: uid(), type: 'heading', level: 1, text: '📅 이 주 계획' },
              {
                id: uid(), type: 'table',
                headers: ['시간','월','화','수','목','금','토','일'],
                rows: ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
                  .map(t => [t,'','','','','','',''])
              },
            ],
            strokes: []
          },
          {
            id: 'p2', name: 'Daily Notes',
            blocks: [
              { id: uid(), type: 'heading', level: 1, text: 'Daily Notes' },
              { id: uid(), type: 'todo', items: [
                { id: uid(), text: '아침 운동', done: false },
                { id: uid(), text: '이메일 확인', done: true },
                { id: uid(), text: '프로젝트 리뷰', done: false },
              ]},
            ],
            strokes: []
          },
        ]
      },
      {
        id: 'sec2', name: 'Ideas', color: '#FF9500',
        pages: [
          {
            id: 'p3', name: 'Brain Dump',
            blocks: [
              { id: uid(), type: 'heading', level: 1, text: '💡 아이디어' },
              { id: uid(), type: 'markdown', text: '## 아이디어 목록\n\n- **아이디어 1**: 설명\n- **아이디어 2**: 설명\n\n> 좋은 아이디어는 기록에서 시작된다.' },
            ],
            strokes: []
          },
        ]
      },
      {
        id: 'sec3', name: 'Projects', color: '#34C759',
        pages: [
          {
            id: 'p4', name: 'Project Board',
            blocks: [
              { id: uid(), type: 'heading', level: 1, text: '🚀 프로젝트 보드' },
              { id: uid(), type: 'kanban', columns: [
                { id: 'c1', title: 'To Do', cards: [{ id: uid(), text: '기획서 작성' }, { id: uid(), text: 'UI 디자인' }] },
                { id: 'c2', title: 'In Progress', cards: [{ id: uid(), text: '개발 중' }] },
                { id: 'c3', title: 'Done', cards: [{ id: uid(), text: '요구사항 정의' }] },
              ]},
            ],
            strokes: []
          },
        ]
      },
    ]
  },
  {
    id: 'nb2', name: 'Study', icon: '📚',
    sections: [
      {
        id: 'sec4', name: 'Math', color: '#AF52DE',
        pages: [
          {
            id: 'p5', name: '수식 노트',
            blocks: [
              { id: uid(), type: 'heading', level: 1, text: '📐 수식 노트' },
              { id: uid(), type: 'math', formula: 'E = mc^2' },
              { id: uid(), type: 'math', formula: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}' },
              { id: uid(), type: 'code', language: 'python', code: 'import math\nprint(math.pi)\nprint(math.e)' },
            ],
            strokes: []
          },
        ]
      },
      {
        id: 'sec5', name: 'Code', color: '#FF2D55',
        pages: [
          {
            id: 'p6', name: '코드 스니펫',
            blocks: [
              { id: uid(), type: 'heading', level: 1, text: '💻 코드 스니펫' },
              { id: uid(), type: 'code', language: 'javascript', code: 'const greet = (name) => {\n  return `Hello, ${name}!`\n}\nconsole.log(greet("World"))' },
            ],
            strokes: []
          },
        ]
      },
    ]
  },
  {
    id: 'nb3', name: 'Work', icon: '💼',
    sections: [
      {
        id: 'sec6', name: 'Schedule', color: '#FF6B35',
        pages: [
          {
            id: 'p7', name: '일정',
            blocks: [
              { id: uid(), type: 'heading', level: 1, text: '📅 일정 관리' },
              { id: uid(), type: 'calendar', year: 2026, month: 5, notes: {} },
            ],
            strokes: []
          },
        ]
      },
    ]
  },
]

export default function App() {
  const [notebooks, setNotebooks] = useState(INITIAL_DATA)
  const [selectedNotebookId, setSelectedNotebookId] = useState('nb1')
  const [selectedSectionId, setSelectedSectionId] = useState('sec1')
  const [selectedPageId, setSelectedPageId] = useState('p1')
  const [isDrawMode, setIsDrawMode] = useState(false)
  const [penColor, setPenColor] = useState('#1c1c1e')
  const [penWidth, setPenWidth] = useState(3)
  const [penTool, setPenTool] = useState('pen')

  const selectedNotebook = notebooks.find(n => n.id === selectedNotebookId)
  const selectedSection = selectedNotebook?.sections.find(s => s.id === selectedSectionId)
  const selectedPage = selectedSection?.pages.find(p => p.id === selectedPageId)

  const updatePage = useCallback((pageId, updater) => {
    setNotebooks(prev => prev.map(nb => ({
      ...nb,
      sections: nb.sections.map(sec => ({
        ...sec,
        pages: sec.pages.map(pg => pg.id === pageId ? updater(pg) : pg)
      }))
    })))
  }, [])

  const handleBlocksChange = useCallback((blocks) => {
    updatePage(selectedPageId, pg => ({ ...pg, blocks }))
  }, [selectedPageId, updatePage])

  const handleStrokesChange = useCallback((strokes) => {
    updatePage(selectedPageId, pg => ({ ...pg, strokes }))
  }, [selectedPageId, updatePage])

  const handleNameChange = useCallback((name) => {
    updatePage(selectedPageId, pg => ({ ...pg, name }))
    setNotebooks(prev => prev.map(nb => ({
      ...nb,
      sections: nb.sections.map(sec => ({
        ...sec,
        pages: sec.pages.map(pg => pg.id === selectedPageId ? { ...pg, name } : pg)
      }))
    })))
  }, [selectedPageId])

  // ── Create helpers ──
  const addNotebook = useCallback(() => {
    const name = window.prompt('노트북 이름:', 'New Notebook')
    if (!name) return
    const nb = { id: uid(), name, icon: '📓', sections: [] }
    setNotebooks(prev => [...prev, nb])
    setSelectedNotebookId(nb.id)
    setSelectedSectionId(null)
    setSelectedPageId(null)
  }, [])

  const addSection = useCallback(() => {
    const name = window.prompt('섹션 이름:', 'New Section')
    if (!name) return
    const colors = ['#007AFF','#FF9500','#34C759','#AF52DE','#FF2D55','#FF6B35']
    const sec = { id: uid(), name, color: colors[Math.floor(Math.random()*colors.length)], pages: [] }
    setNotebooks(prev => prev.map(nb =>
      nb.id === selectedNotebookId ? { ...nb, sections: [...nb.sections, sec] } : nb
    ))
    setSelectedSectionId(sec.id)
    setSelectedPageId(null)
  }, [selectedNotebookId])

  const addPage = useCallback(() => {
    const name = window.prompt('페이지 이름:', 'Untitled')
    if (!name) return
    const page = {
      id: uid(), name,
      blocks: [{ id: uid(), type: 'heading', level: 1, text: name }],
      strokes: []
    }
    setNotebooks(prev => prev.map(nb => ({
      ...nb,
      sections: nb.sections.map(sec =>
        sec.id === selectedSectionId ? { ...sec, pages: [...sec.pages, page] } : sec
      )
    })))
    setSelectedPageId(page.id)
  }, [selectedSectionId])

  const handleUndo = useCallback(() => {
    if (selectedPage) handleStrokesChange(selectedPage.strokes.slice(0, -1))
  }, [selectedPage, handleStrokesChange])

  const handleClear = useCallback(() => {
    if (selectedPage) handleStrokesChange([])
  }, [selectedPage, handleStrokesChange])

  return (
    <div className="app">
      <Toolbar
        isDrawMode={isDrawMode}
        onToggleMode={() => setIsDrawMode(d => !d)}
        penColor={penColor}
        onColorChange={setPenColor}
        penWidth={penWidth}
        onWidthChange={setPenWidth}
        penTool={penTool}
        onToolChange={setPenTool}
        onUndo={handleUndo}
        onClear={handleClear}
        breadcrumb={{
          notebook: selectedNotebook?.name,
          section: selectedSection?.name,
          page: selectedPage?.name,
        }}
        hasStrokes={selectedPage?.strokes?.length > 0}
      />
      <div className="app-body">
        <Sidebar
          notebooks={notebooks}
          selectedNotebookId={selectedNotebookId}
          selectedSectionId={selectedSectionId}
          selectedPageId={selectedPageId}
          onSelectNotebook={(id) => {
            setSelectedNotebookId(id)
            const nb = notebooks.find(n => n.id === id)
            if (nb?.sections[0]) {
              setSelectedSectionId(nb.sections[0].id)
              setSelectedPageId(nb.sections[0].pages[0]?.id ?? null)
            } else {
              setSelectedSectionId(null)
              setSelectedPageId(null)
            }
          }}
          onSelectSection={(id) => {
            setSelectedSectionId(id)
            const sec = selectedNotebook?.sections.find(s => s.id === id)
            setSelectedPageId(sec?.pages[0]?.id ?? null)
          }}
          onSelectPage={setSelectedPageId}
          onAddNotebook={addNotebook}
          onAddSection={addSection}
          onAddPage={addPage}
        />
        <ContentArea
          page={selectedPage}
          isDrawMode={isDrawMode}
          penColor={penColor}
          penWidth={penWidth}
          penTool={penTool}
          onStrokesChange={handleStrokesChange}
          onBlocksChange={handleBlocksChange}
          onNameChange={handleNameChange}
        />
      </div>
    </div>
  )
}
