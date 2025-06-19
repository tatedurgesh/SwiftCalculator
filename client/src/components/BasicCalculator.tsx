import { useCalculator } from '@/hooks/useCalculator';

interface BasicCalculatorProps {
  onCalculate: (expression: string, result: string) => void;
}

export function BasicCalculator({ onCalculate }: BasicCalculatorProps) {
  const calculator = useCalculator();

  const handleCalculate = () => {
    const expressionBeforeCalc = calculator.expression;
    calculator.calculate();
    // Add to history after calculation
    setTimeout(() => {
      if (calculator.result !== 'Error' && expressionBeforeCalc) {
        onCalculate(expressionBeforeCalc, calculator.result);
      }
    }, 0);
  };

  return (
    <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
      {/* Row 1 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={calculator.clear}
      >
        C
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={calculator.addBrackets}
      >
        ()
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={calculator.addPercentage}
      >
        %
      </button>
      <button 
        className="calculator-button ios-orange text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addOperator('divide')}
      >
        ÷
      </button>
      
      {/* Row 2 */}
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('7')}
      >
        7
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('8')}
      >
        8
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('9')}
      >
        9
      </button>
      <button 
        className="calculator-button ios-orange text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addOperator('multiply')}
      >
        ×
      </button>
      
      {/* Row 3 */}
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('4')}
      >
        4
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('5')}
      >
        5
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('6')}
      >
        6
      </button>
      <button 
        className="calculator-button ios-orange text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addOperator('subtract')}
      >
        −
      </button>
      
      {/* Row 4 */}
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('1')}
      >
        1
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('2')}
      >
        2
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('3')}
      >
        3
      </button>
      <button 
        className="calculator-button ios-orange text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addOperator('add')}
      >
        +
      </button>
      
      {/* Row 5 */}
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={calculator.toggleSign}
      >
        +/−
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={() => calculator.addNumber('0')}
      >
        0
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={calculator.addDecimal}
      >
        .
      </button>
      <button 
        className="calculator-button ios-pink text-white rounded-full w-full h-16 text-base font-medium shadow-sm"
        onClick={handleCalculate}
      >
        =
      </button>
    </div>
  );
}
