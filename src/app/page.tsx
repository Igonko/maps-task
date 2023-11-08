import MapsComponent from "./components/Maps";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <MapsComponent />
    </main>
  );
}
