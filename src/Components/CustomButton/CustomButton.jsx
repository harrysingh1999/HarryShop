export default function CustomButton({ text, handleClick, classes }) {
  return (
    <button className={classes} onClick={handleClick}>
      {text}
    </button>
  );
}
