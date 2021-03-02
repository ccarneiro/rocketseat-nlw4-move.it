import { useContext } from "react";
import { AuthorizationContext } from "../contexts/AuthorizationContext";
import { ChallengesContext } from "../contexts/ChallengesContext";
import style from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { user } = useContext(AuthorizationContext);

  return (
    <div className={style.profileContainer}>
      <img src={user?.avatar_url || "/logo.svg"} alt="Avatar" />
      <div>
        <strong>{user?.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
