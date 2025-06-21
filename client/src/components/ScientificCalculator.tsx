import { useState } from 'react';
import { useCalculator } from '@/hooks/useCalculator';

interface ScientificCalculatorProps {
  onCalculate: (expression: string, result: string) => void;
}

export function ScientificCalculator({ onCalculate }: ScientificCalculatorProps) {
  const calculator = useCalculator();
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [isSecondFunction, setIsSecondFunction] = useState(false);

  const handleCalculate = () => {
    const expressionBeforeCalc = calculator.expression;
    calculator.calculate();
    setTimeout(() => {
      if (calculator.result !== 'Error' && expressionBeforeCalc) {
        onCalculate(expressionBeforeCalc, calculator.result);
      }
    }, 0);
  };

  const toggleAngleMode = () => {
    setAngleMode(prev => prev === 'deg' ? 'rad' : 'deg');
  };

  const toggleSecondFunction = () => {
    setIsSecondFunction(prev => !prev);
  };

  const addScientificFunction = (func: string) => {
    calculator.addScientificFunction(func, angleMode);
    setIsSecondFunction(false); // Reset after use
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Mode Controls */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <button 
          className={`calculator-button rounded-lg h-8 text-xs font-medium shadow-sm border ${
            angleMode === 'deg' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-300 dark:bg-gray-600 text-black dark:text-white border-gray-400 dark:border-transparent'
          }`}
          onClick={toggleAngleMode}
        >
          {angleMode.toUpperCase()}
        </button>
        <button 
          className={`calculator-button rounded-lg h-8 text-xs font-medium shadow-sm border ${
            isSecondFunction 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-300 dark:bg-gray-600 text-black dark:text-white border-gray-400 dark:border-transparent'
          }`}
          onClick={toggleSecondFunction}
        >
          2nd
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg h-8 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction('pi')}
        >
          π
        </button>
      </div>

      {/* Scientific Functions Row 1 - Trigonometric */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction(isSecondFunction ? 'asin' : 'sin')}
        >
          {isSecondFunction ? 'sin⁻¹' : 'sin'}
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction(isSecondFunction ? 'acos' : 'cos')}
        >
          {isSecondFunction ? 'cos⁻¹' : 'cos'}
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction(isSecondFunction ? 'atan' : 'tan')}
        >
          {isSecondFunction ? 'tan⁻¹' : 'tan'}
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction(isSecondFunction ? 'pow10' : 'log')}
        >
          {isSecondFunction ? '10^x' : 'log'}
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction(isSecondFunction ? 'exp' : 'ln')}
        >
          {isSecondFunction ? 'e^x' : 'ln'}
        </button>
      </div>

      {/* Scientific Functions Row 2 - Powers & Roots */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction(isSecondFunction ? 'cbrt' : 'sqrt')}
        >
          {isSecondFunction ? '∛' : '√'}
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction(isSecondFunction ? 'cube' : 'square')}
        >
          {isSecondFunction ? 'x³' : 'x²'}
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addOperator('power')}
        >
          x^y
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction('e')}
        >
          e
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full w-full h-12 text-xs font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => addScientificFunction('reciprocal')}
        >
          1/x
        </button>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={calculator.clear}
        >
          C
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={calculator.addBrackets}
        >
          ( )
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={calculator.addPercentage}
        >
          %
        </button>
        <button 
          className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm"
          onClick={() => calculator.addOperator('divide')}
        >
          ÷
        </button>
        
        {/* Row 2 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('7')}
        >
          7
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('8')}
        >
          8
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('9')}
        >
          9
        </button>
        <button 
          className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm"
          onClick={() => calculator.addOperator('multiply')}
        >
          ×
        </button>
        
        {/* Row 3 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('4')}
        >
          4
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('5')}
        >
          5
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('6')}
        >
          6
        </button>
        <button 
          className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm"
          onClick={() => calculator.addOperator('subtract')}
        >
          −
        </button>
        
        {/* Row 4 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('1')}
        >
          1
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('2')}
        >
          2
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('3')}
        >
          3
        </button>
        <button 
          className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm"
          onClick={() => calculator.addOperator('add')}
        >
          +
        </button>
        
        {/* Row 5 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-sm font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={calculator.toggleSign}
        >
          +/−
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={() => calculator.addNumber('0')}
        >
          0
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm border border-gray-400 dark:border-transparent"
          onClick={calculator.addDecimal}
        >
          .
        </button>
        <button 
          className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm"
          onClick={handleCalculate}
        >
          =
        </button>
      </div>
    </div>
  );
}