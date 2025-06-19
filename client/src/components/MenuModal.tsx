import { Clock, Settings } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowHistory: () => void;
}

export function MenuModal({ isOpen, onClose, onShowHistory }: MenuModalProps) {
  if (!isOpen) return null;

  const handleShowHistory = () => {
    onShowHistory();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg ios-blur min-w-48" onClick={(e) => e.stopPropagation()}>
        <div className="p-2">
          <button 
            onClick={handleShowHistory}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-black dark:text-white"
          >
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5" />
              <span>History</span>
            </div>
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-black dark:text-white">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
