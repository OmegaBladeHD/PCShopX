import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  className?: string;
}

export function PageTitle({ title, className }: PageTitleProps) {
  return (
    <h1 className={cn("text-2xl font-poppins font-bold mb-6 text-center text-gray-900 dark:text-white", className)}>
      {title}
    </h1>
  );
}
