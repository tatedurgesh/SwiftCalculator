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
      .replace(/,/g, '') // Remove commas from numbers
      .replace(/\^/g, '**') // Replace ^ with ** for power
      .replace(/π/g, 'pi')
      .replace(/e(?![0-9])/g, 'e') // Replace e constant
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .replace(/⁻¹/g, '^(-1)')
      .replace(/∛/g, 'cbrt')
      .replace(/sin⁻¹/g, 'asin')
      .replace(/cos⁻¹/g, 'acos')
      .replace(/tan⁻¹/g, 'atan')
      .replace(/\|([^|]+)\|/g, 'abs($1)') // Handle absolute value
      .replace(/!/g, '!'); // Factorial

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

export function calculateScientificFunction(func: string, value: number, angleMode: 'deg' | 'rad' = 'deg'): number {
  // Convert degrees to radians for trigonometric functions if needed
  const convertToRadians = (val: number) => angleMode === 'deg' ? (val * Math.PI) / 180 : val;
  const convertFromRadians = (val: number) => angleMode === 'deg' ? (val * 180) / Math.PI : val;

  switch (func) {
    case 'sin':
      return math.sin(convertToRadians(value));
    case 'cos':
      return math.cos(convertToRadians(value));
    case 'tan':
      return math.tan(convertToRadians(value));
    case 'asin':
      return convertFromRadians(math.asin(value));
    case 'acos':
      return convertFromRadians(math.acos(value));
    case 'atan':
      return convertFromRadians(math.atan(value));
    case 'ln':
      return math.log(value);
    case 'log':
      return math.log10(value);
    case 'sqrt':
      return math.sqrt(value);
    case 'cbrt':
      return math.cbrt(value);
    case 'square':
      return math.pow(value, 2);
    case 'cube':
      return math.pow(value, 3);
    case 'exp':
      return math.exp(value);
    case 'pow10':
      return math.pow(10, value);
    case 'reciprocal':
      return 1 / value;
    case 'abs':
      return math.abs(value);
    case 'factorial':
      return math.factorial(value);
    default:
      return value;
  }
}

export const CONSTANTS = {
  pi: Math.PI,
  e: Math.E,
};