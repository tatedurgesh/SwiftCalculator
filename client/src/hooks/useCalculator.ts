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
    console.log('Adding number:', number); // Debug log
    addToExpression(number);
  }, [addToExpression]);

  const addOperator = useCallback((operator: string) => {
    console.log('Adding operator:', operator); // Debug log
    setState(prev => {
      if (prev.isError) return prev;
      
      const operatorSymbols = {
        'add': '+',
        'subtract': '−',
        'multiply': '×',
        'divide': '÷',
        'power': '^',
      };
      
      const symbol = operatorSymbols[operator as keyof typeof operatorSymbols] || operator;
      
      // Replace last operator if expression ends with one
      const lastChar = prev.expression.slice(-1);
      if (['+', '−', '×', '÷', '^'].includes(lastChar)) {
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
    console.log('Adding decimal'); // Debug log
    setState(prev => {
      if (prev.isError) return prev;
      
      // Check if current number already has a decimal
      const parts = prev.expression.split(/[+−×÷^]/);
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
    console.log('Clearing calculator'); // Debug log
    setState({
      expression: '',
      result: '0',
      isError: false,
      lastOperator: null,
      previousResult: null,
    });
  }, []);

  const calculate = useCallback(() => {
    console.log('Calculating:', state.expression); // Debug log
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
  }, [state.expression]);

  const addScientificFunction = useCallback((func: string, angleMode: 'deg' | 'rad' = 'deg') => {
    console.log('Adding scientific function:', func); // Debug log
    setState(prev => {
      if (prev.isError) return prev;
      
      if (func === 'pi') {
        return {
          ...prev,
          expression: prev.expression + 'π',
        };
      }
      
      if (func === 'e') {
        return {
          ...prev,
          expression: prev.expression + 'e',
        };
      }

      if (func === 'random') {
        return {
          ...prev,
          expression: prev.expression + Math.random().toString(),
        };
      }
      
      // For functions that need parentheses
      const functionsWithParens = [
        'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
        'ln', 'log', 'sqrt', 'cbrt', 'exp', 'pow10', 'abs'
      ];
      
      if (functionsWithParens.includes(func)) {
        const functionName = func === 'pow10' ? '10^' : 
                           func === 'cbrt' ? '∛' :
                           func === 'asin' ? 'sin⁻¹' :
                           func === 'acos' ? 'cos⁻¹' :
                           func === 'atan' ? 'tan⁻¹' :
                           func === 'abs' ? '|' :
                           func;
        
        if (func === 'pow10') {
          return {
            ...prev,
            expression: prev.expression + '10^(',
          };
        }
        
        if (func === 'abs') {
          return {
            ...prev,
            expression: prev.expression + '|',
          };
        }
        
        return {
          ...prev,
          expression: prev.expression + functionName + '(',
        };
      }
      
      // For operations that work on the current number
      if (['square', 'cube', 'reciprocal', 'factorial'].includes(func)) {
        const operation = func === 'square' ? '²' :
                         func === 'cube' ? '³' :
                         func === 'reciprocal' ? '⁻¹' :
                         func === 'factorial' ? '!' : '';
        
        return {
          ...prev,
          expression: prev.expression + operation,
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