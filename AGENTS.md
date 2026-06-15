# Agent Instructions

## Who You Are Helping

Harshit is a product designer with no programming, software development, or coding knowledge.

When explaining work:

- Use plain language.
- Avoid technical jargon unless you explain it simply.
- Prefer doing the technical work directly instead of giving instructions.
- If Harshit must do something, give short step-by-step instructions.
- Explain decisions in terms of product, design, and collaboration outcomes.

## Project Context

This repo is for a React prototype called SocialLab Input Field Prototype.

The prototype explores a smart input field that uses LLM-style suggestions to help users write, rewrite, and review text while protecting privacy.

This is an interaction design prototype first. Optimize for speed, clarity, visual polish, and easy iteration.

## Current Product Goals

- Custom input field.
- LLM-style functionality.
- Highlight UI options.
- Tap and interact behavior.
- Color indication.
- Clear meaning for each color or highlight type.
- Rewrite and suggestion flows.
- Privacy protection before text is sent to an AI service.

## Preferred Direction

When code is added later, prefer:

- React.
- Vite.
- Tailwind CSS.
- Motion or Framer Motion.
- Interface Craft patterns for animation, tuning, and critique.
- Mock data and mock LLM responses before real AI calls.

Avoid starting with a complicated backend. The first version should be a fast, local prototype.

## Interface Craft Guidance

This project is intended to work well with Interface Craft.

Use Interface Craft ideas when building animated or polished interactions:

- Keep animations readable and named clearly.
- Make timing, spacing, color, and motion easy to tune.
- Prefer stage-based interaction flows for complex moments.
- Use tuning controls when exploring design values.
- Keep repeated UI elements data-driven instead of duplicated by hand.

## Design Decisions Already Chosen

- Start with a local React prototype, not a production app.
- Use mock LLM behavior first.
- Treat privacy review as a core interaction, not an afterthought.
- Use red only for privacy risk or sensitive text that needs review.
- Keep the first milestone to one strong interactive screen.

## Working Highlight Color Meanings

- Green: safe or protected.
- Yellow: writing suggestion.
- Blue: context or clarity help.
- Purple: rewrite option.
- Red: privacy risk or sensitive text.
- Gray: dismissed or inactive suggestion.

These are starting choices. If user testing shows confusion, update `PROJECT.md`.

## How Agents Should Work Here

- Read `PROJECT.md` before making product or interface decisions.
- Do not add unnecessary setup, libraries, or folders.
- Keep the prototype easy to run and easy to change.
- Prefer clear file names and small focused components.
- Explain what changed in plain English after each task.
- Do not connect real LLM APIs until Harshit explicitly asks.
- Do not send user-entered text to any external service without an explicit privacy decision.
- When making visual changes, verify the prototype in a browser when possible.

## First Build Recommendation

When Harshit asks to start building, create a Vite React app in this folder and make the first screen:

- A polished custom input field.
- Mock highlighted text.
- Clickable/tappable highlights.
- Popovers with privacy or rewrite actions.
- A small design control panel for highlight modes and colors.
- No real backend and no real AI calls yet.

