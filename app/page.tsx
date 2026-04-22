import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { AboveTheFold } from "./components/AboveTheFold";
import { AccessoriesSection } from "./components/AccessoriesSection";
import { BrandsSection } from "./components/BrandsSection";
import { Header } from "./components/Header";
import { QuoteSection } from "./components/QuoteSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";

export const metadata = {
  title: "Assistência Técnica Acessível e de Qualidade - Conserto Rápido e Confiável",
  description: "Oferecemos serviços de conserto para celulares, computadores e consoles. Diagnóstico gratuito e orçamento em segundos. Confiança que dura.",
  keywords: "assistência técnica, conserto rápido, confiança, celulares, computadores, consoles, diagnóstico gratuito, orçamento em segundos",
}

export default function Home() {
  return (
    <main>
      <Header />
      <AboveTheFold />
      <ServicesSection />
      <BrandsSection />
      <AccessoriesSection />
      <ProcessSection />
      <Suspense>
        <QuoteSection />
      </Suspense>
      <Footer />
    </main>
  );
}
