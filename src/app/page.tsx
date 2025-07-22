import type { Metadata } from "next";
import GameGrid from "../components/GameGrid/GameGrid";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";
import HomeClientPage from "./HomeClientPage";

export const metadata: Metadata = {
  title: "Top Sellers - GamerShop",
};

export default async function HomePage() {
  return (
    <>
      <HomeClientPage />
      <Suspense fallback={<Loading size="lg" text="Loading games..." />}>
        <GameGrid />
      </Suspense>
    </>
  );
}
