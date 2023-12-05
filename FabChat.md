# Key notes from application build

// alias enabling importing from different folders set in tsconfig.json file

 <!-- "@logos/*": ["./images/logos/*"] -->

<!-- Set up shadcn for styling of the app -->

Steps:

1. "npx shadcn-ui@latest init"
2. adding a component (e.g, component) "npx shadcn-ui@latest add button"

<!-- Follow instructions on shadcn documentation for implementihg dark mode -->

steps:

1. "npm install next-themes"
2. Create a theme provider
   components/theme-provider.tsx

   "use client"

   import \* as React from "react"
   import { ThemeProvider as NextThemesProvider } from "next-themes"
   import { type ThemeProviderProps } from "next-themes/dist/types"

   export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
   }

3. Wrap your root layout
   Add the ThemeProvider to your root layout.

   app/layout.tsx
   import { ThemeProvider } from "@/components/theme-provider"

   export default function RootLayout({ children }: RootLayoutProps) {
   return (
   <>
   <html lang="en" suppressHydrationWarning>
   <head />
   <body>
   <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
           >
   {children}
   </ThemeProvider>
   </body>
   </html>
   </>
   )
   }

4. Add a mode toggle
   Place a mode toggle on your site to toggle between light and dark mode.

   "use client"

   import \* as React from "react"
   import { Moon, Sun } from "lucide-react"
   import { useTheme } from "next-themes"

   import { Button } from "@/components/ui/button"
   import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   } from "@/components/ui/dropdown-menu"

   export function ModeToggle() {
   const { setTheme } = useTheme()

   return (
   <DropdownMenu>
   <DropdownMenuTrigger asChild>
   <Button variant="outline" size="icon">
   <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
   <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
   <span className="sr-only">Toggle theme</span>
   </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent align="end">
   <DropdownMenuItem onClick={() => setTheme("light")}>
   Light
   </DropdownMenuItem>
   <DropdownMenuItem onClick={() => setTheme("dark")}>
   Dark
   </DropdownMenuItem>
   <DropdownMenuItem onClick={() => setTheme("system")}>
   System
   </DropdownMenuItem>
   </DropdownMenuContent>
   </DropdownMenu>
   )
   }

## Authentication using Next-Auth using Next-Auth Docs

steps:

1. Run "npm install next-auth"
2. To add NextAuth.js to a project create a file called router.ts in pages/api/auth/[...nextauth]. This contains the dynamic route handler which will also contain all of your global NextAuth configurations.

If you're using Next.js 13.2 or above with the new App Router (app/), you can initialize the configuration using the new Route Handlers by following our guide.

"import { authOptions } from '@/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
"

authOptions:
"import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
providers: [
GoogleProvider({
clientId: process.env.GOOGLE_CLIENT_ID!,
clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
}),
],
} satisfies NextAuthOptions;

3. Create a session provider (ClientProvider)
   "'use client';

// provider to hold and manage application session

import { SessionProvider } from 'next-auth/react';

export default function ClientProvider({
children,
}: {
children: React.ReactNode;
}) {
return <SessionProvider>{children}</SessionProvider>;
}
"
