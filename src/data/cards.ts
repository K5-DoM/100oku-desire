/**
 * カードマスタ（ダミー）
 * B担当: 文言・カテゴリ・金額の編集はここで行う
 * app_definition: id, title, description, cost, category
 */

import type { Card } from '../types/card'

export const CARDS: Card[] = [
  {
    id: 'card-1',
    title: '地元の商店街を全店舗買い上げ',
    description: '地域の顔として街を盛り上げる',
    cost: 5_000_000_000,
    category: 'community',
    imageUrl: `${import.meta.env.BASE_URL}images/image_01.png`,
  },
  {
    id: 'card-2',
    title: '宇宙旅行',
    description: '民間宇宙船で地球を眺める',
    cost: 500_000_000,
    category: 'experience',
    imageUrl: `${import.meta.env.BASE_URL}images/image_02.png`,
  },
  {
    id: 'card-3',
    title: '世界一の豪邸を建設',
    description: '庭にプライベートジェット用滑走路付き',
    cost: 10_000_000_000,
    category: 'experience',
    imageUrl: `${import.meta.env.BASE_URL}images/image_03.png`,
  },
  {
    id: 'card-4',
    title: '再生可能エネルギー会社に出資',
    description: '脱炭素のインフラを支える',
    cost: 3_000_000_000,
    category: 'investment',
    imageUrl: `${import.meta.env.BASE_URL}images/image_04.png`,
  },
  {
    id: 'card-5',
    title: '美術館を建てて名画を寄贈',
    description: '無料開放で文化振興',
    cost: 2_000_000_000,
    category: 'community',
    imageUrl: `${import.meta.env.BASE_URL}images/image_05.png`,
  },
  {
    id: 'card-6',
    title: '全世界の株・債券に分散投資',
    description: '資産を守りながら増やす',
    cost: 8_000_000_000,
    category: 'asset',
    imageUrl: `${import.meta.env.BASE_URL}images/image_06.png`,
  },
  {
    id: 'card-7',
    title: '南の島で1年間バカンス',
    description: 'スタッフ付きプライベート島',
    cost: 1_000_000_000,
    category: 'experience',
    imageUrl: `${import.meta.env.BASE_URL}images/image_07.png`,
  },
  {
    id: 'card-8',
    title: 'スタートアップへの投資ファンド',
    description: '若い挑戦者を100社支援',
    cost: 4_000_000_000,
    category: 'investment',
    imageUrl: `${import.meta.env.BASE_URL}images/image_08.png`,
  },
]
