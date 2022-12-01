import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import axios from "axios";
import youtube from "../apis/youtube";
import Videos from "./Videos";
// import L from "leaflet";

const Globe = () => {

  const key = process.env.REACT_APP_GOOGLE_MAP_KEY;
  const [videos,setVideos] = useState([]);
  const [cityAndState,setCityAndState] = useState("");
  const [clicked,setClicked] = useState(false);
  const [fetching,setFetching] = useState(false);

  useEffect(()=>{
    // console.log(videos);
    setCityAndState(cityAndState);
    // eslint-disable-next-line
  },[videos]);


//can get the user's current location; react leaflet also has a method locate();

  // if("geolocation" in navigator){
  //   console.log("Geolocation Available");
  //   navigator.geolocation.getCurrentPosition(function(position){
  //     let corLat = position.coords.latitude;
  //     setLat(corLat);
  //     let corLon = position.coords.longitude;
  //     setLon(corLon);
  //     console.group(lon);
  //     setIsPosReady(true);
  //   })
  // }else{
  //   console.log("Geolocation not available");
  // }

  let city = "";
  let state = "";
  // eslint-disable-next-line
  let video3 = [];


  const AddMarker = () => {
    // eslint-disable-next-line
    const map = useMapEvent({
      async click(e){
        setClicked(true);
        video3 = [];
        //get the json location data from google map api
        let {data:result} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`+
        `latlng=${e.latlng.lat},${e.latlng.lng}&key=${key}`).catch(function(err){console.log(err)});
        

        let parts = result.results[0].address_components;

        parts.forEach(element => {
          if(element.types.includes("locality") || element.types.includes("sublocality")){
            city = element.long_name+",";
          }
          if(element.types.includes("administrative_area_level_1")){
            state = element.long_name;
          }
        });
        console.log(`${city} ${state}`);
        const toSearch = `${city} ${state} travel`;

        setFetching(true);
        const response = await youtube.get('/search',{
          params:{
            q: toSearch
          }
        })
        const video30 = response.data.items;

        //if fetching more than 3 videos later

        // let num = 0;
        // while(num < 3){
        //   let idx = Math.floor(Math.random()*5);
        //   video3.push(video30[idx]);
        //   num++;
        // }
        // setVideos(video3);
        // console.log(video3);

        setVideos(video30);
        setCityAndState(`${city} ${state}`);
        setFetching(false);
      }
    })
   }

  return (
    <>
    <MapContainer center={[41.505, -90.09]} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=iz3xp2SVyBvDXlmD8xKy"
      />
      <AddMarker />
    </MapContainer>
    <Videos videos={videos} setVideos={setVideos} cityAndState={cityAndState} clicked={clicked} fetching = {fetching}/>
    </>
  );
};

export default Globe;
