export default function Hero() {
  return (
    <section className="hero">
      <div className="container text-center">
        <h2 className="hero-title">Create Your Online Identity with Elegance</h2>
        <p className="hero-subtitle">Your digital profile, portfolio, or landing page — beautifully built and hosted under your own link. Try it free, upgrade anytime.</p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="/create" className="btn-white">Start for Free</a>
          <a href="#plans" className="btn-outline-white">View Pricing</a>
        </div>
      </div>
    </section>
  );
}
