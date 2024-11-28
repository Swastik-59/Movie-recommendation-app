import { motion } from "framer-motion";
import Button from "./Button";
import { useNavigate } from "react-router";

function LandingPage() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#1B262C] to-[#0F2027] px-4 overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                    duration: 0.9,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: 0.5,
                }}
                variants={{
                    visible: { opacity: 1, translateY: 0 },
                    hidden: { opacity: 0, translateY: "100px"},
                }}
                className="w-full max-w-3xl text-center p-6"
            >
                <h1 className="text-left text-3xl sm:text-4xl md:text-5xl text-[#BBE1FA] font-extrabold tracking-wide mb-4">
                    Uncover Movies Worth Watching
                </h1>
                <h2 className="text-left text-base sm:text-lg md:text-xl text-[#BBE1FA] font-medium opacity-80 my-10">
                    Explore handpicked recommendations, hidden gems, and timeless classics tailored to your every mood.
                </h2>
                <Button onClick={()=>navigate("/choices")} >Get Started</Button>
            </motion.div>
        </div>
    );
}

export default LandingPage;
