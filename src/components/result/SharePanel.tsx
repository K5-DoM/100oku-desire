/**
 * シェア用テキスト表示・コピー
 * app_definition: 結果画面にシェア用文言を表示、文言をコピーできる
 */

import { useState } from 'react'
import { Copy, Check, Link, Share2 } from 'lucide-react'
import { RESULT_SCREEN } from '../../constants/copy'

interface SharePanelProps {
  shareText: string
  className?: string
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

// LINE公式シェアロゴ SVG
function LineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  )
}

export function SharePanel({ shareText, className = '' }: SharePanelProps) {
  const [textCopied, setTextCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const currentUrl = 'https://k5-dom.github.io/100oku-desire/'
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(currentUrl)

  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setTextCopied(true)
      setTimeout(() => setTextCopied(false), 2000)
    } catch {
      // フォールバック省略
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch {
      // フォールバック省略
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: '100oku Desire', text: shareText, url: currentUrl })
      } catch {
        // キャンセル等
      }
    } else {
      await handleCopyText()
    }
  }

  // Instagram は Web Share API 経由（モバイルのOSシェアシートでInstagramを選択できる）
  // デスクトップの場合はテキストをコピー
  const handleInstagram = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: '100oku Desire', text: shareText, url: currentUrl })
      } catch {
        // キャンセル等
      }
    } else {
      await handleCopyText()
    }
  }

  return (
    <section className={`rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-4 shadow-lg ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{RESULT_SCREEN.shareLabel}</h3>
      <p className="text-sm text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100 wrap-break-word mb-3">
        {shareText}
      </p>

      {/* SNS シェアボタン */}
      <div className="flex flex-wrap gap-2">
        {/* LINE */}
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm bg-[#06C755] text-white hover:bg-[#05b84d] transition-colors active:scale-[0.98]"
        >
          <LineIcon className="w-4 h-4" />
          LINE
        </a>

        {/* X (旧Twitter) */}
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm bg-black text-white hover:bg-gray-800 transition-colors active:scale-[0.98]"
        >
          <XIcon className="w-4 h-4" />
          X
        </a>

        {/* Instagram */}
        <button
          type="button"
          onClick={handleInstagram}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
        >
          <InstagramIcon className="w-4 h-4" />
          Instagram
        </button>

        {/* 共有する（OS ネイティブ共有） */}
        <button
          type="button"
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors active:scale-[0.98]"
        >
          <Share2 className="w-4 h-4" />
          共有する
        </button>

        {/* リンクをコピー */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors active:scale-[0.98]"
        >
          {linkCopied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
          {linkCopied ? 'コピーしました' : 'リンクをコピー'}
        </button>

        {/* テキストをコピー */}
        <button
          type="button"
          onClick={handleCopyText}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors active:scale-[0.98]"
        >
          {textCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {textCopied ? 'コピーしました' : 'テキストをコピー'}
        </button>
      </div>
    </section>
  )
}
