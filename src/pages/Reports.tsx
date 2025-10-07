import { motion } from "framer-motion";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const reportsData = [
  { id: "RPT-001", title: "Weekly Quality Report", date: "2025-01-10", type: "Weekly", score: 94 },
  { id: "RPT-002", title: "Bug Analysis Report", date: "2025-01-09", type: "Bug", score: 88 },
  { id: "RPT-003", title: "UX Performance Report", date: "2025-01-08", type: "UX", score: 91 },
  { id: "RPT-004", title: "Monthly Summary", date: "2025-01-01", type: "Monthly", score: 92 },
];

export default function Reports() {
  const { toast } = useToast();

  const generatePDF = (report: typeof reportsData[0]) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(137, 80, 112);
    doc.text("TechTuv.com - Quality Report", 20, 20);
    
    // Report Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report ID: ${report.id}`, 20, 35);
    doc.text(`Title: ${report.title}`, 20, 45);
    doc.text(`Date: ${report.date}`, 20, 55);
    doc.text(`Quality Score: ${report.score}/100`, 20, 65);
    
    // Sample Data Table
    autoTable(doc, {
      startY: 80,
      head: [['Metric', 'Value', 'Status']],
      body: [
        ['Critical Bugs', '5', 'Needs Attention'],
        ['Major Issues', '15', 'In Progress'],
        ['UX Score', '91', 'Good'],
        ['Performance', '88', 'Good'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [137, 80, 112] },
    });
    
    doc.save(`${report.id}-${report.date}.pdf`);
    
    toast({
      title: "PDF Downloaded",
      description: `${report.title} has been exported successfully`,
    });
  };

  const generateCSV = (report: typeof reportsData[0]) => {
    const csvContent = [
      ['Report ID', 'Title', 'Date', 'Type', 'Score'],
      [report.id, report.title, report.date, report.type, report.score.toString()],
      [],
      ['Metric', 'Value', 'Status'],
      ['Critical Bugs', '5', 'Needs Attention'],
      ['Major Issues', '15', 'In Progress'],
      ['UX Score', '91', 'Good'],
      ['Performance', '88', 'Good'],
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.id}-${report.date}.csv`;
    a.click();
    
    toast({
      title: "CSV Downloaded",
      description: `${report.title} has been exported successfully`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and download quality reports</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Total Reports</h3>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <p className="text-4xl font-bold">{reportsData.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">This Week</h3>
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <p className="text-4xl font-bold text-accent">3</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Avg. Score</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-4xl font-bold text-green-500">91</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="glass-input sm:w-[200px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="bug">Bug Reports</SelectItem>
              <SelectItem value="ux">UX Reports</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="recent">
            <SelectTrigger className="glass-input sm:w-[200px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="score">Highest Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reportsData.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">{report.id}</span>
                  <span className="px-2 py-1 text-xs bg-secondary rounded-full">{report.type}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{report.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {report.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Score: {report.score}/100
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generatePDF(report)}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateCSV(report)}
                  className="border-accent/30 hover:bg-accent/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
