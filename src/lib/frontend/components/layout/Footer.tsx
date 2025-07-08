export default function Footer() {
  return (
    <footer className="bg-foreground text-muted-text py-12">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2025 OnePage. All rights reserved.</p>
        <nav className="flex gap-6 mt-4 md:mt-0 text-sm">
          <a href="#plans" className="hover:text-white">Plans</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="/terms" className="hover:text-white">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
