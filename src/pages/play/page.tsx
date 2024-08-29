import React from 'react';
import { Counter } from './ui/counter';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Page = () => {
  const navigate = useNavigate();

  // mobile 대응
  const [isBackButtonClick, setIsBackButtonClick] = React.useState(false);

  const onBack = () => {
    setIsBackButtonClick(true);
    navigate(-1);
  };

  return (
    <motion.div
      key="play-page"
      className="max-w-md mx-auto size-full flex flex-col min-h-svh"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={isBackButtonClick ? { x: '100%', opacity: 0 } : {}}
      transition={{ duration: 0.2 }}
    >
      <header className="sticky top-0 left-0 h-16 p-4 flex">
        <button onClick={onBack}>
          <ChevronLeft />
        </button>
      </header>
      <main className="size-full grow">
        <Counter />
      </main>
    </motion.div>
  );
};

export default Page;
