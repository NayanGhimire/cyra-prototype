import React, { useEffect, useState } from "react";
import { usePlan } from "../../contexts/PlanContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, MessageSquare, Shield, AlertTriangle, Activity } from "lucide-react";

type Pulse = {
  id: string;
  name: string;
  created: string;
  tags: string[];
};

const UsageStats: React.FC = () => {
  const { usage } = usePlan();
  const [threats, setThreats] = useState<Pulse[]>([]);
  const [threatTypes, setThreatTypes] = useState<{ name: string; value: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const res = await fetch("https://otx.alienvault.com/api/v1/pulses/subscribed", {
          headers: { "X-OTX-API-KEY": process.env.VITE_OTX_API_KEY! }, // API KEY OF ALIENVAULT
        });
        const data = await res.json();
        const pulses: Pulse[] = data.results.slice(0, 50);

        setThreats(pulses);

        
        const typeCount: Record<string, number> = {};
        pulses.forEach(p => p.tags.forEach(tag => {
          typeCount[tag] = (typeCount[tag] || 0) + 1;
        }));

        const colors = ["#EF4444", "#F97316", "#EAB308", "#06B6D4", "#8B5CF6"];
        setThreatTypes(Object.entries(typeCount).map(([name, value], idx) => ({
          name,
          value,
          color: colors[idx % colors.length],
        })));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();
  }, []);


  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-2">Usage Analytics</h1>
      <p className="text-gray-400 mb-4">Real-time cybersecurity stats</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Queries Used" value={usage.queriesUsed} total={usage.queriesLimit} icon={MessageSquare} color="cyan" />
        <StatCard title="Threats Detected" value={threats.length} icon={Shield} color="red" />
        <StatCard title="Reports Generated" value={usage.reportsGenerated} icon={TrendingUp} color="green" />
        <StatCard title="System Uptime" value="0%" icon={Activity} color="blue" />
      </div>

      {/* Threat Distribution */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Threat Distribution</h2>
        {loading ? <p className="text-gray-400">Loading...</p> : (
          <PieChart width={400} height={250}>
            <Pie data={threatTypes} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={80}>
              {threatTypes.map((type, idx) => <Cell key={idx} fill={type.color} />)}
            </Pie>
          </PieChart>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        {loading ? <p className="text-gray-400">Loading real-time activity...</p> : (
          <div className="space-y-4">
            {threats.slice(0, 10).map(p => (
              <div key={p.id} className="flex items-center p-4 bg-gray-700/50 rounded-lg">
                <div className="p-2 rounded-lg mr-4 bg-red-500/20">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{p.name}</p>
                  <p className="text-gray-400 text-xs">{new Date(p.created).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, total, icon: Icon, color }: any) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6`}>
    <div className={`p-3 bg-${color}-500/10 rounded-lg mb-4`}>
      <Icon className={`w-6 h-6 text-${color}-400`} />
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">
      {value.toLocaleString()}
      {total && <span className="text-gray-400 text-sm">/{total}</span>}
    </h3>
    <p className="text-gray-400 text-sm">{title}</p>
  </div>
);

export default UsageStats;
