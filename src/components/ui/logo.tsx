import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        className="rounded-full p-1 object-contain"
        src="/assets/logo-round.png"
        alt="Crafted Finishes Logo"
        width={100}
        height={100}
      />
    </div>
  );
}
