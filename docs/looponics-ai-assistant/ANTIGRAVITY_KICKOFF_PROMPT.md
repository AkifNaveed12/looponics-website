# Antigravity Kickoff Prompt — Looponics AI Assistant

Copy the prompt below into Antigravity after opening the Looponics repository. Attach the UI reference screenshots/video and keep the architecture document available in the repository.

---

You are acting as a **senior software architect, senior full-stack engineer and cautious codebase maintainer**. We are adding a client-facing AI assistant to the existing Looponics website at `https://looponics.tech`.

## 1. Read the project specification first

Read and follow:

`docs/looponics-ai-assistant/LOOPONICS_AI_ASSISTANT_PLAN.md`

That document is the frozen architecture and six-phase implementation plan. Follow it exactly. Work on **Phase 1 — Core chatbot only** unless I explicitly approve another phase. Do not implement RAG, database schema, lead/support tools, Resend, security/evaluation phase work, voice, WhatsApp, Evolution API, MCP or advanced routing in Phase 1.

The frozen stack is:

- Node.js + TypeScript API.
- Supabase PostgreSQL + pgvector (Phase 2 onward).
- Curated Markdown + RAG (Phase 2 onward).
- Gemini Flash as the primary LLM candidate, benchmarked before final model selection.
- Groq as the secondary provider, introduced only as planned in later phases.
- Backend function registry for approved tools (Phase 3 onward).
- Resend email (Phase 3 onward).
- Groq Whisper speech-to-text (Phase 5).
- Official Meta WhatsApp Cloud API (Phase 6).
- Promptfoo evaluation (Phase 4).
- Vercel + Supabase deployment.

Do not replace these choices or introduce an enterprise-scale architecture without asking.

## 2. Highest priority: protect the existing website

The current website is already built and live. **Do not disturb its existing UI, styling, layout, content, navigation, animations, SEO, routing, DNS, redirects or deployment configuration.**

Before changing anything:

1. Inspect the complete repository structure, package manager, framework, build system, current scripts, existing components, CSS conventions, current deployment files and current Git state.
2. Identify the current production branch. Check for uncommitted changes and do not overwrite or discard them.
3. Create a new branch named `feature/looponics-ai-assistant` from the correct base branch. If a branch with that name already exists, inspect it and do not reset it.
4. Record the starting commit and the current build/test status.
5. Report the actual framework and the safest integration/deployment approach before making structural changes.

Do not assume that this project uses Next.js, Vite, React Router, Tailwind or any specific framework until the repository proves it.

### Strict UI isolation rules

- Add the chat widget as a standalone, isolated component.
- Keep styles inside a CSS Module or use unique `lp-chat-*` namespaces.
- Do not modify global CSS resets, root typography, shared layout components, existing navigation, header, footer, hero, sections, colour palette, font imports or breakpoints.
- Do not rename/move existing files or restructure the application.
- Do not edit the existing `vercel.json`, root build configuration, DNS settings or production Vercel project settings as part of Phase 1.
- Do not add broad CSS selectors that can affect existing site elements.
- Add only the smallest possible mount/integration point for the chatbot.
- Make the widget responsive and test desktop, tablet and mobile layouts.
- Respect keyboard accessibility, focus management and `prefers-reduced-motion`.

If the safest implementation requires an exception to any rule, stop and explain the reason before applying it.

## 3. UI references and exact selected components

I am attaching screenshots and a short reference video. Treat them as the intended visual reference. Replicate the relevant component behaviour and visual quality; do not reproduce unrelated sections of those websites.

### assistant-ui

The selected components are:

1. **Voice dictation** — do not implement actual transcription in Phase 1. Keep its UI integration for Phase 5. Do not send API keys or audio directly from the browser to a model provider.
2. **Suggested prompts** — implement the empty-state starter prompts in Phase 1. Keep them concise, relevant to Looponics and visually close to the supplied reference.

I will install assistant-ui myself. Do not run its installation/setup CLI and do not add assistant-ui installation commands to the repository documentation. Once I confirm it is installed, inspect the actual generated files and integrate with the project's existing runtime. Do not assume the default OpenAI runtime; the final runtime must call our own backend API.

### transitions.dev

Use only these two transitions:

1. **Shimmer text** — use subtly for a short user-facing status such as “Thinking” or “Checking Looponics information”.
2. **Streaming text** — use for incoming assistant response text if the API stream supports it.

I will install the transitions.dev skill/CLI myself. Do not install it automatically. Do not add unnecessary motion effects, heavy blur, continuous animation on all text or motion that harms mobile performance. Respect reduced-motion preferences.

Never display internal chain-of-thought or a “reasoning stream”. Only show short, user-facing status text.

## 4. Supplied Looponics 3D chatbot mark

I have supplied an HTML artifact named `3d-chatbotlogo`. It contains the actual Looponics 3D mark and its full animation.

Use the extracted React component supplied with this task, if present:

- `components/LooponicsChatLauncher.tsx`
- `components/LooponicsChatLauncher.module.css`

If these files are not yet in the repository, ask me to add them or recreate the component faithfully from the uploaded HTML source. Preserve the following original behaviours:

- 14 stacked SVG depth layers (3D extrusion).
- White outer logo stroke and orange inner stroke on dark backgrounds.
- Subtle floating animation.
- Soft animated shadow beneath it.
- Pointer tilt on desktop hover.
- Brief 360-degree click spin.
- Correct button semantics, accessible label, `aria-expanded` and reduced-motion behaviour.

Do not replace the mark with an emoji, generic chatbot icon or a static unrelated SVG. Use it as the circular floating chatbot launcher. The launcher should open/close the isolated chat panel after its click animation.

I will add the official PNG and SVG brand assets to the repository separately. Do not invent new logo assets or modify the supplied mark.

## 5. Phase 1 scope — implement only this

Phase 1 contains exactly:

- Create the backend API.
- Create the website chat widget.
- Integrate Gemini.
- Implement bounded conversation history.
- Add a structured response format.
- Add error handling and loading states.

### Backend requirements

- Use Node.js + TypeScript.
- Implement request-based Vercel-compatible serverless handlers; do not start a persistent Express server with `app.listen()`.
- Prefer a separate API deployment target/subproject so the current website's Vercel project and build configuration remain unchanged.
- Proposed API origin: `https://api.looponics.tech`.
- The owner will configure the API subdomain after the separate Vercel project exists. Do not edit or guess DNS records.
- Use a provider adapter/interface so the UI does not depend on Gemini-specific response structures.
- Integrate Gemini on the backend only. Never expose `GEMINI_API_KEY` in browser code, public env variables or built assets.
- Use a configurable `GEMINI_MODEL`; do not hard-code an unverified model ID throughout the application.
- Validate HTTP method, content type, origin, message count, message length and request size.
- Set sensible timeouts and bounded retries for safe read-only model requests.
- Use a stable request/response contract and safe error envelope.
- Support streaming only if the framework/runtime integration is reliable; otherwise return a complete response with a clean loading state and do not fake streaming.
- Keep the conversation history bounded. Treat all browser-supplied history as untrusted input; it must never override server instructions or authorize actions.
- Use only verified public Looponics facts that are explicitly present in the current site or approved by me. If a fact cannot be verified, the assistant must say it does not have confirmed information and offer the contact route.
- Do not invent services, pricing, delivery timeframes, guarantees, clients, availability or policies.
- Do not add any business tools in Phase 1.

### Frontend requirements

- Build a floating launcher and isolated responsive chat panel.
- Use the supplied 3D logo mark.
- Add a professional welcome message and 3–4 suggested prompts.
- Add user/assistant message styling, composer, send action, loading/typing state, errors and retry.
- Render assistant output safely. Do not allow arbitrary HTML from the model.
- Keep UI language and style consistent with Looponics. No gradients, purple theme, fake stats, fake testimonials or unnecessary “AI-looking” decoration.
- Ensure panel fits mobile viewports and does not break existing content.
- Keep the chat widget feature isolated so it can be disabled quickly.

### Phase 1 API shape

Use a versioned endpoint such as `POST /v1/chat` and a typed request containing:

- `conversationId`
- bounded `messages` with only `user`/`assistant` roles and text `content`
- optional `locale`
- optional `stream` flag

The response should have a stable envelope with `requestId`, `conversationId`, an assistant message and empty `sources`/`actions` arrays until later phases require them. Do not expose raw provider responses or stack traces.

Add a simple health route that reveals only service liveness, never secrets or configuration values.

## 6. Environment variables

For Phase 1, use only:

```env
GEMINI_API_KEY=
GEMINI_MODEL=
ALLOWED_ORIGINS=https://looponics.tech,https://www.looponics.tech
```

Add `CHAT_API_BASE_URL` to the frontend only as a non-secret public configuration value if needed. Add the exact local development origin only to local/development configuration.

Create `.env.example` with blank placeholders. Add all real env files to `.gitignore`. Do not ask me to paste API keys into chat or source files. Do not create Supabase, Groq, Resend or Meta credentials during Phase 1.

## 7. Suggested API project organization

Adapt to the actual framework, but maintain separation of concerns:

```text
chat-api/
├── api/                 # Vercel request handlers
├── src/
│   ├── config/
│   ├── schemas/
│   ├── providers/
│   ├── prompts/
│   ├── services/
│   └── utils/
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

Do not generate an oversized generic framework. Keep each module small and explain its responsibility.

## 8. Verification required before stopping Phase 1

Run all existing project checks and the new tests. At minimum:

- Existing website build succeeds unchanged.
- New API type-checks and builds.
- Request validation rejects malformed, oversized and unsupported payloads.
- Gemini key is only used server-side.
- Chat opens/closes and sends/receives a message.
- Conversation history works within the configured bound.
- Provider errors/timeouts show a safe recoverable message.
- The assistant abstains on unsupported business claims.
- No tool action or lead/support workflow exists yet.
- No browser console errors or accessibility blockers.
- Screenshots at desktop, tablet and mobile confirm the old website is visually unchanged except for the launcher/panel.
- `git diff` confirms no unrelated formatting, refactoring, config or layout changes.

Do not commit, merge, push to the production branch, change production DNS, or deploy to the live domain without my explicit approval.

## 9. Work protocol

Before coding, return:

1. Repository/framework summary.
2. Git branch and working-tree status.
3. Existing build/test status.
4. Proposed minimal file tree.
5. Any conflict between the frozen plan and the real repository.

Then implement Phase 1 only. After implementation, return:

1. Files created/changed.
2. Architecture and request flow in plain language.
3. Commands run and their actual results.
4. Tests passed/failed (do not claim tests were run if they were not).
5. UI regression evidence.
6. Environment variables I need to configure.
7. Any remaining blockers.

Stop after Phase 1 and wait for my approval. Do not move to Phase 2 automatically.

**Core rule: the assistant may understand and propose; only the backend may authorize and execute. Preserve the existing Looponics website.**
