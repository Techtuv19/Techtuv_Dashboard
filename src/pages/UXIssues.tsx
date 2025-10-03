import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Zap, Eye, Accessibility } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const uxIssuesData = {
  usability: [
    { id: "UX-U01", title: "Button labels unclear on checkout page", impact: "high", affected: "Mobile", score: 65 },
    { id: "UX-U02", title: "Navigation menu too complex", impact: "medium", affected: "Web", score: 72 },
    { id: "UX-U03", title: "Form validation messages not visible", impact: "high", affected: "All", score: 60 },
    { id: "UX-U04", title: "Inconsistent icon usage across pages", impact: "low", affected: "All", score: 85 },
  ],
  performance: [
    { id: "UX-P01", title: "Dashboard loads slowly on 3G", impact: "high", affected: "Mobile", score: 55 },
    { id: "UX-P02", title: "Image optimization needed", impact: "medium", affected: "Web", score: 70 },
    { id: "UX-P03", title: "API response time exceeds 2s", impact: "high", affected: "All", score: 58 },
    { id: "UX-P04", title: "Lazy loading not implemented", impact: "medium", affected: "Web", score: 68 },
  ],
  accessibility: [
    { id: "UX-A01", title: "Missing alt text on images", impact: "high", affected: "All", score: 62 },
    { id: "UX-A02", title: "Low contrast on buttons", impact: "medium", affected: "Web", score: 75 },
    { id: "UX-A03", title: "Keyboard navigation broken", impact: "high", affected: "Web", score: 58 },
    { id: "UX-A04", title: "ARIA labels missing on forms", impact: "medium", affected: "All", score: 70 },
  ],
};

const impactColors = {
  high: "text-destructive",
  medium: "text-yellow-500",
  low: "text-blue-500",
};

export default function UXIssues() {
  const [activeTab, setActiveTab] = useState("usability");

  const totalIssues = Object.values(uxIssuesData).flat().length;
  const highImpactCount = Object.values(uxIssuesData).flat().filter((i) => i.impact === "high").length;
  const averageScore = Math.round(
    Object.values(uxIssuesData).flat().reduce((sum, issue) => sum + issue.score, 0) / totalIssues
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">UX Issues</h1>
        <p className="text-muted-foreground">User experience analysis and recommendations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Total Issues</h3>
            <AlertTriangle className="w-5 h-5 text-primary" />
          </div>
          <p className="text-4xl font-bold">{totalIssues}</p>
          <p className="text-sm text-muted-foreground mt-2">Across all categories</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">High Impact</h3>
            <Zap className="w-5 h-5 text-destructive" />
          </div>
          <p className="text-4xl font-bold text-destructive">{highImpactCount}</p>
          <p className="text-sm text-muted-foreground mt-2">Requires attention</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Average Score</h3>
            <Eye className="w-5 h-5 text-accent" />
          </div>
          <p className="text-4xl font-bold text-accent">{averageScore}</p>
          <p className="text-sm text-muted-foreground mt-2">Out of 100</p>
        </motion.div>
      </div>

      {/* Issues by Category */}
      <div className="glass-card p-6 rounded-xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-secondary/50">
            <TabsTrigger value="usability" className="data-[state=active]:bg-primary/20">
              <Eye className="w-4 h-4 mr-2" />
              Usability
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary/20">
              <Zap className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="data-[state=active]:bg-primary/20">
              <Accessibility className="w-4 h-4 mr-2" />
              Accessibility
            </TabsTrigger>
          </TabsList>

          {Object.entries(uxIssuesData).map(([category, issues]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {issues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-5 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">{issue.id}</span>
                        <span className={`text-sm font-semibold ${impactColors[issue.impact as keyof typeof impactColors]}`}>
                          {issue.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">Affected: {issue.affected}</p>
                    </div>
                    <div className="w-full md:w-48">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">UX Score</span>
                        <span className="text-sm font-bold">{issue.score}/100</span>
                      </div>
                      <Progress value={issue.score} className="h-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-xl border-l-4 border-accent"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          AI Recommendations
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold">•</span>
            <p className="text-sm">Focus on high-impact usability issues first to improve user satisfaction by 25%</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold">•</span>
            <p className="text-sm">Implement lazy loading and image optimization to reduce page load time by 40%</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold">•</span>
            <p className="text-sm">Add ARIA labels and improve keyboard navigation for better accessibility compliance</p>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
