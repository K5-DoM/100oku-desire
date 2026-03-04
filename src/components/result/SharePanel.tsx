/**
 * シェア用テキスト表示・コピー
 * app_definition: 結果画面にシェア用文言を表示、文言をコピーできる
 */

import { useState } from 'react'
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
    <section className={className}>
      <h3 className="text-sm font-medium text-gray-700 mb-2">{RESULT_SCREEN.shareLabel}</h3>
      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border break-words">
        {shareText}
      </p>
      <Button variant="secondary" className="mt-2" onClick={handleCopy}>
        {copied ? 'コピーしました' : 'コピー'}
      </Button>
    </section>
  )
}
