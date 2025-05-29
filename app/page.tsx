// app/page.tsx
import Navbar from "./components/navbar/Navbar";
import HomeHero from "./components/home/HomeHero";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HomeHero />
    </main>
  );
}