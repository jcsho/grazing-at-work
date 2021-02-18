import styles from "../styles/Header.module.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <h1 className={styles.header + " overlay"}>{title}</h1>
);

export default Header;
