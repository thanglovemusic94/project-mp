import React, {useEffect, useState} from 'react'
import { MstConfigSerivce } from 'services/MstConfigService'

const MainVideo = () => {
  const [videoUrl, setVideoUrl] = useState("")

  useEffect(() => {
    MstConfigSerivce.getByKey("main_popup_video_url").then(res => {
      if (res.status === 200) {
        setVideoUrl(res.data)
      }
    }).catch(err => console.log(err))
  }, [])
  return (
    <>
      <section className="main-section main-video">
        <div className="video-wrapper text-center">
          <div className="video-link">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainVideo
