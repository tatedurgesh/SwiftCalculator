import { useState, useRef, useEffect } from 'react';

interface DisplayAreaProps {
  expression: string;
  result: string;
  onExpressionChange?: (expression: string) => void;
}

export function DisplayArea({ expression, result, onExpressionChange }: DisplayAreaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(expression);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(expression);
  }, [expression]);

  const handleClick = () => {
    if (onExpressionChange) {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  };

  const handleSubmit = () => {
    if (onExpressionChange) {
      onExpressionChange(editValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditValue(expression);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm min-h-24">
      <div className="text-right">
        {/* Expression - editable */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="w-full text-black dark:text-white text-3xl font-light mb-2 min-h-10 number-format overflow-hidden bg-transparent border-none outline-none text-right"
          />
        ) : (
          <div 
            className="text-black dark:text-white text-3xl font-light mb-2 min-h-10 number-format overflow-hidden cursor-text"
            onClick={handleClick}
          >
            {expression || "0"}
          </div>
        )}
        {/* Result - smaller gray text */}
        <div className="text-gray-500 dark:text-gray-400 text-lg number-format overflow-hidden">
          {result && result !== expression ? result : ""}
        </div>
      </div>
    </div>
  );
}
