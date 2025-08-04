import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import VoiceAssistant from "./VoiceAssistant";
import CircularProgress from "./CircularProgress";
import { Droplets, TrendingUp, Calendar, Gauge } from "lucide-react";
import heroWater from "@/assets/hero-water.png";

const stats = [
  {
    title: "Total Usage",
    value: "3,460 L",
    icon: Droplets,
    color: "text-primary",
    change: "+12% from last month"
  },
  {
    title: "Total Harvested",
    value: "4,209 L",
    icon: TrendingUp,
    color: "text-success",
    change: "+8% from last month"
  },
  {
    title: "This Month Usage",
    value: "856 L",
    icon: Calendar,
    color: "text-accent",
    change: "On track with target"
  },
  {
    title: "Tank Level",
    value: "85%",
    icon: Gauge,
    color: "text-warning",
    change: "Optimal level"
  }
];

const tips = [
  "💧 Use collected rainwater for watering plants - it's naturally soft and free of chemicals!",
  "🌱 Install a first-flush diverter to improve water quality by removing initial roof runoff.",
  "🔧 Check your gutters monthly for leaves and debris to ensure optimal water collection.",
  "📊 Monitor usage patterns to optimize your harvesting system efficiency."
];

export default function Dashboard() {
  const currentTip = tips[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % tips.length];
  const tankLevel = 85;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-glow p-8 text-primary-foreground">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to WaterWise</h1>
              <p className="text-primary-foreground/80 text-lg">Smart rainwater harvesting for sustainable living</p>
            </div>
            <VoiceAssistant text="Welcome to WaterWise! Your rainwater harvesting dashboard shows your tank is 85% full with 4,209 liters harvested this month." />
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <img src={heroWater} alt="Water conservation" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tank Level Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Water Tank Status
              </CardTitle>
              <Badge variant={tankLevel > 70 ? "default" : tankLevel > 30 ? "secondary" : "destructive"}>
                {tankLevel > 70 ? "Excellent" : tankLevel > 30 ? "Good" : "Low"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <CircularProgress 
                value={tankLevel} 
                size={200} 
                strokeWidth={12}
                className="animate-fade-in"
              />
            </div>
            <div className="text-center pt-4">
              <p className="text-lg font-semibold">3,570 L available</p>
              <p className="text-sm text-muted-foreground">Estimated 12 days of average usage</p>
            </div>
          </CardContent>
        </Card>

        {/* Daily Tip */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Daily Tip
              <VoiceAssistant text={currentTip} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{currentTip}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "2 hours ago", action: "Rain detected", amount: "+45L collected", type: "success" },
              { time: "5 hours ago", action: "Irrigation system", amount: "-120L used", type: "usage" },
              { time: "1 day ago", action: "Manual collection", amount: "+200L added", type: "manual" },
              { time: "2 days ago", action: "Heavy rainfall", amount: "+350L collected", type: "success" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant={activity.type === "success" ? "default" : activity.type === "usage" ? "secondary" : "outline"}>
                  {activity.amount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}