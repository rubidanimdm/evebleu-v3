import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'open' | 'in_progress' | 'done' | 'paid' | 'unpaid';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    open: { label: 'Open', color: 'bg-destructive text-destructive-foreground' },
    in_progress: { label: 'In Progress', color: 'bg-warning text-white' },
    done: { label: 'Done', color: 'bg-success text-white' },
    paid: { label: 'Paid', color: 'bg-success text-white' },
    unpaid: { label: 'Unpaid', color: 'bg-destructive text-destructive-foreground' },
  };

  const config = statusConfig[status];

  return (
    <Badge className={cn(config.color, "font-semibold", className)}>
      {config.label}
    </Badge>
  );
}
