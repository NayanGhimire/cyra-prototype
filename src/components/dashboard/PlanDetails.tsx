import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Check, Zap, Clock, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Plan {
  id: string;
  name: string;
  price: number;
  maxQueries: number;
  responseTime: string;
  support: string;
  features: string[];
}

interface Usage {
  queriesUsed: number;
}

const PlanDetails: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [usage, setUsage] = useState<Usage>({ queriesUsed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        // Fetch plans and usage from backend
        const [plansRes, usageRes] = await Promise.all([
          fetch('/api/plans').then(res => res.json()),
          fetch(`/api/usage/${user?.id}`).then(res => res.json())
        ]);

        setPlans(plansRes);
        setUsage(usageRes);
      } catch (err) {
        console.error('Failed to fetch plan data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, [user?.id]);

  if (loading) return <p className="text-gray-300 p-6">Loading plan data...</p>;
  if (!user || plans.length === 0) return <p className="text-gray-300 p-6">No plan information available.</p>;

  const currentPlan = plans.find(p => p.id === (user?.plan || 'free'))!;
  const nextPlan = currentPlan.id === 'free' ? plans.find(p => p.id === 'pro') :
                   currentPlan.id === 'pro' ? plans.find(p => p.id === 'enterprise') : null;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-gray-900">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Plan & Billing</h1>
        <p className="text-gray-400">Manage your subscription and usage limits</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mr-4">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{currentPlan.name} Plan</h2>
              <p className="text-gray-300">
                {currentPlan.price === 0 ? 'Free forever' : `$${currentPlan.price}/month`}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Monthly Queries */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Monthly Queries</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">{usage.queriesUsed}</p>
            <p className="text-sm text-gray-400">of {currentPlan.maxQueries} used</p>
            <div className="mt-2 bg-gray-600 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                style={{ width: `${(usage.queriesUsed / currentPlan.maxQueries) * 100}%` }}
              />
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Response Time</span>
              <Clock className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">{currentPlan.responseTime}</p>
            <p className="text-sm text-gray-400">Average response</p>
          </div>

          {/* Support */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Support Level</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{currentPlan.support}</p>
            <p className="text-sm text-gray-400">Support tier</p>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-semibold mb-3">Plan Features</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Warning */}
      {(usage.queriesUsed / currentPlan.maxQueries) > 0.8 && nextPlan && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold">Usage Alert</span>
          </div>
          <p className="text-gray-300 mb-4">
            You've used {Math.round((usage.queriesUsed / currentPlan.maxQueries) * 100)}% of your monthly query limit.
            Consider upgrading to avoid interruption.
          </p>
          <Link
            to={`/checkout/${nextPlan.id}`}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
          >
            Upgrade to {nextPlan.name}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlanDetails;
