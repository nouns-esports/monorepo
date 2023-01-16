import { createSignal, onMount } from "solid-js";

export default function Noggle(props: {
  id: string;
  width: number;
  height: number;
  isHidden: boolean;
  show: Function;
  hide: Function;
}) {
  const [active, setActive] = createSignal(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If its on the screen and its hidden then show it
        if (entries[0].isIntersecting && props.isHidden) props.show();

        // If its not on the screen and its showing then hide it
        if (!entries[0].isIntersecting && !props.isHidden) props.hide();
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    const noggle = document.getElementById(props.id);

    observer.observe(noggle);
  });

  return (
    <svg
      id={props.id}
      width={props.width}
      height={props.height}
      viewBox={`0 0 16 6`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <path
        d="M3 3V6H9V3H10V6H16V0H10V2H9V0H3V2H0V5H1V3H3Z"
        fill={active() ? "black" : "#0C0C0C"}
      />
      <path d="M4 5V1H6V5H4Z" fill={active() ? "white" : "#0C0C0C"} />
      <path d="M6 5V1H8V5H6Z" fill={active() ? "#e93737" : "#0C0C0C"} />
      <path d="M11 5V1H13V5H11Z" fill={active() ? "white" : "#0C0C0C"} />
      <path d="M13 5V1H15V5H13Z" fill={active() ? "#e93737" : "#0C0C0C"} />
    </svg>
  );
}
