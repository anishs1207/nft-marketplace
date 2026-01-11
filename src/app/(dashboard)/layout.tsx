import { NavBar, Footer } from "@/components/(landing)";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>

            {children}

        </>
    );
}
