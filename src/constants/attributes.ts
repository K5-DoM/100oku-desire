/**
 * プレイ前入力用の選択肢
 * BACKEND_DESIGN: 年齢・性別・所在地
 */

import type { AgeGroup, Gender } from '../types/game'

export const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: '10代', label: '10代' },
  { value: '20代', label: '20代' },
  { value: '30代', label: '30代' },
  { value: '40代', label: '40代' },
  { value: '50代', label: '50代' },
  { value: '60代以上', label: '60代以上' },
  { value: '未回答', label: '未回答' },
]

export const GENDERS: { value: Gender; label: string }[] = [
  { value: '男性', label: '男性' },
  { value: '女性', label: '女性' },
  { value: 'その他', label: 'その他' },
  { value: '答えたくない', label: '答えたくない' },
  { value: '未回答', label: '未回答' },
]

export const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
] as const

export const LOCATION_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: '未回答' },
  ...PREFECTURES.map((p) => ({ value: p, label: p })),
]
