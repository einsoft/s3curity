import Image from "next/image";

import logo from "../../assets/images/logo.svg";

export default function Logo() {
  return <Image src={logo} width={200} height={150} alt="Logo" priority={false} />;
}
