import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BigButtonProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "muted" | "destructive";
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
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left group",
        variant === "default" && "bg-card border-primary/20 hover:border-primary/40 hover:bg-primary/5",
        variant === "secondary" && "bg-secondary border-secondary hover:bg-secondary/80",
        variant === "muted" && "bg-muted/50 border-muted hover:bg-muted",
        variant === "destructive" && "bg-destructive/10 border-destructive/30 hover:border-destructive/50 hover:bg-destructive/15",
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors",
        variant === "default" && "bg-primary/10 group-hover:bg-primary/15",
        variant === "secondary" && "bg-primary/20",
        variant === "muted" && "bg-muted",
        variant === "destructive" && "bg-destructive/15"
      )}>
        <Icon className={cn(
          "w-7 h-7",
          variant === "destructive" ? "text-destructive" : "text-primary"
        )} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {label}
        </div>
        {description && (
          <div className="text-sm text-muted-foreground mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
    </button>
  );
}