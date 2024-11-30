import {
  LayoutDashboard, Shapes,
  Store,
  ChartNoAxesCombined,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/shops/new",
    icon: <Store />,
    label: "Create New Shop",
  },
  {
    url: "/products/new",
    icon: <Shapes />,
    label: "Products",
  },
  {
    url: "/metrics",
    icon: <ChartNoAxesCombined />,
    label: "Metrics",
  },
];
