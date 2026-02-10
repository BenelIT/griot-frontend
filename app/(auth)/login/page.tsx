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
import { PasswordInput } from "../components/PasswordInput";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-griot-cream">
        <div
          className="relative w-full max-w-6xl max-h-[90vh] grid md:grid-cols-2 gap-0 
                    shadow-[0_0_60px_-15px_rgba(15,163,177,0.4)] rounded-3xl overflow-hidden"
        >
          {/* Form column */}
          <Card className="border-0 rounded-none md:rounded-l-3xl gap-2 lg:px-12 bg-griot-cream">
            <AuthHeader subtitle="Sign in with your account" />

            <CardContent>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-griot-dark font-sans ">Email</Label>
                  <Input
                    type="email"
                    placeholder="example@domain.com"
                    className="bg-muted/20 focus-visible:ring-2 focus-visible:ring-griot-teal"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-griot-dark font-sans">Password</Label>
                  <PasswordInput />
                </div>
                <Link href={"/"}>
                  <Button
                    type="submit"
                    className="w-full mt-2 text-base font-sans bg-griot-teal text-griot-cream hover:bg-griot-teal-dark"
                  >
                    Log in
                  </Button>
                </Link>
                <div
                  className="relative mt-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 
                after:flex after:items-center after:border-t after:border-border"
                >
                  <span className="relative z-10 font-sans bg-griot-cream px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="w-full bg-griot-cream hover:bg-[#efede9]"
                  >
                    <AppleIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-griot-cream hover:bg-[#efede9]"
                  >
                    <GoogleIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-griot-cream hover:bg-[#efede9]"
                  >
                    <MetaIcon className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center mt-4 text-xs text-griot-gray px-6 pb-6">
              <span className="font-sans">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="underline font-sans hover:text-griot-teal"
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
              alt="Griot Background"
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
