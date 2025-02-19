import Image from "next/image";

import logo from "@/src/assets/images/logo.svg";

interface LogoProps {
  width?: number;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
}

export default function Logo({
  width = 200,
  priority = false,
  className,
  loading,
}: LogoProps) {
  return (
    <Image
      src={logo}
      width={width}
      height={width * 0.3} // Maintain aspect ratio
      alt="Logo"
      priority={priority}
      loading={loading || (priority ? "eager" : "lazy")}
      className={className}
    />
  );
}
