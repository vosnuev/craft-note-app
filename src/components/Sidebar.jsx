export default function Sidebar({
  notebooks, selectedNotebookId, selectedSectionId, selectedPageId,
  onSelectNotebook, onSelectSection, onSelectPage,
  onAddNotebook, onAddSection, onAddPage
}) {
  const selectedNotebook = notebooks.find(n => n.id === selectedNotebookId)
  const selectedSection = selectedNotebook?.sections.find(s => s.id === selectedSectionId)

  return (
    <div className="sidebar-container">
      {/* Level 1: Notebooks */}
      <div className="sidebar-notebooks">
        <div className="sidebar-header">Notebooks</div>
        <div className="sidebar-list">
          {notebooks.map(nb => (
            <div
              key={nb.id}
              className={`sidebar-item ${nb.id === selectedNotebookId ? 'selected' : ''}`}
              onClick={() => onSelectNotebook(nb.id)}
            >
              <span className="nb-icon">{nb.icon}</span>
              <span className="nb-name">{nb.name}</span>
              <span className="nb-count">{nb.sections.length}</span>
            </div>
          ))}
        </div>
        <button className="sidebar-add-btn" onClick={onAddNotebook}>+ 새 노트북</button>
      </div>

      {/* Level 2: Sections */}
      {selectedNotebook && (
        <div className="sidebar-sections">
          <div className="panel-title">Sections</div>
          <div className="sidebar-list">
            {selectedNotebook.sections.map(sec => (
              <div
                key={sec.id}
                className={`section-item ${sec.id === selectedSectionId ? 'selected' : ''}`}
                onClick={() => onSelectSection(sec.id)}
              >
                <span className="section-dot" style={{ background: sec.color }} />
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sec.name}
                </span>
                <span style={{ fontSize: 11, opacity: .5 }}>{sec.pages.length}</span>
              </div>
            ))}
          </div>
          <button className="sidebar-add-btn" onClick={onAddSection}>+ 새 섹션</button>
        </div>
      )}

      {/* Level 3: Pages */}
      {selectedSection && (
        <div className="sidebar-pages">
          <div className="panel-title">Pages</div>
          <div className="sidebar-list">
            {selectedSection.pages.map(pg => (
              <div
                key={pg.id}
                className={`page-item ${pg.id === selectedPageId ? 'selected' : ''}`}
                onClick={() => onSelectPage(pg.id)}
              >
                <span className="page-icon">📄</span>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pg.name}
                </span>
                {pg.strokes?.length > 0 && <span style={{ fontSize: 10, opacity: .5 }}>✏️</span>}
              </div>
            ))}
          </div>
          <button className="sidebar-add-btn" onClick={onAddPage}>+ 새 페이지</button>
        </div>
      )}
    </div>
  )
}
