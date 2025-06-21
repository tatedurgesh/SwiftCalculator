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
    console.log('Calculate button pressed, current expression:', calculator.expression);
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

  const handleNumberClick = (number: string) => {
    console.log('Number button clicked:', number);
    calculator.addNumber(number);
  };

  const handleOperatorClick = (operator: string) => {
    console.log('Operator button clicked:', operator);
    calculator.addOperator(operator);
  };

  const handleFunctionClick = (func: string) => {
    console.log('Function button clicked:', func);
    calculator.addScientificFunction(func, angleMode);
    if (isSecondFunction) {
      setIsSecondFunction(false);
    }
  };

  const toggleAngleMode = () => {
    console.log('Angle mode toggled');
    setAngleMode(prev => prev === 'deg' ? 'rad' : 'deg');
  };

  const toggleSecondFunction = () => {
    console.log('Second function toggled');
    setIsSecondFunction(prev => !prev);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Debug info */}
      <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
        <div>Expression: {calculator.expression || 'empty'}</div>
        <div>Result: {calculator.result}</div>
        <div>Angle Mode: {angleMode}</div>
        <div>2nd Function: {isSecondFunction ? 'ON' : 'OFF'}</div>
      </div>

      {/* Scientific Calculator Layout - Exact match to image: 5 columns, 7 rows */}
      <div className="grid grid-cols-5 gap-2">
        
        {/* Row 1 - Top scientific functions */}
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('reciprocal')}
        >
          x⁻¹
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('exp')}
        >
          eˣ
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('ln')}
        >
          ln
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick(isSecondFunction ? 'asin' : 'sin')}
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
          onClick={() => handleFunctionClick('pi')}
        >
          π
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('square')}
        >
          x²
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('log')}
        >
          log
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick(isSecondFunction ? 'acos' : 'cos')}
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
          Rad
        </button>

        {/* Row 3 */}
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('e')}
        >
          e
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleOperatorClick('power')}
        >
          x^y
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('reciprocal')}
        >
          1/x
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick(isSecondFunction ? 'atan' : 'tan')}
        >
          {isSecondFunction ? 'tan⁻¹' : 'tan'}
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleFunctionClick('sqrt')}
        >
          √
        </button>

        {/* Row 4 */}
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-sm font-medium shadow-sm flex items-center justify-center"
          onClick={() => {
            console.log('+/- button clicked');
            calculator.toggleSign();
          }}
        >
          +/-
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('1')}
        >
          1
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('4')}
        >
          4
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('7')}
        >
          7
        </button>
        <button 
          className="calculator-button bg-red-500 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => {
            console.log('Clear button clicked');
            calculator.clear();
          }}
        >
          C
        </button>

        {/* Row 5 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('0')}
        >
          0
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('2')}
        >
          2
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('5')}
        >
          5
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('8')}
        >
          8
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => {
            console.log('Brackets button clicked');
            calculator.addBrackets();
          }}
        >
          ( )
        </button>

        {/* Row 6 */}
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => {
            console.log('Decimal button clicked');
            calculator.addDecimal();
          }}
        >
          .
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('3')}
        >
          3
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('6')}
        >
          6
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
          onClick={() => handleNumberClick('9')}
        >
          9
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => {
            console.log('Percentage button clicked');
            calculator.addPercentage();
          }}
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
          onClick={() => handleOperatorClick('add')}
        >
          +
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleOperatorClick('subtract')}
        >
          −
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleOperatorClick('multiply')}
        >
          ×
        </button>
        <button 
          className="calculator-button bg-gray-700 text-white rounded-2xl w-full h-14 text-lg font-medium shadow-sm flex items-center justify-center"
          onClick={() => handleOperatorClick('divide')}
        >
          ÷
        </button>
      </div>
    </div>
  );
}