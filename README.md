# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# HowtoSetup
## Setup

### Requirements
- Node.js 20+
- npm
- Git

### Install
```bash
git clone https://github.com/K5-DoM/100oku-desire.git
cd 100oku-desire
npm install
```

### 開発サーバー・ビルド
```bash
npm run dev    # 開発サーバー起動（例: http://localhost:5173）
npm run build  # 本番ビルド
npm run preview # ビルドのプレビュー
```

フロントエンドの詳細（推奨ディレクトリ構成・画面一覧・リッチ化のポイント）は [docs/FRONTEND_IMPLEMENTATION.md](docs/FRONTEND_IMPLEMENTATION.md) を参照。

### 簡易バックエンド（任意）

分析画面に実データを表示する場合は、別ターミナルでサーバーを起動する。

```bash
cd server
npm install
npm run start   # または npm run dev（--watch）
```

デフォルトで `http://localhost:3001` で待ち受ける。フロントから API を利用するには、プロジェクトルートに `.env` を作成し、次を設定する。

```
VITE_API_BASE_URL=http://localhost:3001
```

同一 LAN 内の他端末からアクセスする場合は、PC の IP を指定する（例: `VITE_API_BASE_URL=http://192.168.1.10:3001`）。  
未設定の場合はプレイ送信・分析取得を行わず、分析画面は従来どおり固定データを表示する。詳細は [docs/BACKEND_DESIGN.md](docs/BACKEND_DESIGN.md) を参照。

# about
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
