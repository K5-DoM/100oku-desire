FROM cloudflare/cloudflared:latest

# config.yml のみコピー。credentials.json はリポジトリに含めず、実行時にボリュームマウントで渡す
COPY cloudflared/config.yml /etc/cloudflared/config.yml

CMD ["tunnel", "--config", "/etc/cloudflared/config.yml", "run"]
