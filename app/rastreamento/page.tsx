import { Footer } from "@/components/Footer";
import { Header } from "../components/Header";
import { TrackingForm } from "./components/TrackingForm";
import { Suspense } from "react";

export const metadata = {
  title: 'Rastreamento de Ordem de Serviço - Nicell Assistência Técnica',
  description: 'Acompanhe o status da sua ordem de serviço na Nicell Assistência Técnica. Insira seu código de rastreamento para obter informações atualizadas sobre o reparo do seu aparelho.',
}

export default function RastreamentoPage() {
  return ( 
    <main className="bg-card">
      <Header />
      <div className="min-h-[calc(100vh-86px)] flex flex-col items-center justify-center gap-6 px-4">
        <Suspense>
          <TrackingForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}