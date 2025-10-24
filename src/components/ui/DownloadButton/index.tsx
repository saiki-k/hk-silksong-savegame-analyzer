import { Button } from "@/components/ui";
import { cn } from "@/utils";

interface DownloadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const downloadButtonStyles = {
  base: "bg-gray-700/30 text-gray-400 border border-gray-600/30 hover:border-gray-500/50 hover:text-gray-300 font-semibold py-2 px-4 rounded transition-all duration-200 flex-1 cursor-pointer",
} as const;

export function DownloadButton({ children, onClick, className, ...props }: DownloadButtonProps) {
  return (
    <Button onClick={onClick} className={cn(downloadButtonStyles.base, className)} {...props}>
      {children}
    </Button>
  );
}
