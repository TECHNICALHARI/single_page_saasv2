type Plan = {
  name: string;
  price: string;
  features: string[];
};

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="plan-card">
      <div className="plan-badge">{plan.name}</div>
      <div className="plan-price">{plan.price}</div>

      <ul className="plan-list">
        {plan.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <a href="/create" className="btn-primary mt-6">
        Choose {plan.name}
      </a>
    </div>
  );
}
