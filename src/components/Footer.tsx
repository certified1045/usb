import Link from "next/link";
import React from "react";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className="bg-border">
      <div className="flex justify-between items-start flex-col md:flex-row">
        <span className="md:max-w-[40%]">
          <h2 className="logo mb-5 text-2xl w-fit px-2 py-1">
            Capital Springs Bank
          </h2>
          <p className="mb-3">
            Capital Springs Bank is a financial base banking system. We offer
            different types of financial services to our customers all over the
            world such as Loan, Wire transfer, Long term deposit, savings and
            some other related services.
          </p>
        </span>
        <span className="">
          <h4>Quick Explore</h4>
          <div className={styles.line}></div>
          <ul className="mt-2">
            <li>
              <Link
                className="text-[#6f8ba4] hover:underline"
                href={"/#contact"}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-[#6f8ba4] hover:underline" href={"/#about"}>
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-[#6f8ba4] hover:underline"
                href={"/#services"}
              >
                Services
              </Link>
            </li>
          </ul>
        </span>
        <span className="">
          <h4>Pages</h4>
          <div className={styles.line}></div>
          <ul className="mt-2">
            <li>
              <Link
                className="text-[#6f8ba4] hover:underline"
                href={"/privacy-policy"}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="text-[#6f8ba4] hover:underline"
                href={"/terms-condition"}
              >
                Terms &amp; Condition
              </Link>
            </li>
            <li>
              <Link className="text-[#6f8ba4] hover:underline" href={"/faq"}>
                FAQ
              </Link>
            </li>
          </ul>
        </span>
      </div>
      <p>
        Copyright © 2022 <strong>Capital Springs Bank</strong> - All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
