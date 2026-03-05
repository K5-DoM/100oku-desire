/**
 * シェア用テキスト表示・コピー
 * app_definition: 結果画面にシェア用文言を表示、文言をコピーできる
 */

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '../common/Button'
import { RESULT_SCREEN } from '../../constants/copy'

interface SharePanelProps {
  shareText: string
  className?: string
}

export function SharePanel({ shareText, className = '' }: SharePanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // フォールバック等は後で可
    }
  }

  return (
    <section className={`rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-4 shadow-lg ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{RESULT_SCREEN.shareLabel}</h3>
      <p className="text-sm text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100 break-words">
        {shareText}
      </p>
      <Button variant="secondary" className="mt-3 flex items-center gap-2" onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            コピーしました
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            コピー
          </>
        )}
      </Button>
    </section>
  )
}
