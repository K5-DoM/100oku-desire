import type { CardPublicness, ImpactDomain } from '../types/card'

export const PUBLICNESS_LABELS: Record<CardPublicness, string> = {
  public: '公共',
  private: '私的',
}

export const IMPACT_DOMAIN_LABELS_JA: Record<ImpactDomain, string> = {
  education: '教育',
  environment: '環境',
  sports: 'スポーツ',
  culture: '文化',
  infra: 'インフラ',
  disaster: '防災',
  tourism: '観光',
  tech: 'テクノロジー',
  economy: '経済',
  health: '医療・健康',
  other: 'その他',
}
