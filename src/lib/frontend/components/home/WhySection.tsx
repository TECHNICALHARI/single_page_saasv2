export default function WhySection() {
  return (
    <section id="why" className="section bg-white">
      <div className="container text-center">
        <h3 className="section-title">Why OnePage?</h3>
        <p className="section-subtitle max-w-3xl mx-auto">Unlike generic link tools, OnePage helps you build trust and convert visitors with rich content under your subdomain.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
          {[
            ['🎨 Fully Customizable', 'Add sections like About, Gallery, Testimonials using a no-code editor.'],
            ['🚀 Share & Convert', 'Optimized for social and mobile. Build for creators, freelancers, and teams.'],
            ['🔐 Secure & Scalable', 'Hosted on Vercel with secure Magic Link login. Fast, private, and safe.'],
          ].map(([title, desc], i) => (
            <div key={i} className="feature-card">
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
