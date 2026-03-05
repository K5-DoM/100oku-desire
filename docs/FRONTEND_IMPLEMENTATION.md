# フロントエンド実装ガイド（100oku Desire）

## 推奨ディレクトリ構成

```
src/
├── app/                    # アプリルート
│   ├── App.tsx             # ルートコンポーネント（画面切り替え）
│   └── providers/          # プロバイダ（必要なら）
├── components/
│   ├── common/             # 共通UI
│   │   ├── Button.tsx
│   │   ├── ScreenContainer.tsx
│   │   └── ProgressBar.tsx
│   ├── game/               # 選択画面用
│   │   ├── BalanceHeader.tsx
│   │   ├── ChoiceCard.tsx
│   │   ├── ChoiceActions.tsx
│   │   └── CategoryBadge.tsx
│   └── result/             # 結果画面用
│       ├── ResultSummary.tsx
│       ├── ResultBreakdown.tsx
│       └── SharePanel.tsx
├── screens/
│   ├── StartScreen.tsx     # 1. Start
│   ├── GameScreen.tsx      # 2. Play
│   ├── ResultScreen.tsx    # 3. Result
│   └── AnalyticsScreen.tsx # 4. Analytics(デモ)
├── hooks/
│   └── useGameState.ts     # ゲーム状態（useReducer 的役割）
├── data/
│   ├── cards.ts            # カードマスタ（ダミー含む）
│   └── analyticsMock.ts    # 分析画面用固定データ
├── constants/
│   ├── copy.ts             # 画面文言
│   └── game.ts             # 初期残高・ストレージキー
├── types/
│   ├── card.ts
│   ├── game.ts
│   └── result.ts
├── utils/
│   ├── currency.ts
│   ├── result.ts           # 診断ロジック
│   └── storage.ts          # localStorage
├── styles/
│   └── animations.css
├── index.css
└── main.tsx
```

- **短期で読みやすい**ことを最優先。画面ごとに `screens/`、用途ごとに `components/` を分割。
- 状態は `useGameState` に集約し、複雑な状態管理ライブラリは使わない。
- 画像は `public/` または `src/assets/` に配置し、カードデータの `imageUrl` 等で参照可能にする。

---

## 実行手順

### 1. 依存関係のインストール

```bash
npm install
```

追加済みの主な依存関係:

- **tailwindcss** / **@tailwindcss/vite** … スタイル（Vite プラグインで有効化済み）
- **framer-motion** … カードのスワイプ風・出現アニメーション
- **lucide-react** … アイコン
- **recharts** … 分析画面のグラフ風UI

※ PostCSS / autoprefixer は Tailwind v4 の Vite プラグインに含まれるため、別途設定不要。

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで表示される URL（例: `http://localhost:5173`）を開く。

### 3. ビルド・プレビュー

```bash
npm run build
npm run preview
```

---

## 画面とやるべきこと（チェックリスト）

| 画面 | 要点 | 状態 |
|------|------|------|
| **Start** | タイトル・残高100億・説明・開始ボタン、リッチなファーストビュー | 実装済み（リッチ化済み） |
| **Play** | カード1枚（title/desc/cost/category）・残高固定表示・YES/NO＋アニメ | 実装済み（リッチ化済み） |
| **Result** | タイプ診断・残高・カテゴリ内訳・シェア文コピー・リスタート | 実装済み（リッチ化済み） |
| **Analytics** | 固定データでグラフ風UI（カテゴリ人気率・地域貢献率・人気カード） | 実装済み（Recharts 利用） |

### リッチ感の実装方針

- スマホ縦長レイアウト（中央にカード、上にヘッダー）
- ガラス / グラデ / 影 / ぼかしで「今っぽい」雰囲気
- 触った時の気持ちよさ（微アニメ・トランジション・数値変化）
- 実装はシンプルに保ち、壊れにくく

### 今後の拡張（任意）

- カードに `imageUrl` を追加し、画像表示
- 効果音（採用/却下）
- 結果画面の SNS シェア導線強化
- localStorage 永続化（`utils/storage.ts` を利用）

---

## 主要ファイル一覧

| 種類 | ファイル | 役割 |
|------|----------|------|
| エントリ | `main.tsx` | React マウント、`app/App` を読み込み |
| ルート | `app/App.tsx` | 画面状態に応じて Start/Game/Result/Analytics を出し分け |
| 状態 | `hooks/useGameState.ts` | 残高・選択カード・診断結果・画面遷移 |
| データ | `data/cards.ts` | カードマスタ（ダミー同梱。画像は別途用意） |
| データ | `data/analyticsMock.ts` | 分析画面用固定データ |
| ストレージ | `utils/storage.ts` | localStorage の読み書き（任意利用） |
| 設定 | `vite.config.ts` | Vite + React + Tailwind プラグイン |
| スタイル | `src/index.css` | `@import "tailwindcss"` とグローバル基底 |

---

## ダミーカードデータについて

`src/data/cards.ts` に最低限のダミーカードを同梱済みです。  
`id`, `title`, `description`, `cost`, `category` を編集・追加してください。画像は `public/cards/` などに配置し、必要に応じてカード型に `imageUrl` を追加して表示してください。
