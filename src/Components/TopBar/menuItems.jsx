import { 
  Home, LayoutDashboard, GraduationCap, Monitor, Users, Building2, Clock, 
  Banknote, Wallet, Bell, Building, Megaphone, CreditCard, 
  History, Settings, Headphones, UserCog, BookCheck, UserPlus, Briefcase, 
  CalendarRange, ShoppingCart, BadgeHelp, MessageSquare, LineChart, 
  CircleDollarSign, Cog, Shield,Phone
} from "lucide-react";

export const menuItems = [
  { icon: Home, label: "Home" },
  { 
    icon: LayoutDashboard, label: "Dashboard",
    children: [
      { icon: UserCog, label: "Admin Dashboard" },
      { icon: Users, label: "Emp Dashboard" }
    ]
  },

  { 
    icon: Headphones, label: "Leads",
    children: [
      { icon: UserPlus, label: "Leads" },
      { icon: LineChart, label: "Sales" }
    ]
  },
  { icon: GraduationCap, label: "Emp Management" },
  { icon: History, label: "Payment History" },
  { icon: Banknote, label: "Payout History" },
  { 
    icon: Building2, label: "Organization",
    children: [
      { icon: UserCog, label: "Staff" },
      { icon: Users, label: "Understaff" },
      { icon: CalendarRange, label: "Employee Leave" },
      { icon: Building, label: "Department" },
      { icon: Briefcase, label: "Designation" },
      { icon: LineChart, label: "Uprising" }
    ]
  },
  { 
    icon: Building2, label: "Department",
    children: [
      { icon: Megaphone, label: "Marketing" },
      { icon: Users, label: "HR" },
      { icon: Briefcase, label: "Finance" },
      { icon: ShoppingCart, label: "Sales" },
      { icon: Headphones, label: "Support" },
      { icon: Monitor, label: "IT" },
      { icon: Settings, label: "Admin" }
    ]
  },
  { 
    icon: ShoppingCart, label: "Payment Gateway",
    children: [
      { icon: Wallet, label: "Wallet" },
      { 
        icon: CircleDollarSign, label: "Payouts",
        children: [
          { icon: CreditCard, label: "Payout Method" },
          { icon: Clock, label: "Payout Request" }
        ]
      }
    ]
  },
  { icon: Bell, label: "Notifications" },
  { icon: MessageSquare, label: "Support Tickets" },
  { icon: Phone, label: "Contact" },
  { icon: BadgeHelp, label: "FAQs" },

  { 
    icon: Cog, label: "Settings",
    children: [
      { icon: Settings, label: "General" },
      { icon: UserCog, label: "Admin Panel" },
      { icon: UserCog, label: "Roles & Permissions" },
      { icon: UserPlus, label: "Recruitment" },
      { icon: Building2, label: "Company" },
      { icon: Briefcase, label: "Business" },
      { icon: UserCog, label: "Profile" },
      { icon: Bell, label: "Notifications" },
      { icon: CircleDollarSign, label: "Finance" },
      { icon: MessageSquare, label: "Tickets" },
      { icon: Briefcase, label: "Projects" },
      { icon: BookCheck, label: "Tasks" },
      { icon: Shield, label: "Security" },
    ]
  }
];
