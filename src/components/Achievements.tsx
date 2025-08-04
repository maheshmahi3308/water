import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import VoiceAssistant from "./VoiceAssistant";
import { Trophy, Star, Target, Users, Crown, Medal } from "lucide-react";

const achievements = [
  {
    id: "water-saver",
    title: "Water Saver",
    description: "Saved 1,000L of water",
    icon: "💧",
    progress: 100,
    unlocked: true,
    date: "2024-01-15",
    points: 100
  },
  {
    id: "eco-champion",
    title: "Eco Champion",
    description: "30 days of consistent monitoring",
    icon: "🌱",
    progress: 100,
    unlocked: true,
    date: "2024-01-20",
    points: 150
  },
  {
    id: "efficiency-expert",
    title: "Efficiency Expert",
    description: "Maintained 90% system efficiency",
    icon: "⚡",
    progress: 85,
    unlocked: false,
    date: null,
    points: 200
  },
  {
    id: "rain-master",
    title: "Rain Master",
    description: "Collected 5,000L from rainfall",
    icon: "🌧️",
    progress: 75,
    unlocked: false,
    date: null,
    points: 250
  },
  {
    id: "conservation-king",
    title: "Conservation King",
    description: "Reduced usage by 50%",
    icon: "👑",
    progress: 60,
    unlocked: false,
    date: null,
    points: 300
  },
  {
    id: "green-warrior",
    title: "Green Warrior",
    description: "Completed all learning modules",
    icon: "🏆",
    progress: 45,
    unlocked: false,
    date: null,
    points: 500
  }
];

const leaderboard = [
  { rank: 1, name: "The Johnson Family", points: 2450, badge: "👑", waterSaved: "8,900L" },
  { rank: 2, name: "Green Valley School", points: 2280, badge: "🥈", waterSaved: "7,650L" },
  { rank: 3, name: "Eco Warriors Club", points: 2150, badge: "🥉", waterSaved: "6,890L" },
  { rank: 4, name: "You (Smith Family)", points: 1890, badge: "🌟", waterSaved: "5,240L" },
  { rank: 5, name: "Community Garden", points: 1750, badge: "🌱", waterSaved: "4,980L" }
];

const milestones = [
  { title: "First Drop", description: "Collect your first liter", achieved: true },
  { title: "Week Warrior", description: "7 days of monitoring", achieved: true },
  { title: "Month Master", description: "30 days of monitoring", achieved: true },
  { title: "Quarter Champion", description: "90 days of monitoring", achieved: false },
  { title: "Year Legend", description: "365 days of monitoring", achieved: false }
];

export default function Achievements() {
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const voiceText = `You have unlocked ${unlockedCount} out of ${achievements.length} achievements, earning ${totalPoints} points total. You're currently ranked 4th on the leaderboard.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground">Track your water conservation milestones and compete with others</p>
        </div>
        <VoiceAssistant text={voiceText} />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{unlockedCount}</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{totalPoints}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">4th</p>
                <p className="text-sm text-muted-foreground">Leaderboard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">5,240L</p>
                <p className="text-sm text-muted-foreground">Water Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Achievements Grid */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5" />
                Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked 
                        ? "bg-success/5 border-success/20 shadow-sm" 
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h3 className={`font-semibold ${achievement.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="outline" className="border-success text-success">
                          +{achievement.points} pts
                        </Badge>
                      )}
                    </div>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} variant="success" className="h-2" />
                      </div>
                    )}
                    
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Unlocked on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress to Next Reward */}
          <Card>
            <CardHeader>
              <CardTitle>Next Reward Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">🌧️ Rain Master</h3>
                  <p className="text-sm text-muted-foreground mb-4">Collect 5,000L from rainfall (3,750L / 5,000L)</p>
                  <Progress value={75} variant="water" className="h-4" />
                  <p className="text-sm text-muted-foreground mt-2">1,250L remaining to unlock</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Weekly Progress</p>
                    <p className="text-lg font-semibold">+185L</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Estimated Time</p>
                    <p className="text-lg font-semibold">6 weeks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Community Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.name.includes("You") 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{entry.badge}</span>
                      <div>
                        <p className="font-medium text-sm">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.waterSaved}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">#{entry.rank}</p>
                      <p className="text-xs text-muted-foreground">{entry.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      milestone.achieved ? "bg-success" : "bg-muted-foreground/30"
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${
                        milestone.achieved ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {milestone.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}