import { Badge } from "@/components/ui/Badge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks(): React.ReactElement {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-surface/30">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-muted text-lg">
            Up and running in under two minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {HOW_IT_WORKS.map((step, i) => (
            <AnimateIn key={step.step} delay={i * 120}>
            <div className="flex flex-col">
              {/* Number + duration */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(153,69,255,0.08)] border border-[rgba(153,69,255,0.2)] text-solana-purple flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.step}
                </div>
                <Badge variant="default">{step.duration}</Badge>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Command */}
              {step.command && (
                <div className="mt-4 bg-background rounded-lg px-4 py-3 font-mono text-xs text-solana-green overflow-x-auto border border-border">
                  $ {step.command}
                </div>
              )}
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
