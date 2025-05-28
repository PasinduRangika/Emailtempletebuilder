type IconProps = {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

const Completed = ({ fill, stroke, width = "28px", height = "28px", onClick }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0599 18.3334C5.4574 18.3334 1.72656 14.6025 1.72656 10C1.72656 5.39752 5.4574 1.66669 10.0599 1.66669C14.6624 1.66669 18.3932 5.39752 18.3932 10C18.3932 14.6025 14.6624 18.3334 10.0599 18.3334ZM9.07906 11.7834L6.7749 9.47752L5.89323 10.3592L8.4924 12.96C8.64867 13.1162 8.86059 13.204 9.08156 13.204C9.30253 13.204 9.51446 13.1162 9.67073 12.96L14.6307 8.00169L13.7457 7.11669L9.07906 11.7834Z"
        fill="#01BE62"
      />
    </svg>
  );
};

export default Completed;
