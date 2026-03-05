import { IMPACT_DOMAIN_LABELS, summarizeCardTags } from '../../utils/cardTags'

interface ResultTagSummaryProps {
  selectedCardIds: string[]
  className?: string
}

export function ResultTagSummary({ selectedCardIds, className = '' }: ResultTagSummaryProps) {
  const summary = summarizeCardTags(selectedCardIds)

  return (
    <section className={`rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-4 shadow-lg ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">サブ分類</h3>

      {!summary.hasData ? (
        <p className="text-sm text-gray-500">データなし</p>
      ) : (
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            公共性比率:
            {' '}
            public {Math.round(summary.publicRate * 100)}% / private {Math.round(summary.privateRate * 100)}%
          </p>
          <p>
            トップ関心領域:
            {' '}
            {IMPACT_DOMAIN_LABELS[summary.topImpactDomain ?? 'other']} ({summary.topImpactDomainCount}件)
          </p>
        </div>
      )}
    </section>
  )
}
