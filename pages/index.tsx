// pages/index.tsx or wherever your Home component is
import Head from "next/head";
import styles from "../styles/Home.module.css";
import db from "../utils/db";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import axios from "axios";
import GoogleMapComponent from "../components/GoogleMapComponent";
import React from "react";

async function fetchPlaceData() {
  try {
    const response = await axios.get("/api/google-places");
    console.log("Search Results:", response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

async function logAllPosts() {
  const snapshot = await getDocs(collection(db, "posts"));
  if (snapshot.empty) {
    console.log("No posts.");
    return;
  }
  snapshot.forEach((post) => {
    console.log(`Post ID: ${post.id}`, post.data());
  });
}

export default function Home() {
  useEffect(() => {
    logAllPosts();
    fetchPlaceData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleMapComponent />
    </div>
  );
}
