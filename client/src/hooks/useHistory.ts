import { useState, useEffect, useCallback } from 'react';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculator-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculator-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((expression: string, result: string) => {
    if (!expression || !result || result === 'Error') return;

    const entry: HistoryEntry = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: Date.now(),
    };

    setHistory(prev => [entry, ...prev.slice(0, 49)]); // Keep only last 50 entries
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
}
