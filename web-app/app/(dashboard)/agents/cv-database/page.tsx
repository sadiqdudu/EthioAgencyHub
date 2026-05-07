'use client';

import { useState, useEffect } from 'react';
import { CvSearch } from '@/components/employees/cv-search';

interface AgentInfo {
  id: string;
  name: string;
}

export default function AgentCvDatabasePage() {
  const [agent, setAgent] = useState<AgentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents/me')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAgent(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (employeeId: string) => {
    console.log('Employee selected:', employeeId);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          Agent not found. Please log in as an agent to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
        <h2 className="text-lg font-bold text-brand-800">Agent CV Database</h2>
        <p className="text-sm text-brand-600">
          Welcome, {agent.name}. Browse and select employees for deployment. 
          Once selected, other agents cannot access those profiles.
        </p>
      </div>
      
      <CvSearch 
        agentId={agent.id} 
        viewOnly={false}
        onSelect={handleSelect}
      />
    </div>
  );
}