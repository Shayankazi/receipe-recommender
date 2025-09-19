import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import { RecipeList } from './components/RecipeList';
import { RecipeDetails } from './components/RecipeDetails';
import { MealPlanner } from './components/MealPlanner';
import { FilterPanel } from './components/FilterPanel';
import { Profile } from './components/Profile';

import { getRecipeById } from './data/recipes';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  const [currentPage, setCurrentPage] = useState('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchToggleKey, setSearchToggleKey] = useState(0);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToRecipes = () => {
    setSelectedRecipe(null);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedRecipe(null);
  };

  const handleSearchToggle = () => {
    setSearchToggleKey(prev => prev + 1);
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Scroll to top when recipe is selected or deselected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedRecipe]);

  const renderCurrentPage = () => {
    if (selectedRecipe) {
      return (
        <RecipeDetails 
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      );
    }

    switch (currentPage) {
      case 'recipes':
        return <RecipeList onRecipeSelect={handleRecipeSelect} searchToggleKey={searchToggleKey} />;
      case 'meal-planner':
        return <MealPlanner />;
      case 'favorites':
        return <RecipeList onRecipeSelect={handleRecipeSelect} showFavoritesOnly={true} searchToggleKey={searchToggleKey} />;
      case 'suggestions':
        return <RecipeList onRecipeSelect={handleRecipeSelect} showSuggestions={true} searchToggleKey={searchToggleKey} />;
      case 'profile':
        return <Profile />;
      default:
        return <RecipeList onRecipeSelect={handleRecipeSelect} searchToggleKey={searchToggleKey} />;
    }
  };

  return (
    <FavoritesProvider>
      <div className="relative min-h-screen bg-black">
        
        {/* App Content */}
        <div className="relative z-10 min-h-screen">
          <Navbar 
            currentPage={currentPage}
            onNavigate={handleNavigation}
            onSearchToggle={handleSearchToggle}
          />
          
          <AnimatePresence mode="wait">
            <motion.main
              key={selectedRecipe ? `recipe-${selectedRecipe.id}` : currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentPage()}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </FavoritesProvider>
  );
}

export default App;
