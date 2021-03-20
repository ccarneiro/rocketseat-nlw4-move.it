import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/pages/Login.module.css";
import { AuthorizationContext } from "../contexts/AuthorizationContext";

interface LoginProps {
  accessToken: string;
  client_id: string;
}

export default function Login(props: LoginProps) {
  const [username, setUsername] = useState("");
  const isButtonDisabled = username.length <= 2;

  const { authorized, unauthorized } = useContext(AuthorizationContext);
  const [accessToken, setAccessToken] = useState(props.accessToken);

  useEffect(() => {
    if (accessToken) {
      authorized(accessToken);
    } else {
      unauthorized();
    }
  }, [accessToken]);

  function handleLogin() {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${props.client_id}&login=${username}&redirect_uri=http://localhost:3000/login`;
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code } = ctx.query;

  if (code) {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.client_id,
          client_secret: process.env.client_secret,
          code: code,
        }),
      }
    );
    const data = (await response.json()) as any;

    return {
      props: {
        accessToken: data.access_token || null,
        client_id: process.env.client_id,
      },
    };
  }

  const { accessToken } = ctx.req.cookies;
  return {
    props: {
      accessToken: accessToken || null,
      client_id: process.env.client_id,
    },
  };
};
