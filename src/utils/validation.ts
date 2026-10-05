export function parsePositiveInt(value: string, message = 'Digite um número inteiro positivo.'): number {
  const number = Number(value);

  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(message);
  }

  return number;
}
