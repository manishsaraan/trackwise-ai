export default function Sidebar() {
  return (
    <aside className="flex flex-col items-center h-screen sticky top-0 overflow-y-auto space-y-4 w-72 py-6 px-4 bg-base-200">
      <a className="btn btn-ghost text-lg">
        <img
          alt="Logo"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          className="w-6"
        />
        TrackWiseAI
      </a>

      <ul className="menu menu-lg w-full">
        <li>
          <a>
            <i className="fa-solid fa-inbox fa-fw"></i>
            My Jobs<span className="badge">5</span>
          </a>
        </li>
        <li>
          <a className="active">
            <i className="fa-solid fa-user fa-fw"></i>
            Applicants
          </a>
        </li>

        <li>
          <a>
            <i className="fa-solid fa-gear fa-fw"></i>
            Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}
