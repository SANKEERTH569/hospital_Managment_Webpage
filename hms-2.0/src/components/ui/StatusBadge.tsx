import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

type Status = 'confirmed' | 'pending' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig = {
    confirmed: {
      icon: CheckCircle2,
      text: 'Confirmed',
      bg: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-500',
    },
    pending: {
      icon: Clock,
      text: 'Pending',
      bg: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-500',
    },
    completed: {
      icon: CheckCircle2,
      text: 'Completed',
      bg: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-500',
    },
    cancelled: {
      icon: XCircle,
      text: 'Cancelled',
      bg: 'bg-red-50',
      textColor: 'text-red-700',
      iconColor: 'text-red-500',
    },
  };

  const { icon: Icon, text, bg, textColor, iconColor } = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${textColor} ${className}`}
    >
      <Icon className={`w-3.5 h-3.5 mr-1.5 ${iconColor}`} />
      {text}
    </div>
  );
}
