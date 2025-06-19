import { create, all } from 'mathjs';

const math = create(all);

export interface CalculationResult {
  result: string;
  error?: string;
}

export function formatNumber(num: number | string): string {
  if (typeof num === 'string') return num;
  if (isNaN(num)) return 'Error';
  
  // Format with commas for large numbers
  return new Intl.NumberFormat('en-IN').format(num);
}

export function evaluateExpression(expression: string): CalculationResult {
  if (!expression.trim()) {
    return { result: '0' };
  }

  try {
    // Replace display symbols with math symbols
    let mathExpression = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/,/g, ''); // Remove commas from numbers

    const result = math.evaluate(mathExpression);
    
    if (typeof result === 'number') {
      if (!isFinite(result)) {
        return { result: 'Error', error: 'Invalid result' };
      }
      return { result: formatNumber(result) };
    }
    
    return { result: String(result) };
  } catch (error) {
    return { result: 'Error', error: 'Invalid expression' };
  }
}

export function calculateScientificFunction(func: string, value: number): number {
  switch (func) {
    case 'sin':
      return math.sin(value);
    case 'cos':
      return math.cos(value);
    case 'tan':
      return math.tan(value);
    case 'ln':
      return math.log(value);
    case 'log':
      return math.log10(value);
    case 'sqrt':
      return math.sqrt(value);
    case 'square':
      return math.pow(value, 2);
    case 'exp':
      return math.exp(value);
    case 'reciprocal':
      return 1 / value;
    case 'abs':
      return math.abs(value);
    default:
      return value;
  }
}

export const CONSTANTS = {
  pi: Math.PI,
  e: Math.E,
};
