import { formatPretty } from '../utils'

export default function DayPickerModal({ date, currentStatus, onSelect, onClear, onClose }) {
  if (!date) return null

  const options = [
    { key: 'office', label: 'Office' },
    { key: 'wfh', label: 'Work From Home' },
    { key: 'holiday', label: 'Holiday' },
  ]

  return (
    <div className="overlay open" onClick={onClose}>
      <div className="modal day-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="day-picker-date">{formatPretty(date)}</div>
        <div className="day-picker-options">
          {options.map((opt) => (
            <button
              key={opt.key}
              className={`day-picker-btn ${opt.key}${currentStatus === opt.key ? ' active' : ''}`}
              onClick={() => onSelect(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClear}>Clear mark</button>
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
