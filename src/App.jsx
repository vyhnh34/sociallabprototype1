import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Greeting from './components/Greeting.jsx'
import Message from './components/Message.jsx'
import Composer from './components/Composer.jsx'
import ThemeControl from './components/ThemeControl.jsx'
import { ChatGPTMark, Spark } from './components/icons.jsx'
import { DEFAULT_MODEL, DEFAULT_MODELS, MODEL_GROUPS, respond } from './data.js'

const AgentationTool = lazy(() => import('agentation').then((module) => ({ default: module.Agentation })))
const InterfaceKitTool = lazy(() => import('interface-kit/react').then((module) => ({ default: module.InterfaceKit })))

export default function App() {
  const [messages, setMessages] = useState([]) // { id, role, text|null }
  const [model, setModel] = useState(DEFAULT_MODEL)
  const [productTheme, setProductTheme] = useState('claude')
  const [colorMode, setColorMode] = useState('light')
  const [tools, setTools] = useState({
    agentation: false,
    interfaceKit: false,
  })
  const mainRef = useRef(null)
  const idRef = useRef(0)

  const isConversation = messages.length > 0
  const nextId = () => ++idRef.current
  const productName = productTheme === 'chatgpt' ? 'ChatGPT' : 'Claude'
  const BrandMark = productTheme === 'chatgpt' ? ChatGPTMark : Spark
  const greetingText = productTheme === 'chatgpt' ? "What's on the agenda today?" : 'How can I help you today?'
  const placeholder = isConversation ? `Reply to ${productName}...` : `Message ${productName}`
  const modelOptions = MODEL_GROUPS[productTheme]

  // Apply appearance settings to <html> so the CSS tokens switch.
  useEffect(() => {
    document.documentElement.setAttribute('data-product-theme', productTheme)
    document.documentElement.setAttribute('data-color-mode', colorMode)
  }, [productTheme, colorMode])

  useEffect(() => {
    if (!modelOptions.some((option) => option.id === model)) {
      setModel(DEFAULT_MODELS[productTheme])
    }
  }, [model, modelOptions, productTheme])

  // Keep the latest message in view.
  useEffect(() => {
    const el = mainRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  async function handleSend(text) {
    const typingId = nextId()
    // Add the user turn + an empty assistant turn (renders the typing dots).
    setMessages((m) => [
      ...m,
      { id: nextId(), role: 'user', text },
      { id: typingId, role: 'assistant', text: null },
    ])

    const modelName = modelOptions.find((m) => m.id === model)?.name
    const reply = await respond(text, { model: modelName })

    // Replace the placeholder assistant turn with the real reply.
    setMessages((m) => m.map((msg) => (msg.id === typingId ? { ...msg, text: reply } : msg)))
  }

  function handleToolChange(tool, enabled) {
    setTools((current) => ({ ...current, [tool]: enabled }))
  }

  function copyAgentationOutput(output) {
    if (!output) return

    const textarea = document.createElement('textarea')
    textarea.value = output
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '0'
    document.body.appendChild(textarea)
    textarea.select()

    let copied = false
    try {
      copied = document.execCommand('copy')
    } finally {
      document.body.removeChild(textarea)
    }

    if (!copied && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(output).catch((error) => {
        console.warn('[agentation] copy failed', error)
      })
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <BrandMark className="spark" style={{ width: 20, height: 20 }} />
          <span>{productName}</span>
        </div>
      </header>

      <main className="main" ref={mainRef}>
        <div className={`column${isConversation ? '' : ' is-empty'}`}>
          {!isConversation && <Greeting productTheme={productTheme} text={greetingText} />}

          {isConversation && (
            <section className="messages" aria-live="polite">
              {messages.map((m) => (
                <Message
                  key={m.id}
                  role={m.role}
                  text={m.text}
                  productTheme={productTheme}
                  productName={productName}
                />
              ))}
            </section>
          )}

          <div className={`composer-wrap${isConversation ? ' docked' : ''}`}>
            <Composer
              model={model}
              models={modelOptions}
              onModelChange={setModel}
              onSend={handleSend}
              placeholder={placeholder}
              productName={productName}
              productTheme={productTheme}
              onAttach={() => console.log('[attach] open file picker')}
            />
            {!isConversation && (
              <p className="hint">{productName} can make mistakes. This is a prototype - replies are simulated.</p>
            )}
          </div>
        </div>
      </main>

      <ThemeControl
        productTheme={productTheme}
        colorMode={colorMode}
        tools={tools}
        onProductThemeChange={setProductTheme}
        onColorModeChange={setColorMode}
        onToolChange={handleToolChange}
      />

      <Suspense fallback={null}>
        {tools.agentation && <AgentationTool copyToClipboard={false} onCopy={copyAgentationOutput} />}
        {tools.interfaceKit && <InterfaceKitTool enabled />}
      </Suspense>
    </div>
  )
}
