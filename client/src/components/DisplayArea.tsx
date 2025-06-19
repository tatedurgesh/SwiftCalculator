import { formatNumber } from "@/lib/calculator";

interface DisplayAreaProps {
  expression: string;
  result: string;
}

export function DisplayArea({ expression, result }: DisplayAreaProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-4 shadow-sm min-h-32">
      <div className="text-right">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2 min-h-6 number-format">
          {expression || ""}
        </div>
        <div className="text-3xl font-light number-format text-black dark:text-white">
          {result || "0"}
        </div>
      </div>
    </div>
  );
}
