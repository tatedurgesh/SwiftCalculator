import { useState, useCallback } from 'react';
import { UNIT_TYPES, convertUnit, UnitType } from '@/lib/unitConversions';

export function useUnitConverter() {
  const [selectedType, setSelectedType] = useState<UnitType>(UNIT_TYPES[0]);
  const [fromUnit, setFromUnit] = useState<string>('acres');
  const [toUnit, setToUnit] = useState<string>('sqm');
  const [fromValue, setFromValue] = useState<string>('1');

  const changeUnitType = useCallback((typeId: string) => {
    const newType = UNIT_TYPES.find(type => type.id === typeId);
    if (newType) {
      setSelectedType(newType);
      const units = Object.keys(newType.units);
      setFromUnit(units[0]);
      setToUnit(units[1] || units[0]);
      setFromValue('1');
    }
  }, []);

  const swapUnits = useCallback(() => {
    const currentToValue = getConvertedValue();
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(currentToValue.toString());
  }, [fromUnit, toUnit, fromValue, selectedType]);

  const getConvertedValue = useCallback((): number => {
    const value = parseFloat(fromValue.replace(/,/g, ''));
    if (isNaN(value)) return 0;
    
    return convertUnit(value, fromUnit, toUnit, selectedType);
  }, [fromValue, fromUnit, toUnit, selectedType]);

  const updateFromValue = useCallback((value: string) => {
    // Allow numbers, decimal point, and backspace
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value.replace(/,/g, ''))) {
      setFromValue(value);
    }
  }, []);

  const addDigitToValue = useCallback((digit: string) => {
    if (digit === '.' && fromValue.includes('.')) return;
    
    if (fromValue === '0' && digit !== '.') {
      setFromValue(digit);
    } else {
      setFromValue(prev => prev + digit);
    }
  }, [fromValue]);

  const clearValue = useCallback(() => {
    setFromValue('0');
  }, []);

  const deleteLastDigit = useCallback(() => {
    setFromValue(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  }, []);

  return {
    selectedType,
    fromUnit,
    toUnit,
    fromValue,
    convertedValue: getConvertedValue(),
    changeUnitType,
    setFromUnit,
    setToUnit,
    updateFromValue,
    addDigitToValue,
    clearValue,
    deleteLastDigit,
    swapUnits,
  };
}
