import { useState } from 'react';
import { useCalculator } from '@/hooks/useCalculator';

interface ScientificCalculatorProps {
  onCalculate: (expression: string, result: string) => void;
}

export function ScientificCalculator({ onCalculate }: ScientificCalculatorProps) {
  const calculator = useCalculator();
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('rad');
  const [isSecondFunction, setIsSecondFunction] = useState(false);

  const handleCalculate = () => {
    const expressionBeforeCalc = calculator.expression;
    if (expressionBeforeCalc) {
      calculator.calculate();
      setTimeout(() => {
        if (calculator.result !== 'Error' && expressionBeforeCalc) {
          onCalculate(expressionBeforeCalc, calculator.result);
        }
      }, 50);
    }
  };

  const toggleAngleMode = () => {
    setAngleMode(prev => prev === 'deg' ? 'rad' : 'deg');
  };

  const toggleSecondFunction = () => {
    setIsSecondFunction(prev => !prev);
  };

  const addScientificFunction = (func: string) => {
    calculator.addScientificFunction(func, angleMode);
    if (isSecondFunction) {
      setIsSecondFunction(false); // Reset after use
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Scientific Calculator Layout - Landscape mode with 5 columns, 7 rows */}
      <div className="grid grid-cols-5 gap-2">
        
        {/* Row 1 */}
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('reciprocal')}
        >
          x⁻¹
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('e')}
        >
          e
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('ln')}
        >
          ln
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction(isSecondFunction ? 'asin' : 'sin')}
        >
          {isSecondFunction ? 'sin⁻¹' : 'sin'}
        </button>
        <button 
          className={`calculator-button rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center ${
            isSecondFunction ? 'bg-orange-500 text-white' : 'bg-gray-700 text-white'
          }`}
          onClick={toggleSecondFunction}
        >
          2nd
        </button>

        {/* Row 2 */}
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('pi')}
        >
          π
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('square')}
        >
          x²
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('log')}
        >
          log
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction(isSecondFunction ? 'acos' : 'cos')}
        >
          {isSecondFunction ? 'cos⁻¹' : 'cos'}
        </button>
        <button 
          className={`calculator-button rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center ${
            angleMode === 'rad' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-700 text-white'
          }`}
          onClick={toggleAngleMode}
        >
          {angleMode.toUpperCase()}
        </button>

        {/* Row 3 */}
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('e')}
        >
          e
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => calculator.addOperator('power')}
        >
          x^y
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction('reciprocal')}
        >
          1/x
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction(isSecondFunction ? 'atan' : 'tan')}
        >
          {isSecondFunction ? 'tan⁻¹' : 'tan'}
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => addScientificFunction(isSecondFunction ? 'cbrt' : 'sqrt')}
        >
          {isSecondFunction ? '∛' : '√'}
        </button>

        {/* Row 4 */}
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={calculator.toggleSign}
        >
          +/-
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('1')}
        >
          1
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('4')}
        >
          4
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('7')}
        >
          7
        </button>
        <button 
          className="calculator-button bg-red-500 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={calculator.clear}
        >
          C
        </button>

        {/* Row 5 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('0')}
        >
          0
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('2')}
        >
          2
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('5')}
        >
          5
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('8')}
        >
          8
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={calculator.addBrackets}
        >
          ( )
        </button>

        {/* Row 6 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={calculator.addDecimal}
        >
          .
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('3')}
        >
          3
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('6')}
        >
          6
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('9')}
        >
          9
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={calculator.addPercentage}
        >
          %
        </button>

        {/* Row 7 - Bottom row with operators */}
        <button 
          className="calculator-button bg-pink-400 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={handleCalculate}
        >
          =
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => calculator.addOperator('add')}
        >
          +
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => calculator.addOperator('subtract')}
        >
          −
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => calculator.addOperator('multiply')}
        >
          ×
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => calculator.addOperator('divide')}
        >
          ÷
        </button>
      </div>
    </div>
  );
}