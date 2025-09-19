import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Menu, X, Home, BookOpen, Lightbulb, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../theme/tokens';

export const Navbar = ({ currentPage, onNavigate, onSuggestionsOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'planner', label: 'Meal Planner', icon: Calendar },
  ];

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className="bg-white shadow-sm border-b border-secondary-100 sticky top-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation('recipes')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-2 bg-primary-100 rounded-xl">
              <ChefHat size={24} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-secondary-900">
                Recipe Hub
              </h1>
              <p className="text-xs text-secondary-500 -mt-1">
                Your culinary companion
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                  )}
                  onClick={() => handleNavigation(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
            
            <Button
              variant="outline"
              onClick={onSuggestionsOpen}
              className="flex items-center space-x-2 ml-4"
            >
              <Lightbulb size={20} />
              <span>Suggestions</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-secondary-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      className={cn(
                        'w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-left',
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                      )}
                      onClick={() => handleNavigation(item.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
                
                <motion.button
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 transition-all duration-200 text-left"
                  onClick={() => {
                    onSuggestionsOpen();
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Lightbulb size={20} />
                  <span>Suggestions</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
