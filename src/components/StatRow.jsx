import { computeStats } from '../utils'

export default function StatRow({ entries }) {
  const s = computeStats(entries)

  return (
    <div className="stat-row">
      <div className="stat">
        <div className="stat-label">In-office rate</div>
        <div className="stat-value">{s.inOfficeRate === null ? '—' : `${s.inOfficeRate.toFixed(0)}%`}</div>
        <div className="stat-sub">
          {s.marked > 0 ? ` target ${s.threshold}%` : 'no days marked yet'}
        </div>
      </div>

      <div className="stat">
        <div className="stat-label">In Office attendance(Min required)</div>
        <div className={'stat-value' + (s.wfhDays > s.wfhBudget ? ' warn' : '')}>
          {s.officeDays} / {s.workingDays-s.wfhBudget}
        </div>
        <div className="stat-sub">days in office</div>
      </div>

      <div className="stat">
        <div className="stat-label">WFH remaining</div>
        <div className={'stat-value' + (s.wfhRemaining === 0 ? ' warn' : ' good')}>{s.wfhRemaining}</div>
        <div className="stat-sub">
          {s.wfhRemaining === 0 ? 'budget used up' : 'still available this quarter'}
        </div>
      </div>

      <div className="stat">
        <div className="stat-label">Working days left</div>
        <div className="stat-value">{s.daysLeft}</div>
        <div className="stat-sub">of {s.workingDays} total this quarter</div>
      </div>
    </div>
  )
}
