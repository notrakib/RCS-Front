import classes from "./row.module.css";

const Row = (props) => {
  return <div className={classes.row}>{props.children}</div>;
};

export default Row;
