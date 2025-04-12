import { 
  Home, LayoutDashboard, GraduationCap, Monitor, Users, Building2,
  Bell, Building, Megaphone,History, Settings, Headphones, UserCog, BookCheck, UserPlus, Briefcase, 
  CalendarRange, ShoppingCart, BadgeHelp, MessageSquare, LineChart, 
  CircleDollarSign, Cog, Shield,Phone,SlidersHorizontal,UsersRound
} from "lucide-react";

export const menuItems = [
  { icon: Home, label: "Home" },
  { 
    icon: LayoutDashboard, label: "Dashboard",
    children: [
      { icon: UserCog, label: "Admin Dashboard" },
      { icon: Users, label: "Sales Emp Dashboard" },
      { icon: SlidersHorizontal,label:"Operations"}
    ]
  },

  { 
    icon: UsersRound, label: "Teams"
  },
  { icon: GraduationCap, label: "Emp Management" },
  { icon: History, label: "Payment History" },
  
  { 
    icon: Building2, label: "Organization",
    children: [
      { icon: UserCog, label: "Staff" },
      { icon: Users, label: "Understaff" },
      { icon: CalendarRange, label: "Emp Leave" },
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
  
  { icon: Bell, label: "Notifications" },
  { icon: MessageSquare, label: "Support Tickets" },
  { icon: Phone, label: "Contact" },
  { icon: BadgeHelp, label: "FAQs" },

  { 
    icon: Cog, label: "Settings",
    children: [
      { icon: Settings, label: "General Settings" },
      { icon: UserCog, label: "Admin Settings" },
      { icon: UserCog, label: "Roles & Permissions Settings" },
      { icon: UserPlus, label: "Recruitment Settings" },
      { icon: Building2, label: "Company Settings" },
      { icon: Briefcase, label: "Business Settings" },
      { icon: UserCog, label: "Profile Settings" },
      { icon: Bell, label: "Notifications Settings" },
      { icon: CircleDollarSign, label: "Finance Settings" },
      { icon: MessageSquare, label: "Tickets Settings" },
      { icon: Briefcase, label: "Projects Settings" },
      { icon: BookCheck, label: "Tasks Settings" },
      { icon: Shield, label: "Security Settings" },
    ]
  }
];
