'use client';

import { useState, useEffect } from 'react';
import { BriefcaseBusiness, TrendingUp, Users, Award, Phone, Mail, MapPin } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  region?: string;
  active: boolean;
  registrations: number;
  deployments: number;
  performance: number;
  commission: number;
  createdAt: string;
}

export function AgentManagementModule() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [agents, statusFilter, searchQuery]);

  const fetchAgents = async () => {
    try {
      const mockAgents: Agent[] = [
        {
          id: '1',
          name: 'Abebe Tesfaye',
          phone: '+251-911-123456',
          email: 'abebe@agency.com',
          region: 'Addis Ababa',
          active: true,
          registrations: 45,
          deployments: 38,
          performance: 92,
          commission: 4500,
          createdAt: '2023-03-15'
        },
        {
          id: '2',
          name: 'Almaz Kebede',
          phone: '+251-912-234567',
          email: 'almaz@agency.com',
          region: 'Oromia',
          active: true,
          registrations: 62,
          deployments: 55,
          performance: 95,
          commission: 6200,
          createdAt: '2023-02-10'
        },
        {
          id: '3',
          name: 'Tadesse Mekonnen',
          phone: '+251-913-345678',
          email: 'tadesse@agency.com',
          region: 'SNNPR',
          active: false,
          registrations: 28,
          deployments: 22,
          performance: 78,
          commission: 2200,
          createdAt: '2023-05-20'
        }
      ];
      setAgents(mockAgents);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAgents = () => {
    let filtered = agents;

    if (searchQuery) {
      filtered = filtered.filter((agent) =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.region?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((agent) =>
        statusFilter === 'active' ? agent.active : !agent.active
      );
    }

    setFilteredAgents(filtered);
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const totalRegistrations = agents.reduce((sum, a) => sum + a.registrations, 0);
  const totalDeployments = agents.reduce((sum, a) => sum + a.deployments, 0);
  const activeAgents = agents.filter((a) => a.active).length;
  const avgPerformance = agents.length > 0
    ? Math.round(agents.reduce((sum, a) => sum + a.performance, 0) / agents.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-ink">Agent Management</h2>
        <p className="mt-2 text-slate-600">
          Manage {filteredAgents.length} agents. Track onboarding, training, performance, commissions, and support workflows.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Agents</p>
              <p className="mt-2 text-2xl font-bold text-brand-600">{activeAgents}</p>
            </div>
            <BriefcaseBusiness className="h-8 w-8 text-brand-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Registrations</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">{totalRegistrations}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Deployed</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">{totalDeployments}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-600 opacity-20" />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Performance</p>
              <p className="mt-2 text-2xl font-bold text-purple-600">{avgPerformance}%</p>
            </div>
            <Award className="h-8 w-8 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="all">All Agents</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Users className="h-4 w-4" />
          Onboard Agent
        </button>
      </div>

      {/* Agents Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-ink">Name</th>
              <th className="px-6 py-3 font-semibold text-ink">Contact</th>
              <th className="px-6 py-3 font-semibold text-ink">Region</th>
              <th className="px-6 py-3 font-semibold text-ink">Registrations</th>
              <th className="px-6 py-3 font-semibold text-ink">Deployed</th>
              <th className="px-6 py-3 font-semibold text-ink">Performance</th>
              <th className="px-6 py-3 font-semibold text-ink">Commission</th>
              <th className="px-6 py-3 font-semibold text-ink">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                  Loading agents...
                </td>
              </tr>
            ) : filteredAgents.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                  No agents found
                </td>
              </tr>
            ) : (
              filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium text-ink">{agent.name}</td>
                  <td className="px-6 py-3 text-slate-600">
                    <div className="text-xs">
                      {agent.email && <p>{agent.email}</p>}
                      {agent.phone && <p className="text-slate-500">{agent.phone}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{agent.region || '-'}</td>
                  <td className="px-6 py-3 font-medium text-ink">{agent.registrations}</td>
                  <td className="px-6 py-3 font-medium text-emerald-600">{agent.deployments}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getPerformanceBadge(agent.performance)}`}>
                      {agent.performance}%
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium text-brand-600">
                    ETB {agent.commission.toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      agent.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {agent.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
