import { useUnitConverter } from '@/hooks/useUnitConverter';
import { UNIT_TYPES } from '@/lib/unitConversions';
import { formatNumber } from '@/lib/calculator';
import { ArrowUpDown, ArrowDown } from 'lucide-react';

export function UnitConverter() {
  const converter = useUnitConverter();

  return (
    <div className="space-y-4">
      {/* Unit Type Selector */}
      <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
        {UNIT_TYPES.map((type) => (
          <button
            key={type.id}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              converter.selectedType.id === type.id
                ? 'ios-orange text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
            onClick={() => converter.changeUnitType(type.id)}
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* From Unit */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <select 
          className="w-full bg-transparent text-sm mb-2 font-medium text-black dark:text-white"
          value={converter.fromUnit}
          onChange={(e) => converter.setFromUnit(e.target.value)}
        >
          {Object.entries(converter.selectedType.units).map(([key, unit]) => (
            <option key={key} value={key} className="bg-white dark:bg-gray-800">
              {unit.name}
            </option>
          ))}
        </select>
        <div className="flex items-center">
          <input 
            type="text" 
            className="flex-1 bg-transparent text-2xl font-light number-format text-black dark:text-white outline-none"
            value={converter.fromValue}
            onChange={(e) => converter.updateFromValue(e.target.value)}
            placeholder="0"
          />
          <span className="text-blue-500 ml-2 text-sm">
            {converter.selectedType.units[converter.fromUnit]?.symbol}
          </span>
        </div>
      </div>

      {/* To Unit */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <select 
          className="w-full bg-transparent text-sm mb-2 font-medium text-black dark:text-white"
          value={converter.toUnit}
          onChange={(e) => converter.setToUnit(e.target.value)}
        >
          {Object.entries(converter.selectedType.units).map(([key, unit]) => (
            <option key={key} value={key} className="bg-white dark:bg-gray-800">
              {unit.name}
            </option>
          ))}
        </select>
        <div className="text-2xl font-light number-format text-pink-500">
          {formatNumber(converter.convertedValue)} {converter.selectedType.units[converter.toUnit]?.symbol}
        </div>
      </div>

      {/* Converter Keypad */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('7')}
        >
          7
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('8')}
        >
          8
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('9')}
        >
          9
        </button>
        <button 
          className="calculator-button ios-orange text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={converter.deleteLastDigit}
        >
          ×
        </button>
        
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('4')}
        >
          4
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('5')}
        >
          5
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('6')}
        >
          6
        </button>
        <button 
          className="calculator-button bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={converter.clearValue}
        >
          C
        </button>
        
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('1')}
        >
          1
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('2')}
        >
          2
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('3')}
        >
          3
        </button>
        <button 
          className="calculator-button ios-teal text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px] flex items-center justify-center"
          onClick={converter.swapUnits}
        >
          <ArrowUpDown className="w-5 h-5" />
        </button>
        
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => {
            const value = converter.fromValue;
            if (value.startsWith('-')) {
              converter.updateFromValue(value.substring(1));
            } else {
              converter.updateFromValue('-' + value);
            }
          }}
        >
          +/−
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('0')}
        >
          0
        </button>
        <button 
          className="calculator-button bg-white dark:bg-gray-800 text-black dark:text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px]"
          onClick={() => converter.addDigitToValue('.')}
        >
          .
        </button>
        <button 
          className="calculator-button ios-teal text-white rounded-full aspect-square text-lg font-medium shadow-sm min-h-[60px] flex items-center justify-center"
          onClick={converter.swapUnits}
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
