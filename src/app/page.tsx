"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BatteryCharging,
  BrainCircuit,
  ClipboardCheck,
  Cpu,
  Layers3,
  Radio,
  Sparkles,
} from "lucide-react";
import type { DesignPlan } from "@/lib/designEngine";
import { analyzeRequirements } from "@/lib/designEngine";

type Preset = {
  name: string;
  caption: string;
  text: string;
};

const presets: Preset[] = [
  {
    name: "Smart Agri Node",
    caption: "LoRa, solar harvesting, greenhouse automation",
    text: "Design a solar-powered agriculture monitoring node that tracks temperature, humidity, soil moisture, and CO2 in remote greenhouses. Needs LoRaWAN connectivity, weatherproof enclosure, and weekly cloud sync. Keep BOM low and add expansion headers for future sensors.",
  },
  {
    name: "Wearable Health Patch",
    caption: "Medical-grade vitals, BLE companion app",
    text: "Develop an adhesive wearable patch for continuous heart rate, SpO2, and skin temperature monitoring. Lightweight, rechargeable battery, Bluetooth connectivity to a mobile app, and clinical accuracy requirements for skin contact devices.",
  },
  {
    name: "Factory Edge Box",
    caption: "Industrial Ethernet, multi-sensor analytics",
    text: "Create an industrial edge computing box for factories. It ingests Modbus sensor data, performs vibration analysis, connects to cloud dashboards over Ethernet, and survives harsh electrical noise. Needs OTA updates and DIN-rail enclosure.",
  },
];

const gradient =
  "bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_45%)]";

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/80">
      <header className="mb-4 flex items-center gap-3 text-zinc-900 dark:text-zinc-100">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
          {icon}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  const [plan, setPlan] = useState<DesignPlan>(() => analyzeRequirements(""));
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const billOfMaterials = useMemo(
    () =>
      plan.billOfMaterials.map((item) => (
        <li key={`${item.name}-${item.value}`} className="rounded-xl bg-zinc-50/70 p-3 dark:bg-zinc-800/60">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {item.name}
          </p>
          <p className="text-xs uppercase tracking-wide text-indigo-500">
            {item.value}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.purpose}</p>
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {item.cost}
          </p>
        </li>
      )),
    [plan.billOfMaterials]
  );

  const handlePreset = (preset: Preset) => {
    setInput(preset.text);
    setActivePreset(preset.name);
    setPlan(analyzeRequirements(preset.text));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActivePreset(null);
    setPlan(analyzeRequirements(input));
  };

  return (
    <div
      className={`min-h-screen bg-slate-100/80 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-50 ${gradient}`}
    >
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 md:px-10 lg:px-16">
        <div className="rounded-3xl border border-indigo-200/40 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-indigo-500/20 dark:bg-zinc-900/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-300/60 bg-indigo-500/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-indigo-600 dark:border-indigo-500/40 dark:bg-indigo-500/20 dark:text-indigo-200">
                <Sparkles size={14} />
                FluxFree Electronics Studio
              </span>
              <h1 className="text-3xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
                Transform plain-language requirements into production-ready electronic design blueprints.
              </h1>
              <p className="max-w-3xl text-sm md:text-base text-zinc-600 dark:text-zinc-300">
                Feed the agent with goals, environments, constraints, and differentiation angles. It crystallizes
                block diagrams, component selections, validation plans, and manufacturing guidance inspired by pro
                workflows—no logins, no paywalls.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/50 bg-slate-50/60 p-5 text-sm text-slate-700 shadow-inner dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:text-zinc-300">
              <p className="font-medium">Rapid entry points</p>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed">
                <li>Describe target users and deployment environment.</li>
                <li>List required sensing, compute, and connectivity.</li>
                <li>Call out certifications, BOM targets, or timelines.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,_420px)_1fr]">
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-zinc-200/60 bg-white/80 p-6 shadow-md backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/80"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  User Requirements
                </h2>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  Generate Design
                  <ArrowRight size={16} />
                </button>
              </div>

              <label htmlFor="requirements" className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Tell the agent what to build
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={12}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="e.g. Create a compact indoor air-quality monitor with multi-gas sensing, Wi-Fi to sync with a web dashboard, OTA firmware updates, and a focus on sub-50 USD BOM."
                className="mt-3 w-full rounded-2xl border border-zinc-200/60 bg-white/70 px-4 py-3 text-sm leading-relaxed text-zinc-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700/60 dark:bg-zinc-950/60 dark:text-zinc-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/40"
              />
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                The more context you provide around end users, operating environment, differentiation, and compliance,
                the sharper the blueprint.
              </p>
            </form>

            <div className="rounded-3xl border border-zinc-200/60 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/80">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">One-click starting points</p>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {activePreset ? `Loaded: ${activePreset}` : "Choose a scenario"}
                </span>
              </div>
              <div className="grid gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePreset(preset)}
                    className={`rounded-2xl border px-4 py-3 text-left transition hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10 ${
                      activePreset === preset.name
                        ? "border-indigo-400 bg-indigo-50/80 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                        : "border-zinc-200/60 bg-white/60 text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/40 dark:text-zinc-300"
                    }`}
                    type="button"
                  >
                    <p className="text-sm font-semibold">{preset.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{preset.caption}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SectionCard
              title={plan.productCategory}
              icon={<BrainCircuit size={20} />}
            >
              <p className="text-base text-zinc-700 dark:text-zinc-200">{plan.summary}</p>
              <ul className="mt-3 grid gap-2 text-sm">
                {plan.positioning.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="System Architecture" icon={<Layers3 size={20} />}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-indigo-200/40 bg-indigo-50/50 p-4 text-indigo-800 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
                  <p className="text-sm font-semibold">Core Controller</p>
                  <p className="mt-1 text-sm font-medium">{plan.coreController.name}</p>
                  <p className="mt-2 text-xs leading-relaxed opacity-80">{plan.coreController.reason}</p>
                </div>
                <div className="rounded-2xl border border-emerald-200/40 bg-emerald-50/50 p-4 text-emerald-800 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <p className="text-sm font-semibold">Firmware Strategy</p>
                  <ul className="mt-2 space-y-2 text-xs leading-relaxed">
                    {plan.firmwareStrategy.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-sky-200/40 bg-sky-50/50 p-4 text-sky-900 shadow-sm dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-100">
                  <p className="text-sm font-semibold">Connectivity Stack</p>
                  {plan.connectivity.length > 0 ? (
                    <ul className="mt-2 space-y-2 text-xs">
                      {plan.connectivity.map((item) => (
                        <li key={item.name}>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-[11px] uppercase tracking-wide text-sky-700 dark:text-sky-200">
                            {item.value}
                          </p>
                          <p className="text-[11px] text-sky-800/80 dark:text-sky-100/80">{item.purpose}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-xs text-sky-700/80 dark:text-sky-100/70">
                      Specify wireless or wired requirements to unlock targeted networking silicon.
                    </p>
                  )}
                </div>
                <div className="rounded-2xl border border-amber-200/40 bg-amber-50/60 p-4 text-amber-900 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                  <p className="text-sm font-semibold">Power Strategy</p>
                  <ul className="mt-2 space-y-2 text-xs">
                    {plan.powerStrategy.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Functional Blocks" icon={<Cpu size={20} />}>
              <div className="grid gap-4 md:grid-cols-2">
                {plan.blocks.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 dark:border-zinc-700/60 dark:bg-zinc-950/40"
                  >
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{block.title}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{block.description}</p>
                    <ul className="mt-2 space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Sensing & Interaction" icon={<Radio size={20} />}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-lime-200/40 bg-lime-50/60 p-4 text-lime-900 shadow-sm dark:border-lime-500/30 dark:bg-lime-500/10 dark:text-lime-200">
                  <p className="text-sm font-semibold">Sensors & Actuators</p>
                  {plan.sensors.length > 0 ? (
                    <ul className="mt-2 space-y-2 text-xs leading-relaxed">
                      {plan.sensors.map((item) => (
                        <li key={item.name}>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-[11px] uppercase tracking-wide text-lime-700 dark:text-lime-200">
                            {item.value}
                          </p>
                          <p className="text-[11px] text-lime-800/80 dark:text-lime-100/80">{item.purpose}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-xs text-lime-700/80 dark:text-lime-100/70">
                      Mention sensing targets (temperature, IMU, biometrics, etc.) to populate this block.
                    </p>
                  )}
                </div>
                <div className="rounded-2xl border border-purple-200/40 bg-purple-50/60 p-4 text-purple-900 shadow-sm dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-100">
                  <p className="text-sm font-semibold">{plan.hmi.title}</p>
                  <p className="mt-2 text-xs text-purple-900/80 dark:text-purple-100/80">
                    {plan.hmi.description}
                  </p>
                  <ul className="mt-2 space-y-2 text-xs">
                    {plan.hmi.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4 text-slate-800 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200">
                <p className="text-sm font-semibold">{plan.expansion.title}</p>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{plan.expansion.description}</p>
                <ul className="mt-2 space-y-2 text-xs">
                  {plan.expansion.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </SectionCard>

            <SectionCard title="Bill of Materials" icon={<BatteryCharging size={20} />}>
              <ul className="grid gap-3 md:grid-cols-2">{billOfMaterials}</ul>
            </SectionCard>

            <SectionCard title="Validation & Manufacturing" icon={<ClipboardCheck size={20} />}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200/40 bg-white/70 p-4 dark:border-emerald-500/30 dark:bg-zinc-950/50">
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-200">
                    Validation Plan
                  </p>
                  <ul className="mt-2 space-y-2 text-xs text-emerald-700/90 dark:text-emerald-100/80">
                    {plan.validationPlan.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-orange-200/50 bg-white/70 p-4 dark:border-orange-500/30 dark:bg-zinc-950/50">
                  <p className="text-sm font-semibold text-orange-700 dark:text-orange-200">
                    Manufacturing Notes
                  </p>
                  <ul className="mt-2 space-y-2 text-xs text-orange-700/90 dark:text-orange-100/80">
                    {plan.manufacturingNotes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Risk Radar" icon={<AlertTriangle size={20} />}>
              <ul className="space-y-2 text-sm">
                {plan.risks.map((item) => (
                  <li key={item} className="flex gap-2 rounded-2xl border border-rose-200/40 bg-rose-50/70 p-3 text-rose-900 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-100">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}
