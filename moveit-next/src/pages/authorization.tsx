import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "../styles/pages/Login.module.css";
import { AuthorizationContext, User } from "../contexts/AuthorizationContext";

interface AuthorizationProps {
  accessToken: string;
}

export default function Authorization(props: AuthorizationProps) {
  const { authorized, unauthorized } = useContext(AuthorizationContext);
  const [accessToken, setAccessToken] = useState(props.accessToken);

  useEffect(() => {
    if (accessToken) {
      authorized(accessToken);
    } else {
      unauthorized();
    }
  }, [accessToken]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Autenticação | move.it</title>
      </Head>
      <section>
        <div className={styles.logo}></div>
        <div className={styles.login}>
          <img src="/logo-full-white.svg" alt="Logo full" />
          <strong>Autenticando...</strong>
          <p>
            <strong>&nbsp;</strong>
          </p>
          <div>&nbsp;</div>
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
          client_id: "92c5770575d9aecfb2a9",
          client_secret: "1a2126e4e52bfac894e94cb63c9e0cbb28ad50c8",
          code: code,
        }),
      }
    );
    const data = (await response.json()) as any;

    return {
      props: {
        accessToken: data.access_token || null,
      },
    };
  }

  const { accessToken } = ctx.req.cookies;
  return {
    props: {
      accessToken: accessToken || null,
    },
  };
};
