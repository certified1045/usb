"use client";

import AuthContext from "@/components/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/Dashboard.module.css";
import Image from "next/image";
import Modal from "@/components/Modal";
import { API_URL } from "@/helpers/vars";
import { VerifyColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

const Kyc = () => {
  interface kk {
    password_hash: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    isAdmin: boolean;
    created_at: string;
    account_no: number;
    account_bal: number;
    verified: boolean;
    verifying: boolean;
    pending_KYC: boolean;
    verification_id: number;
    currency: "€";
    verification: {
      id: number;
      user_id: number;
      identity_doc: string;
      address_doc: string;
    };
  }

  interface kkk extends Array<kk> {}

  const { users, getAllUsers } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [docImg, setDocImg] = useState("");

  console.log({ users });

  // const [kycList, setKycList] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  // 	const getAllKYCs = async () => {
  // 		console.log('effect');
  // 		const res = await fetch(
  // 			`${API_URL}/admin/get-kycs`,
  // 			{
  // 				method: 'GET',
  // 				credentials: 'include'
  // 			}
  // 		);
  // 		const data = await res.json();
  // 		console.log('🚀 ~ file: AuthContext.tsx:56 ~ data:', data);
  // 		if (res.ok) {
  // 			setKycList(data);
  // 		} else {
  // 			setKycList([]);
  // 		}
  // 	};
  // 	getAllKYCs();
  // }, []);

  const handleImgView = (displayImg: string) => {
    setDocImg(displayImg);
    setOpenModal(true);
  };

  const verify = async (
    // e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    e: any
  ) => {
    console.log(e.target.value);
    const account_no = e.target.value;
    setLoading(true);
    const res = await fetch("/api/admin/verify-doc", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        account_no,
      }),
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (res.ok) {
      alert("User verified successfully");
      getAllUsers();
      console.log(data);
    } else {
      alert("unsuccessful");
    }
  };

  return (
    <div className={styles.details}>
      <div className={`${styles["con"]} ${styles["over"]}`}>
        <p>Users Documents</p>
        <DataTable
          columns={VerifyColumns}
          data={users?.filter((user) => user.verification) || []}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default Kyc;
