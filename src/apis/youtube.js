import axios from 'axios';

const youtubeKey = process.env.REACT_APP_YOUTUBE_KEY;

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params:{
        part: "snippet",
        maxResults: 3,
        key: youtubeKey,
        type:"video",
        order:"rating",
        restriction:"DE",
        videoEmbeddable:"true",
        videoSyndicated:"true"
    }
})