import React, { useEffect } from "react";
import VideoItem from "./VideoItem";


const Videos = ({videos,cityAndState,clicked}) => {

    useEffect(()=>{
        console.log("videos from Videos component",videos);
    },[videos])
    if(clicked && videos.length === 0){
        return(
            <>
                <h3>Oops, seems no available videos here</h3>
                <h3>Try another place?</h3>
            </>
        )
    }
    if(videos.length === 0){
        return(
            <h3>Click map to get videos!</h3>
        )
    }

    const renderedVideos = videos.map((video)=>{
        return <VideoItem key={video.id.videoId} video={video} />
    })
    return(
        <>
        <h3>{cityAndState}</h3>
        <div className="videos">{renderedVideos}</div>
        </>
    )

}

export default Videos;