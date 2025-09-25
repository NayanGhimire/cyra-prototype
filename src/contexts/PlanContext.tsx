import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  maxQueries: number;
  responseTime: string;
  support: string;
}

interface PlanContextType {
  plans: Plan[];
  selectedPlan: Plan | null;
  selectPlan: (plan: Plan) => void;
  usage: {
    queriesUsed: number;
    queriesLimit: number;
    threatsDetected: number;
    reportsGenerated: number;
  };
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      maxQueries: 50,
      responseTime: '< 5s',
      support: 'Community',
      features: [
        'Basic threat detection',
        '50 queries per month',
        'Community support',
        'Basic vulnerability scan',
        'Email notifications'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 29,
      maxQueries: 500,
      responseTime: '< 2s',
      support: 'Priority',
      popular: true,
      features: [
        'Advanced threat analysis',
        '500 queries per month',
        'Priority support',
        'Real-time monitoring',
        'Custom alerts',
        'API access',
        'Detailed reports',
        'Multi-user access'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      maxQueries: 2000,
      responseTime: '< 1s',
      support: 'Dedicated',
      features: [
        'Enterprise-grade security',
        '2000 queries per month',
        'Dedicated support manager',
        '24/7 monitoring',
        'Custom integrations',
        'Advanced analytics',
        'White-label options',
        'SLA guarantee',
        'On-premise deployment'
      ]
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const selectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const usage = {
    queriesUsed: 23,
    queriesLimit: 50,
    threatsDetected: 12,
    reportsGenerated: 5
  };

  const value = {
    plans,
    selectedPlan,
    selectPlan,
    usage
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};