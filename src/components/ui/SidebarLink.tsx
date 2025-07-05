import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarLinkBaseProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: number;
  children: React.ReactNode;
}

const SidebarLinkBase = ({ icon: Icon, label, active, badge, children }: SidebarLinkBaseProps) => (
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </div>
    {badge !== undefined && badge > 0 && (
      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
    {children}
  </div>
);

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  to?: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}

export function SidebarLink({ 
  icon, 
  label, 
  to, 
  active = false, 
  onClick, 
  badge 
}: SidebarLinkProps) {
  const content = (
    <SidebarLinkBase icon={icon} label={label} active={active} badge={badge}>
      {null}
    </SidebarLinkBase>
  );

  if (!to) {
    return (
      <button
        onClick={onClick}
        className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
          active 
            ? 'bg-blue-50 text-blue-600 font-semibold' 
            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
        }`}
      >
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl transition-colors ${
          isActive || active
            ? 'bg-blue-50 text-blue-600 font-semibold' 
            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
        }`
      }
    >
      {content}
    </NavLink>
  );
}
