import styles from "./ButtonCssModule.module.css";

function ButtonCssModule({ variant = "primary", children, ...props }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}

export default ButtonCssModule;
