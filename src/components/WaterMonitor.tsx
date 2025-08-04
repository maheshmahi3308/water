import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import VoiceAssistant from "./VoiceAssistant";
import WaterFlowChart from "./WaterFlowChart";
import { Droplets, TrendingUp, TrendingDown, Activity } from "lucide-react";

const hourlyData = [
  { time: "00:00", inflow: 0, outflow: 5, level: 85 },
  { time: "06:00", inflow: 45, outflow: 12, level: 87 },
  { time: "12:00", inflow: 0, outflow: 25, level: 85 },
  { time: "18:00", inflow: 15, outflow: 30, level: 83 },
  { time: "Now", inflow: 8, outflow: 10, level: 85 }
];

const dailyData = [
  { day: "Mon", collected: 120, used: 85, efficiency: 88 },
  { day: "Tue", collected: 45, used: 92, efficiency: 76 },
  { day: "Wed", collected: 200, used: 78, efficiency: 95 },
  { day: "Thu", collected: 0, used: 105, efficiency: 65 },
  { day: "Fri", collected: 180, used: 88, efficiency: 92 },
  { day: "Sat", collected: 320, used: 110, efficiency: 98 },
  { day: "Sun", collected: 95, used: 75, efficiency: 85 }
];

export default function WaterMonitor() {
  const [viewMode, setViewMode] = useState<"hourly" | "daily">("daily");
  const currentLevel = 85;
  const flowRate = 8; // L/hour
  const currentConsumption = 10; // L/hour

  const voiceText = `Water monitor shows tank level at ${currentLevel}%. Current inflow is ${flowRate} liters per hour, outflow is ${currentConsumption} liters per hour.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Water Monitor</h1>
          <p className="text-muted-foreground">Real-time water flow and tank status</p>
        </div>
        <VoiceAssistant text={voiceText} />
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tank Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-bold text-primary">{currentLevel}%</span>
              <Droplets className="h-8 w-8 text-primary" />
            </div>
            <Progress value={currentLevel} variant="water" className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">3,570L available</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inflow Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-bold text-success">{flowRate}L/h</span>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <Badge variant="outline" className="border-success text-success">
              Light rain detected
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outflow Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-bold text-warning">{currentConsumption}L/h</span>
              <TrendingDown className="h-8 w-8 text-warning" />
            </div>
            <Badge variant="outline" className="border-warning text-warning">
              Normal usage
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Flow Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Water Flow Analysis
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "hourly" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("hourly")}
              >
                Hourly
              </Button>
              <Button
                variant={viewMode === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("daily")}
              >
                Daily
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={viewMode === "hourly" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("hourly")}
              >
                Hourly
              </Button>
              <Button
                variant={viewMode === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("daily")}
              >
                Daily
              </Button>
            </div>
            
            <WaterFlowChart 
              type="line" 
              timeframe={viewMode === "hourly" ? "daily" : "weekly"} 
            />
            
            {viewMode === "hourly" && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
                  <span>Time</span>
                  <span>Inflow (L)</span>
                  <span>Outflow (L)</span>
                  <span>Level (%)</span>
                  <span>Net Change</span>
                </div>
                {hourlyData.map((data, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium">{data.time}</span>
                    <span className="text-success">+{data.inflow}L</span>
                    <span className="text-warning">-{data.outflow}L</span>
                    <span>{data.level}%</span>
                    <span className={data.inflow - data.outflow >= 0 ? "text-success" : "text-warning"}>
                      {data.inflow - data.outflow >= 0 ? "+" : ""}{data.inflow - data.outflow}L
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Collection Filter", status: "Good", health: 85 },
              { name: "Pumping System", status: "Excellent", health: 95 },
              { name: "Storage Tank", status: "Good", health: 88 },
              { name: "Distribution Network", status: "Fair", health: 72 }
            ].map((component, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{component.name}</p>
                  <p className="text-sm text-muted-foreground">{component.status}</p>
                </div>
                <div className="w-24">
                  <Progress 
                    value={component.health} 
                    variant={component.health > 80 ? "success" : component.health > 60 ? "warning" : "destructive"}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Water Quality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { parameter: "pH Level", value: "6.8", status: "Optimal", range: "6.5-7.5" },
              { parameter: "Turbidity", value: "2.1 NTU", status: "Good", range: "<5 NTU" },
              { parameter: "Temperature", value: "22°C", status: "Normal", range: "15-25°C" },
              { parameter: "Chlorine", value: "0.1 mg/L", status: "Safe", range: "<0.5 mg/L" }
            ].map((quality, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{quality.parameter}</p>
                  <p className="text-sm text-muted-foreground">{quality.range}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{quality.value}</p>
                  <Badge variant="outline" className="text-xs">
                    {quality.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}