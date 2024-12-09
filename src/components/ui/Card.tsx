import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
}
