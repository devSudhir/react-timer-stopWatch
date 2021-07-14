export function Timer({ second, miliSecond, show }) {
  return show === true ? (
    <div>
      {second} : {miliSecond}
    </div>
  ) : (
    ""
  );
}
