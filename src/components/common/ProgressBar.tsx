/**
 * 進捗バー（カード何枚目かなど、0〜1 で表示）
 */

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
}

export function ProgressBar({ value, max = 1, className = '' }: ProgressBarProps) {
  const pct = max <= 0 ? 0 : Math.min(1, Math.max(0, value / max))
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-indigo-500 rounded-full transition-all duration-300"
        style={{ width: `${pct * 100}%` }}
      />
    </div>
  )
}
