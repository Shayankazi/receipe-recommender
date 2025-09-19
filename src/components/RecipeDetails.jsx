import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, Plus, Minus, ChefHat, Utensils } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Slider } from './ui/Slider';
import { cn } from '../theme/tokens';

export const RecipeDetails = ({ recipe, onBack }) => {
  const [servings, setServings] = useState(recipe.servings);

  const scaledIngredients = useMemo(() => {
    const scale = servings / recipe.servings;
    return recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: (ingredient.amount * scale).toFixed(2).replace(/\.?0+$/, '')
    }));
  }, [recipe.ingredients, servings, recipe.servings]);

  const scaledNutrition = useMemo(() => {
    const scale = servings / recipe.servings;
    return Object.entries(recipe.nutrition).reduce((acc, [key, value]) => {
      acc[key] = Math.round(value * scale);
      return acc;
    }, {});
  }, [recipe.nutrition, servings, recipe.servings]);

  const getBadgeVariant = (badgeText) => {
    switch (badgeText?.toLowerCase()) {
      case 'trending': return 'primary';
      case 'new': return 'success';
      case 'spicy': return 'error';
      case 'healthy': return 'success';
      case 'vegan': return 'accent';
      case 'chef\'s choice': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <motion.img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          className="absolute top-6 left-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="secondary"
            onClick={onBack}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Recipes
          </Button>
        </motion.div>

        {/* Recipe Title Overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              {recipe.badgeText && (
                <Badge variant={getBadgeVariant(recipe.badgeText)} size="md">
                  {recipe.badgeText}
                </Badge>
              )}
              {recipe.featured && (
                <Badge variant="warning" size="md">
                  Featured
                </Badge>
              )}
              <Badge variant="default" size="md">
                {recipe.cuisine}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {recipe.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              {recipe.description}
            </p>
            
            <div className="flex items-center space-x-8 text-white/90">
              <div className="flex items-center space-x-2">
                <Clock size={20} />
                <span className="font-medium">{recipe.cookTime} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={20} />
                <span className="font-medium">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={20} fill="currentColor" className="text-warning-400" />
                <span className="font-medium">{recipe.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChefHat size={20} />
                <span className="font-medium">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Ingredients & Scaling */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-display font-bold text-secondary-900">
                    Ingredients
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Utensils size={24} className="text-primary-600" />
                  </div>
                </div>
                
                {/* Servings Scaler */}
                <div className="bg-secondary-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-secondary-700">Servings</span>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setServings(Math.max(1, servings - 1))}
                        className="p-2"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="text-xl font-bold text-primary-600 min-w-[3rem] text-center">
                        {servings}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setServings(servings + 1)}
                        className="p-2"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  <Slider
                    value={servings}
                    onChange={setServings}
                    min={1}
                    max={12}
                    step={1}
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {scaledIngredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-secondary-100 last:border-b-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                    >
                      <span className="text-secondary-700 capitalize">
                        {ingredient.name}
                      </span>
                      <span className="font-medium text-secondary-900">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions & Details */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Instructions */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-display font-bold text-secondary-900">
                  Instructions
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      className="flex space-x-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-secondary-700 leading-relaxed pt-1">
                        {instruction}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nutrition & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nutrition */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-display font-bold text-secondary-900">
                    Nutrition (per serving)
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(scaledNutrition).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-secondary-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">
                          {value}
                        </div>
                        <div className="text-sm text-secondary-600 capitalize">
                          {key === 'calories' ? 'cal' : key === 'protein' || key === 'carbs' || key === 'fat' || key === 'fiber' ? `${key} (g)` : key}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags & Dietary Info */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-display font-bold text-secondary-900">
                    Dietary Information
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-secondary-700 mb-2">Dietary Preferences</h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.dietary.map((diet, index) => (
                          <Badge key={index} variant="accent" size="sm">
                            {diet}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-secondary-700 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag, index) => (
                          <Badge key={index} variant="default" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
