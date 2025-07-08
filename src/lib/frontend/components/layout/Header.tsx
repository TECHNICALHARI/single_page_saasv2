import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="header">
      <div className="container flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-brand">OnePage</h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#why" className="hover:text-brand">Why OnePage</a>
          <a href="#reviews" className="hover:text-brand">Users</a>
          <a href="#plans" className="hover:text-brand">Plans</a>
          <a href="#faq" className="hover:text-brand">FAQ</a>
          <a href="/create" className="btn-brand-sm">Create Page</a>
           <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
