import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dark to-gray-900 -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <Link to="/review">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary rounded-lg font-semibold text-white flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              {t('btn.start')} <ArrowRight size={20} />
            </motion.button>
          </Link>
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-lg font-semibold text-white flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-colors"
            >
              {t('btn.dashboard')}
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <FeatureCard 
          icon={<Zap className="text-yellow-400" size={32} />}
          title="Instant Analysis"
          description="Get immediate feedback on your code structure and syntax."
        />
        <FeatureCard 
          icon={<ShieldCheck className="text-green-400" size={32} />}
          title="Security First"
          description="Detect vulnerabilities and potential security risks before deployment."
        />
        <FeatureCard 
          icon={<Code className="text-blue-400" size={32} />}
          title="Multi-Language"
          description="Support for Python, Java, JavaScript, C++, and more."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-8 rounded-2xl flex flex-col items-start gap-4"
  >
    <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default Home;
