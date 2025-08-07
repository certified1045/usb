"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import styles from "@/styles/Nav.module.css";
import AuthContext from "../AuthContext";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const NavClient = () => {
  const router = useRouter();
  const { signout, user, authChecking }: any = useContext(AuthContext);
  const [ham, setHam] = useState(false);
  return (
    <>
      <div className={styles.menuIcon} onClick={() => setHam(!ham)}>
        <div
          className={
            !ham ? styles.patty : `${styles["patty"]} ${styles["active"]}`
          }
        ></div>
      </div>
      <ul
        onClick={() => setHam(!ham)}
        className={
          !ham
            ? `${styles["navMenu"]} ${styles["active"]} h-[60px] items-center`
            : `${styles.navMenu} bg-background lg:bg-none lg:h-[60px]`
        }
      >
        <Link href="/#home" className={styles.navLinks}>
          {" "}
          Home
        </Link>
        {/* <Link className={styles.navLinks}> signout</Link> */}
        <Link href="/#about" className={styles.navLinks}>
          {" "}
          About
        </Link>
        <Link href="/#services" className={styles.navLinks}>
          {" "}
          Services
        </Link>
        <Link href="/#contact" className={styles.navLinks}>
          {" "}
          Contact Us
        </Link>
        <Link href="/dashboard" className={styles.navLinks}>
          {" "}
          Dashboard
        </Link>
        <li className={styles.navLinks}>
          {" "}
          <Link href="/faq">FAQ</Link>
        </li>
        <li className="py-2 px-7 w-full text-black">
          {authChecking ? (
            <Skeleton className="w-14 h-8" />
          ) : !user ? (
            <Link
              href="/login"
              className="rounded p-1.5 border border-secondaryColor text-secondaryColor whitespace-nowrap"
            >
              log in
            </Link>
          ) : (
            <Button
              variant="outline"
              onClick={signout}
              className="border-red-600"
            >
              Log Out
            </Button>
          )}
        </li>
      </ul>
    </>
  );
};

export default NavClient;
