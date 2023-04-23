import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/globals.css";
import Nav from "./Navbar";
import Sidebar from "./Sidebar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }, (error) => {
      console.log(error);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     router.push("/");
  //   }
  // }, [router, user]);

  return user ? (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="px-10 py-5 w-[100vw] h-screen overflow-y-auto overflow-x-hidden">
        <Nav />
        <div className="my-5">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  ) : (
    <Component {...pageProps} />
  );
}
