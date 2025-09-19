import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChefHat } from 'lucide-react';
import { Input } from './react-bits/Input';
import { Button } from './react-bits/Button';
import { RecipeCard } from './RecipeCard';
import { FilterPanel } from './FilterPanel';
import { recipes, filterRecipes } from '../data/recipes';
import { cn } from '../theme/tokens';

export const RecipeList = ({ onRecipeSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    dietary: '',
    maxCookTime: ''
  });

  // Update filters when search query changes
  const currentFilters = useMemo(() => ({
    ...filters,
    search: searchQuery
  }), [filters, searchQuery]);

  const filteredRecipes = useMemo(() => {
    return filterRecipes(currentFilters);
  }, [currentFilters]);

  const featuredRecipes = useMemo(() => {
    return recipes.filter(recipe => recipe.featured);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <motion.div 
        className="bg-white shadow-sm border-b border-secondary-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container py-16">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <div className="p-4 bg-primary-100 rounded-2xl">
                <ChefHat size={48} className="text-primary-600" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-display font-bold text-secondary-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Discover Amazing Recipes
            </motion.h1>
            
            <motion.p 
              className="text-xl text-secondary-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Find the perfect recipe for any occasion. From quick weeknight dinners to impressive weekend feasts.
            </motion.p>

            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    icon={Search}
                    placeholder="Search recipes, ingredients, or cuisines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-base"
                  />
                </div>
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container py-12">
        {/* Featured Recipes Section */}
        {featuredRecipes.length > 0 && !searchQuery && !Object.values(filters).some(Boolean) && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-secondary-900">
                Featured Recipes
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-primary-200 to-transparent ml-8 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                >
                  <RecipeCard 
                    recipe={recipe} 
                    onClick={onRecipeSelect}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Recipes Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-secondary-900">
              {searchQuery || Object.values(filters).some(Boolean) 
                ? `Found ${filteredRecipes.length} Recipe${filteredRecipes.length !== 1 ? 's' : ''}`
                : 'All Recipes'
              }
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-accent-200 to-transparent ml-8 rounded-full" />
          </div>

          {filteredRecipes.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 bg-secondary-50 rounded-2xl inline-block mb-4">
                <Search size={48} className="text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                No recipes found
              </h3>
              <p className="text-secondary-500 mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    search: '',
                    cuisine: '',
                    dietary: '',
                    maxCookTime: ''
                  });
                }}
              >
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                >
                  <RecipeCard 
                    recipe={recipe} 
                    onClick={onRecipeSelect}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};
