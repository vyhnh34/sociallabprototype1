import { useEffect, useRef, useState } from 'react'
import ModelPicker from './ModelPicker.jsx'
import { Plus, ArrowUp } from './icons.jsx'
import { analyze } from '../privacy.js'

/*
  Turn the draft text + its privacy findings into highlighted nodes for the
  backdrop layer. Returns the plain string when there's nothing to highlight.
*/
function renderHighlights(text, findings) {
  if (!findings?.length) return text
  const nodes = []
  let i = 0
  findings.forEach((f, k) => {
    if (f.start > i) nodes.push(text.slice(i, f.start))
    nodes.push(<mark key={k} className={`hl ${f.severity}`}>{text.slice(f.start, f.end)}</mark>)
    i = f.end
  })
  nodes.push(text.slice(i))
  return nodes
}

/*
  The composer — the heart of this prototype.
  Owns the draft text, auto-grows the textarea, runs the live privacy analysis,
  and paints the matching terms behind the text. Build input-field interactions here.
*/
export default function Composer({
  model,
  models,
  onModelChange,
  onSend,
  onPrivacyChange,
  privacyEnabled = false,
  placeholder = 'How can I help you today?',
  productName = 'Claude',
  productTheme = 'claude',
  onAttach,
}) {
  const [text, setText] = useState('')
  const taRef = useRef(null)
  const backdropRef = useRef(null)
  const hasText = text.trim().length > 0

  // Privacy analysis is debounced: while the user is typing we surface an
  // "analyzing" state, and only settle on a grade ~0.8s after they pause.
  const [status, setStatus] = useState('idle')   // 'idle' | 'analyzing' | 'ready'
  const [result, setResult] = useState(null)

  // Auto-grow the textarea to fit its content (up to the CSS max-height).
  useEffect(() => {
    const ta = taRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 220) + 'px'
  }, [text])

  // Run (debounced) analysis whenever the draft changes — only when the
  // active version uses it. The template version skips analysis entirely.
  useEffect(() => {
    if (!privacyEnabled || !text.trim()) { setStatus('idle'); setResult(null); return }
    setStatus('analyzing')
    const id = setTimeout(() => {
      setResult(analyze(text))
      setStatus('ready')
    }, 800)
    return () => clearTimeout(id)
  }, [text, privacyEnabled])

  // Report status + result upward so the privacy nudge can render it.
  useEffect(() => { onPrivacyChange?.({ status, analysis: result }) }, [status, result, onPrivacyChange])

  // Keep the highlight backdrop scrolled in lockstep with the textarea.
  function syncScroll() {
    const ta = taRef.current
    const bd = backdropRef.current
    if (ta && bd) { bd.scrollTop = ta.scrollTop; bd.scrollLeft = ta.scrollLeft }
  }

  function submit(e) {
    e?.preventDefault()
    if (!hasText) return
    onSend(text.trim())
    setText('')
  }

  // Enter sends, Shift+Enter inserts a newline.
  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form className="composer" onSubmit={submit} autoComplete="off">
      <div className="input-wrap">
        <div className="highlight-backdrop input-layer" ref={backdropRef} aria-hidden="true">
          {renderHighlights(text, status === 'ready' ? result?.findings : null)}
        </div>
        <textarea
          ref={taRef}
          className="input-layer"
          rows={1}
          value={text}
          placeholder={placeholder}
          aria-label={`Message ${productName}`}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          onScroll={syncScroll}
        />
      </div>

      <div className="toolbar">
        {/* Left: attach */}
        <div className="group">
          <button type="button" className="tool circle" title="Attach" aria-label="Attach" onClick={onAttach}>
            <Plus />
          </button>
        </div>

        {/* Right: model picker + send */}
        <div className="group">
          <ModelPicker
            model={model}
            models={models}
            onChange={onModelChange}
            productName={productName}
            productTheme={productTheme}
          />
          <button
            type="submit"
            className={`send${hasText ? ' active' : ''}`}
            title="Send"
            aria-label="Send message"
            disabled={!hasText}
          >
            <ArrowUp />
          </button>
        </div>
      </div>
    </form>
  )
}
