import Image from "next/image";

const Footer = () => (
  <>
    <div className="overlay footer">
      <div className="footer__icon">
        <Image src="/bookmark.svg" alt="Licenses" width={35} height={35} />
      </div>
      <a
        href="https://github.com/justinhodev/grazing-at-work"
        className="footer__icon"
      >
        <Image src="/github.svg" alt="Source Code" width={50} height={50} />
      </a>
    </div>
  </>
);

export default Footer;
