import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // if using React Router

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <motion.div
        className="illustration"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img src="/Hospital bed-bro.png" alt="Lost file" />
      </motion.div>

      <motion.h1
        className="title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        404
      </motion.h1>

      <motion.h3
        className="text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! Page not found.
      </motion.h3>

      <motion.p
        className="subtitle"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Looks like you’ve reached the wrong ward 🏥
      </motion.p>

      <motion.button
        className="go-home"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/login')}
      >
        Back to Dashboard
      </motion.button>
    </div>
  );
};

export default NotFound;
