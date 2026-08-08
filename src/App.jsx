import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import Calendar from './components/Calendar'
import DayPickerModal from './components/DayPickerModal'
import StatRow from './components/StatRow'
import { fmt } from './utils'

export default function App() {
  const [entries, setEntries] = useLocalStorage('attendance-entries', {})
  const [viewMonth, setViewMonth] = useState(() => {
    const t = new Date()
    return new Date(t.getFullYear(), t.getMonth(), 1)
  })
  const [pickerDate, setPickerDate] = useState(null)

  const openPicker = (date) => setPickerDate(date)
  const closePicker = () => setPickerDate(null)

  const selectStatus = (status) => {
    const key = fmt(pickerDate)
    setEntries({ ...entries, [key]: status })
    closePicker()
  }

  const clearDay = () => {
    const key = fmt(pickerDate)
    const next = { ...entries }
    delete next[key]
    setEntries(next)
    closePicker()
  }

  return (
    <div className="wrap">
      <header>
        <div>
          <div className="eyebrow">Office Attendance</div>
          <h1>The Register</h1>
        </div>
      </header>

      <StatRow entries={entries} />

      <Calendar
        entries={entries}
        onDayClick={openPicker}
        viewMonth={viewMonth}
        setViewMonth={setViewMonth}
      />

      <div className="legend">
        <span><i className="lg-office" /> Office</span>
        <span><i className="lg-wfh" /> Work From Home</span>
        <span><i className="lg-holiday" /> Holiday</span>
        <span><i className="lg-official-holiday" /> Official Holiday</span>
      </div>
      <div className="hint">Tap a weekday to mark it as Office, Work From Home, or Holiday. Official holidays and weekends are not clickable.</div>

      <footer>Saved only in this browser · nothing is sent anywhere</footer>

      <DayPickerModal
        date={pickerDate}
        currentStatus={pickerDate ? entries[fmt(pickerDate)] : undefined}
        onSelect={selectStatus}
        onClear={clearDay}
        onClose={closePicker}
      />
    </div>
  )
}
