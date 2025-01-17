import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="centroExato">
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
