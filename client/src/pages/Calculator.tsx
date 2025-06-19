import { useState } from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useHistory } from '@/hooks/useHistory';
import { StatusBar } from '@/components/StatusBar';
import { DisplayArea } from '@/components/DisplayArea';
import { BasicCalculator } from '@/components/BasicCalculator';
import { ScientificCalculator } from '@/components/ScientificCalculator';
import { UnitConverter } from '@/components/UnitConverter';
import { HistoryModal } from '@/components/HistoryModal';
import { MenuModal } from '@/components/MenuModal';

type CalculatorMode = 'basic' | 'scientific' | 'converter';

export default function Calculator() {
  const { theme, toggleTheme } = useTheme();
  const { history, addToHistory, clearHistory } = useHistory();
  const [mode, setMode] = useState<CalculatorMode>('basic');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');

  const handleCalculation = (expr: string, res: string) => {
    addToHistory(expr, res);
    setExpression('');
    setResult(res);
  };

  return (
    <div className="h-screen flex flex-col bg-ios-gray-light dark:bg-black overflow-hidden">
      <StatusBar />
      
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

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm calculator-button"
        >
          <Menu className="w-5 h-5 text-black dark:text-white" />
        </button>
      </div>

      {/* Calculator Mode Selector */}
      <div className="px-4 mb-4">
        <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setMode('basic')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'basic' 
                ? 'ios-orange text-white' 
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setMode('scientific')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'scientific' 
                ? 'ios-orange text-white' 
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Scientific
          </button>
          <button
            onClick={() => setMode('converter')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === 'converter' 
                ? 'ios-orange text-white' 
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Convert
          </button>
        </div>
      </div>

      {/* Display Area */}
      <div className="px-4">
        {mode !== 'converter' && (
          <DisplayArea expression={expression} result={result} />
        )}
      </div>

      {/* Calculator Interface */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        {mode === 'basic' && (
          <BasicCalculator onCalculate={handleCalculation} />
        )}
        {mode === 'scientific' && (
          <ScientificCalculator onCalculate={handleCalculation} />
        )}
        {mode === 'converter' && (
          <UnitConverter />
        )}
      </div>

      {/* Modals */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={clearHistory}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onShowHistory={() => setIsHistoryOpen(true)}
      />
    </div>
  );
}
