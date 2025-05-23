import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("text-primary dark:text-primary font-poppins font-bold text-2xl select-none", className)}>
      PC<span className="text-accent">Shop</span>X
    </span>
  );
}
