import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import VoiceAssistant from "./VoiceAssistant";
import { Calendar, CheckCircle, Clock, AlertTriangle, Wrench, Plus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  lastCompleted?: string;
  frequency: string;
  notes?: string;
  estimatedTime: string;
}

const initialTasks: MaintenanceTask[] = [
  {
    id: "1",
    title: "Clean Roof Gutters",
    description: "Remove leaves, debris, and blockages from gutters and downpipes",
    priority: "high",
    status: "pending",
    dueDate: "2024-02-05",
    lastCompleted: "2024-01-05",
    frequency: "Monthly",
    estimatedTime: "2 hours",
    notes: "Check for any damage while cleaning"
  },
  {
    id: "2",
    title: "Inspect First Flush Diverter",
    description: "Check and clean the first flush diverter system",
    priority: "medium",
    status: "pending",
    dueDate: "2024-02-10",
    lastCompleted: "2024-01-10",
    frequency: "Monthly",
    estimatedTime: "30 minutes"
  },
  {
    id: "3",
    title: "Test Water Quality",
    description: "Perform pH, turbidity, and chlorine testing",
    priority: "medium",
    status: "completed",
    dueDate: "2024-02-01",
    lastCompleted: "2024-02-01",
    frequency: "Weekly",
    estimatedTime: "15 minutes",
    notes: "All parameters within normal range"
  },
  {
    id: "4",
    title: "Replace Tank Screen",
    description: "Replace mosquito-proof screen on tank inlet",
    priority: "low",
    status: "pending",
    dueDate: "2024-02-15",
    frequency: "Quarterly",
    estimatedTime: "45 minutes"
  },
  {
    id: "5",
    title: "Pump System Check",
    description: "Inspect pump operation, pressure, and electrical connections",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-02-03",
    lastCompleted: "2024-01-03",
    frequency: "Monthly",
    estimatedTime: "1 hour",
    notes: "Minor pressure drop noted, monitoring closely"
  }
];

export default function Maintenance() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "overdue">("all");
  const { toast } = useToast();

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        const updatedTask = {
          ...task,
          status: newStatus as "pending" | "completed",
          lastCompleted: newStatus === "completed" ? new Date().toISOString().split('T')[0] : task.lastCompleted
        };
        
        toast({
          title: newStatus === "completed" ? "Task Completed! ✅" : "Task Reopened",
          description: `${task.title} has been marked as ${newStatus}`,
        });
        
        return updatedTask;
      }
      return task;
    }));
  };

  const addNewTask = (taskData: Partial<MaintenanceTask>) => {
    const newTask: MaintenanceTask = {
      id: Date.now().toString(),
      title: taskData.title || "",
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      status: "pending",
      dueDate: taskData.dueDate || "",
      frequency: taskData.frequency || "",
      estimatedTime: taskData.estimatedTime || "",
      notes: taskData.notes
    };
    
    setTasks(prev => [...prev, newTask]);
    setIsAddingTask(false);
    toast({
      title: "Task Added! 📝",
      description: `New maintenance task "${newTask.title}" has been created`,
    });
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filter) {
      case "pending":
        return tasks.filter(task => task.status === "pending");
      case "overdue":
        return tasks.filter(task => task.status === "pending" && task.dueDate < today);
      default:
        return tasks;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress": return <Clock className="h-4 w-4 text-warning" />;
      default: return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const pendingTasks = tasks.filter(task => task.status === "pending");
  const overdueTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.status === "pending" && task.dueDate < today;
  });

  const voiceText = `You have ${pendingTasks.length} pending maintenance tasks, with ${overdueTasks.length} overdue. High priority tasks include gutter cleaning and pump system check.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maintenance</h1>
          <p className="text-muted-foreground">Track and manage system maintenance tasks</p>
        </div>
        <VoiceAssistant text={voiceText} />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Wrench className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{tasks.length}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">{pendingTasks.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{overdueTasks.length}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">
                  {tasks.filter(task => task.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Add Task */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All Tasks ({tasks.length})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
            size="sm"
          >
            Pending ({pendingTasks.length})
          </Button>
          <Button
            variant={filter === "overdue" ? "default" : "outline"}
            onClick={() => setFilter("overdue")}
            size="sm"
          >
            Overdue ({overdueTasks.length})
          </Button>
        </div>

        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Maintenance Task</DialogTitle>
            </DialogHeader>
            <AddTaskForm onSubmit={addNewTask} onCancel={() => setIsAddingTask(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {getFilteredTasks().map((task) => (
          <Card key={task.id} className={`transition-all duration-300 ${
            task.status === "completed" ? "opacity-75" : ""
          }`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className={`text-lg ${
                        task.status === "completed" ? "line-through text-muted-foreground" : ""
                      }`}>
                        {task.title}
                      </CardTitle>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {task.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(task.status)}
                        {task.frequency}
                      </div>
                    </div>
                  </div>
                </div>
                <VoiceAssistant text={`Maintenance task: ${task.title}. ${task.description}. Due ${task.dueDate}.`} />
              </div>
            </CardHeader>
            
            {(task.notes || task.lastCompleted) && (
              <CardContent>
                {task.lastCompleted && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Last completed: {new Date(task.lastCompleted).toLocaleDateString()}
                  </p>
                )}
                {task.notes && (
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm"><strong>Notes:</strong> {task.notes}</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
        
        {getFilteredTasks().length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Tasks Found</h3>
              <p className="text-muted-foreground">
                {filter === "all" ? "No maintenance tasks scheduled." : 
                 filter === "pending" ? "All tasks are completed!" : 
                 "No overdue tasks - great job!"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Add Task Form Component
function AddTaskForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    frequency: "",
    estimatedTime: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.dueDate) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the maintenance task"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Input
            id="frequency"
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            placeholder="e.g., Monthly, Weekly"
          />
        </div>
        
        <div>
          <Label htmlFor="estimatedTime">Estimated Time</Label>
          <Input
            id="estimatedTime"
            value={formData.estimatedTime}
            onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
            placeholder="e.g., 2 hours"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes or instructions"
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}