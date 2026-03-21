import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';


// Force rebuild
export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="pt-[115px] md:pt-[115px] min-h-screen">{children}</main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
