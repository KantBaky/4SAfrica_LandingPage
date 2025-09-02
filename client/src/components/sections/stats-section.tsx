import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 12, label: 'Countries Served', color: 'text-primary' },
  { value: 150, label: 'Projects Completed', color: 'text-secondary' },
  { value: 500, label: 'Communities Impacted', color: 'text-accent' },
  { value: 17, label: 'SDGs Addressed', color: 'text-primary' },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-16 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AnimatedCounter
                value={stat.value}
                className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}
                isInView={isInView}
              />
              <div className="text-muted-foreground" data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ 
  value, 
  className, 
  isInView 
}: { 
  value: number; 
  className: string; 
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return <div className={className}>{count}</div>;
}
