const EmbededVideo = ({ iframe }: { iframe: string }) => {
  if (iframe) {
    const videContainer = document.getElementById(
      "video_container"
    ) as HTMLElement;
    videContainer.innerHTML = iframe;
  }

  return (
    <div id="video_container" className="flex items-center justify-center" />
  );
};

export default EmbededVideo;
