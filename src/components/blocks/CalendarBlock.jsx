import { useState } from 'react'

const DAYS = ['일','월','화','수','목','금','토']
const MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']

export default function CalendarBlock({ block, onChange }) {
  const today = new Date()
  const [year, setYear] = useState(block.year || today.getFullYear())
  const [month, setMonth] = useState(block.month ?? today.getMonth())
  const [notes, setNotes] = useState(block.notes || {})
  const [selected, setSelected] = useState(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prev = () => { const d = month === 0 ? { y: year-1, m: 11 } : { y: year, m: month-1 }; setYear(d.y); setMonth(d.m) }
  const next = () => { const d = month === 11 ? { y: year+1, m: 0 } : { y: year, m: month+1 }; setYear(d.y); setMonth(d.m) }

  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  const key = (d) => `${year}-${month}-${d}`
  const hasNote = (d) => !!(notes[key(d)])

  const updateNote = (d, text) => {
    const n = { ...notes, [key(d)]: text }
    setNotes(n)
    onChange({ ...block, year, month, notes: n })
  }

  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))
  while (cells.length % 7) cells.push(null)

  return (
    <div className="block-calendar">
      <div className="block-label-row">
        <span className="block-label">📅 캘린더</span>
        <div className="cal-nav">
          <button className="cal-nav-btn" onClick={prev}>‹</button>
          <span className="cal-month-label">{year}년 {MONTHS[month]}</span>
          <button className="cal-nav-btn" onClick={next}>›</button>
        </div>
      </div>
      <table className="cal-table">
        <thead>
          <tr>{DAYS.map(d => <th key={d} className={d==='일'?'sun':d==='토'?'sat':''}>{d}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: cells.length / 7 }, (_, wi) => (
            <tr key={wi}>
              {cells.slice(wi*7, wi*7+7).map((d, di) => (
                <td
                  key={di}
                  className={`cal-cell ${d && isToday(d) ? 'today' : ''} ${d && selected===d ? 'selected' : ''} ${di===0?'sun':di===6?'sat':''}`}
                  onClick={() => d && setSelected(selected === d ? null : d)}
                >
                  {d && <span className="cal-day">{d}</span>}
                  {d && hasNote(d) && <span className="cal-dot" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <div className="cal-note-area">
          <span className="cal-note-label">{month+1}월 {selected}일 메모</span>
          <textarea
            className="cal-note-input"
            value={notes[key(selected)] || ''}
            onChange={e => updateNote(selected, e.target.value)}
            placeholder="이 날의 메모..."
            rows={2}
          />
        </div>
      )}
    </div>
  )
}
