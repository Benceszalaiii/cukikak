import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black px-4 text-center flex flex-col items-center justify-center font-geistmono tracking-wider gap-2 py-4 border-t">
      <div className="flex flex-row gap-4 items-center justify-evenly flex-wrap font-light tracking-wide text-neutral-200 font-geistmono">
        <SocialMedia
          text="pompomnatur"
          link="https://www.instagram.com/pompomnatur/"
        >
          <IconBrandInstagram />
        </SocialMedia>
        <SocialMedia
          text="pompomnatur"
          link="https://www.tiktok.com/@pompomnatur"
        >
          <IconBrandTiktok />
        </SocialMedia>
        <SocialMedia
          text="pompomnatur"
          link="https://www.youtube.com/@pompomnaturkozmetikum9475"
        >
          <IconBrandYoutube />
        </SocialMedia>
      </div>
      <p className="font-light">
        Az oldalt készítette{" "}
        <Link
          draggable={false}
          className="underline cursor-pointer underline-offset-2 font-semibold font-caveat tracking-widest"
          href={"https://www.benceszalai.me"}
        >
          Szalai Bence
        </Link>
      </p>
    </footer>
  );
}

function SocialMedia({
  children,
  link,
  text,
}: {
  children: React.ReactNode;
  text: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex flex-row gap-2 items-center justify-center font-light tracking-wide text-neutral-200 font-geistmono"
    >
      {children}
      <p>{text}</p>
    </Link>
  );
}
