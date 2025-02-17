import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Code2, Palette, Brain, PenBoxIcon, Pencil } from "lucide-react";
import profilePic from "./images/profile.jpg";

export default function About() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-gray-900 text-white flex flex-col items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUpVariants}
          className="relative rounded-full overflow-hidden w-48 h-48 md:w-56 md:h-56 mx-auto group"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={profilePic}
            alt="Medkour Salah Eddine"
            className="rounded-full border-4 border-gray-700 shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300 w-48 h-48 md:w-56 md:h-56"
          />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeUpVariants}
        >
          <h2 className="text-2xl font-semibold mt-4 text-gray-400">Medkour Salah Eddine</h2>
          <p className="text-gray-500 text-sm">Network Engineering graduate</p>
          <p className="text-gray-600 text-sm">Annaba, Algeria</p>
        </motion.div>
        
        <motion.p 
          className="text-xl mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={fadeUpVariants}
        >
          I'm a interested in{" "}
          <span className="text-indigo-400 font-semibold">
            <Typewriter words={["Web Development", "Cybersecurity", "Scriptwriting & Automation", "Writing"]} loop cursor />
          </span>
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              Icon: Code2,
              title: "Web Development",
              description: "Building modern and efficient web applications, And designing responsive and creative website designs."
            },
            {
              Icon: Pencil,
              title: "Writing",
              description: "Engaging and interesting stories, Creative writing, Blogs, Articles, Books."
            },
            {
              Icon: Brain,
              title: "Cybersecurity",
              description: "Exploring security and digital protection methods, Pentesting, Cloud solutions."
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 3) }}
              variants={fadeUpVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-800 rounded-lg"
            >
              <item.Icon className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}