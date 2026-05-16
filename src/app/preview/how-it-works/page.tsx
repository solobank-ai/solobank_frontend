import {
  HowItWorksA,
  HowItWorksB,
  HowItWorksC,
  HowItWorksD,
} from "@/components/sections/HowItWorksVariants";

export const metadata = {
  title: "How it works — variants",
  robots: { index: false, follow: false },
};

function Label({ id, title, tagline }: { id: string; title: string; tagline: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-4">
      <div className="flex items-baseline gap-4 border-b border-border pb-3">
        <span className="text-xs tracking-[0.3em] uppercase text-dim">{id}</span>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <span className="text-sm text-muted">— {tagline}</span>
      </div>
    </div>
  );
}

export default function HowItWorksPreviewPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-6">
        <h1 className="text-3xl font-bold">How it works — design variants</h1>
        <p className="mt-2 text-muted">
          Four candidates for replacing the current section. Scroll through and pick one.
        </p>
      </div>

      <Label id="Variant A" title="Terminal timeline" tagline="three mini-terminals, real commands" />
      <HowItWorksA />

      <Label id="Variant B" title="Compact rows" tagline="numbered list, no circles, low height" />
      <HowItWorksB />

      <Label id="Variant C" title="Progress track" tagline="interactive stepper, single active panel" />
      <HowItWorksC />

      <Label id="Variant D" title="Asymmetric split" tagline="big step + terminal side-by-side" />
      <HowItWorksD />

      <div className="h-20" />
    </main>
  );
}
