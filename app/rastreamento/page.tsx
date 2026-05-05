import { Footer } from "@/components/Footer";
import { Header } from "../components/Header";
import { TrackingForm } from "./components/TrackingForm";

export default function RastreamentoPage() {
  return ( 
    <main className="bg-card">
      <Header />
      <div className="min-h-[calc(100vh-86px)] flex flex-col items-center justify-center gap-6 px-4">
        <TrackingForm />
      </div>
      <Footer />
    </main>
  )
}