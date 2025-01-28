import Image from "next/image";

import logo from "@/src/assets/images/logo.svg";

interface LogoProps {
  width?: number;
  priority?: boolean;
}

export default function Logo({ width = 200, priority = true }: LogoProps) {
  return <Image src={logo} width={width} alt="Logo" priority={priority} />;
}
