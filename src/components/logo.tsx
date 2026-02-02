interface LogoVictorProps {
  className?: string;
}

const LogoVictor = ({ className }: LogoVictorProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 826 811"
      className={className} 
    >
      <path 
        fill="currentColor"
        fillRule="evenodd"  
        d="M83.0,7.0L4.0,82.0L496.0,809.0L826.0,5.0L243.0,3.0L498.0,435.0L443.0,570.0Z M465.0,136.0L620.0,140.0L559.0,293.0L465.0,149.0Z" 
      />
    </svg>
  );
}

export default LogoVictor;