# 100oku Desire 簡易バックエンド設計

ノートPCをサーバーとして運用し、簡易分析画面に実データを表示するためのバックエンド設計書。実装は別タスクとする。

---

## 1. 目的・スコープ

* GitHub Pages では集計が難しいため、ノートPCを簡易サーバーとして運用する。
* 簡易分析画面で、送信されたプレイデータを集計した実データを表示する。
* アカウント作成・ログインは行わない。1 プレイ = 1 件の匿名レコードとして送信・保存する。

---

## 2. プレイ前入力（属性）

開始画面と選択画面の間に「属性入力」画面を挟む（または開始画面に統合）。**スキップ可能**とする。

| 項目   | 仕様概要 |
|--------|----------|
| 年齢   | 例: 10代 / 20代 / 30代 / 40代 / 50代 / 60代以上 / 未回答。スキップ時は「未回答」。 |
| 性別   | 例: 男性 / 女性 / その他 / 答えたくない。スキップ時は「未回答」。 |
| 所在地 | 例: 都道府県の選択、または「未回答」。スキップ可。 |

---

## 3. プレイ後送信データ（1 リクエスト = 1 プレイ）

サーバーに送るペイロード（JSON）の例:

* **属性**: `ageGroup`, `gender`, `location`（いずれもスキップ時は `null` または `"未回答"`）
* **選択結果**: `selectedCardIds`（string[]）, `categoryScores`（CategoryScores）, `result`（ResultType）
* **任意**: `balance`（最終残高）, `submittedAt`（送信日時・クライアント or サーバーで付与）

フロントの既存型 `CategoryScores`（`src/types/game.ts`）、`ResultType`（`src/types/result.ts`）と整合する形で定義する。

### 送信データ例（JSON）

```json
{
  "ageGroup": "20代",
  "gender": "男性",
  "location": "東京都",
  "selectedCardIds": ["card-1", "card-4", "card-7"],
  "categoryScores": { "community": 2, "investment": 1, "experience": 1 },
  "result": "community-builder",
  "balance": 91000000000,
  "submittedAt": "2025-03-05T12:00:00.000Z"
}
```

---

## 4. データモデル（サーバー側）

* **プレイレコード**: 上記の送信データをそのまま 1 件ずつ保存する想定。
* **永続化**: 実装コストを抑えるため、JSON ファイルまたは SQLite を想定。

### 永続化の選択肢

**A. 1 ファイルに全件配列（JSON）**

* 例: `data/plays.json` に `PlayRecord[]` を保存。起動時に読み込み、POST 時に追記して書き戻す。

**B. SQLite 1 テーブル**

* 例: `plays` テーブル
  * `id` (主キー), `age_group`, `gender`, `location`, `selected_card_ids` (JSON 文字列), `category_scores` (JSON 文字列), `result`, `balance`, `submitted_at`

---

## 5. API 仕様

### POST /api/play

* 1 プレイ分のデータ（属性 + 選択カード + 診断結果）を受け取り、保存する。
* 認証なし。
* レスポンス: 201 + 簡易メッセージ（例: `{ "ok": true, "message": "saved" }`）。
* バリデーション: 必須項目（`selectedCardIds`, `categoryScores`, `result`）が欠けている場合は 400 を返す。

### GET /api/analytics

* 保存済みプレイを集計し、簡易分析画面で必要な形式で返す。
* 返却形式はフロントの `src/data/analyticsMock.ts` の構造に合わせる:
  * `categoryRates`: `{ categoryId, label, rate }[]`
  * `communityPickRate`: number
  * `popularCards`: `{ rank, title, pickCount }[]`
* フロントは `analyticsMock` をそのまま API レスポンスに差し替えるだけで実データ表示が可能になる。

### 任意エンドポイント

* **GET /api/health**: 死活確認。200 + `{ "status": "ok" }` など。
* **GET /api/stats**: 集計件数のみ返す。例: `{ "totalPlays": 42 }`。

---

## 6. 集計ロジック（GET /api/analytics）

* **カテゴリ別人気率**: 全プレイの `categoryScores` を合算し、カテゴリごとの選択回数 ÷ 総選択回数で `rate`（0〜1）を算出。ラベルはフロントのカテゴリ名と一致させる（例: `community` → 「地域貢献」）。カテゴリ ID とラベルの対応は `src/types/card.ts` の `CardCategory` および分析画面の表示に合わせる。
* **地域貢献系の選択率**: 上記の「地域貢献」カテゴリの `rate` をそのまま `communityPickRate` とする。
* **人気カードランキング**: 全プレイの `selectedCardIds` を集計し、カード ID ごとの採用回数でソート。上位 N 件（例: 5 件）を返す。カード `title` はサーバーにカードマスタのコピーを保持するか、フロントの `src/data/cards.ts` と ID で対応する。設計上は「サーバーにカードマスタのコピーを保持」を推奨し、GET /api/analytics のレスポンスに `title` を含めて返す。

---

## 7. その他の機能要件

* **CORS**: GitHub Pages 上のフロントからノートPCのサーバーにアクセスするため、バックエンドで CORS を許可する（例: オリジン指定、または開発用に `*`）（ブラウザとサーバがgithubを噛まず直接通信することに留意が必要。同じLAN内であればルータのIPアドレス指定で可能）
* **エラー時フォールバック**: フロントは API 失敗時は従来どおり `analyticsMock` を表示する（デモ・オフライン時も動作させるため）。
* **送信タイミング**: 結果画面表示後、ユーザーが「分析画面を見る」または「もう一度遊ぶ」の前に 1 回送信する。
* **プライバシー**: 個人を特定しない匿名集計であること。年齢・性別・所在地は集計・絞り込み用であり、保存形式も最小限にする。
* **運用**: ノートPCでサーバーを起動する手順を用意する。例: ポート（例: 3001）、ローカルネット内の IP で待ち受け。フロントの API ベース URL は環境変数などで切り替え可能にし、本番（GitHub Pages）では未設定なら送信・分析取得を行わず固定データ表示とする。

---

## 8. 技術スタック案（記載のみ）

* **推奨例**: Node.js + Express と JSON ファイル（`data/plays.json`）。または Python + FastAPI と SQLite。
* 実装は本設計の範囲外。上記は「推奨例」として記載する。
