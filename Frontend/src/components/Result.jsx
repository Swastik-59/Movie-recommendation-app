import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

function Result({ movies }) {
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_API;

    useEffect(() => {
        const controller = new AbortController();
        async function fetchMovieDetails() {
            try {
                setIsLoading(true);
                setError(null);
                const details = await Promise.all(
                    movies.map(async (movie) => {
                        const res = await fetch(
                            `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movie)}`,
                            { signal: controller.signal }
                        );

                        if (!res.ok) {
                            throw new Error(`Failed to fetch details for "${movie}"`);
                        }

                        const data = await res.json();
                        if (data.Response === "False") {
                            console.error(`Error for movie "${movie}": ${data.Error}`);
                            return null; // Skip invalid responses
                        }
                        return data;
                    })
                );

                setMovieDetails(details.filter(Boolean));
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching movie details:", err);
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (movies && movies.length) {
            fetchMovieDetails();
        } else {
            setMovieDetails([]);
        }

        return () => controller.abort();
    }, [movies]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#1B262C] to-[#0F2027] px-4 py-6 overflow-hidden">
            {isLoading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <Carousel className="w-full max-w-sm sm:max-w-md lg:max-w-4xl">
                <CarouselContent>
                    {movieDetails.map((movie, index) => (
                        <CarouselItem key={index}>
                            <Card className="bg-[#0F2027] text-[#BBE1FA] shadow-lg border border-[#BBE1FA] rounded-lg">
                                <CardContent className="flex flex-col items-center text-center space-y-4 p-4">
                                    {/* Responsive Image Container */}
                                    <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 aspect-[3/4] sm:aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                                        <img
                                            src={
                                                movie.Poster !== "N/A"
                                                    ? movie.Poster
                                                    : "https://via.placeholder.com/300x200"
                                            }
                                            alt={`${movie.Title} Poster`}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Movie Details */}
                                    <h1 className="text-xl font-bold">{movie.Title}</h1>
                                    <p className="text-sm opacity-80">{movie.Plot}</p>
                                    <p className="text-sm">
                                        Released:{" "}
                                        <span className="font-semibold">
                                            {movie.Released}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        Runtime:{" "}
                                        <span className="font-semibold">
                                            {movie.Runtime}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        Starring:{" "}
                                        <span className="font-semibold">
                                            {movie.Actors}
                                        </span>
                                    </p>
                                    <p className="text-sm">
                                        Directed by:{" "}
                                        <span className="font-semibold">
                                            {movie.Director}
                                        </span>
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-[#BBE1FA]" />
                <CarouselNext className="text-[#BBE1FA]" />
            </Carousel>
        </div>
    );
}

export default Result;
