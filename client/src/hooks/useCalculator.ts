import { useState, useCallback } from 'react';
import { evaluateExpression, calculateScientificFunction, CONSTANTS } from '@/lib/calculator';

export interface CalculatorState {
  expression: string;
  result: string;
  isError: boolean;
  lastOperator: string | null;
  previousResult: string | null;
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    expression: '',
    result: '0',
    isError: false,
    lastOperator: null,
    previousResult: null,
  });

  const addToExpression = useCallback((value: string) => {
    setState(prev => {
      if (prev.isError) {
        return {
          ...prev,
          expression: value,
          result: '0',
          isError: false,
        };
      }
      
      // Auto-clear result when new input is entered
      const shouldClearResult = prev.previousResult !== null && prev.expression === prev.result;
      
      return {
        ...prev,
        expression: shouldClearResult ? value : prev.expression + value,
        result: shouldClearResult ? '0' : prev.result,
        previousResult: shouldClearResult ? null : prev.previousResult,
      };
    });
  }, []);

  const addNumber = useCallback((number: string) => {
    addToExpression(number);
  }, [addToExpression]);

  const addOperator = useCallback((operator: string) => {
    setState(prev => {
      if (prev.isError) return prev;
      
      const operatorSymbols = {
        'add': '+',
        'subtract': '−',
        'multiply': '×',
        'divide': '÷',
      };
      
      const symbol = operatorSymbols[operator as keyof typeof operatorSymbols] || operator;
      
      // Replace last operator if expression ends with one
      const lastChar = prev.expression.slice(-1);
      if (['+', '−', '×', '÷'].includes(lastChar)) {
        return {
          ...prev,
          expression: prev.expression.slice(0, -1) + symbol,
          lastOperator: operator,
        };
      }
      
      return {
        ...prev,
        expression: prev.expression + symbol,
        lastOperator: operator,
      };
    });
  }, []);

  const addDecimal = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;
      
      // Check if current number already has a decimal
      const parts = prev.expression.split(/[+−×÷]/);
      const currentNumber = parts[parts.length - 1];
      
      if (currentNumber.includes('.')) {
        return prev;
      }
      
      return {
        ...prev,
        expression: prev.expression + '.',
      };
    });
  }, []);

  const toggleSign = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;
      
      if (!prev.expression) {
        return prev;
      }
      
      // Simple implementation: add/remove negative sign at the beginning
      if (prev.expression.startsWith('−')) {
        return {
          ...prev,
          expression: prev.expression.substring(1),
        };
      } else {
        return {
          ...prev,
          expression: '−' + prev.expression,
        };
      }
    });
  }, []);

  const addBrackets = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;
      
      const openCount = (prev.expression.match(/\(/g) || []).length;
      const closeCount = (prev.expression.match(/\)/g) || []).length;
      
      if (openCount > closeCount) {
        return {
          ...prev,
          expression: prev.expression + ')',
        };
      } else {
        return {
          ...prev,
          expression: prev.expression + '(',
        };
      }
    });
  }, []);

  const addPercentage = useCallback(() => {
    setState(prev => {
      if (prev.isError) return prev;
      
      return {
        ...prev,
        expression: prev.expression + '%',
      };
    });
  }, []);

  const clear = useCallback(() => {
    setState({
      expression: '',
      result: '0',
      isError: false,
      lastOperator: null,
      previousResult: null,
    });
  }, []);

  const calculate = useCallback(() => {
    setState(prev => {
      if (!prev.expression) return prev;
      
      const calculationResult = evaluateExpression(prev.expression);
      
      if (calculationResult.error) {
        return {
          ...prev,
          result: 'Error',
          isError: true,
        };
      }
      
      return {
        expression: calculationResult.result,
        result: calculationResult.result,
        isError: false,
        lastOperator: null,
        previousResult: calculationResult.result,
      };
    });
  }, []);

  const addScientificFunction = useCallback((func: string) => {
    setState(prev => {
      if (prev.isError) return prev;
      
      if (func === 'pi') {
        return {
          ...prev,
          expression: prev.expression + CONSTANTS.pi.toString(),
        };
      }
      
      if (func === 'e') {
        return {
          ...prev,
          expression: prev.expression + CONSTANTS.e.toString(),
        };
      }
      
      // For functions that need parentheses
      const functionsWithParens = ['sin', 'cos', 'tan', 'ln', 'log', 'sqrt'];
      if (functionsWithParens.includes(func)) {
        return {
          ...prev,
          expression: prev.expression + func + '(',
        };
      }
      
      return {
        ...prev,
        expression: prev.expression + func,
      };
    });
  }, []);

  const setExpression = useCallback((newExpression: string) => {
    setState(prev => ({
      ...prev,
      expression: newExpression,
      result: '0',
      isError: false,
    }));
  }, []);

  return {
    ...state,
    addNumber,
    addOperator,
    addDecimal,
    toggleSign,
    addBrackets,
    addPercentage,
    clear,
    calculate,
    addScientificFunction,
    setExpression,
  };
}
