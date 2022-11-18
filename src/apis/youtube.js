import axios from 'axios';

const youtubeKey = "AIzaSyDIWdxK53eqf4yNI3on5OkE99go1rh1DDE";

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params:{
        part: "snippet",
        maxResults: 3,
        key: youtubeKey,
        type:"video",
        order:"rating",
        restriction:"DE",
        // videoEmbeddable:"true",
        videoSyndicated:"true"
    }
})