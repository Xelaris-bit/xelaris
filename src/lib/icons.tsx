
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function getIcon(iconName: string): any {
    if (!iconName) return LucideIcons.HelpCircle;
    
    // @ts-ignore - Dynamic access to icons
    const Icon = LucideIcons[iconName];
    if (Icon) return Icon;

    return ({ className, ...props }: any) => (
        <img 
            src={`https://cdn.simpleicons.org/${iconName}`} 
            alt={iconName} 
            className={className}
            style={{ width: '1em', height: '1em', ...props.style }}
        />
    );
}

export const iconList = [
    'Code', 'Smartphone', 'Globe', 'Database', 'Server', 'Cloud', 'Shield', 'Lock',
    'Zap', 'Cpu', 'Activity', 'BarChart', 'PieChart', 'TrendingUp', 'Target',
    'Users', 'UserPlus', 'Briefcase', 'Building', 'MapPin', 'Phone', 'Mail',
    'MessageCircle', 'Camera', 'Video', 'Music', 'Headphones', 'Speaker',
    'PenTool', 'Edit', 'Layers', 'Layout', 'Grid', 'List', 'CheckCircle',
    'AlertCircle', 'Info', 'HelpCircle', 'Settings', 'Tool', 'Truck', 'Package',
    'ShoppingBag', 'CreditCard', 'DollarSign', 'Award', 'Star', 'Heart', 'ThumbsUp',
    'Megaphone', 'School', 'Book', 'GraduationCap', 'Lightbulb', 'Rocket', 'Anchor'
];
