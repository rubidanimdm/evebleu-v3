import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BigButtonProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "destructive";
  className?: string;
}

export function BigButton({
  icon: Icon,
  label,
  description,
  onClick,
  variant = "default",
  className,
}: BigButtonProps) {
  return (
    <Button
      variant={variant}
      size="lg"
      onClick={onClick}
      className={cn(
        "w-full h-auto min-h-[80px] flex flex-col gap-2 p-6 text-left justify-start items-start",
        className
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <Icon className="h-8 w-8 flex-shrink-0" />
        <div className="flex-1">
          <div className="font-semibold text-lg">{label}</div>
          {description && (
            <div className="text-sm opacity-90 font-normal">{description}</div>
          )}
        </div>
      </div>
    </Button>
  );
}
