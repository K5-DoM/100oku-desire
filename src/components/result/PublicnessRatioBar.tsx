import { PUBLICNESS_LABELS } from '../../constants/tagLabels'

interface PublicnessRatioBarProps {
  publicRate: number
  privateRate: number
}

export function PublicnessRatioBar({ publicRate, privateRate }: PublicnessRatioBarProps) {
  const publicPercent = Math.round(publicRate * 100)
  const roundedPrivate = Math.round(privateRate * 100)
  const privatePercent = publicPercent + roundedPrivate === 100 ? roundedPrivate : 100 - publicPercent

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-sky-700">
          {PUBLICNESS_LABELS.public}
          {' '}
          {publicPercent}%
        </span>
        <span className="text-rose-700">
          {PUBLICNESS_LABELS.private}
          {' '}
          {privatePercent}%
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden bg-gray-200">
        <div className="flex h-full">
          <div className="bg-sky-500" style={{ width: `${publicPercent}%` }} />
          <div className="bg-rose-500" style={{ width: `${privatePercent}%` }} />
        </div>
      </div>
    </div>
  )
}
