import React from 'react';
import { Stopwatch } from './ui/stopwatch';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="max-w-md mx-auto size-full flex flex-col min-h-svh"
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      exit={{ x: '-100vw' }}
      transition={{ duration: 0.5 }}
    >
      <header className="sticky top-0 left-0 h-8 p-4 flex">
        <button onClick={() => navigate(-1)}>뒤로</button>
      </header>
      <main className="grow flex justify-center items-center">
        <Stopwatch />
      </main>
    </motion.div>
  );
};

export default Page;
