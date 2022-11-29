import React from "react";

const VideoItem = ({video}) => {
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    const videoOnYoutube = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    return(
        <div className="video">
            <iframe src={videoSrc} allowFullScreen title="Video player" />
            <div>{video.snippet.title}</div>
            {/* not sure why the full link not working */}
            <p>video source: <a href={videoOnYoutube}>{videoOnYoutube}</a></p>
        </div>
    )
}

export default VideoItem;