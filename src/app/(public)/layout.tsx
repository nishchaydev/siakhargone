import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import ScrollToTop from '@/components/common/ScrollToTop';


// Force rebuild
export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main className="pt-[115px] md:pt-[115px] min-h-screen">{children}</main>
            <Footer />
            <Chatbot />
        </>
    );
}
