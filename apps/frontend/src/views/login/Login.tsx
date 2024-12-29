import Image from "next/image";

export default function Login() {
  return (
    <div>
      <main>
        <Image
          src="logo.svg"
          alt="S3curity logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
