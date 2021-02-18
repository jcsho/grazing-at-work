import Image from "next/image";
import { useState } from "react";

import styles from "../styles/Icon.module.css";

interface IconProps {
  imageUrl: string;
  altText: string;
  hoverText: string;
  iconSize: number;
}

const Icon: React.FC<IconProps> = ({
  imageUrl,
  altText,
  hoverText,
  iconSize,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.icon}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <p className={styles.text}>{hoverText}</p>
      ) : (
        <Image
          src={imageUrl}
          alt={altText}
          width={iconSize}
          height={iconSize}
        />
      )}
    </div>
  );
};

export default Icon;
