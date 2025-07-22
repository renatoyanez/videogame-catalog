"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "@/components/Select/Select";
import Typography from "@/components/Typography/Typography";
import { getAvailableGenres } from "../lib/api";

const HomeClientPage = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const availableGenres = useMemo(() => getAvailableGenres(), []);

  const handleGenreChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const genre = e.target.value;
      setSelectedGenre(genre);

      const params = new URLSearchParams(searchParams.toString());

      if (genre) {
        params.set("genre", genre);
      } else {
        params.delete("genre");
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );
  
  return (
    <>
      <div className="desktop:mb-12 mobile:mb-8">
        <Typography variant="h1" className="text-gray-900">
          Top Sellers
        </Typography>
      </div>
      <div className="desktop:mb-12 mobile:mb-8 flex justify-end">
        <section>
          <Select
            value={selectedGenre}
            onChange={handleGenreChange}
            options={availableGenres}
          />
        </section>
      </div>
    </>
  );
};

export default HomeClientPage;
