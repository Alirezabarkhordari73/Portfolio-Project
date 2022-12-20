import React, { useEffect, useState } from "react";
import { motion, VariantLabels, TargetAndTransition } from "framer-motion";

type ProgressProps = {
  progress: string | string[];
  isRunning: boolean;
};

const ProgressBar = ({ progress, isRunning }: ProgressProps) => {
  let progressValToNumber = parseInt(progress as string);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (filled < progressValToNumber && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 25);
    } else if (filled > progressValToNumber && !isRunning) {
      setTimeout(() => setFilled((prev) => (prev -= 2)), 25);
    }
  }, [filled, isRunning]);

  return (
    <div className="h-3 w-full bg-[#2b2b2b] rounded-lg m-10">
      <motion.div
        initial={{ width: 0 }}
        transition={{ duration: 1.35 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        className="h-full bg-[#941a49] rounded-lg text-right flex items-center justify-end">
        <span className="p-3 text-[#e1e1e1] text-center">{`${filled}%`}</span>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
