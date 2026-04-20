import { Footer } from "@/components/Footer";
import { Header } from "../components/Header";
import { TrackingForm } from "./components/TrackingForm";

export default function RastreamentoPage() {
  return ( 
    <main>
      <Header />
      <div className="min-h-[calc(100vh-86px)] flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-base sm:text-lg md:text-xl text-card-foreground">Rastreamento</h1>
        <h2 className="text-5xl text-center font-bold">Acompanhe seu reparo.</h2>
        <p className="text-2xl text-center">Digite o numero da OS para ver o status em tempo real.</p>
        <TrackingForm />
      </div>
      <Footer />
    </main>
  )
}