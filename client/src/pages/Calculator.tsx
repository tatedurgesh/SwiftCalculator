import { useState } from 'react';
import { Sun, Moon, Calculator as CalcIcon, Sigma, RotateCcw, History } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useHistory } from '@/hooks/useHistory';
import { useCalculator } from '@/hooks/useCalculator';
import { DisplayArea } from '@/components/DisplayArea';
import { ScientificCalculator } from '@/components/ScientificCalculator';
import { UnitConverter } from '@/components/UnitConverter';
import { HistoryModal } from '@/components/HistoryModal';

type CalculatorMode = 'basic' | 'scientific' | 'converter';

export default function Calculator() {
  const { theme, toggleTheme } = useTheme();
  const { history, addToHistory, clearHistory } = useHistory();
  const calculator = useCalculator();
  const [mode, setMode] = useState<CalculatorMode>('basic');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleCalculation = (expr: string, res: string) => {
    addToHistory(expr, res);
  };

  const handleExpressionChange = (newExpression: string) => {
    calculator.setExpression(newExpression);
  };

  return (
    <div className="h-screen max-h-screen flex flex-col bg-ios-gray-light dark:bg-black overflow-hidden">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-3 bg-ios-gray-light dark:bg-black">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm calculator-button"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-black dark:text-white" />
          ) : (
            <Moon className="w-5 h-5 text-black dark:text-white" />
          )}
        </button>

        <h1 className="text-lg font-semibold text-black dark:text-white">Calculator</h1>

        <div className="w-9"></div> {/* Spacer for symmetry */}
      </div>

      {/* Calculator Mode Selector */}
      <div className="px-4 mb-3">
        <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setMode('basic')}
            className={`flex-1 py-2 px-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
              mode === 'basic' 
                ? 'bg-orange-500 text-white' 
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <CalcIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('scientific')}
            className={`flex-1 py-2 px-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
              mode === 'scientific' 
                ? 'bg-orange-500 text-white' 
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Sigma className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('converter')}
            className={`flex-1 py-2 px-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
              mode === 'converter' 
                ? 'bg-orange-500 text-white' 
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="flex-1 py-2 px-2 rounded-lg transition-all duration-200 flex items-center justify-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Display Area */}
      <div className="px-4 flex-shrink-0">
        {mode !== 'converter' && (
          <DisplayArea 
            expression={calculator.expression} 
            result={calculator.result}
            onExpressionChange={handleExpressionChange}
          />
        )}
      </div>

      {/* Calculator Interface */}
      <div className="flex-1 px-4 pb-6 overflow-hidden flex flex-col justify-center">
        <div className="w-full">
          {mode === 'basic' && (
            <div className="grid grid-cols-4 gap-4 w-full max-w-xs mx-auto">
              {/* Row 1 */}
              <button 
                className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
                onClick={calculator.clear}
              >
                C
              </button>
              <button 
                className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
                onClick={calculator.addBrackets}
              >
                ()
              </button>
              <button 
                className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
                onClick={calculator.addPercentage}
              >
                %
              </button>
              <button 
                className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
                onClick={() => calculator.addOperator('divide')}
              >
                ÷
              </button>
              
              {/* Row 2 */}
              <button 
                className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
                onClick={() => calculator.addNumber('7')}
              >
                7
              </button>
              <button 
                className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
                onClick={() => calculator.addNumber('8')}
              >
                8
              </button>
              <button 
                className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
                onClick={() => calculator.addNumber('9')}
              >
                9
              </button>
              <button 
                className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
                onClick={() => calculator.addOperator('multiply')}
              >
                ×
              </button>
              
              {/* Row 3 */}
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
                onClick={() => calculator.addOperator('subtract')}
              >
                −
              </button>
              
              {/* Row 4 */}
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
                onClick={() => calculator.addNumber('0')}
              >
                0
              </button>
              <button 
                className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center border border-gray-400 dark:border-transparent"
                onClick={calculator.addDecimal}
              >
                .
              </button>
              <button 
                className="calculator-button bg-orange-500 text-white rounded-full aspect-square text-lg font-medium shadow-sm flex items-center justify-center"
                onClick={() => {
                  const expressionBeforeCalc = calculator.expression;
                  if (expressionBeforeCalc) {
                    calculator.calculate();
                    setTimeout(() => {
                      if (calculator.result !== 'Error' && expressionBeforeCalc) {
                        handleCalculation(expressionBeforeCalc, calculator.result);
                      }
                    }, 50);
                  }
                }}
              >
                =
              </button>
            </div>
          )}
          {mode === 'scientific' && (
            <ScientificCalculator onCalculate={handleCalculation} />
          )}
          {mode === 'converter' && (
            <UnitConverter />
          )}
        </div>
      </div>

      {/* Modals */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={clearHistory}
      />
    </div>
  );
}