import type { Metadata } from "next"
import GameGrid from "../components/GameGrid/GameGrid"
import { Suspense } from "react"
import Loading from "../components/Loading/Loading"

export const metadata: Metadata = {
  title: "Top Sellers - GamerShop",
  description: "Discover the most popular video games",
}

export default async function HomePage() {

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Top Sellers</h1>
      </div>
      <Suspense fallback={<Loading size="lg" text="Loading games..." />}>
        <GameGrid />
      </Suspense>
    </>
  )
}
