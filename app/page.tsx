// app/page.tsx
import Navbar from "./components/navbar/Navbar";
import HomeHero from "./components/home/HomeHero";
import Vision from "./components/vision/Vision"; 

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HomeHero />
      <Vision />
    </main>
  );
}