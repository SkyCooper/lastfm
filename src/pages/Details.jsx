import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TopAlbum from "../components/TopAlbum";
import TopTrack from "../components/TopTrack";

const Details = () => {
  const { name } = useParams();
  const { state: image } = useLocation();
  const [topAlbumList, setTopAlbumList] = useState([]);
  const [topTrackList, setTopTrackList] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const topAlbumsUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${name}&api_key=${API_KEY}&format=json`;
  const topTracksUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=${API_KEY}&format=json`;

  const getTopTracks = async () => {
    try {
      const { data } = await axios.get(topTracksUrl);
      setTopTrackList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(topAlbumsUrl)
      .then((res) => setTopAlbumList(res.data))
      .catch((err) => console.log(err));
    getTopTracks();
  }, []);
  // console.log(topAlbumList["topalbums"]?.album);
  console.log(topTrackList);

  return (
    <div className="flex-col">
      <div className="flex justify-center">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={image?.[2]["#text"]}
          alt={name}
        />
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h3>
      </div>
      <div className="flex justify-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Top Albums
          </h2>
          {topAlbumList["topalbums"]?.album.map((album, index) => {
            return <TopAlbum key={index} {...album} />;
          })}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Top Tracks
          </h2>
          {topTrackList["toptracks"]?.track.map((track, index) => {
            return <TopTrack key={index} {...track} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
