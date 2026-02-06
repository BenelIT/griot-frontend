import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  AppleIcon,
  GoogleIcon,
  MetaIcon,
} from "@/components/icons/SocialIcons";
import { AuthHeader } from "../components/AuthHeader";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#F9F7F3]">
        <div
          className="relative w-full max-w-6xl max-h-[90vh] grid md:grid-cols-2 gap-0 
                    shadow-[0_0_60px_-15px_rgba(15,163,177,0.4)] rounded-3xl overflow-hidden"
        >
          {/* Form column */}
          <Card className="border-0 rounded-none md:rounded-l-3xl gap-2 lg:px-12 bg-[#F9F7F3]">
            <AuthHeader subtitle="Sign in with your account" />

            <CardContent>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[#2B2B2B] font-sans dark:text-[#a0bce0]">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="example@domain.com"
                    className="bg-muted/20 focus-visible:ring-2 focus-visible:ring-[#0FA3B1]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#2B2B2B] font-sans dark:text-[#a0bce0]">
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-muted/20 focus-visible:ring-2 focus-visible:ring-[#0FA3B1]"
                  />
                </div>
                <Link href={"/"}>
                  <Button
                    type="submit"
                    className="w-full mt-2 text-base font-sans bg-[#0FA3B1] text-white hover:bg-[#007080]"
                  >
                    Log in
                  </Button>
                </Link>
                <div
                  className="relative mt-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 
                after:flex after:items-center after:border-t after:border-border"
                >
                  <span className="relative z-10 font-sans bg-[#F9F7F3] px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="w-full bg-[#F9F7F3] hover:bg-[#efede9]"
                  >
                    <AppleIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-[#F9F7F3] hover:bg-[#efede9]"
                  >
                    <GoogleIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-[#F9F7F3] hover:bg-[#efede9]"
                  >
                    <MetaIcon className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center mt-4 text-xs text-[#5A5A5A] dark:text-[#a0bce0] px-6 pb-6">
              <span className="font-sans">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="underline font-sans hover:text-[#0FA3B1]"
                >
                  Create an account
                </Link>
              </span>
            </CardFooter>
          </Card>
          {/* Image column */}
          <div className="relative hidden md:block bg-muted">
            <Image
              src="/placeholder.svg"
              alt="Verbum Background"
              fill
              style={{ objectFit: "cover" }}
              className="dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </div>
    </>
  );
}
