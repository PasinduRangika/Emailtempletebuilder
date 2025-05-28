type IconProps = {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

const Point = ({ fill, stroke, width = "28px", height = "28px", onClick }: IconProps) => {
  return (
    <svg
      width="12"
      height="12"
      className="block align-top mt-[2px]"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#2087FD" />
    </svg>
  );
};

export default Point;
