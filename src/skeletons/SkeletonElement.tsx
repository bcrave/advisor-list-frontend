import "./Skeleton.css";

type Props = {
  type: string;
};

const SkeletonElement = ({ type }: Props) => {
  const classes = `skeleton ${type}`;

  return <div className={classes}></div>;
};

export default SkeletonElement;
