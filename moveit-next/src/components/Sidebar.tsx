import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthorizationContext } from "../contexts/AuthorizationContext";
import styles from "../styles/components/Sidebar.module.css";

export function Sidebar() {
  const router = useRouter();
  const { logout } = useContext(AuthorizationContext);

  const homeActive = router.pathname === "/";
  const leaderboardActive = router.pathname === "/leaderboard";

  function handleLogout() {
    logout();
  }

  return (
    <nav className={styles.container}>
      <img src="/logo-blue.svg" alt="logo" />
      <div>
        <button className={homeActive && styles.active}>
          <div></div>
          <div>
            <img
              src={`/icons/home${homeActive ? "-active" : ""}.svg`}
              alt="Home"
            />
          </div>
        </button>
        <button className={leaderboardActive && styles.active}>
          <div></div>
          <div>
            <img
              src={`/icons/leaderboard${
                leaderboardActive ? "-active" : ""
              }.svg`}
              alt="Leaderboard"
            />
          </div>
        </button>
      </div>
      <button onClick={handleLogout}>
        <div></div>
        <div>
          <img src={`/icons/logout.svg`} alt="logout" />
        </div>
      </button>
    </nav>
  );
}
