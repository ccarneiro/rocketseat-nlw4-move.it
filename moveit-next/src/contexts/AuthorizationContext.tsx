import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

export interface User {
  username: string;
  avatar_url: string;
  name: string;
}

interface AuthorizationContextData {
  accessToken: string;
  user: User;
  authorized: (accessToken: string) => void;
  unauthorized: () => void;
  logout: () => void;
}

interface AuthorizationProviderProps {
  children: React.ReactNode;
}

const allowedUrls = ["/login"];
const accessTokenKey = "accessToken";

export const AuthorizationContext = createContext(
  {} as AuthorizationContextData
);

export function AuthorizationProvider({
  children,
}: AuthorizationProviderProps) {
  const router = useRouter();

  const allowedUrl = allowedUrls.includes(router.pathname);

  const [accessToken, setAccessToken] = useState(
    Cookies.get(accessTokenKey) || ""
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (accessToken) {
      Cookies.set(accessTokenKey, accessToken || "", { sameSite: "strict" });

      fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((githubUser) => {
          setUser({
            username: githubUser.login,
            avatar_url: githubUser.avatar_url,
            name: githubUser.name,
          });
        });
    } else if (!allowedUrl) {
      router.push("/login");
    }
  }, [accessToken]);

  function authorized(accessToken: string) {
    setAccessToken(accessToken);
    if (accessToken && router.pathname !== "/") {
      router.push("/");
    }
  }

  function unauthorized() {
    logout();
  }

  function logout() {
    Cookies.remove(accessTokenKey);
    setAccessToken("");
    setUser(null);
  }

  return (
    <AuthorizationContext.Provider
      value={{
        accessToken,
        user,
        authorized,
        unauthorized,
        logout,
      }}
    >
      {(allowedUrl || accessToken) && children}
    </AuthorizationContext.Provider>
  );
}
