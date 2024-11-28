/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router";

function Choices({ setMovies }) {
  const [feeling, setFeeling] = useState(null);
  const [genre, setGenre] = useState(null);
  const [favMovie, setFavMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const response = await axios.post("/api", { feeling, genre, favMovie });
      const data = response.data;
      console.log(data);
      setMovies(data);
      navigate("/result");
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setIsLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
    whileHover: { scale: 1.1 },
  };

  return (
    <motion.div
      className={`relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#1B262C] to-[#0F2027] px-4 overflow-hidden`}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          {/* Loading Spinner and Text */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-t-[#BBE1FA] border-b-[#BBE1FA] border-r-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="text-white text-2xl font-bold animate-pulse">
              Loading<span className="dots">...</span>
            </p>
          </div>
        </div>
      )}

      {/* Main Content with Blur Effect */}
      <div className={`${isLoading ? "filter blur-sm" : ""} w-full max-w-3xl`}>
        {/* Content for feeling selection */}
        {!feeling && !genre && (
          <motion.div
            className="w-full p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-[#BBE1FA] font-extrabold tracking-wide mb-4">
              How are you feeling today?
            </h1>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {["Happy", "Neutral", "Sad"].map((mood, idx) => (
                <motion.div key={idx} variants={buttonVariants} whileHover="whileHover">
                  <Button onClick={() => setFeeling(mood)}>{mood}</Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Content for genre selection */}
        {feeling && !genre && (
          <motion.div
            className="w-full p-6"
            variants={containerVariants}
          >
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-[#BBE1FA] font-extrabold tracking-wide mb-4">
              What genre would you like me to recommend from?
            </h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
              {["Action", "Adventure", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western", "Biography", "Documentary", "Family", "Film Noir", "History", "Music", "Musical", "Sport", "War", "Action Comedy", "Action Thriller", "Adventure Comedy", "Comedy Drama", "Crime Drama", "Dark Comedy", "Epic Fantasy", "Historical Drama", "Horror Comedy", "Psychological Thriller", "Romantic Comedy", "Sci-Fi Horror", "Superhero", "Supervillain", "War Drama"].map((item, index) => (
                <motion.div key={index} variants={buttonVariants} whileHover="whileHover">
                  <Button className="w-1/3 sm:w-1/4 md:w-1/6" onClick={() => setGenre(item)}>
                    {item}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Content for favorite movie input */}
        {genre && (
          <motion.div
            className="w-full p-6"
            variants={containerVariants}
          >
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl text-[#BBE1FA] font-extrabold tracking-wide mb-4">
              What are your fav movies?
            </h1>
            <motion.textarea
              rows="3"
              className="w-full p-2 mt-6 rounded-lg text-lg font-normal"
              onChange={(e) => setFavMovie(e.target.value)}
              value={favMovie}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <Button onClick={() => { setFeeling(null); setGenre(null); }}>Reset</Button>
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Choices;
