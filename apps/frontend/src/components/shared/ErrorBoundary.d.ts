declare module "@/components/shared/ErrorBoundary" {
  import { ReactNode } from "react";

  interface ErrorBoundaryProps {
    children: ReactNode;
  }

  const ErrorBoundary: React.FC<ErrorBoundaryProps>;
  export default ErrorBoundary;
}
