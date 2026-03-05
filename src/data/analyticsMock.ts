/**
 * 分析画面用のダミー集計データ（デモ用）
 * C担当: 分析画面の見せ方・数値の調整はここで
 * app_definition: 本物の集計基盤は不要、固定データで「企業向け活用」を見せる
 */

export interface CategoryRate {
  categoryId: string
  label: string
  rate: number
}

export interface PopularCard {
  rank: number
  title: string
  pickCount: number
}

export const analyticsMock = {
  /** カテゴリ別人気率（0〜1） */
  categoryRates: [
    { categoryId: 'community', label: '地域貢献', rate: 0.32 },
    { categoryId: 'experience', label: '体験', rate: 0.4 },
    { categoryId: 'investment', label: '投資', rate: 0.22 },
    { categoryId: 'asset', label: '資産形成', rate: 0.06 },
  ] as CategoryRate[],
  /** 地域貢献系の選択率 */
  communityPickRate: 0.32,
  /** 人気カードランキング（上位5） */
  popularCards: [
    { rank: 1, title: '地元の商店街を全店舗買い上げ', pickCount: 1250 },
    { rank: 2, title: '宇宙旅行', pickCount: 980 },
    { rank: 3, title: '再生可能エネルギー会社に出資', pickCount: 820 },
    { rank: 4, title: '南の島で1年間バカンス', pickCount: 760 },
    { rank: 5, title: '美術館を建てて名画を寄贈', pickCount: 650 },
  ] as PopularCard[],
}
