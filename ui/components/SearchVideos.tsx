import { ImagesIcon, PlusIcon, VideoIcon } from "lucide-react";
import { useState } from "react";
import Lightbox, { GenericSlide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Message } from "./ChatWindow";

type Video = {
  url: string;
  img_src: string;
  title: string;
  iframe_src: string;
};

declare module "yet-another-react-lightbox" {
  export interface VideoSlide extends GenericSlide {
    type: "video-slide";
    src: string;
    iframe_src: string;
  }

  interface SlideTypes {
    "video-slide": VideoSlide;
  }
}

const SearchVideos = ({
  query,
  chat_history,
}: {
  query: string;
  chat_history: Message[];
}) => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);

  return (
    <>
      {!loading && videos === null && (
        <button
          onClick={async () => {
            setLoading(true);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/videos`,
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  query: query,
                  chat_history: chat_history,
                }),
              }
            );

            const data = await res.json();

            const videos = data.videos;
            setVideos(videos);

            setSlides(
              videos.map((video: Video) => {
                return {
                  type: "video-slide",
                  iframe_src: video.iframe_src,
                  src: video.img_src,
                };
              })
            );
            setLoading(false);
          }}
          className="
        border border-dashed border-[#1C1C1C] hover:bg-[#1c1c1c] active:scale-95 duration-200 transition px-4 py-2 flex flex-row items-center justify-between rounded-lg text-white text-sm w-full"
        >
          <div className="flex flex-row items-center space-x-2">
            <VideoIcon size={17} />
            <p>Search videos</p>
          </div>
          <PlusIcon className="text-[#24A0ED]" size={17} />
        </button>
      )}
      {loading && (
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-[#1C1C1C] h-32 w-full rounded-lg animate-pulse aspect-video object-cover"
            />
          ))}
        </div>
      )}
      {videos !== null && videos.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-2">
            {videos.length > 4
              ? videos.slice(0, 3).map((video, i) => (
                  <img
                    onClick={() => {
                      setOpen(true);
                      setSlides([
                        slides[i],
                        ...slides.slice(0, i),
                        ...slides.slice(i + 1),
                      ]);
                    }}
                    key={i}
                    src={video.img_src}
                    alt={video.title}
                    className="h-full w-full aspect-video object-cover rounded-lg transition duration-200 active:scale-95 cursor-zoom-in hover:scale-[1.02]"
                  />
                ))
              : videos.map((video, i) => (
                  <img
                    onClick={() => {
                      setOpen(true);
                      setSlides([
                        slides[i],
                        ...slides.slice(0, i),
                        ...slides.slice(i + 1),
                      ]);
                    }}
                    key={i}
                    src={video.img_src}
                    alt={video.title}
                    className="h-full w-full aspect-video object-cover rounded-lg transition duration-200 active:scale-95 cursor-zoom-in hover:scale-[1.02]"
                  />
                ))}
            {videos.length > 4 && (
              <button
                onClick={() => setOpen(true)}
                className="
              bg-[#111111] hover:bg-[#1c1c1c] transition duration-200 active:scale-95 h-auto w-full rounded-lg flex flex-col justify-between text-white p-2 hover:scale-[1.02]"
              >
                <div className="flex flex-row items-center space-x-1">
                  {videos.slice(3, 6).map((video, i) => (
                    <img
                      key={i}
                      src={video.img_src}
                      alt={video.title}
                      className="h-6 w-12 rounded-md lg:h-3 lg:w-6 aspect-video object-cover"
                    />
                  ))}
                </div>
                <p className="text-white/70 text-xs">
                  View {videos.length - 3} more
                </p>
              </button>
            )}
          </div>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={slides}
            render={{
              slide: ({ slide }) =>
                slide.type === "video-slide" ? (
                  <div className="h-full w-full flex flex-row items-center justify-center">
                    <iframe
                      src={slide.iframe_src}
                      className="aspect-video max-h-[95vh] w-[95vw] rounded-2xl md:w-[80vw]"
                      allowFullScreen
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                ) : null,
            }}
          />
        </>
      )}
    </>
  );
};

export default SearchVideos;
