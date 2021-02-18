import Image from "next/image";

const iconSize = 60;

const Footer = () => (
  <>
    <div className="overlay footer">
      <div className="footer__icon">
        <Image
          src="/bookmark.svg"
          alt="Licenses"
          width={iconSize}
          height={iconSize}
        />
      </div>
      <div className="footer__icon">
        <Image
          src="/github.svg"
          alt="Source Code"
          width={iconSize}
          height={iconSize}
        />
      </div>
    </div>
  </>
);

export default Footer;
