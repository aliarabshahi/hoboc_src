// app/page.tsx
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Vision from "./components/vision/Vision";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Vision />
      <Footer />
    </main>
  );
}
