import classes from "./slide.module.css";
import styles from "./slide-err.module.css";

const Slide = (props) => {
  const PopupHandaler = (event) => {
    event.preventDefault();
    props.onClick();
  };

  return (
    <div className={props.error ? styles.slide : classes.slide}>
      <div>
        {props.error && <h2>Attention!</h2>}
        {!props.error && <h2>Successful</h2>}
        <button onClick={PopupHandaler}>X</button>
      </div>

      <p>{props.message}</p>
    </div>
  );
};

export default Slide;
