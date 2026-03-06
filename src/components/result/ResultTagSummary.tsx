import { IMPACT_DOMAIN_LABELS_JA } from '../../constants/tagLabels'
import { summarizeCardTags } from '../../utils/cardTags'
import { PublicnessRatioBar } from './PublicnessRatioBar'

interface ResultTagSummaryProps {
  selectedCardIds: string[]
  className?: string
}

export function ResultTagSummary({ selectedCardIds, className = '' }: ResultTagSummaryProps) {
  const summary = summarizeCardTags(selectedCardIds)
  const topDomainsText =
    summary.topImpactDomains.length > 0
      ? summary.topImpactDomains
        .map((item) => `${IMPACT_DOMAIN_LABELS_JA[item.domain]}（${item.count}件）`)
        .join(' / ')
      : 'なし'

  return (
    <section className={`rounded-3xl bg-white/85 backdrop-blur-sm border border-white/90 p-5 shadow-lg ${className}`}>
      <h3 className="text-base font-semibold text-gray-900">サブ分類</h3>
      <p className="text-xs text-gray-500 mt-1">公共性と関心領域の傾向</p>

      {!summary.hasData ? (
        <p className="text-sm text-gray-500 mt-3">データなし</p>
      ) : (
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">公共性の割合</p>
            <PublicnessRatioBar publicRate={summary.publicRate} privateRate={summary.privateRate} />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-3">
            <p className="text-sm font-medium text-gray-800">
              トップ関心領域：
              {topDomainsText}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
