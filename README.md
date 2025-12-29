# llm-lib

**A minimal, filesystem-first library of LLM-ready context artifacts.**

`llm-lib` is a convention and collection for organizing documentation,
specifications, and SDK semantics in a way that is directly consumable
by Large Language Models (LLMs).

This project does **not** define how prompts are composed, injected,
or executed.  
It only defines **where LLM-relevant context lives, and how it is named**.

---

## What problem does this solve?

More and more SDKs, protocols, and platforms provide files like:

- `llm-full.txt`
- `llm.md`
- `llm-lite.md`

But today:

- There is no shared directory convention
- Naming is inconsistent (`full`, `lite`, `mini`, `raw`, ...)
- Files are hard to discover and reuse
- Agents and IDEs cannot reliably depend on them

`llm-lib` aims to be the **lowest common denominator**:
a place and a structure that tools and humans can both rely on.

---

## What this project IS

- A **repository of LLM context artifacts**
- A **directory and naming convention**
- A **lightweight metadata layer**
- A **collection of adapters** for existing documentation

---

## What this project is NOT

- ❌ A package manager
- ❌ A prompt framework
- ❌ A registry service
- ❌ An agent runtime
- ❌ A documentation mirror

---

## Directory structure

All artifacts live under `docs/`:

```
docs/
  └─ @scope/name/
      ├─ llm.yaml        (optional, recommended)
      ├─ llm-full.md
      ├─ llm-lite.md
      └─ llm.md
```

Rules:

- `@scope/name` is required
- Only two levels are allowed
- Deleting a directory fully removes the artifact

The filesystem is the source of truth.

---

## Artifact discovery

An artifact is considered valid if **any** of the following exists
inside its directory:

- `llm.yaml`
- `llm.md`
- `llm-*.md` or `llm-*.txt`

Priority order:

```
llm.yaml > llm.md > llm-*.md/txt
```

### Implicit Mapping (Zero-Config)

If `llm.yaml` is missing, files are automatically mapped:

| Filename | Profile |
|------|------|
| `llm-full.*` | `full` |
| `llm-lite.*` | `lite` |
| `llm.*` | `standard` |

---

## Profiles

`llm-lib` recognizes three reserved profile names:

| Profile | Meaning |
|------|------|
| `lite` | Tool usage, token-sensitive |
| `full` | Reasoning, design, agent context |
| `standard` | Near-original documentation (Baseline) |

Profiles are a **convention**, not a requirement.

---

## Metadata (optional)

Markdown files may include LLM metadata using YAML front matter:

```markdown
---
llm:
  name: "@openai/api"
  profile: full
  intent: "API usage and reasoning guidance"
---
```

Metadata improves machine usability but is **never required**.

---

## CLI (optional)

A minimal CLI named `llm-lib` may be used to download artifacts:

```bash
llm-lib add @openai/api
```

This simply copies files into the local `docs/` directory.
There is no install state, no lockfile, and no init step.

---

## Design principles

- Filesystem-first
- Human-readable by default
- LLM-consumable by convention
- Loose validation, strong naming
- Easy to delete, easy to fork

---

## License and attribution

This repository may contain references to, or adapted excerpts from,
third-party documentation for the purpose of LLM context usage.

Original ownership remains with the respective authors.
