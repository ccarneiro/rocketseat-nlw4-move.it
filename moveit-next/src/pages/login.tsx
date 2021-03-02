import Head from "next/head";
import { useState } from "react";
import styles from "../styles/pages/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const isButtonDisabled = username.length <= 2;

  function handleLogin() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=92c5770575d9aecfb2a9&login=${username}&redirect_uri=http://localhost:3000/authorization`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Autenticação | move.it</title>
      </Head>
      <section>
        <div className={styles.logo}></div>
        <div className={styles.login}>
          <img src="/logo-full-white.svg" alt="Logo full" />
          <strong>Bem-vindo</strong>
          <p>
            <img src="/icons/github.svg" alt="Icon Github" />
            <span>Faça login com seu Github para começar</span>
          </p>
          <div>
            <input
              value={username}
              placeholder="Digite seu username"
              onChange={({ target }) => setUsername(target.value)}
              onKeyUp={({ key }) => key === "Enter" && handleLogin()}
            />
            <button disabled={isButtonDisabled} onClick={handleLogin}>
              <img src="/icons/send.svg" alt="send" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
