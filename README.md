## FluxFree Electronics Studio

FluxFree is a zero-friction workspace that converts plain-language product requirements into actionable electronic design blueprints. It replicates a flux.ai-style experience without accounts or paywalls so you can ideate, explore system architectures, and prepare for prototyping from any browser.

### ✨ Features

- Natural-language intake with curated presets for common hardware scenarios.
- Heuristic design engine that maps requirements to MCUs, sensors, radios, power strategies, and firmware stacks.
- Automatically generated block diagrams, manufacturing notes, validation plans, and risk callouts.
- Tailwind-powered UI tuned for quick iteration and export-friendly summaries.

### 🚀 Quickstart

```
npm install
npm run dev
```

Open `http://localhost:3000` to launch the agent. Paste or draft requirements, hit **Generate Design**, and review the complete plan. No backend or external APIs are required; everything runs client-side.

### 🛠️ Stack

- Next.js App Router + TypeScript
- Tailwind CSS styling with glassmorphism accents
- Heuristic design engine in `src/lib/designEngine.ts`

### 📦 Deploy

The project is Vercel-ready out of the box:

```
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-a6f537f5
```

After deployment propagates, verify with:

```
curl https://agentic-a6f537f5.vercel.app
```

Happy building!
