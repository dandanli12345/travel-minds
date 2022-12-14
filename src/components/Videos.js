import React, { useEffect } from "react";
import VideoItem from "./VideoItem";

const Videos = ({videos,cityAndState,clicked, fetching}) => {

    useEffect(()=>{
        console.log("videos");
    },[videos])

    if(!fetching && videos.length === 0){
        if(clicked){
            return(
                <>
                    <h3>Oops, seems no available videos here</h3>
                    <h3>Try another place?</h3>
                </>
            )
        }else{
            return(
                <h3>Click map to get videos!</h3>
            )
        }
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