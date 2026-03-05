FROM node:22-alpine

WORKDIR /app

# 依存関係を先にインストールしてキャッシュを効かせる
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# アプリ本体をコピー
COPY . .

# 簡易バックエンドは PORT 環境変数でポートを切り替え可能
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "start"]

