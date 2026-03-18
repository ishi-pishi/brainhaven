export function SpotifyEmbed() {
  return (
    <div className="w-full max-w-sm rounded-[14px] overflow-hidden shadow-lg border border-white/10 dark:border-white/5 bg-black/40 backdrop-blur-md">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/artist/4DfJeYriTJLcBeUEbBJVsD?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block"
      ></iframe>
    </div>
  );
}
