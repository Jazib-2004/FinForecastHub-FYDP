"use client";
import { login, signup } from "../login/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Welcome Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-[#224E8A]">FinForecastHub</span>
          </h1>
          <p className="text-lg text-gray-600">
            Your financial forecasting companion for smarter decisions
          </p>
          <div className="relative w-full aspect-square max-w-xs mx-auto mt-8">
            <Image
              src="/file.jpg"
              alt="Financial Analytics Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#497DC0]">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-white border-gray-300 focus:border-[#224E8A] text-black"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-[#224E8A] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-white border-gray-300 focus:border-[#224E8A] text-black"
                />
              </div>
              <Button
                type="submit"
                formAction={login}
                className="w-full bg-[#224E8A] hover:bg-[#1a3d6b]"
              >
                Sign in
              </Button>
              <Button
                type="submit"
                formAction={signup}
                variant="outline"
                className="w-full border-[#224E8A] text-[#224E8A] hover:bg-[#224E8A]/10"
              >
                Create new account
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#224E8A] hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
