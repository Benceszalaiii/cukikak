import { auth, signIn } from "@/lib/auth";
import ShinyText from "./bits/shiny";
import { AnimatedGradientText } from './magicui/animated-gradient-text';

export default async function SignInButton() {
  const session = await auth();
  if (session) {
    return null;
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">
      <AnimatedGradientText className="cursor-pointer">
      <ShinyText text="Bejelentkezés"></ShinyText>
      </AnimatedGradientText>
      </button>
    </form>
  );
}
