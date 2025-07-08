export default function TrustSection() {
  return (
    <section className="section bg-muted">
      <div className="container text-center">
        <h2 className="section-title">Trusted by Creators & Small Teams</h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Over <strong>3,200+</strong> users launched their online identity with OnePage — from solo creators to fast-growing startups.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            ['4.9/5 Rating', 'Based on 1,200+ reviews'],
            ['99.98% Uptime', 'Hosted on Vercel CDN'],
            ['< 2 min setup', 'Faster than any other builder']
          ].map(([title, desc], i) => (
            <div key={i} className="feature-card text-center">
              <h4 className="text-2xl font-bold text-brand">{title}</h4>
              <p className="text-muted-text mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
