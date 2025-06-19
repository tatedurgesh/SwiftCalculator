import { useCalculator } from '@/hooks/useCalculator';

interface ScientificCalculatorProps {
  onCalculate: (expression: string, result: string) => void;
}

export function ScientificCalculator({ onCalculate }: ScientificCalculatorProps) {
  const calculator = useCalculator();

  const handleCalculate = () => {
    const expressionBeforeCalc = calculator.expression;
    calculator.calculate();
    setTimeout(() => {
      if (calculator.result !== 'Error' && expressionBeforeCalc) {
        onCalculate(expressionBeforeCalc, calculator.result);
      }
    }, 0);
  };

  return (
    <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto">
      {/* Row 1 - Scientific Functions */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('sin')}
      >
        sin
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('cos')}
      >
        cos
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('tan')}
      >
        tan
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={calculator.clear}
      >
        C
      </button>
      <button 
        className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
        onClick={() => calculator.addOperator('divide')}
      >
        ÷
      </button>
      
      {/* Row 2 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('ln')}
      >
        ln
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('log')}
      >
        log
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('sqrt')}
      >
        √
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={calculator.addPercentage}
      >
        %
      </button>
      <button 
        className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
        onClick={() => calculator.addOperator('multiply')}
      >
        ×
      </button>
      
      {/* Row 3 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('pi')}
      >
        π
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('e')}
      >
        e
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addScientificFunction('x²')}
      >
        x²
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addNumber('7')}
      >
        7
      </button>
      <button 
        className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
        onClick={() => calculator.addOperator('subtract')}
      >
        −
      </button>
      
      {/* Row 4 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-xs font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={calculator.addBrackets}
      >
        ( )
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addNumber('4')}
      >
        4
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addNumber('5')}
      >
        5
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addNumber('6')}
      >
        6
      </button>
      <button 
        className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
        onClick={() => calculator.addOperator('add')}
      >
        +
      </button>
      
      {/* Row 5 */}
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-sm font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={calculator.toggleSign}
      >
        +/−
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addNumber('1')}
      >
        1
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addNumber('2')}
      >
        2
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={() => calculator.addNumber('3')}
      >
        3
      </button>
      <button 
        className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
        onClick={handleCalculate}
      >
        =
      </button>
      
      {/* Row 6 */}
      <div className="col-span-2">
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('0')}
        >
          0
        </button>
      </div>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
        onClick={calculator.addDecimal}
      >
        .
      </button>
      <div></div> {/* Empty space */}
      <div></div> {/* Empty space */}
      
      {/* Row 2 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('sin')}
      >
        sin
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('cos')}
      >
        cos
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('tan')}
      >
        tan
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('7')}
      >
        7
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('8')}
      >
        8
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('9')}
      >
        9
      </button>
      <button 
        className="calculator-button ios-orange text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addOperator('multiply')}
      >
        ×
      </button>
      
      {/* Row 3 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('ln')}
      >
        ln
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('log')}
      >
        log
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('reciprocal')}
      >
        1/x
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('4')}
      >
        4
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('5')}
      >
        5
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('6')}
      >
        6
      </button>
      <button 
        className="calculator-button ios-orange text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addOperator('subtract')}
      >
        −
      </button>
      
      {/* Row 4 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('exp')}
      >
        e^x
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('square')}
      >
        x²
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('power')}
      >
        x^y
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('1')}
      >
        1
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('2')}
      >
        2
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('3')}
      >
        3
      </button>
      <button 
        className="calculator-button ios-orange text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addOperator('add')}
      >
        +
      </button>
      
      {/* Row 5 */}
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('abs')}
      >
        |x|
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('pi')}
      >
        π
      </button>
      <button 
        className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addScientificFunction('e')}
      >
        e
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={calculator.toggleSign}
      >
        +/−
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={() => calculator.addNumber('0')}
      >
        0
      </button>
      <button 
        className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={calculator.addDecimal}
      >
        .
      </button>
      <button 
        className="calculator-button ios-pink text-white rounded-full w-full h-12 text-[9px] font-medium shadow-sm"
        onClick={handleCalculate}
      >
        =
      </button>
    </div>
  );
}
