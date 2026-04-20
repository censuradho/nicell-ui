import { Footer } from '@/components/Footer'
import { Header } from '../components/Header'

export const metadata = {
  title: 'Garantia — NiCell',
  description: 'Termos de garantia dos serviços de assistência técnica da NiCell.',
}

export default function GarantiaPage() {
  return (
    <main>
      <Header />

      <div className="container px-4 py-16 max-w-185">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Garantia</h1>
        <p className="text-sm text-card-foreground mb-10">Última atualização: abril de 2026</p>

        <section className="mb-10">
          <p className="text-base leading-relaxed">
            Todo serviço realizado na NiCell inclui garantia sobre peças e mão de obra.
            O prazo começa a contar a partir da data de retirada do equipamento.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Prazos</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-outline">
                <th className="text-left py-2 pr-6 font-medium text-card-foreground">Tipo de serviço</th>
                <th className="text-left py-2 font-medium text-card-foreground">Prazo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Peças originais (OEM)', '90 dias'],
                ['Peças compatíveis (aftermarket)', '60 dias'],
                ['Serviços de software (formatação, instalação)', '30 dias'],
              ].map(([tipo, prazo]) => (
                <tr key={tipo} className="border-b border-outline last:border-0">
                  <td className="py-3 pr-6">{tipo}</td>
                  <td className="py-3 font-medium">{prazo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">O que está coberto</h2>
          <ul className="space-y-2 text-sm text-card-foreground list-disc list-inside leading-relaxed">
            <li>Defeito na peça substituída durante o conserto</li>
            <li>Falha na execução do serviço realizado (mão de obra)</li>
            <li>Reincidência do mesmo problema no mesmo componente reparado</li>
            <li>Mau funcionamento de software instalado pela nossa equipe</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">O que não está coberto</h2>
          <ul className="space-y-2 text-sm text-card-foreground list-disc list-inside leading-relaxed">
            <li>Danos por queda, impacto ou pressão física após a saída do aparelho</li>
            <li>Contato com líquidos após o conserto</li>
            <li>Defeitos em componentes não relacionados ao serviço contratado</li>
            <li>Danos causados por carregadores inadequados ou sobretensão elétrica</li>
            <li>Aparelhos abertos ou modificados por terceiros após o atendimento</li>
            <li>Desgaste natural de peças por uso (bateria, conectores, etc.)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Como acionar</h2>
          <ol className="space-y-2 text-sm text-card-foreground list-decimal list-inside leading-relaxed">
            <li>Entre em contato pelo WhatsApp ou telefone com o número do seu atendimento em mãos.</li>
            <li>Descreva o problema e informe quando ele apareceu.</li>
            <li>Traga o aparelho à loja ou solicite retirada em domicílio (serviços acima de R$ 200).</li>
            <li>O diagnóstico dentro do período de garantia é gratuito e sem compromisso.</li>
            <li>Confirmado o defeito coberto, o reparo é feito sem custo adicional.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-4">Observações gerais</h2>
          <p className="text-sm text-card-foreground leading-relaxed mb-3">
            A garantia é pessoal e intransferível, válida apenas para o equipamento e serviço descritos na ordem de serviço original.
          </p>
          <p className="text-sm text-card-foreground leading-relaxed">
            Em caso de dúvida, entre em contato — resolvemos na conversa.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  )
}
