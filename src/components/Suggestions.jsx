import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Package, ChefHat, Clock, Users, Star } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { SlidePanel } from './ui/Modal';
import { recipes } from '../data/recipes';
import { pantryItems, pantryCategories } from '../data/pantry';
import { cn } from '../theme/tokens';

export const Suggestions = ({ isOpen, onClose, onRecipeSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Calculate recipe matches based on pantry items
  const recipeMatches = useMemo(() => {
    return recipes.map(recipe => {
      const matchingIngredients = recipe.ingredients.filter(ingredient =>
        pantryItems.some(pantryItem =>
          pantryItem.name.toLowerCase().includes(ingredient.name.toLowerCase()) ||
          ingredient.name.toLowerCase().includes(pantryItem.name.toLowerCase())
        )
      );

      const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;
      
      return {
        ...recipe,
        matchingIngredients,
        matchCount: matchingIngredients.length,
        totalIngredients: recipe.ingredients.length,
        matchPercentage: Math.round(matchPercentage),
        missingIngredients: recipe.ingredients.filter(ingredient =>
          !pantryItems.some(pantryItem =>
            pantryItem.name.toLowerCase().includes(ingredient.name.toLowerCase()) ||
            ingredient.name.toLowerCase().includes(pantryItem.name.toLowerCase())
          )
        )
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, []);

  const filteredPantryItems = useMemo(() => {
    if (selectedCategory === 'all') return pantryItems;
    return pantryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const getMatchBadgeVariant = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    if (percentage >= 40) return 'accent';
    return 'default';
  };

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="Recipe Suggestions"
      className="w-[28rem]"
    >
      <div className="space-y-6">
        {/* Pantry Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Package size={20} className="text-primary-600" />
                <h3 className="text-lg font-display font-bold text-secondary-900">
                  Your Pantry
                </h3>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All ({pantryItems.length})
                </Button>
                {pantryCategories.map(category => {
                  const count = pantryItems.filter(item => item.category === category.id).length;
                  if (count === 0) return null;
                  
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name} ({count})
                    </Button>
                  );
                })}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredPantryItems.map((item, index) => {
                  const category = pantryCategories.find(cat => cat.id === item.category);
                  return (
                    <motion.div
                      key={item.id}
                      className="flex items-center justify-between p-2 bg-secondary-50 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant="default" 
                          size="sm"
                          className={category?.color}
                        >
                          {item.quantity} {item.unit}
                        </Badge>
                        <span className="text-sm font-medium text-secondary-700 capitalize">
                          {item.name}
                        </span>
                      </div>
                      {item.expiryDays <= 3 && (
                        <Badge variant="error" size="sm">
                          Expires soon
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recipe Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb size={20} className="text-accent-600" />
            <h3 className="text-lg font-display font-bold text-secondary-900">
              Suggested Recipes
            </h3>
          </div>
          
          <div className="space-y-4">
            {recipeMatches.slice(0, 8).map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card 
                  variant="interactive"
                  hover={true}
                  onClick={() => {
                    onRecipeSelect?.(recipe);
                    onClose();
                  }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge 
                        variant={getMatchBadgeVariant(recipe.matchPercentage)}
                        size="sm"
                      >
                        {recipe.matchCount}/{recipe.totalIngredients} ingredients
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="primary" size="sm">
                        {recipe.matchPercentage}% match
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-secondary-900 mb-2 line-clamp-1">
                      {recipe.title}
                    </h4>
                    
                    <div className="flex items-center justify-between text-xs text-secondary-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{recipe.cookTime}min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={12} fill="currentColor" className="text-warning-500" />
                        <span>{recipe.rating}</span>
                      </div>
                    </div>
                    
                    {recipe.missingIngredients.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-secondary-600 mb-1">
                          Missing ingredients:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {recipe.missingIngredients.slice(0, 3).map((ingredient, idx) => (
                            <Badge key={idx} variant="error" size="sm">
                              {ingredient.name}
                            </Badge>
                          ))}
                          {recipe.missingIngredients.length > 3 && (
                            <Badge variant="default" size="sm">
                              +{recipe.missingIngredients.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {recipe.dietary.slice(0, 2).map((diet, idx) => (
                        <Badge key={idx} variant="accent" size="sm">
                          {diet}
                        </Badge>
                      ))}
                      <Badge variant="default" size="sm">
                        {recipe.cuisine}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent>
              <div className="text-center">
                <ChefHat size={32} className="text-primary-600 mx-auto mb-3" />
                <h4 className="font-semibold text-secondary-900 mb-2">
                  Need more ingredients?
                </h4>
                <p className="text-sm text-secondary-600 mb-4">
                  Generate a shopping list based on your selected recipes
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Create Shopping List
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SlidePanel>
  );
};
