// ─────────────────────────  Models (placeholder data)  ─────────────────────
export const CLAUDE_MODELS = [
  { id: 'opus-4-8',   name: 'Opus 4.8',   note: 'Most capable for complex work' },
  { id: 'sonnet-4-6', name: 'Sonnet 4.6', note: 'Smart, fast — everyday default' },
  { id: 'haiku-4-5',  name: 'Haiku 4.5',  note: 'Fastest for lightweight tasks' },
]

export const OPENAI_MODELS = [
  { id: 'gpt-5.5',      name: 'GPT-5.5',      note: 'Best for complex reasoning and coding', badge: 'Smartest' },
  { id: 'gpt-5.4',      name: 'GPT-5.4',      note: 'Strong everyday model for professional work', badge: 'Balanced' },
  { id: 'gpt-5.4-mini', name: 'GPT-5.4 mini', note: 'Faster model for lightweight work', badge: 'Fast' },
  { id: 'gpt-5.4-nano', name: 'GPT-5.4 nano', note: 'Smallest, lowest-latency option', badge: 'Quick' },
]

export const MODEL_GROUPS = {
  claude: CLAUDE_MODELS,
  chatgpt: OPENAI_MODELS,
}

export const DEFAULT_MODELS = {
  claude: 'sonnet-4-6',
  chatgpt: 'gpt-5.5',
}

export const DEFAULT_MODEL = DEFAULT_MODELS.claude

/*
  Simulated assistant reply.
  ▸ Swap the body of this function for a real fetch() to your API.
  ▸ It resolves with the reply text after a short "thinking" delay so the
    caller can show a typing indicator in the meantime.
*/
export function respond(userText, { model } = {}) {
  const reply =
    `This is a simulated reply from ${model ?? 'Claude'}. You said: “${userText}”.\n\n` +
    `Hook your interaction logic into respond() in src/data.js to make this real.`

  return new Promise((resolve) => {
    setTimeout(() => resolve(reply), 900)
  })
}
