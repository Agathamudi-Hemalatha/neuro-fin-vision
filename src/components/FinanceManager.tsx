import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';
import {
  Bell, Target, TrendingUp, Wallet, Home, CreditCard, PiggyBank,
  Plus, Settings, User, Info, AlertTriangle, DollarSign, Calendar,
  ChevronRight, Sparkles, Award, Gift, Coffee, BookOpen, Car, Film,
  Zap, Star, Trophy, Brain, Shield, Gamepad2, Smartphone, Headphones,
  Camera, ShoppingBag, Pizza, GraduationCap, HeartHandshake, Lightbulb
} from 'lucide-react';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'];
const NEON_COLORS = ['#00F5FF', '#FF1493', '#FFFF00', '#00FF00', '#FF6347', '#9370DB', '#FF69B4', '#00CED1'];

const FinanceManager = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState<any[]>([]);
  const [budgets, setBudgets] = useState({
    Food: 500,
    Transportation: 150,
    Entertainment: 300,
    Books: 120,
    Housing: 600,
    Technology: 200,
    Health: 100,
    Shopping: 250
  });
  
  const [goals, setGoals] = useState([
    { id: 1, name: 'MacBook Pro M3', target: 2500, saved: 1250, deadline: '2024-12-31', icon: '💻', category: 'tech' },
    { id: 2, name: 'Europe Backpacking', target: 3000, saved: 1800, deadline: '2024-06-15', icon: '🌍', category: 'travel' },
    { id: 3, name: 'Emergency Fund', target: 5000, saved: 2100, deadline: '2024-12-31', icon: '🛡️', category: 'savings' }
  ]);
  
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Food' });
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'AI detected unusual spending pattern in Entertainment 🤖', type: 'ai', timestamp: '2023-10-15T14:30:00' },
    { id: 2, message: 'Congratulations! You saved $200 this month! 🎉', type: 'achievement', timestamp: '2023-10-14T09:15:00' },
    { id: 3, message: 'Smart tip: Consider cooking at home to save $150/month 💡', type: 'suggestion', timestamp: '2023-10-13T16:45:00' }
  ]);
  
  const [totalBalance, setTotalBalance] = useState(4750.25);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const categoryIcons: Record<string, any> = {
    Food: Pizza,
    Transportation: Car,
    Entertainment: Film,
    Books: BookOpen,
    Housing: Home,
    Technology: Smartphone,
    Health: HeartHandshake,
    Shopping: ShoppingBag
  };

  // Initialize expenses
  useEffect(() => {
    const premiumExpenses = [
      { id: 1, description: '☕ Premium Coffee & Study Fuel', amount: 18.75, category: 'Food', date: '2023-10-15', mood: '😊' },
      { id: 2, description: '🚇 Smart Metro Card Auto-Refill', amount: 65.00, category: 'Transportation', date: '2023-10-14', mood: '🚀' },
      { id: 3, description: '📚 AI Programming Textbook', amount: 150.00, category: 'Books', date: '2023-10-13', mood: '🤓' },
      { id: 4, description: '🎬 IMAX Movie + VIP Experience', amount: 55.50, category: 'Entertainment', date: '2023-10-12', mood: '🍿' },
      { id: 5, description: '🥗 Organic Weekly Groceries', amount: 95.25, category: 'Food', date: '2023-10-11', mood: '🌱' },
      { id: 6, description: '💻 Cloud Storage Upgrade', amount: 9.99, category: 'Technology', date: '2023-10-10', mood: '☁️' },
      { id: 7, description: '🎵 Spotify Premium Family', amount: 15.99, category: 'Entertainment', date: '2023-10-09', mood: '🎶' },
      { id: 8, description: '🚗 Uber Premium to Airport', amount: 28.50, category: 'Transportation', date: '2023-10-08', mood: '✈️' }
    ];
    setExpenses(premiumExpenses);
  }, []);

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 3 + 2,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
      }));
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x, particle.y, 8, 8);
        });
        if (particles[0] && particles[0].y < canvas.height) {
          requestAnimationFrame(animate);
        }
      };
      animate();
      
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [showConfetti]);

  const handleAddExpense = () => {
    if (newExpense.description.trim() && newExpense.amount && !isNaN(Number(newExpense.amount))) {
      const expense = {
        id: expenses.length + 1,
        description: newExpense.description.trim(),
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0],
        mood: ['😊', '🚀', '🎉', '💡', '⭐'][Math.floor(Math.random() * 5)]
      };
      setExpenses([...expenses, expense]);
      setTotalBalance(prev => prev - expense.amount);
      setNewExpense({ description: '', amount: '', category: 'Food' });
      setShowConfetti(true);
      
      // Add AI alert
      setTimeout(() => {
        const aiAlert = {
          id: Date.now(),
          message: `🤖 AI Analysis: Smart purchase in ${expense.category}! Optimized for your budget.`,
          type: 'ai',
          timestamp: new Date().toISOString()
        };
        setAlerts(prev => [aiAlert, ...prev.slice(0, 4)]);
      }, 1000);
    }
  };

  const spendingByCategory = Object.keys(budgets).map(category => {
    const total = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      category,
      total,
      budget: budgets[category as keyof typeof budgets],
      percentage: Math.min(100, (total / budgets[category as keyof typeof budgets]) * 100),
      remaining: Math.max(0, budgets[category as keyof typeof budgets] - total)
    };
  });

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
  const savingsRate = ((totalBudget - totalSpent) / totalBudget * 100).toFixed(1);
  const financialHealthScore = Math.min(100, Math.max(0, 100 - ((totalSpent / totalBudget) * 50)));

  const pieChartData = spendingByCategory
    .filter(item => item.total > 0)
    .map((item, index) => ({
      name: item.category,
      value: item.total,
      color: COLORS[index % COLORS.length]
    }));

  const weeklyData = [
    { day: 'Mon', spending: 45, mood: 8.5 },
    { day: 'Tue', spending: 23, mood: 9.2 },
    { day: 'Wed', spending: 67, mood: 7.8 },
    { day: 'Thu', spending: 34, mood: 8.7 },
    { day: 'Fri', spending: 89, mood: 9.5 },
    { day: 'Sat', spending: 125, mood: 9.8 },
    { day: 'Sun', spending: 78, mood: 8.9 }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden relative">
      {/* Confetti Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-yellow rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-neon-pink rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Futuristic Sidebar */}
        <aside className="w-full lg:w-80 bg-gradient-to-b from-card/90 to-background/90 backdrop-blur-xl border-r border-neon-cyan/30 p-6 shadow-2xl">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow-cyan">
                  <Brain className="text-white animate-pulse" size={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">
                  NeuroFin AI
                </h1>
                <p className="text-neon-cyan font-semibold text-sm">Future of Finance</p>
              </div>
            </div>
          </div>

          {/* AI Health Score */}
          <div className="bg-gradient-success/20 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-neon-green/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neon-green font-bold flex items-center gap-2">
                <Shield size={18} />
                Financial Health
              </span>
              <span className="text-xl">{financialHealthScore >= 80 ? '🔥' : '⚡'}</span>
            </div>
            <div className="text-3xl font-black text-neon-green mb-1">{financialHealthScore.toFixed(0)}%</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-success h-2 rounded-full transition-all duration-1000"
                style={{ width: `${financialHealthScore}%` }}
              ></div>
            </div>
          </div>

          {/* Balance Card */}
          <div className="relative bg-gradient-to-r from-card/90 to-background/90 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-neon-cyan/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-neon-cyan/20 to-transparent rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-neon-cyan font-semibold flex items-center gap-2">
                  <Wallet size={18} />
                  Portfolio
                </span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
              <div className="text-3xl font-black text-foreground mb-2">${totalBalance.toLocaleString()}</div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="text-neon-green" size={14} />
                <span className="text-neon-green font-semibold">+{savingsRate}% saved</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { id: 'dashboard', label: 'Neural Dashboard', icon: Brain },
              { id: 'expenses', label: 'Smart Expenses', icon: Zap },
              { id: 'budgets', label: 'AI Budget Control', icon: Shield },
              { id: 'goals', label: 'Achievement Hub', icon: Trophy },
              { id: 'analytics', label: 'Predictive Analytics', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`group flex items-center w-full p-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105
                  ${activeTab === id 
                    ? 'bg-gradient-primary text-white shadow-glow-cyan' 
                    : 'text-muted-foreground hover:bg-card/50 hover:text-foreground'
                  }`}
              >
                <Icon className="mr-3" size={20} />
                {label}
                {activeTab === id && <ChevronRight className="ml-auto" size={16} />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Header */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent mb-2">
                {activeTab === 'dashboard' ? '🧠 Neural Dashboard' : 
                 activeTab === 'expenses' ? '⚡ Smart Expenses' :
                 activeTab === 'budgets' ? '🛡️ AI Budget Control' :
                 activeTab === 'goals' ? '🏆 Achievement Hub' : '📈 Predictive Analytics'}
              </h2>
              <p className="text-muted-foreground">Powered by Advanced AI • Real-time Insights</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-3 text-neon-cyan hover:text-neon-cyan/80 transition-colors">
                <Bell size={24} />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-danger text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
                    {alerts.length}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 bg-card/80 backdrop-blur-xl rounded-xl p-3 border border-neon-cyan/30">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <div className="text-foreground font-semibold text-sm">John Student</div>
                  <div className="text-neon-cyan text-xs flex items-center gap-1">
                    <Star size={10} className="text-neon-yellow" />
                    AI Premium
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Monthly Spent', value: `$${totalSpent.toFixed(0)}`, change: '-12%', icon: DollarSign, color: 'cyan' },
                  { title: 'Budget Remaining', value: `$${(totalBudget - totalSpent).toFixed(0)}`, change: '+15%', icon: Shield, color: 'green' },
                  { title: 'Savings Rate', value: `${savingsRate}%`, change: '+8%', icon: TrendingUp, color: 'purple' },
                  { title: 'Goals Progress', value: '67%', change: '+23%', icon: Trophy, color: 'yellow' }
                ].map((stat, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-border/50 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${
                          stat.color === 'cyan' ? 'bg-gradient-info' :
                          stat.color === 'green' ? 'bg-gradient-success' :
                          stat.color === 'purple' ? 'bg-gradient-primary' :
                          'bg-gradient-warning'
                        }`}>
                          <stat.icon className="text-white" size={24} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-neon-green/20 text-neon-green">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-foreground mb-1">{stat.value}</div>
                      <div className="text-muted-foreground font-medium">{stat.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insights */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-20"></div>
                <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-8 border border-neon-purple/30">
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="p-2 bg-gradient-primary rounded-xl">
                      <Brain className="text-white" size={24} />
                    </div>
                    AI Insights
                  </h3>
                  
                  <div className="space-y-4">
                    {alerts.map(alert => (
                      <div key={alert.id} className={`p-4 rounded-xl border-l-4 backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 ${
                        alert.type === 'ai' ? 'bg-neon-purple/20 border-neon-purple' : 
                        alert.type === 'achievement' ? 'bg-neon-green/20 border-neon-green' :
                        'bg-neon-cyan/20 border-neon-cyan'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            alert.type === 'ai' ? 'bg-neon-purple/30' : 
                            alert.type === 'achievement' ? 'bg-neon-green/30' :
                            'bg-neon-cyan/30'
                          }`}>
                            {alert.type === 'ai' ? <Brain className="text-neon-purple" size={16} /> :
                             alert.type === 'achievement' ? <Trophy className="text-neon-green" size={16} /> :
                             <Lightbulb className="text-neon-cyan" size={16} />}
                          </div>
                          <div className="flex-1">
                            <div className="text-foreground font-medium">{alert.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(alert.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spending Distribution */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-info rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-neon-cyan/30">
                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <DollarSign className="text-neon-cyan" size={20} />
                      Spending Matrix
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          dataKey="value"
                          label={(data: any) => `${data.name}: ${data.percent ? (data.percent * 100).toFixed(0) : 0}%`}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`$${value.toFixed(2)}`, 'Spent']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Weekly Trend */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-success rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-6 border border-neon-green/30">
                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <TrendingUp className="text-neon-green" size={20} />
                      Weekly Pattern
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                        <Area type="monotone" dataKey="spending" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#spendingGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expenses Tab */}
          {activeTab === 'expenses' && (
            <div className="space-y-8">
              {/* Add Expense Form */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-20"></div>
                <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-8 border border-neon-purple/30">
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Plus className="text-neon-purple" size={24} />
                    Add Smart Expense
                  </h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleAddExpense(); }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-muted-foreground font-medium mb-2">Description</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-card/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                        placeholder="What did you buy?"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="w-full p-3 bg-card/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                        placeholder="$0.00"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">Category</label>
                      <select
                        className="w-full p-3 bg-card/50 border border-border rounded-xl text-foreground focus:border-neon-purple focus:ring-1 focus:ring-neon-purple"
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                      >
                        {Object.keys(budgets).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-glow-purple"
                      >
                        <Plus size={20} />
                        Add Expense
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Expenses List */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-info rounded-2xl blur opacity-20"></div>
                <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-8 border border-neon-cyan/30">
                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <CreditCard className="text-neon-cyan" size={24} />
                    Recent Transactions
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {expenses.slice().reverse().map(expense => {
                      const IconComponent = categoryIcons[expense.category];
                      return (
                        <div key={expense.id} className="flex items-center gap-4 p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-all duration-300">
                          <div className="p-3 bg-neon-cyan/20 rounded-xl">
                            <IconComponent className="text-neon-cyan" size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="text-foreground font-semibold">{expense.description}</div>
                            <div className="text-muted-foreground text-sm flex items-center gap-2">
                              <span className="px-2 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-xs">
                                {expense.category}
                              </span>
                              <span>•</span>
                              <span>{new Date(expense.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-destructive">-${expense.amount.toFixed(2)}</div>
                            <div className="text-muted-foreground text-sm">{expense.mood}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Budget Control Tab */}
          {activeTab === 'budgets' && (
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-success rounded-2xl blur opacity-20"></div>
                <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-8 border border-neon-green/30">
                  <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <Shield className="text-neon-green" size={24} />
                    AI Budget Control
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {spendingByCategory.map(item => {
                      const IconComponent = categoryIcons[item.category];
                      const isOverBudget = item.percentage > 100;
                      const isWarning = item.percentage > 80;
                      
                      return (
                        <div key={item.category} className="bg-card/30 rounded-xl p-6 hover:bg-card/50 transition-all duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-xl ${isOverBudget ? 'bg-destructive/20' : isWarning ? 'bg-neon-yellow/20' : 'bg-neon-green/20'}`}>
                              <IconComponent className={`${isOverBudget ? 'text-destructive' : isWarning ? 'text-neon-yellow' : 'text-neon-green'}`} size={24} />
                            </div>
                            <div>
                              <h4 className="text-foreground font-semibold text-lg">{item.category}</h4>
                              <p className="text-muted-foreground text-sm">Budget: ${item.budget}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Spent</span>
                              <span className="text-foreground font-bold">${item.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Remaining</span>
                              <span className={`font-bold ${item.remaining > 0 ? 'text-neon-green' : 'text-destructive'}`}>
                                ${item.remaining.toFixed(2)}
                              </span>
                            </div>
                            
                            <div className="w-full bg-muted rounded-full h-3">
                              <div
                                className={`h-3 rounded-full transition-all duration-1000 ${
                                  isOverBudget ? 'bg-gradient-danger' :
                                  isWarning ? 'bg-gradient-warning' :
                                  'bg-gradient-success'
                                }`}
                                style={{ width: `${Math.min(100, item.percentage)}%` }}
                              />
                            </div>
                            
                            <div className="text-center">
                              <span className={`font-bold ${isOverBudget ? 'text-destructive' : isWarning ? 'text-neon-yellow' : 'text-neon-green'}`}>
                                {item.percentage.toFixed(1)}% used
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-warning rounded-2xl blur opacity-20"></div>
                <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-8 border border-neon-yellow/30">
                  <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <Trophy className="text-neon-yellow" size={24} />
                    Achievement Goals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map(goal => {
                      const progress = (goal.saved / goal.target) * 100;
                      const isCompleted = progress >= 100;
                      
                      return (
                        <div key={goal.id} className="bg-card/30 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 hover:-translate-y-1">
                          <div className="text-center mb-6">
                            <div className="text-4xl mb-3">{goal.icon}</div>
                            <h4 className="text-foreground font-bold text-lg mb-2">{goal.name}</h4>
                            <p className="text-muted-foreground">Target: ${goal.target.toLocaleString()}</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Saved</span>
                              <span className="text-foreground font-bold">${goal.saved.toLocaleString()}</span>
                            </div>
                            
                            <div className="w-full bg-muted rounded-full h-4">
                              <div
                                className={`h-4 rounded-full transition-all duration-1000 ${
                                  isCompleted ? 'bg-gradient-success' :
                                  'bg-gradient-warning'
                                }`}
                                style={{ width: `${Math.min(100, progress)}%` }}
                              />
                            </div>
                            
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className={`font-bold ${isCompleted ? 'text-neon-green' : 'text-neon-yellow'}`}>
                                {progress.toFixed(1)}%
                              </span>
                            </div>
                            
                            <div className="text-center pt-4">
                              {isCompleted ? (
                                <div className="flex items-center justify-center gap-2 text-neon-green font-bold">
                                  <Award size={16} />
                                  Goal Achieved! 🎉
                                </div>
                              ) : (
                                <div className="text-muted-foreground">
                                  ${(goal.target - goal.saved).toLocaleString()} to go
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-danger rounded-2xl blur opacity-20"></div>
                <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl p-8 border border-destructive/30">
                  <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <TrendingUp className="text-destructive" size={24} />
                    Predictive Analytics
                  </h3>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-card/30 rounded-xl">
                      <div className="text-3xl font-black text-neon-cyan">${totalSpent.toFixed(0)}</div>
                      <div className="text-muted-foreground font-medium">Total Spent</div>
                      <div className="text-sm text-neon-green mt-1">12% less than predicted</div>
                    </div>
                    <div className="text-center p-6 bg-card/30 rounded-xl">
                      <div className="text-3xl font-black text-neon-green">{savingsRate}%</div>
                      <div className="text-muted-foreground font-medium">Savings Rate</div>
                      <div className="text-sm text-neon-green mt-1">Above target</div>
                    </div>
                    <div className="text-center p-6 bg-card/30 rounded-xl">
                      <div className="text-3xl font-black text-neon-purple">{expenses.length}</div>
                      <div className="text-muted-foreground font-medium">Transactions</div>
                      <div className="text-sm text-neon-purple mt-1">This month</div>
                    </div>
                  </div>
                  
                  {/* Weekly Spending Analysis */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-foreground mb-4">Weekly Spending Pattern</h4>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={weeklyData}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="spending" 
                          stroke="#ef4444" 
                          strokeWidth={3}
                          dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                          name="Daily Spending ($)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          name="Mood Score (1-10)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FinanceManager;