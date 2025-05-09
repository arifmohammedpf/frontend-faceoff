export function Loader({ className, size = "default" }: { className?: string; size?: "default" | "lg" | "sm" }) {
  const sizeClasses = {
    default: "h-8 w-8",
    sm: "h-4 w-4",
    lg: "h-12 w-12"
  };
  
  return (
    <div className={`animate-spin rounded-full border-4 border-t-transparent border-primary ${sizeClasses[size]} ${className}`} />
  );
}
