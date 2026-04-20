export function applyPhoneMask(value: string) {
  // Remove tudo que não for número
  let digits = value.replace(/\D/g, '')

  // Remove o código do país '55' se estiver no início
  if (digits.startsWith('55')) {
    digits = digits.slice(2)
  }

  // Aplica a máscara
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trimEnd()
  } else {
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trimEnd()
  }
}