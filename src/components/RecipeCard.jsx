import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { cn } from '../theme/tokens';

export const RecipeCard = ({ recipe, onClick }) => {
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
    <Card 
      variant="interactive" 
      hover={true}
      onClick={() => onClick?.(recipe)}
      className="overflow-hidden group h-[480px] flex flex-col"
    >
      <div className="relative flex-shrink-0">
        <motion.img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {recipe.badgeText && (
          <div className="absolute top-3 left-3">
            <Badge variant={getBadgeVariant(recipe.badgeText)} size="sm">
              {recipe.badgeText}
            </Badge>
          </div>
        )}
        
        {recipe.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="warning" size="sm">
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 flex-1 mr-2">
            {recipe.title}
          </h3>
          <div className="flex items-center space-x-1 text-warning-500 flex-shrink-0">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium">{recipe.rating}</span>
          </div>
        </div>
        
        <p className="text-secondary-600 text-sm mb-4 line-clamp-2 flex-shrink-0">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-secondary-500 mb-4 flex-shrink-0">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
          <Badge variant="default" size="sm">
            {recipe.cuisine}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {recipe.dietary.slice(0, 3).map((diet, index) => (
            <Badge key={index} variant="accent" size="sm">
              {diet}
            </Badge>
          ))}
          {recipe.dietary.length > 3 && (
            <Badge variant="default" size="sm">
              +{recipe.dietary.length - 3} more
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};
