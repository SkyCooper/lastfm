import React, { useEffect } from "react";
import ArtistCard from "../components/Cards/ArtistCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchStart, fetchSuccess, fetchError } from "../features/FetchSlice";

const Home = () => {
  const {artist} = useSelector((state)=>state.lastfm)
  const dispatch = useDispatch();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json`;

  const getTopArtist = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(url);
      const {artists : {artist}} = data
      dispatch(fetchSuccess(artist));
    } catch (error) {
      console.log(error);
      dispatch(fetchError());
    }
  };

  useEffect(() => {
    getTopArtist();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-gray-900 dark:text-white">
        Artist List
      </h1>
      {artist?.map((item, index) => (
        <ArtistCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Home;
