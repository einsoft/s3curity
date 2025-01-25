import Image from "next/image";

import logo from "@/src/assets/images/logo.svg";

interface LogoProps {
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function Logo({ width = 200, height = 150, priority = false }: LogoProps) {
  return <Image src={logo} width={width} height={height} alt="Logo" priority={priority} />;
}
