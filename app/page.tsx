import { AboveTheFold } from "./components/AboveTheFold";
import { AccessoriesSection } from "./components/AccessoriesSection";
import { BrandsSection } from "./components/BrandsSection";
import { Header } from "./components/Header";
import { QuoteSection } from "./components/QuoteSection";
import { ServicesSection } from "./components/ServicesSection";
import { TopInfo } from "./components/TopInfo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopInfo />
      <Header />
      <AboveTheFold />
      <ServicesSection />
      <BrandsSection />
      <AccessoriesSection />
      <QuoteSection />
      <Footer />
    </main>
  );
}
