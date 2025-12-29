import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Activity, ShieldAlert, CheckCircle } from 'lucide-react';

const dataSeverity = [
  { name: 'High', value: 12, color: '#ef4444' },
  { name: 'Medium', value: 25, color: '#eab308' },
  { name: 'Low', value: 43, color: '#3b82f6' },
];

const dataTrends = [
  { name: 'Mon', issues: 40 },
  { name: 'Tue', issues: 30 },
  { name: 'Wed', issues: 45 },
  { name: 'Thu', issues: 20 },
  { name: 'Fri', issues: 15 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-dark text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
          <p className="text-gray-400">Overview of code quality and security metrics.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Total Issues" 
            value="80" 
            change="-12%" 
            icon={<ShieldAlert className="text-red-400" />} 
          />
          <StatCard 
            title="Quality Score" 
            value="85/100" 
            change="+5%" 
            icon={<Activity className="text-blue-400" />} 
          />
          <StatCard 
            title="Files Analyzed" 
            value="1,240" 
            change="+120" 
            icon={<CheckCircle className="text-green-400" />} 
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-6">Issue Severity Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataSeverity}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataSeverity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-6">Weekly Issue Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataTrends}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                     cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="issues" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-6 rounded-xl flex items-start justify-between"
  >
    <div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <h4 className="text-3xl font-bold mb-2">{value}</h4>
      <span className={change.startsWith('+') ? 'text-green-400 text-sm' : 'text-green-400 text-sm'}>
        {change} <span className="text-gray-500">vs last week</span>
      </span>
    </div>
    <div className="p-3 bg-white/5 rounded-lg">
      {icon}
    </div>
  </motion.div>
);

export default Dashboard;
