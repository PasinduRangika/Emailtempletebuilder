type IconProps = {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

const Play = ({ fill, stroke, width = "28px", height = "28px", onClick }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
      <path
        d="M0.5625 2.20997C0.5625 0.670365 2.22917 -0.292257 3.5625 0.477544L20.5205 10.2676C21.8537 11.0374 21.8537 12.9626 20.5205 13.7324L3.5625 23.5225C2.22917 24.2923 0.5625 23.3296 0.5625 21.79V2.20997Z"
        fill="#2087FD"
      />
    </svg>
  );
};

export default Play;
