export default function UserShowcase() {
  const users = [
    { name: '@rajtech', link: 'https://raj.onepage.site', desc: 'Freelancer with GitHub, WhatsApp & services.' },
    { name: '@artbyaisha', link: 'https://aisha.onepage.site', desc: 'Artist showing gallery, contact & store.' },
    { name: '@startupdeck', link: 'https://startupdeck.onepage.site', desc: 'Startup pitch deck with embedded video.' }
  ];
  return (
    <section id="reviews" className="section bg-muted">
      <div className="container text-center">
        <h3 className="section-title">Pages Created with OnePage</h3>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {users.map((user, i) => (
            <div key={i} className="user-card">
              <h4 className="text-brand font-semibold">{user.name}</h4>
              <a href={user.link} target="_blank" className="underline text-blue-600 break-all">{user.link}</a>
              <p className="text-muted-text mt-2">{user.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
