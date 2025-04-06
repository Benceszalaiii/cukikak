"use client";
import { signIn } from "next-auth/react";
import { NavbarButton } from "./aceternity/nav";
import ShinyText from "./bits/shiny";

export default function SignInButton() {
  return (
    <NavbarButton
      variant="dark"
      onClick={() => {
        signIn("google");
      }}
    >
      <ShinyText text="Bejelentkezés"></ShinyText>
    </NavbarButton>
  );
}
