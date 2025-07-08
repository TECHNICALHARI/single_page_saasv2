export default function UseCasesSection() {
  const useCases = [
    ['👨‍💻 Freelancers', 'Showcase your services, portfolio, contact info and land more gigs.'],
    ['🎨 Creators & Artists', 'Link to your Instagram, YouTube, gallery, or store — all in one place.'],
    ['📸 Photographers', 'Display your best shots, add testimonials, and allow inquiries via form.'],
    ['🏢 Small Businesses', 'Promote your offerings, location, and contact info with professional flair.'],
    ['🎓 Students & Grads', 'Build your resume site with projects, LinkedIn, and GitHub in under a minute.'],
    ['📣 Influencers', 'Control your bio link. Add YouTube, TikTok, WhatsApp, and promotions.'],
    ['📚 Coaches & Trainers', 'Showcase programs, testimonials, pricing, and booking details.'],
    ['📱 App Developers', 'Share your product, features, contact, and store links — beautifully.'],
    ['🛍️ Sellers & Vendors', 'Link your catalog, location, social DMs, and WhatsApp with zero code.'],
  ];

  return (
    <section className="section bg-muted">
      <div className="container text-center">
        <h2 className="section-title">Perfect For</h2>
        <p className="section-subtitle">
          OnePage is made for anyone who wants to create a professional presence — fast.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
          {useCases.map(([title, desc], i) => (
            <div key={i} className="feature-card">
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p className="text-muted-text">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
