/**
 * 画面表示用の文言（B担当が編集しやすいように集約）
 * app_definition: タイトル・説明文・診断タイプのラベルなど
 */

export const APP_TITLE = '100oku Desire'

export const START_SCREEN = {
  title: '100oku Desire',
  balanceLabel: '残高：100億円',
  startButton: 'はじめる',
  description: 'もし100億円あったら、何に使う？ 選択で価値観の傾向がわかります。',
} as const

export const ATTRIBUTES_SCREEN = {
  title: 'あと少しでスタート',
  description: '匿名集計の参考にします。入力は任意で、スキップもできます。',
  ageLabel: '年齢',
  genderLabel: '性別',
  locationLabel: '所在地',
  skipButton: 'スキップしてはじめる',
  startButton: 'プレイ開始',
} as const

export const GAME_SCREEN = {
  acceptLabel: '採用する',
  rejectLabel: 'しない',
} as const

export const RESULT_SCREEN = {
  restartButton: 'もう一度遊ぶ',
  shareLabel: 'シェア用テキスト',
} as const

export const ANALYTICS_SCREEN = {
  title: '分析（デモ）',
  description: '匿名集計イメージ。企業向け活用の参考にできます。',
} as const
