type IconProps = {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

const Dots = ({ fill, stroke, width = "28px", height = "28px", onClick }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="93" height="36" viewBox="0 0 93 36" fill="none">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#2087FD" />
      <circle cx="31.5" cy="1.5" r="1.5" fill="#2087FD" />
      <circle cx="76.5" cy="1.5" r="1.5" fill="#2087FD" />
      <circle cx="16.5" cy="1.5" r="1.5" fill="#2087FD" />
      <circle cx="61.5" cy="1.5" r="1.5" fill="#2087FD" />
      <circle cx="46.5" cy="1.5" r="1.5" fill="#2087FD" />
      <circle cx="91.5" cy="1.5" r="1.5" fill="#2087FD" />
      <circle cx="1.5" cy="12.5" r="1.5" fill="#2087FD" />
      <circle cx="31.5" cy="12.5" r="1.5" fill="#2087FD" />
      <circle cx="76.5" cy="12.5" r="1.5" fill="#2087FD" />
      <circle cx="16.5" cy="12.5" r="1.5" fill="#2087FD" />
      <circle cx="61.5" cy="12.5" r="1.5" fill="#2087FD" />
      <circle cx="46.5" cy="12.5" r="1.5" fill="#2087FD" />
      <circle cx="91.5" cy="12.5" r="1.5" fill="#2087FD" />
      <circle cx="1.5" cy="23.5" r="1.5" fill="#2087FD" />
      <circle cx="31.5" cy="23.5" r="1.5" fill="#2087FD" />
      <circle cx="76.5" cy="23.5" r="1.5" fill="#2087FD" />
      <circle cx="16.5" cy="23.5" r="1.5" fill="#2087FD" />
      <circle cx="61.5" cy="23.5" r="1.5" fill="#2087FD" />
      <circle cx="46.5" cy="23.5" r="1.5" fill="#2087FD" />
      <circle cx="91.5" cy="23.5" r="1.5" fill="#2087FD" />
      <circle cx="1.5" cy="34.5" r="1.5" fill="#2087FD" />
      <circle cx="31.5" cy="34.5" r="1.5" fill="#2087FD" />
      <circle cx="76.5" cy="34.5" r="1.5" fill="#2087FD" />
      <circle cx="16.5" cy="34.5" r="1.5" fill="#2087FD" />
      <circle cx="61.5" cy="34.5" r="1.5" fill="#2087FD" />
      <circle cx="46.5" cy="34.5" r="1.5" fill="#2087FD" />
      <circle cx="91.5" cy="34.5" r="1.5" fill="#2087FD" />
    </svg>
  );
};

export default Dots;
