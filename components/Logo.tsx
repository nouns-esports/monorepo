export default function Logo(props: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      className={props.className}
      viewBox="0 0 200 200"
      fill="none"
      shap-rendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_270_366)">
        <mask
          id="mask0_270_366"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="200"
        >
          <path d="M200 0H0V200H200V0Z" fill="white"></path>
        </mask>
        <g mask="url(#mask0_270_366)">
          <path
            d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z"
            fill="var(--primaryColor)"
          ></path>
          <path
            d="M100 179C143.63 179 179 143.63 179 100C179 56.3695 143.63 21 100 21C56.3695 21 21 56.3695 21 100C21 143.63 56.3695 179 100 179Z"
            fill="#231F20"
          ></path>
          <path
            d="M100 174C140.869 174 174 140.869 174 100C174 59.1309 140.869 26 100 26C59.1309 26 26 59.1309 26 100C26 140.869 59.1309 174 100 174Z"
            fill="white"
          ></path>
          <path
            d="M100 159C132.585 159 159 132.585 159 100C159 67.4152 132.585 41 100 41C67.4152 41 41 67.4152 41 100C41 132.585 67.4152 159 100 159Z"
            fill="#231F20"
          ></path>
          <path
            d="M179.819 50.9634L163.739 54.9727L177.843 111.541L193.923 107.532L179.819 50.9634Z"
            fill="#231F20"
          ></path>
          <path
            d="M170.744 65.7538L153.208 70.126L161.431 103.105L178.966 98.7329L170.744 65.7538Z"
            fill="#231F20"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M85.1276 129.504L79.2852 106.072L63.503 110.007L67.398 125.628L59.5069 127.596L53.6645 104.163L77.3377 98.2608L73.4428 82.6391L120.789 70.8343L124.684 86.456L132.575 84.4885L128.68 68.8668L176.027 57.062L187.712 103.927L140.365 115.732L134.523 92.2993L126.632 94.2668L132.474 117.699L85.1276 129.504ZM114.846 80.6126L122.635 111.856L106.853 115.791L99.0635 84.5475L114.846 80.6126ZM170.32 66.7813L178.11 98.0246L162.209 101.989L154.419 70.7458L170.32 66.7813Z"
            fill="white"
          ></path>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_270_366">
          <rect width="200" height="200" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
