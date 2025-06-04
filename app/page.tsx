// app/page.tsx
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Vision from "./components/vision/Vision";
import Footer from "./components/footer/Footer";
import ApiTest from "./components/ApiTest";
import ApiTest2 from "./components/courses/ApiTest2";
import ApiTest3 from "./components/courses/ApiTest3";
export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Vision />
      {/* <ApiTest /> */}
      <ApiTest3 />

      <ApiTest2 />
      <Footer />
    </main>
  );
}
