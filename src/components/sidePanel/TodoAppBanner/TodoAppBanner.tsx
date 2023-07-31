import styles from './TodoAppBanner.module.css';
import dogPicture from '../../../assets/dog.png';

const TodoAppBanner = ({}: {}) => {
  return (
    <>
      <div className={styles.bannerArea}>
        <div className={styles.banner}>
          <img src={dogPicture} className={styles.dog}></img>
          <div className={styles.bannerText}>Todo App</div>
        </div>
      </div>
    </>
  );
};

export default TodoAppBanner;
