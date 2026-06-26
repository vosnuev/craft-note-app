import { useState } from 'react'

export default function TableBlock({ block, onChange }) {
  const headers = block.headers || ['열 1', '열 2', '열 3']
  const rows = block.rows || [['', '', ''], ['', '', '']]

  const updateCell = (ri, ci, val) => {
    const newRows = rows.map((r, i) => i === ri ? r.map((c, j) => j === ci ? val : c) : r)
    onChange({ ...block, rows: newRows })
  }
  const updateHeader = (ci, val) => {
    onChange({ ...block, headers: headers.map((h, i) => i === ci ? val : h) })
  }
  const addRow = () => onChange({ ...block, rows: [...rows, headers.map(() => '')] })
  const addCol = () => onChange({
    ...block,
    headers: [...headers, `열 ${headers.length + 1}`],
    rows: rows.map(r => [...r, ''])
  })
  const delRow = (ri) => onChange({ ...block, rows: rows.filter((_, i) => i !== ri) })

  return (
    <div className="block-table-wrap">
      <div className="block-label-row">
        <span className="block-label">📊 표</span>
        <button className="tb-mini-btn" onClick={addCol}>+ 열</button>
        <button className="tb-mini-btn" onClick={addRow}>+ 행</button>
      </div>
      <table className="block-table">
        <thead>
          <tr>
            {headers.map((h, ci) => (
              <th key={ci}>
                <input value={h} onChange={e => updateHeader(ci, e.target.value)} className="cell-input header-input" />
              </th>
            ))}
            <th style={{ width: 24 }} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>
                  <input value={cell} onChange={e => updateCell(ri, ci, e.target.value)} className="cell-input" />
                </td>
              ))}
              <td>
                <button className="del-row-btn" onClick={() => delRow(ri)}>×</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
