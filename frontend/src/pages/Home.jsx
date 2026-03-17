import MainLayout from "../layouts/MainLayout"
import Hero from "../components/home/Hero"
import Categories from "../components/home/Categories"
import Trending from "../components/home/Trending"

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Categories />
      <Trending />
    </MainLayout>
  )
}

