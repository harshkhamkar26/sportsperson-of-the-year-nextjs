import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Universal AI University Athletics</title>
      </Head>
      
      {/* Note: TopNavBar and SideNavBar are suppressed as this is a linear/transactional Login screen */}
      <main className="flex w-full min-h-screen">
        {/* Left Side: Hero Image Section (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 relative bg-surface-container-lowest">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAchvp0U6_RqVbsuVuVn8z4EZNckMuuZjLJdwt1PpYMpWluKYg8ljUw4-K_cAt4S_THAoxuojTcrNYjb1j3_0HYO1YDsz1arXqixyz7_ii-6czN2k_MP-U3--L9fiuyh_PU2IA3243Ss_HNlS_rmmWnW3SXJJCgIgA9sedPBC7OqXrUc7qsG7GagatmCyn9F1FReton5szf7hUNiPBW14qgNl-MPwj76tKHODO0Fa1SJd805YNGNGQ')" }}
          >
            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          {/* Content over image */}
          <div className="relative z-10 flex flex-col justify-between p-margin-desktop w-full h-full">
            {/* Logo / Brand */}
            <div className="flex items-center gap-base">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  sports_score
              </span>
              <h1 className="font-headline-md text-headline-md text-on-surface">Universal AI University</h1>
            </div>
            {/* Hero Text */}
            <div className="mb-20">
              <p className="font-label-caps text-label-caps text-primary mb-4 uppercase">Varsity Kinetic</p>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6 max-w-lg leading-tight">
                  Powering the <br/> Pursuit of Gold
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                  Administer athletic programs, track performance analytics, and manage events with precision engineering.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-margin-mobile md:p-gutter lg:p-margin-desktop bg-background z-10 relative">
          <div className="w-full max-w-md space-y-8 z-10">
            {/* Mobile Branding (Hidden on Desktop) */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <span className="material-symbols-outlined text-primary text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                  sports_score
              </span>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface text-center">Universal AI University</h1>
              <p className="font-label-caps text-label-caps text-primary mt-2 uppercase">Admin Portal</p>
            </div>
            {/* Form Header */}
            <div className="text-left lg:text-left">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome Back</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Sign in to manage athletics operations.</p>
            </div>

            {error && (
              <div className="p-4 bg-error-container/50 border border-error/50 rounded-lg text-center">
                <p className="text-error font-body-md">{error}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block font-label-caps text-label-caps text-on-surface" htmlFor="email">University Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface-variant">mail</span>
                  </div>
                  <input 
                    className="block w-full pl-10 pr-3 py-3 border border-outline-variant bg-surface-container rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-body-md transition-colors" 
                    id="email" 
                    name="email" 
                    placeholder="admin@uaiu.edu" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block font-label-caps text-label-caps text-on-surface" htmlFor="password">Password</label>
                  <a className="font-body-md text-body-md text-primary hover:text-primary-fixed transition-colors text-sm" href="#">Forgot Password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                  </div>
                  <input 
                    className="block w-full pl-10 pr-10 py-3 border border-outline-variant bg-surface-container rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-body-md transition-colors" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Action Buttons */}
              <div className="pt-4 space-y-4">
                <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-headline-md text-[16px] text-on-primary bg-primary hover:bg-primary-fixed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all duration-200 transform hover:scale-[1.02] active:scale-95 hover:shadow-[0_4px_0_0_rgba(173,198,255,1)]" type="submit">
                    Sign In
                </button>
              </div>
            </form>
            {/* Footer Links */}
            <div className="mt-8 text-center pt-8 border-t border-outline-variant/30">
              <p className="font-body-md text-body-md text-on-surface-variant">
                  Don't have an admin account? 
                  <a className="text-primary hover:text-primary-fixed hover:underline transition-colors font-medium ml-1" href="#">Request Access</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
