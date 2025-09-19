import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, ShoppingCart, Trash2, Edit3 } from 'lucide-react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Modal, SlidePanel } from './ui/Modal';
import { Select } from './ui/Input';
import { recipes, getRecipeById } from '../data/recipes';
import { pantryItems } from '../data/pantry';
import { getWeekDates, mealTypes, generateShoppingList } from '../data/mealPlans';
import { cn } from '../theme/tokens';

export const MealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [mealPlan, setMealPlan] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);

  const weekDates = useMemo(() => getWeekDates(currentWeek), [currentWeek]);

  const addMealToSlot = (date, mealType, recipeId) => {
    setMealPlan(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [mealType]: { recipeId: parseInt(recipeId), servings: 2 }
      }
    }));
    setIsRecipeModalOpen(false);
    setSelectedSlot(null);
  };

  const removeMealFromSlot = (date, mealType) => {
    setMealPlan(prev => {
      const newPlan = { ...prev };
      if (newPlan[date]) {
        delete newPlan[date][mealType];
        if (Object.keys(newPlan[date]).length === 0) {
          delete newPlan[date];
        }
      }
      return newPlan;
    });
  };

  const shoppingList = useMemo(() => {
    const mockMealPlan = {
      days: Object.entries(mealPlan).map(([date, meals]) => ({
        date,
        meals
      }))
    };
    return generateShoppingList(mockMealPlan, recipes, pantryItems);
  }, [mealPlan]);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentWeek(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 rounded-2xl">
              <Calendar size={48} className="text-primary-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-display font-bold text-secondary-900 mb-4">
            Meal Planner
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Plan your weekly meals and generate shopping lists automatically
          </p>
        </motion.div>

        {/* Week Navigation */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Button variant="outline" onClick={() => navigateWeek(-1)}>
            Previous Week
          </Button>
          
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-secondary-900">
              {weekDates[0]?.date && weekDates[6]?.date && 
                `${new Date(weekDates[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(weekDates[6].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
              }
            </h2>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setIsShoppingListOpen(true)}
              className="flex items-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Shopping List ({shoppingList.length})</span>
            </Button>
            <Button variant="outline" onClick={() => navigateWeek(1)}>
              Next Week
            </Button>
          </div>
        </motion.div>

        {/* Meal Planning Grid */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b border-secondary-100">
            <div className="p-4 bg-secondary-50 font-semibold text-secondary-700">
              Meal
            </div>
            {weekDates.map((day, index) => (
              <div 
                key={day.date} 
                className={cn(
                  'p-4 text-center font-semibold',
                  day.isToday ? 'bg-primary-50 text-primary-700' : 'bg-secondary-50 text-secondary-700'
                )}
              >
                <div className="text-sm">{day.dayName}</div>
                <div className="text-xs opacity-75">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>

          {/* Meal Rows */}
          {mealTypes.map((mealType) => (
            <div key={mealType.id} className="grid grid-cols-8 border-b border-secondary-100 last:border-b-0">
              <div className="p-4 bg-secondary-50 flex items-center">
                <Badge variant="default" className={mealType.color}>
                  {mealType.name}
                </Badge>
              </div>
              
              {weekDates.map((day) => {
                const meal = mealPlan[day.date]?.[mealType.id];
                const recipe = meal ? getRecipeById(meal.recipeId) : null;
                
                return (
                  <motion.div
                    key={`${day.date}-${mealType.id}`}
                    className={cn(
                      'p-2 min-h-[100px] border-r border-secondary-100 last:border-r-0',
                      day.isToday && 'bg-primary-50/30'
                    )}
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  >
                    {recipe ? (
                      <Card className="h-full group cursor-pointer">
                        <div className="p-3 h-full flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-medium text-secondary-900 line-clamp-2 flex-1">
                              {recipe.title}
                            </h4>
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1"
                                onClick={() => {
                                  setSelectedSlot({ date: day.date, mealType: mealType.id });
                                  setIsRecipeModalOpen(true);
                                }}
                              >
                                <Edit3 size={12} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 text-error-600 hover:text-error-700"
                                onClick={() => removeMealFromSlot(day.date, mealType.id)}
                              >
                                <Trash2 size={12} />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-secondary-500 mt-auto">
                            <span>{recipe.cookTime}min</span>
                            <Badge variant="accent" size="sm">
                              {meal.servings} servings
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <motion.button
                        className="w-full h-full border-2 border-dashed border-secondary-200 rounded-xl flex items-center justify-center text-secondary-400 hover:border-primary-300 hover:text-primary-600 transition-colors group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSlot({ date: day.date, mealType: mealType.id });
                          setIsRecipeModalOpen(true);
                        }}
                      >
                        <div className="text-center">
                          <Plus size={24} className="mx-auto mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs">Add Recipe</span>
                        </div>
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>

        {/* Recipe Selection Modal */}
        <Modal
          isOpen={isRecipeModalOpen}
          onClose={() => {
            setIsRecipeModalOpen(false);
            setSelectedSlot(null);
          }}
          title="Select a Recipe"
          size="lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                variant="interactive"
                hover={true}
                onClick={() => addMealToSlot(selectedSlot?.date, selectedSlot?.mealType, recipe.id)}
                className="overflow-hidden"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-secondary-900 mb-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-secondary-500">
                    <span>{recipe.cookTime} min</span>
                    <span>{recipe.servings} servings</span>
                    <Badge variant="default" size="sm">
                      {recipe.cuisine}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Modal>

        {/* Shopping List Panel */}
        <SlidePanel
          isOpen={isShoppingListOpen}
          onClose={() => setIsShoppingListOpen(false)}
          title="Shopping List"
        >
          <div className="space-y-4">
            {shoppingList.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="text-secondary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-secondary-700 mb-2">
                  No items needed
                </h3>
                <p className="text-secondary-500">
                  Add some recipes to your meal plan to generate a shopping list
                </p>
              </div>
            ) : (
              <>
                <div className="bg-primary-50 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-primary-900 mb-2">
                    Shopping Summary
                  </h3>
                  <p className="text-sm text-primary-700">
                    {shoppingList.length} items needed for your meal plan
                  </p>
                </div>
                
                <div className="space-y-3">
                  {shoppingList.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-secondary-900 capitalize">
                          {item.name}
                        </div>
                        <div className="text-sm text-secondary-600">
                          Need: {item.needed} {item.unit}
                          {item.inPantry > 0 && (
                            <span className="ml-2 text-success-600">
                              (Have: {item.inPantry} {item.unit})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-secondary-500 mt-1">
                          For: {item.recipes.slice(0, 2).join(', ')}
                          {item.recipes.length > 2 && ` +${item.recipes.length - 2} more`}
                        </div>
                      </div>
                      <Badge variant="primary" size="sm">
                        {item.needed} {item.unit}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                
                <Button variant="primary" className="w-full mt-6">
                  Export Shopping List
                </Button>
              </>
            )}
          </div>
        </SlidePanel>
      </div>
    </div>
  );
};
