// app/page.tsx
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Vision from "./components/vision/Vision"; 

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Vision />
    </main>
  );
}