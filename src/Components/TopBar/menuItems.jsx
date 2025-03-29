import {
  Home,
  LayoutDashboard,
  BookOpen,
  Users,
  Video,
  GraduationCap,
  Award,
  Building2,
  Clock,
  CalendarDays,
  FolderOpen,
  FileText,
  Tags,
  Wallet,
  Bell,
  LifeBuoy,
  HelpCircle,
  Building,
  Megaphone,
  CreditCard,
  Mail,
  BarChart3,
  History,
  Bookmark,
  Settings
} from 'lucide-react';

export const menuItems = [
  { icon: Home, label: 'Home' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Video, label: 'Video' }, // Corrected icon reference
  { icon: BookOpen, label: 'Enroll' },
  {
    icon: BookOpen,
    label: 'Courses',
    children: [
      { icon: Tags, label: 'Categories' },
      { icon: BookOpen, label: 'Subject' },
      { icon: Tags, label: 'Tag' },
      { icon: Award, label: 'Level' },
      { icon: Award, label: 'Certifications' },
    ]
  },
  { icon: Users, label: 'Students' },
  {
    icon: GraduationCap,
    label: 'Instructors',
    children: [
      { icon: Users, label: 'Instructor List' }
    ]
  },
  { icon: Award, label: 'Expertise' },
  {
    icon: Building2,
    label: 'Organization',
    children: [
      { icon: Users, label: 'Staff' },
      { icon: Users, label: 'Understaff' },
      { icon: Clock, label: 'Employee Leave' },
      { icon: Building, label: 'Department' },
      { icon: Award, label: 'Designation' },
      { icon: BarChart3, label: 'Uprising' }
    ]
  },
  { icon: CalendarDays, label: 'Attendance' },
  { icon: FolderOpen, label: 'MediaLibrary' },
  {
    icon: FileText,
    label: 'Blog Posts',
    children: [
      { icon: Tags, label: 'Categories' }
    ]
  },
  {
    icon: Wallet,
    label: 'Payment Gateway',
    children: [
      { icon: Wallet, label: 'Wallet' },
      {
        icon: CreditCard,
        label: 'Payouts',
        children: [
          { icon: Settings, label: 'Payout Method' },
          { icon: Clock, label: 'Payout Request' }
        ]
      }
    ]
  },
  { icon: Bell, label: 'Notifications' },
  { icon: LifeBuoy, label: 'Support Tickets' },
  { icon: HelpCircle, label: 'FAQs' },
  { icon: Building, label: 'Department' },
  {
    icon: Megaphone,
    label: 'Marketing',
    children: [
      { icon: Tags, label: 'All Coupons' }
    ]
  },
  { icon: CreditCard, label: 'Subscription' },
  { icon: Mail, label: 'Emails' },
  {
    icon: BarChart3,
    label: 'Reports',
    children: [
      { icon: BarChart3, label: 'Core Sales' }
    ]
  },
  { icon: History, label: 'Payment History' },
  { icon: History, label: 'Payout History' },
  { icon: Bookmark, label: 'Wishlist' },
  {
    icon: Settings,
    label: 'Settings',
    children: [
      { icon: Settings, label: 'General Settings' },
      { icon: Settings, label: 'Performance' },
      { icon: Settings, label: 'Currency' },
      { icon: Settings, label: 'Language Settings' },
      { icon: Settings, label: 'Admin Panel Settings' },
      { icon: Settings, label: 'Storage Settings' },
      { icon: Settings, label: 'Role and Permissions' },
      { icon: Settings, label: 'Recruitment Settings' },
      { icon: Settings, label: 'Company Settings' },
      { icon: Settings, label: 'Business Settings' },
      { icon: Settings, label: 'App Settings' },
      { icon: Settings, label: 'Profile Settings' },
      { icon: Settings, label: 'Notification Settings' },
      { icon: Settings, label: 'Finance Settings' },
      { icon: Settings, label: 'Contract Settings' },
      { icon: Settings, label: 'Tax Settings' },
      { icon: Settings, label: 'Ticket Settings' },
      { icon: Settings, label: 'Project Settings' },
      { icon: Settings, label: 'Attendance Settings' },
      { icon: Settings, label: 'Leave Settings' },
      { icon: Settings, label: 'Message Settings' },
      { icon: Settings, label: 'Lead Settings' },
      { icon: Settings, label: 'Time Log Settings' },
      { icon: Settings, label: 'Task Settings' },
      { icon: Settings, label: 'Security Settings' },
      { icon: Settings, label: 'Assets Settings' },
      { icon: Settings, label: 'Payroll Settings' }
    ]
  }
];
