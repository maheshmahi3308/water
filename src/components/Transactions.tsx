import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VoiceAssistant from "./VoiceAssistant";
import { CreditCard, Plus, TrendingUp, TrendingDown, Droplets, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: string;
  type: "harvested" | "manual" | "usage" | "system";
  amount: number;
  description: string;
  category: string;
  balance: number;
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-02-03",
    type: "harvested",
    amount: 45,
    description: "Rainwater collection during morning shower",
    category: "Natural Collection",
    balance: 3570
  },
  {
    id: "2",
    date: "2024-02-03",
    type: "usage",
    amount: -120,
    description: "Garden irrigation system",
    category: "Irrigation",
    balance: 3525
  },
  {
    id: "3",
    date: "2024-02-02",
    type: "manual",
    amount: 200,
    description: "Manual water addition to tank",
    category: "Manual Addition",
    balance: 3645
  },
  {
    id: "4",
    date: "2024-02-02",
    type: "usage",
    amount: -85,
    description: "Household cleaning",
    category: "Domestic Use",
    balance: 3445
  },
  {
    id: "5",
    date: "2024-02-01",
    type: "harvested",
    amount: 320,
    description: "Heavy rainfall collection",
    category: "Natural Collection",
    balance: 3530
  },
  {
    id: "6",
    date: "2024-01-31",
    type: "system",
    amount: -15,
    description: "System maintenance water usage",
    category: "System",
    balance: 3210
  },
  {
    id: "7",
    date: "2024-01-30",
    type: "usage",
    amount: -95,
    description: "Car washing",
    category: "Outdoor Use",
    balance: 3225
  },
  {
    id: "8",
    date: "2024-01-30",
    type: "harvested",
    amount: 180,
    description: "Afternoon rain collection",
    category: "Natural Collection",
    balance: 3320
  }
];

export default function Transactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [filter, setFilter] = useState<"all" | "harvested" | "usage" | "manual">("all");
  const { toast } = useToast();

  const addTransaction = (transactionData: Partial<Transaction>) => {
    const lastBalance = transactions[0]?.balance || 3570;
    const newBalance = lastBalance + (transactionData.amount || 0);
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: transactionData.date || new Date().toISOString().split('T')[0],
      type: transactionData.type || "manual",
      amount: transactionData.amount || 0,
      description: transactionData.description || "",
      category: transactionData.category || "Manual Addition",
      balance: newBalance
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setIsAddingTransaction(false);
    
    toast({
      title: "Transaction Added! 💧",
      description: `${Math.abs(newTransaction.amount)}L ${newTransaction.amount > 0 ? 'added to' : 'used from'} your water system`,
    });
  };

  const getFilteredTransactions = () => {
    if (filter === "all") return transactions;
    return transactions.filter(transaction => transaction.type === filter);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "harvested":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "manual":
        return <Plus className="h-4 w-4 text-primary" />;
      case "usage":
        return <TrendingDown className="h-4 w-4 text-warning" />;
      case "system":
        return <Droplets className="h-4 w-4 text-accent" />;
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "harvested":
        return <Badge variant="outline" className="border-success text-success">Collected</Badge>;
      case "manual":
        return <Badge variant="outline" className="border-primary text-primary">Manual</Badge>;
      case "usage":
        return <Badge variant="outline" className="border-warning text-warning">Used</Badge>;
      case "system":
        return <Badge variant="outline" className="border-accent text-accent">System</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Calculate statistics
  const totalHarvested = transactions.filter(t => t.type === "harvested").reduce((sum, t) => sum + t.amount, 0);
  const totalUsed = Math.abs(transactions.filter(t => t.type === "usage").reduce((sum, t) => sum + t.amount, 0));
  const totalManual = transactions.filter(t => t.type === "manual").reduce((sum, t) => sum + t.amount, 0);
  const currentBalance = transactions[0]?.balance || 3570;

  const voiceText = `Your water transaction history shows ${totalHarvested} liters harvested, ${totalUsed} liters used, and current balance of ${currentBalance} liters.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Water Transactions</h1>
          <p className="text-muted-foreground">Track water credits, usage, and system history</p>
        </div>
        <VoiceAssistant text={voiceText} />
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{currentBalance}L</p>
                <p className="text-sm text-muted-foreground">Current Balance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">+{totalHarvested}L</p>
                <p className="text-sm text-muted-foreground">Total Harvested</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">-{totalUsed}L</p>
                <p className="text-sm text-muted-foreground">Total Used</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Plus className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">+{totalManual}L</p>
                <p className="text-sm text-muted-foreground">Manual Additions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Add Transaction */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All ({transactions.length})
          </Button>
          <Button
            variant={filter === "harvested" ? "default" : "outline"}
            onClick={() => setFilter("harvested")}
            size="sm"
          >
            Harvested ({transactions.filter(t => t.type === "harvested").length})
          </Button>
          <Button
            variant={filter === "usage" ? "default" : "outline"}
            onClick={() => setFilter("usage")}
            size="sm"
          >
            Usage ({transactions.filter(t => t.type === "usage").length})
          </Button>
          <Button
            variant={filter === "manual" ? "default" : "outline"}
            onClick={() => setFilter("manual")}
            size="sm"
          >
            Manual ({transactions.filter(t => t.type === "manual").length})
          </Button>
        </div>

        <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Water Transaction</DialogTitle>
            </DialogHeader>
            <AddTransactionForm onSubmit={addTransaction} onCancel={() => setIsAddingTransaction(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
              <span>Date</span>
              <span>Type</span>
              <span>Amount</span>
              <span>Description</span>
              <span>Category</span>
              <span>Balance</span>
            </div>
            
            {/* Table Rows */}
            {getFilteredTransactions().map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-6 gap-4 py-3 border-b border-border/50 hover:bg-muted/30 rounded-lg px-2 transition-colors">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                
                <div className="flex items-center gap-2">
                  {getTransactionIcon(transaction.type)}
                  {getTransactionBadge(transaction.type)}
                </div>
                
                <div className={`font-semibold ${
                  transaction.amount > 0 ? "text-success" : "text-warning"
                }`}>
                  {transaction.amount > 0 ? "+" : ""}{transaction.amount}L
                </div>
                
                <div className="text-sm text-foreground">
                  {transaction.description}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {transaction.category}
                </div>
                
                <div className="font-medium text-sm">
                  {transaction.balance}L
                </div>
              </div>
            ))}
            
            {getFilteredTransactions().length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found for the selected filter.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add Transaction Form Component
function AddTransactionForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    type: "manual",
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.description) {
      onSubmit({
        ...formData,
        amount: formData.type === "usage" ? -Math.abs(Number(formData.amount)) : Number(formData.amount)
      });
    }
  };

  const categories = {
    harvested: ["Natural Collection", "Roof Collection", "Other Collection"],
    manual: ["Manual Addition", "Tank Filling", "Emergency Supply"],
    usage: ["Irrigation", "Domestic Use", "Outdoor Use", "Cleaning"],
    system: ["System Maintenance", "Filter Cleaning", "Pump Operation"]
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Transaction Type</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value, category: "" })}>
          <SelectTrigger>
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="harvested">Water Harvested</SelectItem>
            <SelectItem value="manual">Manual Addition</SelectItem>
            <SelectItem value="usage">Water Usage</SelectItem>
            <SelectItem value="system">System Operation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount (Liters)</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories[formData.type as keyof typeof categories]?.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the transaction"
          required
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Transaction</Button>
      </div>
    </form>
  );
}