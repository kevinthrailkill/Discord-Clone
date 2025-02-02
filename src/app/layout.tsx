import type {Metadata} from "next";
import {Open_Sans} from "next/font/google";
import "./globals.css";
import {
    ClerkProvider,
} from '@clerk/nextjs'
import {ThemeProvider} from "@/components/providers/theme-provider";
import {ModalProvider} from "@/components/providers/modal-provider";
import {cn} from "@/lib/utils";
import {SocketProvider} from "@/components/providers/socket-provider";
import {QueryProvider} from "@/components/providers/query-provider";

const font = Open_Sans({subsets: ['latin']});


export const metadata: Metadata = {
    title: "Discord Clone",
    description: "Kevin's Discord Clone Using NextJS and FastAPI With Socket.io",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider afterSignOutUrl="/">
            <html lang="en" suppressHydrationWarning>
            <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
            <SocketProvider>
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        storageKey="discord-theme"
                    >
                        <ModalProvider/>
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </SocketProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
