// ─────────────────────────────  Versions  ────────────────────────────────
// Each interaction experiment is a "version" you can switch between live from
// the gear panel — no branches to juggle. To add a new version:
//   1. add an entry here,
//   2. gate its behaviour in the app on `version === '<id>'`.
//
// `template` is the clean base (plain composer, no extra interaction).

export const VERSIONS = [
  { id: 'template',      label: 'Template',      desc: 'Plain composer — the base' },
  { id: 'privacy-grade', label: 'Privacy grade', desc: 'Live privacy grading + highlights' },
  { id: 'privacy-color', label: 'Privacy color', desc: 'Same signal, color only — no letter' },
]

export const DEFAULT_VERSION = 'privacy-grade'
