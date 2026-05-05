'use client';

import { useState } from 'react';
import { Check, CreditCard, Building, Smartphone } from 'lucide-react';
import { PLANS } from '@/config/subscription';

const PAYMENT_METHODS = [
  { id: 'telebirr', name: 'Telebirr', icon: Smartphone, description: 'Instant mobile payment' },
  { id: 'cbe', name: 'CBE', icon: Building, description: 'Commercial Bank of Ethiopia' },
  { id: 'awash', name: 'Awash Bank', icon: Building, description: 'Awash National Bank' },
  { id: 'card', name: 'Card', icon: CreditCard, description: 'Credit/Debit card' }
];

interface PlanCardProps {
  plan: { monthlyPrice: number; yearlyPrice: number; features: readonly string[] };
  name: string;
  current?: boolean;
  onSelect: (planId: string) => void;
}

function PlanCard({ plan, name, current, onSelect }: PlanCardProps) {
  return (
    <div className={`rounded-xl border-2 p-6 ${current ? 'border-brand-600 bg-brand-50' : 'border-slate-200'}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{name}</h3>
        {current && <span className="rounded-full bg-brand-600 px-3 py-1 text-sm text-white">Current</span>}
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold">{plan.monthlyPrice.toLocaleString()}</span>
        <span className="text-slate-500"> ETB/mo</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">or {Math.round(plan.yearlyPrice / 12).toLocaleString()} ETB billed monthly</p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>
      {!current && (
        <button
          onClick={() => onSelect(name)}
          className="mt-6 w-full rounded-xl bg-brand-600 py-2.5 font-medium text-white hover:bg-brand-700"
        >
          Select Plan
        </button>
      )}
    </div>
  );
}

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    if (!selectedPlan || !paymentMethod) return;
    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/billing/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          paymentMethod,
          amount: PLANS[selectedPlan as keyof typeof PLANS].monthlyPrice
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Payment initiated. Check instructions below.');
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold">Choose a Plan</h3>
        <p className="mt-1 text-sm text-slate-500">Select the plan that best fits your agency needs.</p>
        
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {Object.entries(PLANS).map(([key, plan]) => (
            <PlanCard key={key} plan={plan} name={key} onSelect={setSelectedPlan} />
          ))}
        </div>
      </section>

      {selectedPlan && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold">Payment Method</h3>
          <p className="mt-1 text-sm text-slate-500">Complete your subscription with Ethiopian payment options.</p>
          
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                  paymentMethod === method.id
                    ? 'border-brand-600 bg-brand-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <method.icon className="h-6 w-6 text-slate-500" />
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-slate-500">{method.description}</p>
                </div>
              </button>
            ))}
          </div>

          {paymentMethod && (
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Pay ${PLANS[selectedPlan as keyof typeof PLANS].monthlyPrice} ETB`}
            </button>
          )}
        </section>
      )}
    </div>
  );
}