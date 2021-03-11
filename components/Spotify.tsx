import { Track } from "../utils/Spotify";
import { fetcher } from "../utils/Helpers";
import Image from "next/image";
import useSWR from "swr";

import styles from "../styles/Spotify.module.css";

interface SpotifyProps {
  isLoggedIn: boolean;
}

const Spotify: React.FC<SpotifyProps> = ({ isLoggedIn }) => {
  const { data } = useSWR<Track>(
    () => (isLoggedIn ? "/api/current-track" : null),
    fetcher,
    {
      refreshInterval: 40000,
      initialData: {},
    }
  );

  return (
    <div className={"overlay " + styles.column}>
      <div className={styles.player}>
        {isLoggedIn ? (
          <MusicPlayer currentTrack={data} />
        ) : (
          <a href="/api/login">Spotify Sign In</a>
        )}
      </div>
    </div>
  );
};

interface MusicPlayerProps {
  currentTrack: Track;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack }) => {
  return (
    <>
      <Image
        className={styles["track-image"]}
        width={50}
        height={50}
        alt={"Album cover image for current track"}
        src={
          currentTrack?.image ?? "https://via.placeholder.com/50.webp?text=Song"
        }
      />
      <div className={styles["track-info"]}>
        <h2 className={styles["track-name"]}>
          {currentTrack?.name ?? "Play a song on Spotify"}
        </h2>
        <p className={styles["track-artists"]}>
          {currentTrack?.artistNames?.reduce(
            (prev, curr) => prev + ", " + curr
          )}
        </p>
      </div>
    </>
  );
};

export default Spotify;
