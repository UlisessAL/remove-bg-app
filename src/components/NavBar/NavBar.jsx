import { Link } from "react-router-dom";
import { useCloudinaryContext } from "../../context/cloudinaryContext";
import "../../scss/NavBar.scss"
import logo from "../../img/logo.webp"

const NavBar = () => {
  const { effects } = useCloudinaryContext();

  return (
    <div className="navbar bg-base-100 aqua" data-theme="aqua">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="logo" style={{width:"40px"}}/>
        </Link>
      </div>
      <div className={`flex-none`}>
        <ul className="menu menu-horizontal px-1 z-40 ul">
          <li tabIndex={0} className="ul-nav">
            <a>
              More effects
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100 ul-nav">
              {effects.map((effect) => (
                <li className="max-w-xs" key={effect.id}>
                  <Link
                    to={`/effect/${effect.funct}`}
                    style={{ padding: "10px" }}
                  >
                    {effect.effect}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link to="/remove-background">Remove background</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
