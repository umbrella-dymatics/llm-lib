# Contributing to llm-lib

First of all: **imperfect contributions are welcome**.

`llm-lib` does not aim to be complete or perfectly curated.
Its goal is to make LLM-relevant context **discoverable and reusable**.

---

## What you can contribute

You can contribute at **three different levels**:

### 1. Raw context (most welcome)

- Existing `llm-full.txt`, `llm.md`, or similar files
- Near-original documentation excerpts
- Specifications intended for LLM usage

Minimal requirements:

- Clear source
- No intentional semantic modification
- UTF-8 encoded

---

### 2. Metadata / adapters (very valuable)

Without touching the original content, you may add:

- `llm.yaml`
- Profile mappings (`full`, `lite`, `standard`)
- File slicing or intent description

This is often more useful than rewriting documentation.

---

### 3. Curated content (optional)

- High-value summaries
- Carefully edited LLM-first context
- Explicitly marked as curated

Curated content is **not expected to scale**.

---

## Directory rules (strict)

All artifacts must follow this structure:

```
docs/@scope/name/
```

Rules:

- `@scope` is required
- Only two directory levels are allowed
- Do not nest artifacts

---

## Do NOT worry about

- Token optimization
- Prompt composition
- Model compatibility
- Perfect formatting
- Validation errors

This project intentionally avoids strict schema enforcement.

---

## About licenses and sources

If you are unsure about licensing:

- Prefer linking instead of copying
- Or mark the artifact as `standard`
- Add source information if available
- **Tip:** Point `source.origin` to the global documentation root/index, not a specific file url.

Example:

```yaml
source:
  origin: "https://example.com/docs"
```

---

## Pull request philosophy

- Small PRs are better than perfect PRs
- Raw is better than missing
- Metadata is better than rewriting
- Discussion is encouraged

If in doubt, submit the PR anyway.
