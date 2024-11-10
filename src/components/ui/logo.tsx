import Image from "next/image";


interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <>
      <Image
        className={`rounded-full p-1 object-contain py-1 ${className}`}
        src="/assets/logo-round.png"
        alt="Crafted Finishes Logo"
        width={100}
        height={100}
      />
    </>
  );
}
