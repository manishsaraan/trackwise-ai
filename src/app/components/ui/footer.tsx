export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row gap-8 justify-between p-2">
      <aside>
        <small>TrackWiseAI Copyright © 2024 - All rights reserved</small>
      </aside>

      <nav className="flex gap-4">
        <a className="btn btn-ghost btn-sm btn-circle">
          <i className="fa-brands fa-github text-2xl"></i>
        </a>
        <a className="btn btn-ghost btn-sm btn-circle">
          <i className="fa-brands fa-twitter text-2xl"></i>
        </a>
        <a className="btn btn-ghost btn-sm btn-circle">
          <i className="fa-brands fa-facebook text-2xl"></i>
        </a>
        <a className="btn btn-ghost btn-sm btn-circle">
          <i className="fa-brands fa-youtube text-2xl"></i>
        </a>
      </nav>
    </footer>
  );
}
