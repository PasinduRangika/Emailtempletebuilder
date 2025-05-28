type IconProps = {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

const BgLine = ({ fill, stroke, width = "28px", height = "28px", onClick }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="613" height="78" viewBox="0 0 613 78" fill="none">
      <path
        d="M0 14.2943C216.446 -51.8353 403.006 140.103 612.207 14.2943V39.5609C399.304 156.41 218.55 -38.0225 0 22.0238V14.2943Z"
        fill="#4285F5"
      />
    </svg>
  );
};

export default BgLine;
