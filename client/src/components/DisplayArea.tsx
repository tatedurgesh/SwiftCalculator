import { formatNumber } from "@/lib/calculator";

interface DisplayAreaProps {
  expression: string;
  result: string;
}

export function DisplayArea({ expression, result }: DisplayAreaProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm min-h-24">
      <div className="text-right">
        <div className="text-gray-500 dark:text-gray-400 text-sm mb-1 min-h-5 number-format overflow-hidden">
          {expression || ""}
        </div>
        <div className="text-2xl font-light number-format text-black dark:text-white overflow-hidden">
          {result || "0"}
        </div>
      </div>
    </div>
  );
}
