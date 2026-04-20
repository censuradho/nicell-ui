export function applyPhoneMask(value: string) {
  // Remove tudo que não for número
  const digits = value.replace(/\D/g, '')

  // Aplica a máscara
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trimEnd()
  } else {
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trimEnd()
  }
}