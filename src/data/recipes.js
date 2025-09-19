export const recipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    description: "A vibrant, nutrient-packed bowl with quinoa, fresh vegetables, and tangy feta cheese",
    cuisine: "Mediterranean",
    dietary: ["vegetarian", "gluten-free", "high-protein"],
    cookTime: 25,
    servings: 4,
    rating: 4.8,
    featured: true,
    badgeText: "Trending",
    difficulty: "Easy",
    ingredients: [
      { name: "quinoa", amount: 1, unit: "cup" },
      { name: "cucumber", amount: 1, unit: "large" },
      { name: "cherry tomatoes", amount: 2, unit: "cups" },
      { name: "red onion", amount: 0.5, unit: "medium" },
      { name: "feta cheese", amount: 0.5, unit: "cup" },
      { name: "olive oil", amount: 3, unit: "tbsp" },
      { name: "lemon juice", amount: 2, unit: "tbsp" },
      { name: "fresh herbs", amount: 0.25, unit: "cup" }
    ],
    instructions: [
      "Rinse quinoa and cook according to package directions",
      "Dice cucumber, halve cherry tomatoes, and thinly slice red onion",
      "Whisk together olive oil, lemon juice, salt, and pepper",
      "Combine cooked quinoa with vegetables and dressing",
      "Top with crumbled feta and fresh herbs"
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14,
      fiber: 6
    },
    tags: ["healthy", "quick", "meal-prep"]
  },
  {
    id: 2,
    title: "Spicy Thai Basil Chicken",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
    description: "Authentic Thai stir-fry with aromatic basil and perfectly balanced heat",
    cuisine: "Thai",
    dietary: ["gluten-free", "dairy-free"],
    cookTime: 20,
    servings: 3,
    rating: 4.9,
    featured: false,
    badgeText: "Spicy",
    difficulty: "Medium",
    ingredients: [
      { name: "chicken breast", amount: 1, unit: "lb" },
      { name: "thai basil", amount: 1, unit: "cup" },
      { name: "garlic", amount: 4, unit: "cloves" },
      { name: "thai chilies", amount: 3, unit: "pieces" },
      { name: "fish sauce", amount: 2, unit: "tbsp" },
      { name: "soy sauce", amount: 1, unit: "tbsp" },
      { name: "brown sugar", amount: 1, unit: "tsp" },
      { name: "vegetable oil", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Slice chicken into thin strips",
      "Mince garlic and chilies",
      "Heat oil in wok over high heat",
      "Stir-fry chicken until cooked through",
      "Add garlic and chilies, cook 30 seconds",
      "Add sauces and sugar, toss to coat",
      "Remove from heat and stir in basil leaves"
    ],
    nutrition: {
      calories: 280,
      protein: 35,
      carbs: 8,
      fat: 12,
      fiber: 1
    },
    tags: ["spicy", "authentic", "quick"]
  },
  {
    id: 3,
    title: "Creamy Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop",
    description: "Rich and creamy Italian risotto with mixed mushrooms and parmesan",
    cuisine: "Italian",
    dietary: ["vegetarian"],
    cookTime: 45,
    servings: 4,
    rating: 4.7,
    featured: true,
    badgeText: "Chef's Choice",
    difficulty: "Hard",
    ingredients: [
      { name: "arborio rice", amount: 1.5, unit: "cups" },
      { name: "mixed mushrooms", amount: 8, unit: "oz" },
      { name: "vegetable broth", amount: 6, unit: "cups" },
      { name: "white wine", amount: 0.5, unit: "cup" },
      { name: "onion", amount: 1, unit: "medium" },
      { name: "parmesan cheese", amount: 0.75, unit: "cup" },
      { name: "butter", amount: 3, unit: "tbsp" },
      { name: "olive oil", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Heat broth in a separate pot and keep warm",
      "Sauté sliced mushrooms until golden, set aside",
      "Cook diced onion in olive oil until translucent",
      "Add rice and toast for 2 minutes",
      "Add wine and stir until absorbed",
      "Add warm broth one ladle at a time, stirring constantly",
      "Continue until rice is creamy and al dente (about 20 minutes)",
      "Stir in mushrooms, butter, and parmesan"
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 58,
      fat: 12,
      fiber: 3
    },
    tags: ["comfort-food", "italian", "creamy"]
  },
  {
    id: 4,
    title: "Korean BBQ Beef Bowls",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop",
    description: "Tender marinated beef with steamed rice and fresh vegetables",
    cuisine: "Korean",
    dietary: ["dairy-free"],
    cookTime: 30,
    servings: 4,
    rating: 4.6,
    featured: false,
    badgeText: "New",
    difficulty: "Medium",
    ingredients: [
      { name: "ribeye steak", amount: 1.5, unit: "lbs" },
      { name: "soy sauce", amount: 0.25, unit: "cup" },
      { name: "brown sugar", amount: 2, unit: "tbsp" },
      { name: "sesame oil", amount: 1, unit: "tbsp" },
      { name: "garlic", amount: 4, unit: "cloves" },
      { name: "ginger", amount: 1, unit: "tbsp" },
      { name: "jasmine rice", amount: 2, unit: "cups" },
      { name: "scallions", amount: 3, unit: "stalks" }
    ],
    instructions: [
      "Slice beef thinly against the grain",
      "Marinate beef in soy sauce, sugar, sesame oil, garlic, and ginger for 30 minutes",
      "Cook rice according to package directions",
      "Heat grill pan over high heat",
      "Cook marinated beef for 2-3 minutes per side",
      "Serve over rice with sliced scallions"
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 45,
      fat: 15,
      fiber: 2
    },
    tags: ["korean", "marinated", "rice-bowl"]
  },
  {
    id: 5,
    title: "Lemon Herb Salmon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
    description: "Perfectly flaked salmon with bright lemon and fresh herbs",
    cuisine: "American",
    dietary: ["gluten-free", "dairy-free", "keto", "high-protein"],
    cookTime: 20,
    servings: 4,
    rating: 4.8,
    featured: true,
    badgeText: "Healthy",
    difficulty: "Easy",
    ingredients: [
      { name: "salmon fillets", amount: 4, unit: "pieces" },
      { name: "lemon", amount: 2, unit: "large" },
      { name: "fresh dill", amount: 0.25, unit: "cup" },
      { name: "fresh parsley", amount: 0.25, unit: "cup" },
      { name: "olive oil", amount: 3, unit: "tbsp" },
      { name: "garlic", amount: 3, unit: "cloves" },
      { name: "capers", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Place salmon on baking sheet lined with parchment",
      "Drizzle with olive oil and lemon juice",
      "Season with salt, pepper, and minced garlic",
      "Bake for 12-15 minutes until flakes easily",
      "Top with fresh herbs and capers before serving"
    ],
    nutrition: {
      calories: 290,
      protein: 35,
      carbs: 3,
      fat: 15,
      fiber: 1
    },
    tags: ["healthy", "omega-3", "quick"]
  },
  {
    id: 6,
    title: "Chocolate Avocado Mousse",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop",
    description: "Decadent yet healthy chocolate mousse made with ripe avocados",
    cuisine: "Fusion",
    dietary: ["vegan", "gluten-free", "dairy-free"],
    cookTime: 15,
    servings: 6,
    rating: 4.5,
    featured: false,
    badgeText: "Vegan",
    difficulty: "Easy",
    ingredients: [
      { name: "ripe avocados", amount: 3, unit: "large" },
      { name: "cocoa powder", amount: 0.5, unit: "cup" },
      { name: "maple syrup", amount: 0.25, unit: "cup" },
      { name: "vanilla extract", amount: 1, unit: "tsp" },
      { name: "coconut milk", amount: 0.25, unit: "cup" },
      { name: "dark chocolate chips", amount: 0.25, unit: "cup" },
      { name: "sea salt", amount: 0.25, unit: "tsp" }
    ],
    instructions: [
      "Scoop avocado flesh into food processor",
      "Add cocoa powder, maple syrup, and vanilla",
      "Process until smooth and creamy",
      "Add coconut milk gradually until desired consistency",
      "Fold in melted chocolate chips",
      "Chill for at least 2 hours before serving",
      "Garnish with a pinch of sea salt"
    ],
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 20,
      fat: 12,
      fiber: 8
    },
    tags: ["dessert", "healthy", "vegan"]
  }
];

// Helper functions for filtering and searching
export const getCuisines = () => {
  return [...new Set(recipes.map(recipe => recipe.cuisine))];
};

export const getDietaryOptions = () => {
  const allDietary = recipes.flatMap(recipe => recipe.dietary);
  return [...new Set(allDietary)];
};

export const getRecipeById = (id) => {
  return recipes.find(recipe => recipe.id === parseInt(id));
};

export const filterRecipes = (filters) => {
  return recipes.filter(recipe => {
    const matchesCuisine = !filters.cuisine || recipe.cuisine === filters.cuisine;
    const matchesDietary = !filters.dietary || recipe.dietary.includes(filters.dietary);
    const matchesSearch = !filters.search || 
      recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesCookTime = !filters.maxCookTime || recipe.cookTime <= filters.maxCookTime;
    
    return matchesCuisine && matchesDietary && matchesSearch && matchesCookTime;
  });
};
