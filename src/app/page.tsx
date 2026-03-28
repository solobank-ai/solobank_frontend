import { Hero } from "@/components/sections/Hero";
import { Accounts } from "@/components/sections/Accounts";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { Install } from "@/components/sections/Install";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <Accounts />
      <HowItWorks />
      <Comparison />
      <Install />
    </>
  );
}
