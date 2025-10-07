import { motion } from "framer-motion";
import { Bug, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const qualityTrendData = [
  { date: "Mon", score: 75 },
  { date: "Tue", score: 78 },
  { date: "Wed", score: 82 },
  { date: "Thu", score: 85 },
  { date: "Fri", score: 88 },
  { date: "Sat", score: 91 },
  { date: "Sun", score: 94 },
];

const issueTrendData = [
  { date: "Mon", bugs: 45, ux: 23 },
  { date: "Tue", bugs: 42, ux: 20 },
  { date: "Wed", bugs: 38, ux: 18 },
  { date: "Thu", bugs: 35, ux: 15 },
  { date: "Fri", bugs: 30, ux: 12 },
  { date: "Sat", bugs: 25, ux: 10 },
  { date: "Sun", bugs: 20, ux: 8 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Quality Dashboard</h1>
        <p className="text-muted-foreground">Real-time app quality monitoring and insights</p>
      </div>

      {/* Quality Score Hero */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-accent" />
            <h2 className="text-xl font-semibold">AI App Quality Score</h2>
          </div>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center py-8"
          >
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-pulse-glow">
              94
            </div>
            <p className="text-2xl text-muted-foreground mt-4">Excellent Quality</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-green-500">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">+6 points this week</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Critical Bugs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Critical Bugs</h3>
            <Bug className="w-5 h-5 text-destructive" />
          </div>
          <div className="text-4xl font-bold text-destructive mb-2">5</div>
          <p className="text-sm text-muted-foreground">Requires immediate attention</p>
        </motion.div>

        {/* Major Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">Major Issues</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-4xl font-bold text-yellow-500 mb-2">15</div>
          <p className="text-sm text-muted-foreground">Should be addressed soon</p>
        </motion.div>

        {/* UX Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-muted-foreground">UX Issues</h3>
            <AlertTriangle className="w-5 h-5 text-primary" />
          </div>
          <div className="text-4xl font-bold text-primary mb-2">8</div>
          <p className="text-sm text-muted-foreground">User experience improvements</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-6">Quality Score Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={qualityTrendData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eed1a0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eed1a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#48304b" opacity={0.3} />
              <XAxis dataKey="date" stroke="#eed1a0" />
              <YAxis stroke="#eed1a0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#302655",
                  border: "1px solid #48304b",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#eed1a0"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Issue Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-6">Issue Resolution Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={issueTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#48304b" opacity={0.3} />
              <XAxis dataKey="date" stroke="#eed1a0" />
              <YAxis stroke="#eed1a0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#302655",
                  border: "1px solid #48304b",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="bugs"
                stroke="#895070"
                strokeWidth={2}
                name="Bugs"
              />
              <Line
                type="monotone"
                dataKey="ux"
                stroke="#eed1a0"
                strokeWidth={2}
                name="UX Issues"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
