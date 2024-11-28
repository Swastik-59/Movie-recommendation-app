/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

function Button({ children, onClick, styles}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      style={styles}
      className="bg-gradient-to-r from-[#2F4F77] to-[#3B8D99] text-[#BBE1FA] hover:from-[#1F62A6] 
        hover:to-[#4C9DAB] px-6 py-3 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-md 
        transition-all duration-300 ease-in-out mt-4 "
    >
      {children}
    </motion.button>
  );
}

export default Button;
