# SocialLab Input Field Prototype

## What We Are Making

This is a React prototype for a smart writing input field.

The goal is to explore how an input box can help someone write better while protecting their privacy. The input should feel interactive, visual, and easy to understand, not like a plain chatbot.

The prototype is for interaction design first. It should help us test:

- How words or phrases get highlighted.
- What each highlight color means.
- How someone taps, selects, accepts, ignores, rewrites, or edits suggestions.
- How privacy-sensitive text is detected and protected.
- How LLM-powered rewrites or suggestions can appear without feeling intrusive.

## Core Prototype Features

- Custom input field with rich text-like behavior.
- LLM-style suggestions for rewriting, improving, or clarifying text.
- Highlight UI for selected words, phrases, privacy risks, and suggestions.
- Tap/click interactions for each highlighted region.
- Color indications that are clear, consistent, and easy to learn.
- A suggestion layer that can show rewrite options without replacing the user's text too aggressively.
- Privacy-first behavior that makes it obvious what might be sensitive before anything is sent to an AI service.

## Working Color Meanings

These are starting decisions for prototyping. We can change them after testing.

- Green: safe or already protected.
- Yellow: writing suggestion or possible improvement.
- Blue: context, clarity, or helpful explanation.
- Purple: rewrite option or alternate phrasing.
- Red: privacy risk, sensitive detail, or text that should not be sent without review.
- Gray: ignored, dismissed, or inactive suggestion.

The most important rule: red must always mean "pause and review before sharing."

## Product Principles

- Privacy first: the interface should clearly show what is sensitive before the user takes action.
- User stays in control: suggestions should never feel like they took over the writing.
- Fast to prototype: choose tools that make it easy to change visuals, motion, and interaction details.
- Easy to collaborate: files should be named clearly and separated by purpose.
- Interaction quality matters: highlights, popovers, transitions, and accepted suggestions should feel polished.
- Avoid overbuilding: this is a prototype, not a production app.

## Recommended Technical Direction

When we are ready to write code, use:

- React for the interface.
- Vite for a fast local prototype setup.
- TypeScript if it does not slow the team down; otherwise plain React is acceptable.
- Tailwind CSS for fast visual iteration.
- Motion or Framer Motion for polished interaction transitions.
- Interface Craft patterns for animations and tuning.
- DialKit-style controls for quickly adjusting highlight colors, timing, spacing, and motion while designing.

This keeps the project fast, visual, and easy to change during design exploration.

## Privacy Direction

The prototype should assume that text may contain sensitive personal information.

Before any LLM call is added, the prototype should support a local "review first" flow:

1. User types text.
2. The interface detects and highlights likely sensitive text.
3. The user can inspect the highlight.
4. The user chooses whether to remove, mask, rewrite, or allow it.
5. Only approved text should be treated as safe to send.

For early prototypes, privacy detection can be simulated with sample rules and mock LLM responses. That is better for interaction design because it is faster and safer.

## Suggested First Milestone

Build a single-screen prototype with:

- A large custom input field.
- Sample text already inside it.
- Several highlighted words and phrases.
- Tap/click popovers for each highlight.
- A small control panel to switch between privacy review, rewrite suggestions, and highlight settings.
- Mock suggestions, not real AI calls.

This gives us something visual and interactive before adding real LLM behavior.

## Collaboration Notes

Jonathan and Harshit should use this file as the project brief.

Future decisions should be added here when they affect the product direction, interaction model, color meanings, privacy model, or prototyping stack.

