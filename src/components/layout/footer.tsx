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
          text="11c.corleone"
          link="https://www.instagram.com/11c.corleone/"
        >
          <IconBrandInstagram />
        </SocialMedia>
        <SocialMedia
          text="11.corleone"
          link="https://www.tiktok.com/@11.corleone"
        >
          <IconBrandTiktok />
        </SocialMedia>
        <SocialMedia
          text="11.Corleone"
          link="https://www.youtube.com/@11.Corleone"
        >
          <IconBrandYoutube />
        </SocialMedia>
      </div>
      <p className="font-light">
        {" "}
        <Link
          draggable={false}
          className="cursor-pointer underline-offset-2 text-green-600 font-semibold font-geistmono tracking-widest"
          href={"https://khrone.benceszalai.me"}
        >
          Khrone
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
