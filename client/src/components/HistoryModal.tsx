import { X } from 'lucide-react';
import { HistoryEntry } from '@/hooks/useHistory';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onClearHistory: () => void;
}

export function HistoryModal({ isOpen, onClose, history, onClearHistory }: HistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="w-full bg-ios-gray-light dark:bg-ios-gray-dark rounded-t-3xl max-h-96 ios-blur animate-slide-up">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">History</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 calculator-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto hide-scrollbar">
            {history.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No calculations yet
              </div>
            ) : (
              history.map((entry) => (
                <div key={entry.id} className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 number-format">
                    {entry.expression}
                  </div>
                  <div className="text-lg number-format text-black dark:text-white">
                    = {entry.result}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {history.length > 0 && (
            <button 
              onClick={onClearHistory}
              className="w-full mt-4 py-3 ios-teal text-white rounded-xl font-medium calculator-button"
            >
              Clear history
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
