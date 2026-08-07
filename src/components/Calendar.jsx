import { fmt, isWeekend } from '../utils'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export default function Calendar({ entries, onDayClick, viewMonth, setViewMonth }) {
  const y = viewMonth.getFullYear()
  const m = viewMonth.getMonth()

  const firstOfMonth = new Date(y, m, 1)
  let startWeekday = firstOfMonth.getDay()
  startWeekday = (startWeekday + 6) % 7 // Monday = 0
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const todayStr = fmt(new Date())

  const cells = []
  for (let i = 0; i < startWeekday; i++) {
    cells.push(<div key={`empty-${i}`} className="day empty" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(y, m, day)
    const key = fmt(d)
    const weekend = isWeekend(d)
    const status = entries[key]

    let cls = 'day'
    if (key === todayStr) cls += ' today'
    if (weekend) cls += ' weekend'
    if (status) cls += ` ${status}`

    cells.push(
      <div key={key} className={cls} onClick={() => { if (!weekend) onDayClick(d) }}>
        <span className="day-num">{day}</span>
        {status && <span className={`dot ${status}`} />}
      </div>
    )
  }

  return (
    <>
      <div className="cal-header">
        <div className="cal-title">{viewMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</div>
        <div className="month-nav">
          <button onClick={() => setViewMonth(new Date(y, m - 1, 1))}>‹</button>
          <button onClick={() => { const t = new Date(); setViewMonth(new Date(t.getFullYear(), t.getMonth(), 1)) }}>Today</button>
          <button onClick={() => setViewMonth(new Date(y, m + 1, 1))}>›</button>
        </div>
      </div>
      <div className="weekday-row">
        {WEEKDAYS.map((w) => <div key={w}>{w}</div>)}
      </div>
      <div className="cal-grid">{cells}</div>
    </>
  )
}
