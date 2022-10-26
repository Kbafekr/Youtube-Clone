import "./home.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllVideosThunk } from "../../store/video";
import { useDispatch } from "react-redux";


export function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllVideosThunk());
  }, [dispatch])
  return (
    <>
      <div className="homeContainer">
        <div className="homeContainerInner">
        <h1>Welcome to You2ube</h1>
        </div>
      </div>
    </>
  );
}
