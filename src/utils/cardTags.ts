import { CARDS } from '../data/cards'
import type { Card, CardPublicness, ImpactDomain } from '../types/card'

const IMPACT_DOMAIN_ORDER: ImpactDomain[] = [
  'education',
  'environment',
  'sports',
  'culture',
  'infra',
  'disaster',
  'tourism',
  'tech',
  'economy',
  'health',
  'other',
]

const CARD_BY_ID = new Map(CARDS.map((card) => [card.id, card] as const))

export const IMPACT_DOMAIN_LABELS: Record<ImpactDomain, string> = {
  education: 'education',
  environment: 'environment',
  sports: 'sports',
  culture: 'culture',
  infra: 'infra',
  disaster: 'disaster',
  tourism: 'tourism',
  tech: 'tech',
  economy: 'economy',
  health: 'health',
  other: 'other',
}

function normalizePublicness(card: Card): CardPublicness {
  return card.publicness === 'public' ? 'public' : 'private'
}

function normalizeImpactDomain(card: Card): ImpactDomain {
  return card.impactDomain ?? 'other'
}

function pickTopImpactDomain(counts: Record<ImpactDomain, number>): ImpactDomain {
  let best: ImpactDomain = 'other'
  let bestCount = -1
  for (const domain of IMPACT_DOMAIN_ORDER) {
    const count = counts[domain]
    if (count > bestCount) {
      best = domain
      bestCount = count
    }
  }
  return best
}

export interface CardTagSummary {
  hasData: boolean
  totalCount: number
  publicCount: number
  privateCount: number
  publicRate: number
  privateRate: number
  topImpactDomain: ImpactDomain | null
  topImpactDomainCount: number
}

export function summarizeCardTags(selectedCardIds: string[]): CardTagSummary {
  const selectedCards = selectedCardIds
    .map((id) => CARD_BY_ID.get(id))
    .filter((card): card is Card => card !== undefined)

  if (selectedCards.length === 0) {
    return {
      hasData: false,
      totalCount: 0,
      publicCount: 0,
      privateCount: 0,
      publicRate: 0,
      privateRate: 0,
      topImpactDomain: null,
      topImpactDomainCount: 0,
    }
  }

  const impactCounts: Record<ImpactDomain, number> = {
    education: 0,
    environment: 0,
    sports: 0,
    culture: 0,
    infra: 0,
    disaster: 0,
    tourism: 0,
    tech: 0,
    economy: 0,
    health: 0,
    other: 0,
  }

  let publicCount = 0
  let privateCount = 0

  for (const card of selectedCards) {
    const publicness = normalizePublicness(card)
    if (publicness === 'public') {
      publicCount += 1
    } else {
      privateCount += 1
    }

    const impactDomain = normalizeImpactDomain(card)
    impactCounts[impactDomain] += 1
  }

  const topImpactDomain = pickTopImpactDomain(impactCounts)
  const totalCount = selectedCards.length

  return {
    hasData: true,
    totalCount,
    publicCount,
    privateCount,
    publicRate: publicCount / totalCount,
    privateRate: privateCount / totalCount,
    topImpactDomain,
    topImpactDomainCount: impactCounts[topImpactDomain],
  }
}
