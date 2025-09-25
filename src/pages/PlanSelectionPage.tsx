import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Crown, Shield, ArrowLeft } from 'lucide-react';
import { usePlan } from '../contexts/PlanContext';
import { useAuth } from '../contexts/AuthContext';

const PlanSelectionPage: React.FC = () => {
  const { plans } = usePlan();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      navigate('/');
    } else {
      navigate(`/checkout/${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to={user ? "/" : "/login"} className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-cyan-400 mr-3" />
            <span className="text-white text-xl font-bold">Cyra</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Security Plan</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Protect your digital assets with AI-powered cybersecurity intelligence. 
            Choose the plan that fits your security needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-800 rounded-2xl p-6 border transition-all duration-200 hover:scale-105 ${
                plan.popular 
                  ? 'border-cyan-400 shadow-cyan-400/20 shadow-2xl' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {plan.maxQueries} queries • {plan.responseTime} response • {plan.support} support
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {plan.price === 0 ? 'Get Started Free' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300">Feature</th>
                  <th className="text-center py-3 px-4 text-gray-300">Free</th>
                  <th className="text-center py-3 px-4 text-gray-300">Pro</th>
                  <th className="text-center py-3 px-4 text-gray-300">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Monthly Queries', '50', '500', '2000'],
                  ['Response Time', '< 5s', '< 2s', '< 1s'],
                  ['Threat Detection', 'Basic', 'Advanced', 'Enterprise'],
                  ['Real-time Monitoring', '❌', '✅', '✅'],
                  ['API Access', '❌', '✅', '✅'],
                  ['Custom Alerts', '❌', '✅', '✅'],
                  ['24/7 Support', '❌', '❌', '✅'],
                  ['SLA Guarantee', '❌', '❌', '✅']
                ].map(([feature, free, pro, enterprise], index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="py-3 px-4 text-gray-300">{feature}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{free}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{pro}</td>
                    <td className="py-3 px-4 text-center text-gray-300">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelectionPage;