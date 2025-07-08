export default function CallToAction() {
  return (
    <section className="section bg-white text-center">
      <div className="container">
        <h2 className="section-title">Get Started in 60 Seconds</h2>
        <p className="section-subtitle max-w-xl mx-auto">
          Launch your beautiful personal or business page in under a minute. No design or code needed.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a href="/create" className="btn-primary">Start for Free</a>
          <a href="#plans" className="btn-white">See Pricing</a>
        </div>

        <p className="text-sm text-muted-text mt-4">No credit card required. Cancel anytime.</p>
      </div>
    </section>
  );
}
