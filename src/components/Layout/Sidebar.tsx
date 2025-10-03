import { NavLink } from "react-router-dom";
import { Home, Bug, AlertTriangle, FileText, Plug, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Bug Detection", path: "/bugs", icon: Bug },
  { name: "UX Issues", path: "/ux-issues", icon: AlertTriangle },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Integrations", path: "/integrations", icon: Plug },
  { name: "Profile", path: "/profile", icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-card rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass-card border-r border-white/10 p-6 z-40 transition-transform duration-300 ease-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="mb-8 pt-12 lg:pt-0 text-center">
            {/* Clickable Logo Image */}
            <a href="https://techtuv.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="/logo.png"   // Replace with your logo path
                alt="TechTuv Logo"
                className="mx-auto w-32 h-auto"
              />
            </a>
          </div>



          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 text-xs text-muted-foreground">
  <p>
    © 2025 <a href="https://techtuv.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">TechTuv</a>
  </p>
  <p className="mt-1">Powered by AI</p>
</div>

        </div>
      </aside>
    </>
  );
}
