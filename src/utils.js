export const pad = (n) => String(n).padStart(2, '0')

export const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const isWeekend = (d) => {
  const day = d.getDay()
  return day === 0 || day === 6
}

export const formatPretty = (d) =>
  d.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })

// The quarter the current date falls in: Jan-Mar, Apr-Jun, Jul-Sep, Oct-Dec.
// Change this if your company's quarters run on a different cycle (e.g. Apr-Jun start).
export function currentQuarterRange() {
  const today = new Date()
  const qStartMonth = Math.floor(today.getMonth() / 3) * 3
  const start = new Date(today.getFullYear(), qStartMonth, 1)
  const end = new Date(today.getFullYear(), qStartMonth + 3, 0)
  return { start, end }
}

const THRESHOLD = 60 // required in-office %, adjust here if your target isn't 60%

export function computeStats(entries) {
  const { start, end } = currentQuarterRange()
  const todayStr = fmt(new Date())

  let workingDays = 0
  let officeDays = 0
  let wfhDays = 0

  let cur = new Date(start)
  while (cur <= end) {
    const d = new Date(cur)
    const key = fmt(d)
    if (!isWeekend(d)) {
      const status = entries[key]
      if (status === 'holiday') {
        // excluded from working days
        
      } else {
        workingDays++
        if (status === 'office') officeDays++
        else if (status === 'wfh') wfhDays++
      }
    }
    cur.setDate(cur.getDate() + 1)
  }

  const requiredOffice = Math.ceil(workingDays * (THRESHOLD / 100))
  const wfhBudget = Math.max(workingDays - requiredOffice, 0)
  const wfhRemaining = Math.max(wfhBudget - wfhDays, 0)
  const marked = officeDays + wfhDays
  const inOfficeRate = marked > 0 ? (officeDays / workingDays) * 100 : null

  let daysLeft = 0
  let scan = new Date(start)
  while (scan <= end) {
    const key = fmt(scan)
    if (key > todayStr && !isWeekend(scan) && entries[key] !== 'holiday') daysLeft++
    scan.setDate(scan.getDate() + 1)
  }

  return {
    threshold: THRESHOLD,
    quarterStart: start,
    quarterEnd: end,
    workingDays,
    officeDays,
    wfhDays,
    wfhBudget,
    wfhRemaining,
    inOfficeRate,
    marked,
    daysLeft,
  }
}
