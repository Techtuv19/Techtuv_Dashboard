import { useState } from "react";
import { motion } from "framer-motion";
import { Plug, Github, Gitlab, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const integrationsData = [
  {
    id: "github",
    name: "GitHub",
    description: "Connect your GitHub repositories for automated code quality analysis",
    icon: Github,
    connected: true,
    status: "Active",
  },
  {
    id: "gitlab",
    name: "GitLab",
    description: "Integrate GitLab for CI/CD pipeline quality monitoring",
    icon: Gitlab,
    connected: false,
    status: "Available",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Sync bugs and issues with Jira for project management",
    icon: Plug,
    connected: true,
    status: "Active",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get real-time notifications about quality issues in Slack",
    icon: Plug,
    connected: false,
    status: "Available",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Analyze design consistency and UX patterns from Figma",
    icon: Plug,
    connected: false,
    status: "Available",
  },
  {
    id: "sentry",
    name: "Sentry",
    description: "Import error tracking and performance monitoring data",
    icon: Plug,
    connected: true,
    status: "Active",
  },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(integrationsData);
  const { toast } = useToast();

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              connected: !integration.connected,
              status: !integration.connected ? "Active" : "Available",
            }
          : integration
      )
    );
    
    const integration = integrations.find((i) => i.id === id);
    toast({
      title: integration?.connected ? "Disconnected" : "Connected",
      description: `${integration?.name} has been ${integration?.connected ? "disconnected" : "connected"} successfully`,
    });
  };

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-muted-foreground">Connect your favorite tools and platforms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Active Integrations</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-4xl font-bold text-green-500">{connectedCount}</p>
          <p className="text-sm text-muted-foreground mt-2">Out of {integrations.length} available</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Available</h3>
            <XCircle className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-4xl font-bold">{integrations.length - connectedCount}</p>
          <p className="text-sm text-muted-foreground mt-2">Ready to connect</p>
        </motion.div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration, index) => {
          const Icon = integration.icon;
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    integration.connected ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <Icon className={`w-6 h-6 ${integration.connected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{integration.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      integration.connected
                        ? "bg-green-500/20 text-green-500"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                </div>
                <Switch
                  checked={integration.connected}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                />
              </div>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
              {integration.connected && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-primary/30 hover:bg-primary/10"
                >
                  Configure Settings
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* API Integration Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 rounded-xl border-l-4 border-accent"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plug className="w-5 h-5 text-accent" />
          Custom API Integration
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Need a custom integration? Use our REST API to connect any platform or service.
        </p>
        <Button variant="outline" className="border-accent/30 hover:bg-accent/10">
          View API Documentation
        </Button>
      </motion.div>
    </div>
  );
}
