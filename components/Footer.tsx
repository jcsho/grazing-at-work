import Icon from "./Icon";

const Footer = () => {
  return (
    <>
      <footer className="overlay footer">
        <Icon
          imageUrl="/bookmark.svg"
          altText="Licenses"
          iconSize={35}
          hoverText="Licenses"
        />
        <a href="https://github.com/justinhodev/grazing-at-work">
          <Icon
            imageUrl="/github.svg"
            altText="Source Code"
            iconSize={50}
            hoverText="Source Code"
          />
        </a>
      </footer>
    </>
  );
};

export default Footer;
