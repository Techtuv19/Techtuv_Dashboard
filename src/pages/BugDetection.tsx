import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Filter, Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const bugData = [
  { id: "BUG-001", title: "Login button not responding on mobile", severity: "critical", status: "open", platform: "iOS", date: "2025-01-10" },
  { id: "BUG-002", title: "Payment gateway timeout error", severity: "critical", status: "in-progress", platform: "Web", date: "2025-01-09" },
  { id: "BUG-003", title: "Image upload fails for files > 5MB", severity: "major", status: "open", platform: "Android", date: "2025-01-08" },
  { id: "BUG-004", title: "Profile page layout breaks on tablet", severity: "major", status: "open", platform: "Web", date: "2025-01-08" },
  { id: "BUG-005", title: "Search results pagination not working", severity: "minor", status: "resolved", platform: "Web", date: "2025-01-07" },
  { id: "BUG-006", title: "Dark mode toggle doesn't persist", severity: "minor", status: "in-progress", platform: "iOS", date: "2025-01-06" },
  { id: "BUG-007", title: "Notification badges showing wrong count", severity: "minor", status: "open", platform: "Android", date: "2025-01-05" },
  { id: "BUG-008", title: "Database connection pool exhausted", severity: "critical", status: "resolved", platform: "Backend", date: "2025-01-04" },
];

const severityColors = {
  critical: "bg-destructive text-destructive-foreground",
  major: "bg-yellow-500 text-black",
  minor: "bg-blue-500 text-white",
};

const statusColors = {
  open: "border-destructive text-destructive",
  "in-progress": "border-yellow-500 text-yellow-500",
  resolved: "border-green-500 text-green-500",
};

export default function BugDetection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filteredBugs = bugData.filter((bug) => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || bug.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || bug.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || bug.platform === platformFilter;
    return matchesSearch && matchesSeverity && matchesStatus && matchesPlatform;
  });

  const criticalCount = bugData.filter((b) => b.severity === "critical" && b.status !== "resolved").length;
  const majorCount = bugData.filter((b) => b.severity === "major" && b.status !== "resolved").length;
  const minorCount = bugData.filter((b) => b.severity === "minor" && b.status !== "resolved").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bug Detection</h1>
          <p className="text-muted-foreground">AI-powered bug tracking and analysis</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-xl border-l-4 border-destructive"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Critical</p>
              <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-destructive opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl border-l-4 border-yellow-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Major</p>
              <p className="text-3xl font-bold text-yellow-500">{majorCount}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-500 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-xl border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Minor</p>
              <p className="text-3xl font-bold text-blue-500">{minorCount}</p>
            </div>
            <Bug className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bugs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-input"
            />
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="major">Major</SelectItem>
              <SelectItem value="minor">Minor</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="iOS">iOS</SelectItem>
              <SelectItem value="Android">Android</SelectItem>
              <SelectItem value="Web">Web</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bugs List */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Severity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Platform</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredBugs.map((bug, index) => (
                <motion.tr
                  key={bug.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium">{bug.id}</td>
                  <td className="px-6 py-4 text-sm">{bug.title}</td>
                  <td className="px-6 py-4">
                    <Badge className={severityColors[bug.severity as keyof typeof severityColors]}>
                      {bug.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={statusColors[bug.status as keyof typeof statusColors]}>
                      {bug.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{bug.platform}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{bug.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBugs.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <Bug className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No bugs found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
