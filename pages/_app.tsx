import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/globals.css";
import Nav from "./Navbar";
import Sidebar from "./Sidebar";
import type { AppProps } from "next/app";
import { Loading } from "@nextui-org/react";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }, (error) => {
      setLoading(false);
      console.log(error);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    // show the loader while loading
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return user ? (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="md:px-10 px-5 py-5 w-[100vw] h-screen overflow-y-auto overflow-x-hidden">
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
