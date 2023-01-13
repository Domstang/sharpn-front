import React from "react";
//import Moment from 'react-moment';
import moment from "moment-timezone";
import "moment-timezone";
import "./Shortener.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import LongInputUrl from "../../components/LongUrlInput";
import UserUrlsList from './UserUrlsList';
import { baseURL } from "../../shortUrlConfig";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  sendUrlsToBack,
  checkUserUrls,
  Sharpn,
  Action,
} from "../../store/modules/shortener";

const Shortener: React.FC = () => {
  const generateUniqueId = require("generate-unique-id");
  let longUrl: String = "";
  let shortUrl: String = "";
  const dispatch = useDispatch<Dispatch<Action>>();
  const urls = useSelector((state: { short: any; urls: any[] }) => state);

  const [ip, setIP] = useState("");
  const [userUrls, setUserUrls] = useState<Sharpn[]>([]);
  const setUrlsCallback = useCallback(setUserUrls, [setUserUrls]);


  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchUserUrls() {
      const urlsUser = await urls.short;
      const result = urlsUser.urls;

     // check if global state is updated
      if (result !== userUrls) {
        setUserUrls(result);
      }
    }
    fetchUserUrls();
  }, [urls]);

  const handleUrlSubmit = (url: string) => {
    longUrl = url;
    createNewUrl();
  };

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
    await checkIfUserAsUrls(res.data.IPv4);
  };

  const checkIfUserAsUrls = async (ipAdress: String) => {
    await dispatch(checkUserUrls(ipAdress.toString()));
  };

  const createNewUrl = () => {
    let fullDate = new Date()
    let dateOfToday = moment().format("YYYY-MM-DD");
    let hour = moment().format("HH:mm:ss");
    const uid: String = generateUniqueId({
      length: 7,
      useLetters: true,
      useNumbers: true,
    });

    shortUrl = baseURL + "/" + uid;
    const urls: Sharpn = {
      fullCreationDate: fullDate,
      creationDate: dateOfToday,
      creationHour: hour,
      longUrl: longUrl,
      shortUrl: shortUrl,
      shortUrlId: uid,
      userIpAdress: ip,
    };

    // Add the new URL to the userUrls state
    setUrlsCallback([...userUrls, urls]);

    dispatch(sendUrlsToBack(urls));
    checkIfUserAsUrls(ip);
  };

  return (
    <div className="main-section">
      <LongInputUrl onUrlSubmit={handleUrlSubmit} />
      <UserUrlsList userUrls={userUrls} onUrlSubmit={handleUrlSubmit} setUserUrls={setUrlsCallback} />
    </div>
  );
};

export default Shortener;
