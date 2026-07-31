// Preloader-Block wie in allen statischen Seiten (wird von js/script.js ausgeblendet).
export function Preloader() {
  return (
    <div id="preloader">
      <l-line-wobble
        size="85"
        stroke="5"
        bg-opacity="0.1"
        speed="1.75"
        color="var(--primary-color)"
      ></l-line-wobble>
    </div>
  );
}
