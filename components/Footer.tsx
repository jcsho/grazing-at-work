import Icon from "./Icon";

const Footer = () => {
  return (
    <>
      <footer className="overlay footer">
        <Icon
          imageUrl={process.env.NEXT_PUBLIC_GAW_ICON_LICENSE}
          altText="Licenses"
          iconSize={35}
          hoverText="Licenses"
        />
        <a href="https://github.com/justinhodev/grazing-at-work">
          <Icon
            imageUrl={process.env.NEXT_PUBLIC_GAW_ICON_GITHUB}
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
