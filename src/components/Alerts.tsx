import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VoiceAssistant from "./VoiceAssistant";
import { Bell, AlertTriangle, CheckCircle, XCircle, Filter, Volume2 } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "error" | "success";
  timestamp: string;
  dismissed: boolean;
  actionRequired: boolean;
}

const alertsData: Alert[] = [
  {
    id: "1",
    title: "Tank Full",
    message: "Water tank has reached 95% capacity. Consider using water for irrigation or closing collection valves.",
    severity: "warning",
    timestamp: "2 minutes ago",
    dismissed: false,
    actionRequired: true
  },
  {
    id: "2",
    title: "Low Rain Expected",
    message: "Weather forecast shows no rain for the next 5 days. Monitor usage carefully.",
    severity: "info",
    timestamp: "1 hour ago",
    dismissed: false,
    actionRequired: false
  },
  {
    id: "3",
    title: "Filter Maintenance Due",
    message: "First flush filter hasn't been cleaned in 30 days. Schedule maintenance to ensure water quality.",
    severity: "warning",
    timestamp: "3 hours ago",
    dismissed: false,
    actionRequired: true
  },
  {
    id: "4",
    title: "System Check Complete",
    message: "Monthly system check completed successfully. All components operating normally.",
    severity: "success",
    timestamp: "1 day ago",
    dismissed: false,
    actionRequired: false
  },
  {
    id: "5",
    title: "Pump Malfunction",
    message: "Distribution pump is not responding. Check electrical connections and contact maintenance if needed.",
    severity: "error",
    timestamp: "2 days ago",
    dismissed: true,
    actionRequired: true
  }
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState<"all" | "active" | "actionRequired">("active");

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "error":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning">Warning</Badge>;
      case "success":
        return <Badge variant="outline" className="border-success text-success">Success</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === "active") return !alert.dismissed;
    if (filter === "actionRequired") return alert.actionRequired && !alert.dismissed;
    return true;
  });

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === "error");
  const voiceText = `You have ${activeAlerts.length} active alerts, including ${criticalAlerts.length} critical alerts. ${criticalAlerts.length > 0 ? "Please address critical alerts immediately." : "No critical issues detected."}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage system notifications</p>
        </div>
        <VoiceAssistant text={voiceText} />
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Alerts", count: activeAlerts.length, icon: Bell, color: "text-primary" },
          { label: "Critical", count: criticalAlerts.length, icon: XCircle, color: "text-destructive" },
          { label: "Warnings", count: activeAlerts.filter(a => a.severity === "warning").length, icon: AlertTriangle, color: "text-warning" },
          { label: "Action Required", count: activeAlerts.filter(a => a.actionRequired).length, icon: Filter, color: "text-accent" }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          size="sm"
        >
          All Alerts ({alerts.length})
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
          size="sm"
        >
          Active ({activeAlerts.length})
        </Button>
        <Button
          variant={filter === "actionRequired" ? "default" : "outline"}
          onClick={() => setFilter("actionRequired")}
          size="sm"
        >
          Action Required ({activeAlerts.filter(a => a.actionRequired).length})
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Alerts</h3>
              <p className="text-muted-foreground">
                {filter === "active" ? "All alerts have been addressed!" : "No alerts match your current filter."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`transition-all duration-300 ${alert.dismissed ? "opacity-60" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        {getSeverityBadge(alert.severity)}
                        {alert.actionRequired && (
                          <Badge variant="outline" className="border-accent text-accent">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <VoiceAssistant text={`${alert.title}: ${alert.message}`} />
                    {!alert.dismissed && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                      >
                        Dismiss
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{alert.message}</p>
                {alert.actionRequired && !alert.dismissed && (
                  <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="text-sm font-medium text-accent mb-2">📋 Recommended Actions:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {alert.severity === "error" && (
                        <>
                          <li>• Contact maintenance team immediately</li>
                          <li>• Check system connections and power supply</li>
                          <li>• Document issue for warranty claims</li>
                        </>
                      )}
                      {alert.severity === "warning" && alert.title.includes("Tank") && (
                        <>
                          <li>• Use water for garden irrigation</li>
                          <li>• Close collection valves temporarily</li>
                          <li>• Monitor tank level frequently</li>
                        </>
                      )}
                      {alert.title.includes("Filter") && (
                        <>
                          <li>• Schedule maintenance within 7 days</li>
                          <li>• Prepare replacement filters if needed</li>
                          <li>• Document last cleaning date</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}