# Social Lab — Input Field Prototype

A faithful recreation of the Claude chat **composer** (the input field), with a
minimal chat area around it — built in **React + Vite** as a base for
interaction experiments.

## Project context

- `PROJECT.md` contains the product and interaction design brief.
- `AGENTS.md` contains collaboration instructions for coding agents.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (production bundle → `dist/`), `npm run preview`
(serve the build).

## What's included

- **New-chat state** — centered spark + serif greeting + composer.
- **Conversation state** — user bubbles, assistant replies with the spark
  avatar, a typing indicator, and the composer docked to the bottom.
- **The composer** — auto-growing textarea, attach (`+`) and Tools buttons, a
  working model picker, and a send button that turns coral when there's text.
- **Responsive** — adapts for desktop and mobile (iOS-safe, no input zoom).
- **Light & dark themes** — toggle in the top-right; all colors are CSS tokens.

## Project structure

```
src/
  main.jsx                 app entry
  App.jsx                  state: messages, model, theme
  data.js                  MODELS list + respond() — the API stub
  styles.css               design tokens + all styling
  components/
    Composer.jsx           ◀ the input field (the focus of this repo)
    ModelPicker.jsx        model dropdown
    Message.jsx            user / assistant turn + typing indicator
    Greeting.jsx           new-chat welcome
    icons.jsx              inline SVG icon set + Claude spark
```

## Where to build your interactions

| What | Where |
|------|-------|
| The input field itself | `src/components/Composer.jsx` |
| Send / message flow | `handleSend()` in `src/App.jsx` |
| Fake assistant reply | `respond()` in `src/data.js` — swap for a real API |
| Colors & theme | `:root` / `[data-theme="dark"]` in `src/styles.css` |
| Model list | the `MODELS` array in `src/data.js` |

> Replies are simulated. `respond()` resolves a canned line after a short delay —
> replace its body with a `fetch()` to wire up a real backend.
