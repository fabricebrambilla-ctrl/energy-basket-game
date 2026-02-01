export interface Food {
  id: number;
  name: string;
  emoji: string;
  isHighEnergy: boolean;
}

const lowEnergyFoods: Omit<Food, 'id' | 'isHighEnergy'>[] = [
  { name: 'Apple', emoji: '🍎' },
  { name: 'Banana', emoji: '🍌' },
  { name: 'Orange', emoji: '🍊' },
  { name: 'Pear', emoji: '🍐' },
  { name: 'Strawberry', emoji: '🍓' },
  { name: 'Blueberries', emoji: '🫐' },
  { name: 'Grapes', emoji: '🍇' },
  { name: 'Watermelon', emoji: '🍉' },
  { name: 'Carrot', emoji: '🥕' },
  { name: 'Potato', emoji: '🥔' },
  { name: 'Sweet potato', emoji: '🍠' },
  { name: 'Tomato', emoji: '🍅' },
  { name: 'Lettuce', emoji: '🥬' },
  { name: 'Spinach', emoji: '🥬' },
  { name: 'Cucumber', emoji: '🥒' },
  { name: 'Onion', emoji: '🧅' },
  { name: 'Garlic', emoji: '🧄' },
  { name: 'Bell pepper', emoji: '🫑' },
  { name: 'Broccoli', emoji: '🥦' },
  { name: 'Cauliflower', emoji: '🥦' },
  { name: 'Peas', emoji: '🫛' },
  { name: 'Corn', emoji: '🌽' },
  { name: 'Beans', emoji: '🫘' },
  { name: 'Lentils', emoji: '🫘' },
  { name: 'Chickpeas', emoji: '🫘' },
  { name: 'Rice', emoji: '🍚' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Bread', emoji: '🍞' },
  { name: 'Oats', emoji: '🥣' },
  { name: 'Barley', emoji: '🌾' },
  { name: 'Quinoa', emoji: '🌾' },
  { name: 'Couscous', emoji: '🍚' },
  { name: 'Flour', emoji: '🌾' },
  { name: 'Tofu', emoji: '🧈' },
  { name: 'Nuts', emoji: '🥜' },
  { name: 'Seeds', emoji: '🌻' },
  { name: 'Peanut butter', emoji: '🥜' },
  { name: 'Olive oil', emoji: '🫒' },
  { name: 'Vegetable soup', emoji: '🥣' },
  { name: 'Salad', emoji: '🥗' },
  { name: 'Applesauce', emoji: '🍎' },
  { name: 'Mashed potatoes', emoji: '🥔' },
  { name: 'Popcorn', emoji: '🍿' },
  { name: 'Jam', emoji: '🍓' },
  { name: 'Tomato sauce', emoji: '🍅' },
  { name: 'Vegetable stir-fry', emoji: '🥬' },
  { name: 'Fruit smoothie', emoji: '🥤' },
  { name: 'Baked vegetables', emoji: '🥕' },
  { name: 'Vegetable wrap', emoji: '🌯' },
  { name: 'Bean stew', emoji: '🍲' },
];

const highEnergyFoods: Omit<Food, 'id' | 'isHighEnergy'>[] = [
  { name: 'Beef', emoji: '🥩' },
  { name: 'Steak', emoji: '🥩' },
  { name: 'Burger', emoji: '🍔' },
  { name: 'Lamb', emoji: '🍖' },
  { name: 'Pork', emoji: '🥓' },
  { name: 'Bacon', emoji: '🥓' },
  { name: 'Sausage', emoji: '🌭' },
  { name: 'Ham', emoji: '🍖' },
  { name: 'Chicken', emoji: '🍗' },
  { name: 'Chicken nuggets', emoji: '🍗' },
  { name: 'Turkey', emoji: '🦃' },
  { name: 'Duck', emoji: '🦆' },
  { name: 'Fish', emoji: '🐟' },
  { name: 'Salmon', emoji: '🐟' },
  { name: 'Tuna', emoji: '🐟' },
  { name: 'Shrimp', emoji: '🦐' },
  { name: 'Lobster', emoji: '🦞' },
  { name: 'Cheese', emoji: '🧀' },
  { name: 'Butter', emoji: '🧈' },
  { name: 'Milk', emoji: '🥛' },
  { name: 'Yogurt', emoji: '🥛' },
  { name: 'Ice cream', emoji: '🍦' },
  { name: 'Cream', emoji: '🥛' },
  { name: 'Eggs', emoji: '🥚' },
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Lasagna', emoji: '🍝' },
  { name: 'Hot dog', emoji: '🌭' },
  { name: 'Fried chicken', emoji: '🍗' },
  { name: 'Cheeseburger', emoji: '🍔' },
  { name: 'Pepperoni', emoji: '🍕' },
  { name: 'Salami', emoji: '🥓' },
  { name: 'Fish sticks', emoji: '🐟' },
  { name: 'Meatballs', emoji: '🍖' },
  { name: 'Kebab', emoji: '🍢' },
  { name: 'Fried eggs', emoji: '🍳' },
  { name: 'Omelette', emoji: '🍳' },
  { name: 'Pancakes', emoji: '🥞' },
  { name: 'Chocolate', emoji: '🍫' },
  { name: 'Cake', emoji: '🍰' },
  { name: 'Cookies', emoji: '🍪' },
  { name: 'Croissant', emoji: '🥐' },
  { name: 'Donut', emoji: '🍩' },
  { name: 'Milkshake', emoji: '🥤' },
  { name: 'Frozen meals', emoji: '🍱' },
  { name: 'Ready-made meals', emoji: '🍱' },
  { name: 'Fast food fries', emoji: '🍟' },
  { name: 'Processed sandwiches', emoji: '🥪' },
  { name: 'Packaged snacks', emoji: '🍿' },
  { name: 'Instant noodles', emoji: '🍜' },
  { name: 'Frozen pizza', emoji: '🍕' },
];

export const allFoods: Food[] = [
  ...lowEnergyFoods.map((food, index) => ({
    ...food,
    id: index,
    isHighEnergy: false,
  })),
  ...highEnergyFoods.map((food, index) => ({
    ...food,
    id: index + 50,
    isHighEnergy: true,
  })),
];

export function getRandomFoods(count: number): Food[] {
  // Separate low and high energy foods
  const lowEnergy = allFoods.filter(f => !f.isHighEnergy);
  const highEnergy = allFoods.filter(f => f.isHighEnergy);
  
  // Shuffle each category
  const shuffledLow = [...lowEnergy].sort(() => Math.random() - 0.5);
  const shuffledHigh = [...highEnergy].sort(() => Math.random() - 0.5);
  
  // Alternate between low and high energy foods
  const result: Food[] = [];
  const halfCount = Math.ceil(count / 2);
  
  for (let i = 0; i < halfCount; i++) {
    if (i < shuffledLow.length && result.length < count) {
      result.push(shuffledLow[i]);
    }
    if (i < shuffledHigh.length && result.length < count) {
      result.push(shuffledHigh[i]);
    }
  }
  
  // Shuffle the final result to mix them up but maintain roughly even distribution
  // Use a controlled shuffle that prevents more than 2 of the same type in a row
  const balanced: Food[] = [];
  let lastType: boolean | null = null;
  let sameTypeCount = 0;
  
  while (result.length > 0) {
    // Find candidates that won't create 3 in a row
    const candidates = result.filter(f => {
      if (lastType === null || sameTypeCount < 2) return true;
      return f.isHighEnergy !== lastType;
    });
    
    // Pick random from candidates (or from all if no valid candidates)
    const pool = candidates.length > 0 ? candidates : result;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const picked = pool[randomIndex];
    
    balanced.push(picked);
    result.splice(result.indexOf(picked), 1);
    
    if (picked.isHighEnergy === lastType) {
      sameTypeCount++;
    } else {
      lastType = picked.isHighEnergy;
      sameTypeCount = 1;
    }
  }
  
  return balanced;
}
