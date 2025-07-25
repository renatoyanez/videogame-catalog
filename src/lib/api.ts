import type { Game, ApiParams, ApiResponse } from "../types/game";
import { createApiError, isApiError } from "../lib/errors";
import { availableFilters } from "../utils/endpoint";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_API_BASE_URL)
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  return "";
};

const request = async (
  endpoint: string,
  options?: RequestInit
): Promise<any> => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw createApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }
    throw createApiError("Network error occurred", 0);
  }
};

export const getGames = async (
  params: ApiParams = {}
): Promise<ApiResponse<Game[]>> => {
  const queryParams = new URLSearchParams();

  if (params.genre) {
    queryParams.append("genre", params.genre);
  }

  if (params.page) {
    queryParams.append("page", params.page.toString());
  }

  const endpoint = `/api/games${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  try {
    return await request(endpoint);
  } catch (error) {
    console.warn("API call failed, returning empty array:", error);
    return {
      games: [],
      availableFilters: [],
      currentPage: 0,
      totalPages: 0,
    };
  }
};

export const getGameById = async (id: number): Promise<Game | null> => {
  const games = await getGames();
  return games.games.find((game) => game.id === id) || null;
};

export const getAvailableGenres = (): string[] => {
  // this looks unnecessary, but it's added to centralize
  // the simulated API response
  return availableFilters;
};

export const apiService = {
  getGames,
  getGameById,
  getAvailableGenres,
};
