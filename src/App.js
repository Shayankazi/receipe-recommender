import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { RecipeList } from './components/RecipeList';
import { RecipeDetails } from './components/RecipeDetails';
import { MealPlanner } from './components/MealPlanner';
import { Suggestions } from './components/Suggestions';
import { getRecipeById } from './data/recipes';

function App() {
  const [currentPage, setCurrentPage] = useState('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

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

  const renderCurrentPage = () => {
    if (selectedRecipe) {
      return (
        <RecipeDetails 
          recipe={selectedRecipe} 
          onBack={handleBackToRecipes}
        />
      );
    }

    switch (currentPage) {
      case 'recipes':
        return <RecipeList onRecipeSelect={handleRecipeSelect} />;
      case 'planner':
        return <MealPlanner />;
      default:
        return <RecipeList onRecipeSelect={handleRecipeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigation}
        onSuggestionsOpen={() => setIsSuggestionsOpen(true)}
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

      <Suggestions
        isOpen={isSuggestionsOpen}
        onClose={() => setIsSuggestionsOpen(false)}
        onRecipeSelect={handleRecipeSelect}
      />
    </div>
  );
}

export default App;
