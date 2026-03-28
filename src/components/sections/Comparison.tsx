import { Check, Minus } from "lucide-react";
import { COMPARISON_DATA } from "@/lib/constants";
import type { ComparisonRow } from "@/types";

function CellValue({ value }: { value: string | boolean }): React.ReactElement {
  if (value === true) {
    return <Check size={16} className="text-solana-green" />;
  }
  if (value === false) {
    return <Minus size={16} className="text-dim" />;
  }
  return <span>{value}</span>;
}

function MobileCard({ row }: { row: ComparisonRow }): React.ReactElement {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
      <p className="text-sm font-medium text-foreground">{row.feature}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-dim">Coinbase Agent Kit</span>
          <span className="text-muted">
            <CellValue value={row.coinbase} />
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-solana-green font-medium">Auton</span>
          <span className="text-foreground">
            <CellValue value={row.auton} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Comparison(): React.ReactElement {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Why Auton?
          </h2>
          <p className="mt-4 text-muted text-lg">
            Compare with existing solutions.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-muted font-medium w-1/3">
                  Feature
                </th>
                <th className="text-left px-6 py-4 text-muted font-medium w-1/3">
                  Coinbase Agent Kit
                </th>
                <th className="text-left px-6 py-4 font-medium w-1/3">
                  <span className="text-solana-green">
                    Auton
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-surface/50" : ""}
                >
                  <td className="px-6 py-4 text-muted border-t border-border">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-muted border-t border-border">
                    <CellValue value={row.coinbase} />
                  </td>
                  <td className="px-6 py-4 text-foreground border-t border-border font-medium">
                    <CellValue value={row.auton} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {COMPARISON_DATA.map((row) => (
            <MobileCard key={row.feature} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}
