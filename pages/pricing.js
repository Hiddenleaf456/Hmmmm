// pages/pricing.js

import styles from '../styles/Pricing.module.css';

const Pricing = () => {
  const handlePurchaseClick = () => {
    window.location.href = 'https://t.me/toxxicn_bot';
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pricing Plans</h1>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h2 className={styles.planTitle}>Free API Key</h2>
          <p className={styles.price}>Price: Free</p>
          <p className={styles.requests}>100 requests per day</p>
          <button className={styles.button}>Get Free Key</button>
        </div>
        <div className={styles.card}>
          <h2 className={styles.planTitle}>Premium API Key</h2>
          <p className={styles.price}>Price: 500 Naira</p>
          <p className={styles.requests}>1000 requests per day</p>
          <button className={styles.button} onClick={handlePurchaseClick}>
            Purchase Key
          </button>
        </div>
        <div className={styles.card}>
          <h2 className={styles.planTitle}>Monster API Key</h2>
          <p className={styles.price}>Price: 1000 Naira</p>
          <p className={styles.requests}>Unlimited requests</p>
          <button className={styles.button} onClick={handlePurchaseClick}>
            Purchase Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
