import { Wifi, Signal, Battery } from "lucide-react";

export function StatusBar() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex justify-between items-center px-6 py-2 text-sm font-semibold bg-ios-gray-light dark:bg-black text-black dark:text-white">
      <span>{currentTime}</span>
      <div className="flex items-center space-x-1">
        <Wifi className="w-4 h-4" />
        <Signal className="w-4 h-4" />
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-current rounded-full"></div>
          <div className="w-1 h-3 bg-current rounded-full"></div>
          <div className="w-1 h-3 bg-current rounded-full"></div>
          <div className="w-1 h-3 bg-current rounded-full"></div>
        </div>
        <span className="px-1 text-xs border border-current rounded">77</span>
      </div>
    </div>
  );
}
