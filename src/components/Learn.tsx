import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceAssistant from "./VoiceAssistant";
import { BookOpen, Users, Baby, Heart, Star, Play } from "lucide-react";

const childrenContent = [
  {
    id: "story1",
    title: "Rainy the Water Drop's Adventure 🌧️",
    content: "Once upon a time, there was a little water drop named Rainy who lived in a fluffy cloud high in the sky. Rainy loved to travel and help plants grow! One day, Rainy decided to visit your house...",
    fullStory: "Rainy fell from the cloud and landed on your roof. 'Wheee!' said Rainy as she slid down the gutters into a special tank. 'Now I can help water the beautiful flowers and vegetables!' Rainy was so happy to be useful and help families save water.",
    lesson: "Water drops from rain can be collected and used to help plants grow!",
    emoji: "🌧️",
    difficulty: "Easy"
  },
  {
    id: "story2",
    title: "The Water Saving Heroes 💧",
    content: "Meet the Water Saving Heroes! Captain Conservation and his team work together to make sure no water is wasted. They collect rainwater and use it wisely...",
    fullStory: "Captain Conservation teaches families how to catch rainwater in special tanks. 'Every drop counts!' he says. The heroes show children how to turn off taps, use collected rainwater for plants, and never waste this precious resource.",
    lesson: "We can all be water heroes by saving and using water carefully!",
    emoji: "🦸‍♂️",
    difficulty: "Easy"
  },
  {
    id: "experiment",
    title: "Fun Water Experiment 🔬",
    content: "Let's do a fun experiment! Ask a grown-up to help you put a cup outside when it rains. Watch how the water collects!",
    fullStory: "Materials needed: A clear cup, paper, and crayons. Steps: 1) Put the cup outside safely during rain 2) Draw what you see 3) Measure the water after rain stops 4) Use the water for a plant!",
    lesson: "We can see how rainwater collection works with simple experiments!",
    emoji: "🔬",
    difficulty: "Medium"
  }
];

const elderlyContent = [
  {
    id: "guide1",
    title: "Getting Started with Rainwater Harvesting",
    content: "A comprehensive guide to understanding and setting up your first rainwater collection system...",
    steps: [
      "Assess your roof area and local rainfall patterns",
      "Choose appropriate guttering and downpipe systems",
      "Select suitable storage tanks for your needs",
      "Install first-flush diverters for water quality",
      "Set up distribution systems for irrigation"
    ],
    tips: "Start small and expand your system gradually. Focus on water quality and proper maintenance.",
    difficulty: "Beginner"
  },
  {
    id: "guide2",
    title: "Maintenance Best Practices",
    content: "Essential maintenance tasks to keep your rainwater harvesting system running efficiently...",
    steps: [
      "Clean gutters and downpipes monthly",
      "Inspect and clean first-flush diverters",
      "Check tank screens and covers for damage",
      "Test water quality periodically",
      "Maintain pumps and distribution systems"
    ],
    tips: "Regular maintenance prevents costly repairs and ensures water quality. Keep a maintenance log.",
    difficulty: "Intermediate"
  },
  {
    id: "guide3",
    title: "Water Quality and Treatment",
    content: "Understanding water quality parameters and basic treatment methods for collected rainwater...",
    steps: [
      "Test pH levels monthly (ideal range: 6.5-7.5)",
      "Monitor turbidity and color changes",
      "Install appropriate filtration systems",
      "Consider UV sterilization for drinking water",
      "Store treated water properly to prevent contamination"
    ],
    tips: "Different uses require different quality levels. Garden irrigation has lower requirements than drinking water.",
    difficulty: "Advanced"
  }
];

export default function Learn() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const voiceText = "Welcome to the learning section! Choose between children's stories and educational guides for adults to learn about water conservation.";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learn & Discover</h1>
          <p className="text-muted-foreground">Educational content for all ages about water conservation</p>
        </div>
        <VoiceAssistant text={voiceText} />
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">85%</p>
                <p className="text-sm text-muted-foreground">Knowledge Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">3,450L</p>
                <p className="text-sm text-muted-foreground">Water Saved Learning</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="children" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="children" className="flex items-center gap-2">
            <Baby className="h-4 w-4" />
            Children's Section
          </TabsTrigger>
          <TabsTrigger value="adults" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Adult Guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="children" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {childrenContent.map((story) => (
              <Card key={story.id} className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-2xl">{story.emoji}</span>
                      {story.title}
                    </CardTitle>
                    <Badge variant="outline">{story.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {story.content}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {selectedStory === story.id ? "Hide Story" : "Read Story"}
                    </Button>
                    <VoiceAssistant text={`${story.title}. ${story.fullStory} ${story.lesson}`} />
                  </div>
                  
                  {selectedStory === story.id && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-3">
                      <p className="text-sm leading-relaxed">{story.fullStory}</p>
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm font-medium text-primary">🎓 What we learned:</p>
                        <p className="text-sm text-muted-foreground mt-1">{story.lesson}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="adults" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elderlyContent.map((guide) => (
              <Card key={guide.id} className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <Badge variant="outline">{guide.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {guide.content}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedGuide(selectedGuide === guide.id ? null : guide.id)}
                      className="flex-1"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      {selectedGuide === guide.id ? "Hide Guide" : "View Guide"}
                    </Button>
                    <VoiceAssistant text={`${guide.title}. ${guide.content} Key steps include: ${guide.steps.join(", ")}`} />
                  </div>
                  
                  {selectedGuide === guide.id && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">📋 Step-by-Step Guide:</h4>
                        <ol className="text-sm space-y-1 pl-4">
                          {guide.steps.map((step, index) => (
                            <li key={index} className="list-decimal">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                        <p className="text-sm font-medium text-success">💡 Pro Tip:</p>
                        <p className="text-sm text-muted-foreground mt-1">{guide.tips}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}