import { useState, useEffect } from 'react';

type recipesDataProps = {
  id: number;
  title: string;
  ingredients: string[];
  image: any;
  time: string;
  difficulty: 'Easy' | 'Not too tricky' | 'Moderate' | 'Challenging' | 'Expert';
  ingredientsList: any;
  steps: string[];
};

export const recipesData: recipesDataProps[] = [
  {
    id: 1,
    title: 'Khinkali',
    ingredients: ['minced-meat', 'coriander', 'coriander-seeds', 'parsley', 'salt', 'pepper', 'flour', 'onion', 'garlic', 'chilli-flakes', 'vegetable-oil', 'broth'],
    image: '/images/khinkali.jpg',
    time: '2 hours',
    difficulty: 'Expert',
    ingredientsList: [
      { 'minced-meat': '800g, mixed meat (beef and pork/lamb)' },
      { 'coriander-seeds': '1, teaspoon, grounded' },
      { 'coriander': '1, large bunch cilantro' },
      { 'onion': '1, large' },
      { 'garlic': '1, clove' },
      { 'broth': '450ml' },
      { 'salt': '1, teaspoon' },
      { 'pepper': '1, teaspoon' },
      { 'chilli-flakes': '1, teaspoon' },
      { 'flour': '950g' },
      { 'hot water': '450ml' },
      { 'vegetable-oil': '2, tablespoons' },
      { 'salt (for dough)': '1/2, teaspoon' }
    ],
    steps: [
      'Filling: Clean the meat of any membranes and tough bits. Grind it in a meat grinder, then transfer to a bowl. Add chopped cilantro with stems, grated onion and garlic, cold broth or water, salt, black pepper, chili flakes, and ground coriander. Knead the filling by hand just until the ingredients are combined and the mixture has absorbed all the liquid.',
      'Dough: Mix the wheat flour and hot water to make the dough as you would for dumplings. Divide the dough into four parts. On a floured surface, roll out each piece into a thin sheet about 2-3 millimeters thick. Use a bowl or large glass to cut out circles about 10 cm in diameter. Place a portion of filling, about 1 tablespoon, on each dough circle. Gather the edges of the dough to the top, forming a purse-like shape. Place the prepared dumplings on a floured surface, making sure they don\'t sit too long as the dough can become too soft.',
      'Cooking: Cook the khinkali in salted boiling water for 10 minutes after they float to the surface.',
      'Serving Suggestions: Serve the khinkali hot, sprinkled with fresh cilantro, and optionally drizzled with melted butter or olive oil.'
    ]
  },
  {
    id: 2,
    title: 'Polish Dumplings with Cheese and Potato Filling',
    ingredients: ['potatoes', 'cream', 'onion', 'salt', 'pepper', 'flour', 'cottage-cheese', 'lard'],
    image: '/images/russianDumplings.jpg',
    time: '2 hours',
    difficulty: 'Moderate',
    ingredientsList: [
      { 'flour': '600g' },
      { 'salt': '1, teaspoon (for dough)' },
      { 'boiling water': '400ml' },
      { 'butter': '60g' },
      { 'cottage-cheese': '500g' },
      { 'potatoes': '500g' },
      { 'salt': '2, teaspoons (for filling)' },
      { 'pepper': '1/2, teaspoon' },
      { 'onion': '1, small' },
      { 'cream': 'Thick 12% sour cream' },
      { 'onion': 'Sautéed onions in oil or lard' },
      { 'lard': 'Lard with cracklings' }
    ],
    steps: [
      'Dough: Sift the flour(wheat) into a bowl and add salt. Melt the butter in hot water and gradually pour it into the flour, stirring with a spoon. Combine the ingredients and place them on a floured board. Knead the dough for about 8-10 minutes until smooth and elastic. Place the dough in a bowl, cover with plastic wrap, and let it rest for 30 minutes. Meanwhile, start preparing the filling.',
      'Filling: Peel and rinse the potatoes, then place them in a pot with salted water. Cover and bring to a boil. Cook for about 30 minutes until soft. Drain the potatoes and mash them thoroughly until smooth. Let them cool completely. Crumble the cottage cheese and mash with a fork. Mix with the potatoes and season with salt and pepper. If using, dice the onion and sauté in butter or lard until translucent. Add to the filling mixture and stir well. Assembly: Divide the dough into four parts. Roll each part into thin sheets. Use a small glass to cut out circles of dough. Place a generous spoonful of filling in the center of each circle. Fold the dough over the filling and press the edges together, ensuring no filling escapes. Place the finished dumplings on a floured board or counter.',
      'Cooking: Bring a large pot of salted water to a vigorous boil. Add the dumplings in batches (about 15 at a time). Once the water returns to a boil, reduce the heat to medium and cook until the dumplings float to the surface. After they float, cook for another 1.5 minutes. Check one dumpling to ensure the dough is tender. Use a slotted spoon to remove the dumplings and place them on plates. Serve immediately or store in the refrigerator after cooling. Dumplings can also be frozen.',
      'Serving Suggestions: Serve with sautéed onions in oil or lard, or with melted lard with cracklings, and thick, sour cream.'
    ]
  },
  {
    id: 3,
    title: "Soup Dumplings (Xiaolongbao)",
    ingredients: ["minced-meat", "flour", "ginger", "green-onion", "sesame-oil", "soy-sauce", "broth", "wine", "salt", 'pork', "white-pepper"],
    image: '/images/xiaolongbao.jpg',
    time: "3 hours",
    difficulty: "Expert",
    ingredientsList: [
      { "pork": "225g, skin and 450g, neck bones" },
      { "green-onion": "1" },
      { "wine": "3, tablespoon shaoxing wine" },
      { "flour": "130g" },
      { "warm water": "90ml" },
      { "minced-meat": "450g, pork" },
      { "salt": "3/4, teaspoon" },
      { "sesame-oil": "1/2, teaspoon" },
      { "sugar": "3/4, teaspoon" },
      { "soy-sauce": "3, teaspoons" },
      { "water": "3, tablespoons" },
      { "white-pepper": "1/2, teaspoon, ground" },
      { "ginger": "1, tablespoon, minced, 2, slices and julliened (for dipping)" },
      { "black-vinegar": "For dipping" },
    ],
    steps: [
      "Aspic: In a small pot, add the pork skin(cut into 1-inch strips) and pork bones and cover with cold water. Bring to a rolling boil, then immediately drain and rinse off the bones and the skin. This gets rid of any impurities. Rinse out the pot and put everything back in. Add 4 cups (950 ml) of water along with the ginger, scallion (cut into 3 pieces), and wine. Bring the pot to a boil and then reduce the heat to low. Cover and simmer for 2 hours. After 2 hours, turn off the heat, allow the soup to cool, and strain the liquid into a bowl. Once completely cooled, cover and refrigerate overnight.",
      "Dough: In a mixing bowl, add the flour(all-purpose) and warm water 1 tablespoon at a time. Work and knead the dough for 15-20 minutes. The dough should be very soft and smooth. Cover with a cloth and let it rest for 30 minutes.",
      "Filling: Take your ground pork and put it in the food processor. Pulse for 30-60 seconds until the pork resembles paste. In a mixing bowl, add the pork and all the rest of the ingredients except the aspic. Whip everything together thoroughly for about 2 minutes. Gently fold in the diced aspic, and do not over-mix. Cover and transfer the filling to the refrigerator until ready to make the dumplings.",
      "Assembly: Lightly dust a clean surface with flour and divide the dough into small tablespoon-sized balls (roughly 18 grams each). Roll each ball into a small, thin circle (approximately 3-4 inches in diameter). Add about 1 tablespoon of filling to the center of the dough. Carefully fold and pleat the dough around the filling, pinching it closed at the top. Place each dumpling on a piece of parchment paper to avoid sticking.",
      "Steaming: Prepare a bamboo steamer lined with cabbage leaves or parchment paper. Place the dumplings in the steamer, making sure they are not touching. Steam over boiling water for 10 minutes until the dough becomes translucent.",
      "Serving Suggestions: Serve hot, accompanied by a dipping sauce of Chinese black vinegar and julienned ginger."
    ]
  },
  {
    "id": 4,
    "title": "Potato, Bacon and Caramelised Onion Dumplings (Vareniki)",
    "ingredients": ["flour", "egg", "water", "potatoes", "butter", "bacon", "onion", "salt", "pepper"],
    "image": "/images/cheeseDumplings.jpg",
    "time": "1 hour 40 minutes",
    "difficulty": "Moderate",
    "ingredientsList": [
      { "flour": "450g" },
      { "salt (for dough)": "1 teaspoon and to taste for filling" },
      { "egg": "1, large" },
      { "cold water": "250ml" },
      { "potatoes": "5, medium" },
      { "butter": "2 tablespoons" },
      { "bacon": "5 strips, 100g" },
      { "onion": "1, chopped" },
      { "pepper": "To taste" }
    ],
    "steps": [
      "Peel and boil the potatoes until fork-tender. While the potatoes are boiling, prepare the dough.",
      "In a food processor, pulse the flour and salt. With the motor running, add the egg and then slowly pour in the cold water until the dough forms. Transfer to a bowl, cover with a tea towel, and let it rest for 30 minutes.",
      "Meanwhile, prepare the filling. Fry the bacon and chop it. Cook the chopped onion in the bacon fat on low heat for 20 minutes until caramelized. Mash the potatoes, then mix them with butter, bacon, and onions. Season with salt and pepper.",
      "Divide the dough into quarters. Roll each piece out into a thin sheet (about 1/16 inch). Use a cookie cutter or glass to cut out 2-3 inch circles.",
      "Place a teaspoon of potato filling in each dough circle, fold into a half-moon shape, and pinch the edges together to seal.",
      "Boil a large pot of water with salt. Add the vareniki and stir to prevent sticking. Once they float to the top, drain and pan-fry them in butter until golden on both sides.",
      "Serve with sour cream, dill, and crispy fried onions or shallots. Leftover vareniki can be frozen and cooked from frozen later."
    ]
  },  
  {
    id: 5,
    title: "Korean Mandu",
    ingredients: ["minced-meat", "tofu", "ginger", "garlic", "soy-sauce", "sesame-oil", "green-onion", "salt", "pepper", "cabbage", "dumplings-wrappers"],
    image: '/images/mandu.jpg',
    time: "1.5 hours",
    difficulty: "Not too tricky",
    ingredientsList: [
      { "minced-meat": "250g, pork" },
      { "tofu": "200g" },
      { "ginger": "1, tablespoon, minced" },
      { "garlic": "2, cloves, minced" },
      { "soy-sauce": "2, tablespoons" },
      { "sesame-oil": "1, tablespoon" },
      { "green-onion": "2, finely chopped" },
      { "salt (for filling)": "1, teaspoon" },
      { "pepper": "1/2, teaspoon" },
      { "cabbage": "200g, finely chopped" },
      { "dumplings-wrappers": "1 package" }
    ],
    steps: [
      "Filling: In a large bowl, combine the ground pork, crumbled tofu, minced ginger, minced garlic, soy sauce, sesame oil, finely chopped green onions, salt, and black pepper. Mix well. Finely chop the cabbage, sprinkle with a little salt, let it sit for 10 minutes, and then squeeze out any excess water. Add the cabbage to the meat mixture and combine thoroughly.",
      "Assembly: Place a small spoonful of the filling in the center of each dumpling wrapper. Moisten the edges of the wrapper with water, fold it over the filling to form a half-moon shape, and press the edges to seal. Ensure no air is trapped inside.",
      "Cooking: Mandu can be steamed, boiled, pan-fried, or deep-fried. For steaming, place the mandu in a steamer and cook for about 10 minutes. For boiling, cook in boiling water for 5-7 minutes until they float. For pan-frying, heat oil in a skillet and cook the mandu until golden and crispy on both sides, then add a little water and cover to steam for a few minutes.",
      "Serving Suggestions: Serve hot with a dipping sauce made of soy sauce, vinegar, and a touch of sesame oil."
    ]
  },
  {
    id: 6,
    title: "Polish Pierogi with Meat Filling",
    ingredients: ["flour", "egg", "water", "salt", "minced-meat", "onion", "butter", "marjoram"],
    image: '/images/meatPierogi.jpg',
    time: "2.5 hours",
    difficulty: "Moderate",
    ingredientsList: [
      { "flour": "500g" },
      { "egg": "1" },
      { "warm water": "250ml" },
      { "salt": "1/2 teaspoon (for dough and same for filling)" },
      { "minced-meat": "500g, pork and beef" },
      { "onion": "1, large" },
      { "butter": "2 tablespoons" },
      { "pepper": "1/2 teaspoon" },
      { "marjoram": "1 teaspoon" }
    ],
    steps: [
      "Dough: Sift the flour into a large bowl, add the egg, salt, and warm water. Mix until the dough starts to come together. Knead the dough on a floured surface for about 10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rest for 30 minutes.",
      "Filling: In a skillet, melt the butter and sauté the finely chopped onion until golden. In a large bowl, combine the minced beef and pork, sautéed onion, salt, black pepper, and marjoram. Mix thoroughly until well combined.",
      "Assembly: Roll out the dough on a floured surface to a thickness of about 2-3mm. Use a round cutter or glass to cut out circles of dough. Place a spoonful of filling in the center of each circle. Fold the dough over the filling to form a semi-circle and press the edges together to seal.",
      "Cooking: Bring a large pot of salted water to a boil. Add the pierogi in batches and cook for 3-4 minutes after they float to the surface. Remove with a slotted spoon and transfer to a serving dish.",
      "Serving Suggestions: Serve hot, topped with sautéed onions and a dollop of sour cream."
    ]
  },
  {
    id: 7,
    title: "Classic Russian Pelmeni",
    ingredients: ["minced-meat", "onion", "garlic", "salt", "pepper", "flour", "water", "egg"],
    image: '/images/pielmieni.jpg',
    time: "2 hours",
    difficulty: "Moderate",
    ingredientsList: [
      { "flour": "500g" },
      { "egg": "1" },
      { "water": "200ml" },
      { "salt": "1/2 teaspoon (for dough) and 1 teaspoon (for filling)" },
      { "minced-meat": "500g, pork and beef" },
      { "onion": "1, small, finely chopped" },
      { "garlic": "1, clove, minced" },
      { "pepper": "1/2 teaspoon" }
    ],
    steps: [
      "Dough: Sift the flour into a large bowl. Add the egg, water, and salt. Mix until the dough starts to come together. Knead the dough on a floured surface for about 10 minutes until smooth and elastic. Cover the dough with a damp cloth and let it rest for 30 minutes.",
      "Filling: In a large bowl, combine the minced beef, minced pork, finely chopped onion, minced garlic, salt, and black pepper. Mix thoroughly until well combined.",
      "Assembly: Roll out the dough on a floured surface to a thickness of about 2-3mm. Use a round cutter or glass to cut out circles of dough. Place a spoonful of filling in the center of each circle. Fold the dough over the filling to form a semi-circle and press the edges together to seal.",
      "Cooking: Bring a large pot of salted water to a boil. Add the pelmeni in batches and cook for 3-4 minutes after they float to the surface. Remove with a slotted spoon and transfer to a serving dish.",
      "Serving Suggestions: Serve hot, topped with butter and a dollop of sour cream."
    ]
  },
  {
    id: 8,
    title: "Gyoza",
    ingredients: ["minced-meat", "cabbage", "ginger", "garlic", "soy-sauce", "sesame-oil", "green-onion", "salt", "pepper", "dumplings-wrappers"],
    image: '/images/gyoza.jpg',
    time: "1.5 hours",
    difficulty: "Easy",
    ingredientsList: [
      { "minced-meat": "250g, pork" },
      { "cabbage": "200g, finely chopped" },
      { "ginger": "1 tablespoon, minced" },
      { "garlic": "2 cloves, minced" },
      { "soy-sauce": "2 tablespoons" },
      { "sesame-oil": "1 tablespoon" },
      { "green-onion": "2, finely chopped" },
      { "salt": "1 teaspoon" },
      { "pepper": "1/2 teaspoon" },
      { "dumplings-wrappers": "1 package" }
    ],
    steps: [
      "Filling: In a large bowl, combine the ground pork, finely chopped cabbage, minced ginger, minced garlic, soy sauce, sesame oil, finely chopped green onions, salt, and black pepper. Mix well until all the ingredients are thoroughly combined.",
      "Assembly: Place a small spoonful of the filling in the center of each dumpling wrapper. Moisten the edges of the wrapper with water, fold it over the filling to form a half-moon shape, and press the edges to seal. Ensure no air is trapped inside.",
      "Cooking: Heat a non-stick skillet over medium-high heat and add a small amount of oil. Place the dumplings in the skillet and cook until the bottoms are golden brown and crispy. Add a small amount of water to the skillet and cover with a lid. Steam the dumplings for 5-7 minutes until the filling is cooked through.",
      "Serving Suggestions: Serve hot with a dipping sauce made of soy sauce, vinegar, and a touch of sesame oil."
    ],
  },
  {
    id: 9,
    title: 'Koloduny with Beef Filling',
    ingredients: ['flour', 'egg', 'butter', "minced-meat", 'garlic', 'onion', 'marjoram', 'salt', 'pepper'],
    image: '/images/koloduny.jpg',
    time: '2 hours',
    difficulty: 'Moderate',
    ingredientsList: [
      { 'flour': '320g (2 cups)' },
      { 'hot water': '140ml (a little over half a cup)' },
      { 'egg': '1, small' },
      { 'butter': '10g (1 tablespoon)' },
      { 'salt': '1/2 teaspoon (for filling) and a pinch (for dough)' },
      { "minced-meat": '350g, beef (shoulder or similar cut)' },
      { 'onion': '1, medium (about 150g)' },
      { 'garlic': '4, cloves' },
      { 'marjoram': '1, tablespoon' },
      { 'salt (for filling)': '1/2 teaspoon' },
      { 'pepper': '1/4 teaspoon' }
    ],
    steps: [
      'Dough: Sift the flour into a bowl, add a pinch of salt. In a separate cup, mix hot water with butter until it melts. Let the water cool slightly, then pour into the flour. Add the egg and mix the dough until it comes together. Knead the dough on a floured surface for about 8-10 minutes, until smooth and elastic. Cover and let it rest for 30 minutes.',
      'Filling: Chop the onion and garlic finely. Heat some oil or lard in a pan, and sauté the onion and garlic until translucent. Let it cool. Mix the minced beef with the sautéed onion, garlic, marjoram, salt, and pepper. Knead the filling by hand until the ingredients are well combined.',
      'Shaping: Roll out the dough thinly and use a round cutter (about 6 cm in diameter) to cut circles. Place a teaspoon of filling in the center of each dough circle. Fold the dough in half and seal the edges, creating a dumpling shape. You can make simple pierogi shapes or use a fancy crimped edge.',
      'Cooking: Bring a large pot of salted water to a boil. Add the dumplings in batches, ensuring they do not crowd the pot. Cook for about 5 minutes after they float to the surface, making sure the meat inside is cooked through.',
      'Serving Suggestions: Serve hot, either in a broth like beef or chicken soup, or drizzle with melted butter and sprinkle with marjoram and black pepper.'
    ],
  },
  {
    id: 10,
    title: 'Siu Mai (Pork and Prawn Dumplings)',
    ingredients: ['minced-meat', 'shrimps', 'mushroom', 'green-onion', 'dumplings-wrappers', 'soy-sauce', 'wine', 'salt', 'sugar'],
    image: '/images/siuMai.jpg',
    time: '1 hour',
    difficulty: 'Easy',
    ingredientsList: [
      { 'mushroom': '3 dried shitake pieces, soaked in boiling water, finely chopped' },
      { 'minced-meat': '350g, pork, fatty' },
      { 'salt': '3/4 tsp' },
      { 'sugar': '2.5 tsp' },
      { 'soy-sauce': '1 tsp' },
      { 'wine': '1.5 tbsp (Shaoxing wines or ubstitute Mirin or dry sherry)' },
      { 'shrimps': '150g (5oz), peeled, deveined, and chopped (0.5 cm pieces)' },
      { 'green-onion': '2 tbsp (white part, finely minced)' },
      { 'dumplings-wrappers': '20 - 25 pieces (8cm/3.5" squares or rounds)' }
    ],
    steps: [
      'Filling: In a large mixing bowl, combine the pork mince, salt, soy sauce, cooking wine, and sugar. Mix vigorously until the mixture becomes pasty, about 30 seconds. Add the chopped shiitake mushrooms, prawns, and green onions, and mix until well combined, without crushing the prawns.',
      'Shaping Siu Mai: Form a circle with your thumb and forefinger. Place a wonton wrapper over the circle and push 1 heaped teaspoon of filling into the hole, smoothing the top. Press the base of the dumpling on a work surface to flatten it, then shape it into a round with your fingers.',
      'Steaming: Line a bamboo steamer (or any steamer) with perforated baking paper. Fill a wok with water and bring it to a simmer. Place the dumplings in the steamer, cover, and steam for about 8 minutes or until the internal temperature of the dumplings reaches 75°C/165°F. If the dumplings are larger, they may require more time to cook through.',
      'Serving: Garnish each dumpling with a small spoonful of flying fish roe, and serve immediately with dipping sauces like soy sauce, Chinese black vinegar, and chilli paste.'
    ]
  },
  {
    id: 11,
    title: 'Mexican Tamales',
    ingredients: ['pork', 'chiles', 'masa-harina', 'corn-husks', 'garlic', 'cumin', 'salt', 'vegetable-oil', 'bay-leaf', 'vegetable-oil', 'broth'],
    image: '/images/tamales.jpg',
    time: '5 hours 30 minutes',
    difficulty: 'Challenging',
    ingredientsList: [
      { 'pork': '2.5 pounds, boneless shoulder, cut into large chunks' },
      { 'chiles': '3 ounces, stemmed and seeded of guajillo and same of ancho' },
      { 'garlic': '1.5, teaspoons, powder' },
      { 'salt': '3, teaspoons, divided' },
      { 'cumin': '3/4, teaspoon, grounded' },
      { 'olive-oil': '2 tablespoons' },
      { 'bay-leaf': '1' },
      { 'masa harina': '8.25 cups' },
      { 'fine salt': '1.75 tablespoons' },
      { 'baking powder': '1 tablespoon' },
      { 'vegetable-oil': '1.75 cups' },
      { 'broth': '7 cups (chicken, beef, or vegetable)' },
      { 'corn husks': '50, soaked in hot water' }
    ],
    steps: [
      'Prepare the corn husks: Soak the corn husks in hot water for at least 1 hour to soften them while preparing the filling and masa.',
      'Make the chile sauce: Boil guajillo and ancho chiles in a pot until softened. Transfer them to a blender along with garlic powder, 1.5 teaspoons of salt, cumin, and water. Blend until smooth and strain if necessary.',
      'Cook the pork: Heat oil in a pot and brown the pork shoulder chunks. Add the chile sauce and a bay leaf. Cover and simmer on low heat for 2.5 hours until the meat is tender and falls apart easily.',
      'Prepare the masa dough: In a large bowl, mix masa harina, salt, and baking powder. Add canola oil and mix until crumbly. Slowly pour in the broth and mix until the dough is soft and spreadable, like thick hummus.',
      'Assemble the tamales: Spread a thin layer of masa on the smooth side of each corn husk, leaving the top 1/3 of the husk empty. Add a small amount of the pork filling in the center, then fold the husk closed and fold up the bottom edge.',
      'Steam the tamales: Arrange the tamales upright in a steamer with the open ends facing up. Steam for about 2.5 hours, or until the masa easily pulls away from the husk.',
      'Serve: Let the tamales cool for about 10 minutes before serving to allow them to firm up.'
    ]
  },
  {
    id: 12,
    title: "Turkish Manti Dumplings",
    ingredients: ["flour", "egg", "minced-meat", "onion", "parsley", "garlic", "yoghurt", "butter", "olive-oil", 'chilli-flakes', "mint"],
    image: '/images/smallDumplings.jpg',
    time: "2.5 hours",
    difficulty: "Moderate",
    ingredientsList: [
      { "all-purpose flour": "300g (about 2.5 cups)" },
      { "egg": "1 large" },
      { "water": "100ml (about 1/2 cup)" },
      { "salt (for dough)": "1/2 teaspoon" },
      { "minced-meat": "250g, lamb/beef" },
      { "onion": "1 small, finely chopped" },
      { "parsley": "2 tablespoons, chopped" },
      { "pepper": "1/4 teaspoon" },
      { "salt (for filling)": "1/2 teaspoon" },
      { "yoghurt": "200g (about 1 cup)" },
      { "garlic": "2 cloves, mashed" },
      { "butter": "2 tablespoons" },
      { "olive-oil": "1 tablespoon" },
      { "chilli-flakes": "1 teaspoon" },
      { "mint": "1 teaspoon" }
    ],
    steps: [
      "Dough: In a large bowl, combine the flour, egg, water, and salt. Mix until the dough comes together, then knead it on a floured surface for 8-10 minutes until smooth. Cover with a damp towel and let it rest for 30 minutes.",
      "Filling: In another bowl, mix ground lamb, chopped onion, parsley, salt, and black pepper. Optionally, you can add a bit of tomato paste for extra flavor.",
      "Rolling and Shaping: Roll the dough out to about 2mm thickness. Cut it into small squares (about 2.5cm each). Place a small amount of filling in the center of each square, then fold and seal the edges by pinching them together to form tiny dumpling bundles.",
      "Cooking: Boil a large pot of salted water. Add the manti dumplings in batches, cooking for about 10 minutes until tender. You can also boil them in chicken or beef broth for enhanced flavor.",
      "Yogurt Sauce: In a bowl, mix yogurt with mashed garlic and a pinch of salt. If the yogurt is too thick, add a little water to thin it out.",
      "Butter Sauce: In a small pan, melt the butter with olive oil. Add red pepper flakes and dried mint. Stir for about 20-30 seconds, then remove from heat.",
      "Serving: Place the cooked dumplings in bowls. Pour yogurt sauce over them, then drizzle with the spiced butter sauce. Optionally, sprinkle some sumac or extra red pepper flakes before serving."
    ],
},
{
  id: 13,
  title: "Mongolian Meat Pockets (Khuushuur)",
  ingredients: ["minced-meat", "onion", "garlic", "flour", "pepper", "salt", "water"],
  image: '/images/friedDumplings.jpg',
  time: "30 minutes",
  difficulty: "Easy",
  ingredientsList: [
    { "minced-meat": "450g" },
    { "onion": "1 medium, minced" },
    { "garlic": "1 clove, minced" },
    { "salt": "1 teaspoon" },
    { "pepper": "1/4 teaspoon" },
    { "flour": "360g (3 cups)" },
    { "water": "470ml (about 2 cups, adjust as needed)" }
  ],
  steps: [
    "Filling: In a large bowl, combine ground beef, minced onion, garlic, salt, and black pepper. Mix until evenly combined and set aside.",
    "Dough: In a separate bowl, add the flour. Gradually pour in water while mixing by hand until the dough comes together and is smooth yet slightly sticky. Adjust water as needed to get the right consistency.",
    "Shaping: Divide the dough into four portions. Roll one portion into a thick rope and cut it into 5cm (2-inch) pieces. Flatten each piece into a small circle.",
    "Assembly: Place a tablespoon of the meat filling in the center of each dough circle. Fold the dough over the filling and seal the edges using a bit of water, pressing firmly to ensure they are closed.",
    "Cooking: Heat oil in a frying pan over medium heat. Fry the Khuushuur on both sides until golden brown and the meat is fully cooked inside, about 5-7 minutes per side.",
    "Serving: Serve hot, optionally with dipping sauces like soy sauce or a yogurt-based dip."
  ]
},
{
  id: 14,
  title: "Culurgiones",
  ingredients: ["potatoes", "pecorino", "mint", "flour", "semolina", "passata", "olive-oil", "garlic", "basil", 'pepper'],
  image: '/images/dumplingsy.jpg',
  time: "1.5 hours",
  difficulty: "Moderate",
  ingredientsList: [
    { "potatoes": "500g" },
    { "olive-oil": "3 tbsp (for filling), 2 tbsp (for sauce)" },
    { "garlic": "2 cloves, peeled and crushed (1 for filling, 1 for sauce)" },
    { "Pecorino Sardo": "70g, grated" },
    { "mint": "8, leafs, finely chopped" },
    { "fine sea salt": "to taste" },
    { "pepper": "to taste" },
    { "flour": "150g" },
    { "semolina flour": "100g" },
    { "water": "145g" },
    { "passata": "300g" },
    { "basil leaves": "to garnish" }
  ],
  steps: [
    "Filling: Place the potatoes in a large pan, cover with cold water, and bring to a boil. Cook until tender. Drain, peel, and mash the potatoes while still hot.",
    "Infuse the oil with garlic by heating it briefly, then discard the garlic. Mix the infused oil with the mashed potatoes, adding grated Pecorino, mint, salt, and pepper. Cover and refrigerate for at least 1 hour.",
    "Dough: Combine plain flour, semolina, and a pinch of salt in a bowl. Add water and olive oil. Knead until smooth and elastic, then wrap the dough in cling film and let it rest for 30 minutes.",
    "Sauce: In a saucepan, heat olive oil and garlic, then add passata and 60ml of water. Cover and simmer for 30 minutes, stirring occasionally. Season to taste.",
    "Shaping: Roll out the dough on a floured surface to about 1mm thickness and cut out 8cm rounds. Place a small amount of filling in the center of each round, then fold and pinch the edges to seal, creating a braid-like pattern.",
    "Cooking: Boil the culurgiones in salted water for 4 minutes (or 2 minutes after they float). Drain and serve on a bed of tomato sauce, garnished with torn basil leaves."
  ]
},
{
  id: 15,
  title: "Authentic German Maultaschen",
  ingredients: ["dumplings-wrappers", "minced-meat","marjoram", "spinach", "breadcrumbs", "onion", "garlic", "parsley", "egg", "crusty white bread", "milk", "spices", "butter", 'ginger', 'nutmeg', 'coriander-seeds', 'cardamon'],
  image: '/images/squareDumplings.jpg',
  time: "1 hour 30 minutes",
  difficulty: "Challenging",
  ingredientsList: [
    { "dumplings-wrappers": "1 1/2 pounds" },
    { "minced-meat": "500g, pork and beef" },
    { "salt": "1 1/4 tsp" },
    { "white-pepper": "1/2 tsp" },
    { "black-pepper": "1/4 tsp" },
    { "nutmeg": "1/3, tsp, grounded" },
    { "ginger": "1/3, tsp, grounded" },
    { "marjoram": "1/3 tsp" },
    { "mustard powder": "1/4 tsp" },
    { "cardamom": "1/8 tsp, grounded" },
    { "coriander-seeds": "1/8 tsp, grounded" },
    { "non-fat milk powder": "1 1/2 tbsp" },
    { "parsley": "1/2 cup (finely chopped)" },
    { "butter": "1 tbsp" },
    { "onion": "1, medium (finely chopped)" },
    { "garlic": "1, clove (minced)" },
    { "spinach": "200g" },
    { "egg": "2 large" },
    { "crusty white bread (slightly stale)": "8 ounces" },
    { "milk (for softening bread)": "few tbsp" }
  ],
  steps: [
    "Meat Mixture: In a stand mixer, mix ground pork, beef, spices, and milk powder. Add about 1/2 cup of crushed ice to keep the mixture cold. Mix until emulsified. Set aside.",
    "Spinach: Boil spinach for 1-2 minutes, drain, rinse with cold water, and finely chop.",
    "Onion and Garlic: Sauté onion in butter for 5-7 minutes until soft, then add garlic and parsley. Cook for another minute, then let cool.",
    "Combine: In a large bowl, mix the meat mixture, sautéed onion/garlic, spinach, softened breadcrumbs, spices, and eggs until well combined.",
    "Pasta Dough: Use prepared pasta sheets or wonton wrappers. Place a spoonful of filling on each square, brush edges with egg, and seal with another square.",
    "Cooking: Boil Maultaschen in salted water at a low simmer for 10-15 minutes. Remove with a slotted spoon and drain.",
    "Serving: Traditionally served in broth as a soup, or explore other serving options from the recipe blog."
  ]
},
{
  id: 16,
  title: "Veg Momos Recipe | Momos Ki Recipe - Street Style",
  ingredients: ["flour", "garlic", "ginger", "green-chilli", "green-onion", "carrot", "cabbage", "pepper", "salt", "vegetable-oil"],
  image: '/images/momo.jpg',
  time: "35 minutes",
  difficulty: "Easy",
  ingredientsList: [
    { "flour": "1½ cup" },
    { "salt": "½ tsp" },
    { "water (for kneading)": "as required" },
    { "vegetable-oil": "3 tsp" },
    { "garlic": "3 cloves (finely chopped)" },
    { "ginger": "1 inch (finely chopped)" },
    { "green-chilli": "2(finely chopped)" },
    { "green-onion": "4 tbsp" },
    { "carrot": "1 cup (grated)" },
    { "cabbage": "2 cups (shredded)" },
    { "pepper": "½ tsp" },
    { "salt": "½ tsp" }
  ],
  steps: [
    "Stuffing: Heat 3 tsp of oil and sauté garlic, ginger, and chilli.",
    "Add 2 tbsp of spring onion and sauté on high flame.",
    "Add carrot and cabbage, stir-fry on high flame.",
    "Season with pepper and salt. Add the remaining spring onion and mix well. Stuffing is ready.",
    "Dough: Pinch a small ball-sized portion of dough, dust with some flour, and roll it into a medium-thin circle (4-5 inches in diameter).",
    "Place 1 tbsp of stuffing in the center and start pleating the edges. Gather and seal to form a bundle.",
    "Steaming: Heat a steamer and place the momos in the tray without touching each other.",
    "Steam for 10-12 minutes until a shiny sheen appears. Serve hot with momos chutney."
  ]
},
{
  id: 17,
  title: "Har Gow (Dim Sum Shrimp Dumplings)",
  ingredients: ["shrimp", "oyster sauce", "vegetable-oil", "white-pepper", "sesame-oil", "salt", "sugar", "ginger", "bamboo shoots", "wheat starch", "cornstarch", "lard"],
  image: '/images/harGow1.jpg',
  time: "1 hour 20 minutes",
  difficulty: "Moderate",
  ingredientsList: [
    { "shrimp": "250g, (raw, peeled, de-veined)" },
    { "oyster sauce": "1 tsp" },
    { "vegetable-oil": "1 tbsp" },
    { "white-pepper": "1/4 tsp" },
    { "sesame-oil": "1 tsp" },
    { "salt": "1/4 tsp" },
    { "sugar": "1 tsp" },
    { "ginger": "1/2 tsp (minced)" },
    { "bamboo shoots (finely chopped)": "1/4 cup" },
    { "wheat starch": "1 cup" },
    { "cornstarch (or tapioca starch)": "1/2 cup" },
    { "boiling water": "1 1/4 cups" },
    { "lard": "3 tsp" }
  ],
  steps: [
    "Filling: Mix all ingredients (except bamboo shoots) in a bowl and whip the mixture in one direction for a few minutes until sticky. Add the bamboo shoots and mix well. Refrigerate the filling while preparing the dough.",
    "Dough: Mix wheat starch and cornstarch in a bowl. Slowly add boiling water while stirring rapidly. Add lard (or oil) and knead into a smooth dough ball. Roll the dough into a long cylinder and divide into 18 pieces. Cover with a damp paper towel.",
    "Assembly: Pre-boil water in the steamer. Roll each dough piece into a 3-inch circle, add a spoonful of filling, and fold the dumpling.",
    "Steaming: Steam dumplings for 6 minutes on high heat, ensuring enough space for expansion. Serve hot."
  ]
},
{
  id: 18,
  title: "Kroppkakor (Swedish Dumplings)",
  ingredients: ["potatoes", "flour", "egg yolks", "butter", "sea salt", "mushrooms", "shallots", "garlic", "thyme", "allspice", "bacon", "lingonberries", "hazelnut", "cavolo nero"],
  image: '/images/pierogi.jpg',
  time: "1 hour 32 minutes",
  difficulty: "Moderate",
  ingredientsList: [
    { "potatoes": "700g" },
    { "flour": "60g" },
    { "potato flour (if GF)": "70g" },
    { "egg yolks (free-range, large)": "3" },
    { "butter": "70g" },
    { "salt": "1 1/2 tsp" },
    { "lingonberries": "75g (frozen, defrosted)" },
    { "sugar": "2 tsp" },
    { "mushrooms": "250g, wild, optional" },
    { "cavolo nero (stalk removed, roughly chopped)": "180g" },
    { "hazelnut": "3 tbsp (toasted, roughly chopped)" }
  ],
  steps: [
    "Kroppkakor: Peel the potatoes, cut them into pieces, and boil in salted water until cooked. Drain and steam to remove moisture. Pass through a ricer and add butter. Once cooled, mix in egg yolks, flour, and salt. Chill while preparing the filling.",
    "Mushroom Filling: Fry shallots in butter until soft. Add garlic, mushrooms, thyme, and allspice. Cook until dry and season with salt and pepper. Set aside to cool.",
    "Bacon Filling: Fry shallots and thyme in butter, then add allspice and bacon. Cook until golden. Set aside.",
    "Form Dumplings: Divide dough into 12 balls. Flatten each into a disc, add filling, and shape into a ball. Boil in salted water for 5-6 minutes until they rise to the surface.",
    "Finishing Touches: Fry dumplings in butter until golden. Serve with lingonberries mixed with sugar, cavolo nero, wild mushrooms, and brown butter. Garnish with toasted hazelnuts."
  ]
},
{
  "id": 19,
  "title": "Uzbek Samsa with Beef Filling",
  "ingredients": ["flour", "yeast", "milk", "butter", "minced-meat", "onion", "cumin", "coriander-seeds"],
  "image": "/images/uzbek.jpg",
  "time": "1 hour 30 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "flour": "150g" },
    { "dry yeast": "1/2 teaspoon" },
    { "salt (for dough)": "pinch" },
    { "warm milk": "80ml" },
    { "ghee or melted butter": "30g" },
    { "minced-meat": "200g, beef" },
    { "onion": "1, finely chopped" },
    { "salt (for filling)": "1 teaspoon" },
    { "pepper": "1/2 teaspoon" },
    { "cumin": "1 teaspoon, grounded" },
    { "coriander-seeds": "1 teaspoon, grounded" },
    { "egg": "1, whisked" },
    { "black sesame seeds": "for garnish" }
  ],
  "steps": [
    "Dough: In a large bowl, mix flour, yeast, salt, and warm milk. Knead for 5 minutes until smooth, cover, and let rest for 20 minutes in a warm place.",
    "Shaping Dough: Roll out the dough into a thin sheet and brush with melted ghee or butter. Roll the dough into a long cylinder and cut into 1-inch pieces. Press each piece flat and roll out to about 4mm thickness.",
    "Filling: In a bowl, combine minced beef, finely chopped onion, salt, pepper, cumin, and coriander. Mix well.",
    "Assembly: Place a spoonful of filling in the center of each dough circle. Fold the edges to create a triangular shape, sealing well with egg wash. Repeat with remaining dough and filling.",
    "Baking: Preheat the oven to 190°C (170°C fan). Brush each samsa with more egg and sprinkle with black sesame seeds. Bake for 15 minutes or until golden brown.",
    "Serving: Serve hot with a side of yoghurt mixed with harissa paste for dipping."
  ]
},
  {
    "id": 20,
    "title": "Fresh Homemade Ravioli with Cheese Filling",
    "ingredients": ["flour", "eggs", "ricotta", "mascarpone", "basil", "Parmesan", "olive oil"],
    "image": "/images/ravioli.jpg",
    "time": "2 hours 5 minutes",
    "difficulty": "Moderate",
    "ingredientsList": [
      { "Tipo 00 flour": "300g" },
      { "large eggs": "3" },
      { "egg yolk": "1" },
      { "olive oil": "10g (optional)" },
      { "semolina flour": "for dusting" },
      { "whole milk ricotta": "100g, drained" },
      { "mascarpone cheese": "100g" },
      { "fresh basil leaves": "10g, chopped" },
      { "freshly grated Parmesan cheese": "30g" },
      { "egg": "1, for the filling" },
      { "salt": "to taste" },
      { "black pepper": "to taste" }
    ],
    "steps": [
      "Prepare the Pasta Dough: In a food processor, combine flour, eggs, and olive oil. Process until a dough forms, then knead by hand until smooth. Cover and let rest for 30 minutes to 1 hour.",
      "Make the Filling: Mix drained ricotta, mascarpone, chopped basil, Parmesan, and an egg. Season with salt and pepper. Chill until ready to use.",
      "Roll Out the Dough: Divide the dough into four pieces. Roll each piece into thin sheets using a pasta machine or rolling pin, dusting with semolina flour to prevent sticking.",
      "Assemble the Ravioli: Place small spoonfuls of filling onto one pasta sheet, spaced evenly. Cover with another sheet of pasta, press around the filling to seal, and cut into squares. Place on a semolina-dusted sheet pan.",
      "Cook the Ravioli: Boil in salted water for about 3-4 minutes, or until they float and are cooked through. Drain and serve with your choice of sauce."
    ]
  },  
  {
    "id": 21,
    "title": "Homemade Cheese Tortellini",
    "ingredients": ["flour", "eggs", "salt", "olive oil", "ricotta", "Parmesan cheese", "spinach", "dried basil", "black pepper", "nutmeg"],
    "image": "/images/smallDumplings.jpg",
    "time": "1 hour 37 minutes",
    "difficulty": "Moderate",
    "ingredientsList": [
      { "flour": "3 1/3 cups" },
      { "eggs": "4, large" },
      { "salt": "1/4 teaspoon" },
      { "olive oil": "1/4 cup" },
      { "fresh ricotta": "8 ounces" },
      { "extra large egg": "1" },
      { "Parmesan cheese": "1/2 cup, freshly grated" },
      { "fresh spinach": "2 tablespoons, chopped" },
      { "dried basil": "1/2 teaspoon" },
      { "black pepper": "1/8 teaspoon, freshly ground" },
      { "nutmeg": "a small pinch" }
    ],
    "steps": [
      "Prepare the Dough: On a clean surface, make a mound of flour with a well in the center. Add the eggs, salt, and olive oil into the well. Use a fork to beat the eggs and gradually incorporate the flour from the sides of the mound. Add 1/3 to 1/2 cup water as needed to bring the dough together. Knead for about 3 minutes until smooth, then wrap in plastic wrap and refrigerate for 30 minutes.",
      "Prepare the Filling: In a mixing bowl, combine the ricotta, extra egg, Parmesan cheese, chopped spinach, dried basil, black pepper, and nutmeg. Mix well and set aside.",
      "Roll Out the Dough: Dust your work surface with flour. Divide the dough into four pieces, keeping the unused portions covered. Flatten one piece into a small rectangle and roll out using a pasta machine or rolling pin. For pasta machines, start on the widest setting and gradually reduce until the dough is thin but not translucent. For a rolling pin, roll the dough as thin as possible without tearing.",
      "Shape the Tortellini: Use a 2-inch round cutter to cut circles from the rolled dough. Brush half of the edges of each circle with egg wash. Place a small amount of filling in the center of each circle. Fold the circle over to form a half-moon and press the edges to seal. Bring the ends around and pinch together to form a tortellini shape.",
      "Freeze or Cook: Spread the formed tortellini on a parchment-lined baking sheet and freeze in a single layer for 1 hour. Once frozen, transfer to a freezer bag or container. To cook, boil in salted water until they float, about 5-7 minutes. Serve with your favorite sauce."
    ]
  }, 
  {
    "id": 22,
    "title": "Chinese Jiaozi with Pork and Chive Filling",
    "ingredients": ["flour", "water", "salt", "minced-meat", "chive", "cooking wine", "white pepper", "soy-sauce", "oyster sauce", "ginger", "eggs", "sesame oil", "scallion", "hot oil", "vinegar", "ginger shreds"],
    "image": "/images/jaozi.jpg",
    "time": "1 hour 30 minutes",
    "difficulty": "Moderate",
    "ingredientsList": [
      { "flour": "300 g" },
      { "water": "155 ml, room temperature or hot" },
      { "salt": "2 g" },
      { "minced-meat": "400 g, pork at least 20% fat" },
      { "chive": "200 g, hard ends removed" },
      { "salt (for filling)": "1 tsp" },
      { "cooking wine": "1 tbsp" },
      { "white-pepper": "1/2 tsp" },
      { "soy-sauce": "1 tbsp, light" },
      { "oyster sauce": "1 tbsp" },
      { "ginger": "1 tbsp, minced" },
      { "eggs": "2 large" },
      { "sesame oil": "3 tbsp, divided" },
      { "chopped green-onion": "1/3 cup" },
      { "vegetable-oil": "2 tbsp" },
      { "vinegar": "2 tbsp" },
      { "ginger shreds": "3-4 pieces" }
    ],
    "steps": [
      "Prepare the Wrappers: Mix a small pinch of salt into the flour, then create a well in the center. Gradually stir in water, mixing with chopsticks or a spoon to combine. Knead the dough for 8-10 minutes until almost smooth. Cover and rest for 15 minutes, then knead again for 2-3 minutes. Let the dough rest for 1 hour.",
      "Shape the Dough: Divide the dough into two halves and roll each into a log about 3 cm in diameter. Cut the log into small pieces (approximately 10 g each). Dust each piece with flour, then flatten and roll out into 10 cm diameter circles.",
      "Prepare the Filling: In a bowl, combine ground pork, a pinch of salt, eggs, soy sauce, white pepper, oyster sauce, minced ginger, and a small pinch of salt. Place chopped green onion on top and drizzle with hot oil to enhance the aroma. Mix the filling until it becomes a sticky paste. Let it rest for 1 hour or cover and refrigerate overnight.",
      "Assemble the Dumplings: Place a small spoonful of filling in the center of each dough circle. Fold the dough over the filling to create a half-moon shape, sealing the edges by pinching them together. Pleat the edges to ensure they are tightly sealed.",
      "Cook the Dumplings: For pan-fried dumplings, heat 1 tablespoon of oil in a non-stick pan over medium heat. Add dumplings, pleat side up, and cook until the bottom is browned. Add 1/2 cup of water to the pan, cover, and steam until water evaporates and the bottoms are crispy. For boiled dumplings, cook in boiling salted water in batches until they float to the surface and are cooked through.",
      "Prepare the Dipping Sauce: Combine vinegar and ginger shreds in a small bowl.",
      "Serve: Enjoy the dumplings hot with the prepared dipping sauce."
    ]
  },  
  {
    "id": 23,
    "title": "Austrian Apricot Dumplings",
    "ingredients": ["butter", "sugar", "vanilla", "salt", "quark", "eggs", "flour", "apricots"],
    "image": "/images/knedle.jpg",
    "time": "2 hours",
    "difficulty": "Moderate",
    "ingredientsList": [
        { "butter": "120g, softened" },
        { "sugar": "2 tablespoons, granulated" },
        { "vanilla extract": "1 teaspoon" },
        { "salt": "A pinch" },
        { "quark": "450g, full-fat or semi-fat, chilled and finely ground" },
        { "eggs": "2, large and cold" },
        { "flour": "260g, all-purpose" },
        { "apricots": "16, small and pitted" },
        { "extra sugar": "1/2 teaspoon, for each apricot" }
    ],
    "steps": [
        "In a mixing bowl, cream together the butter, sugar, vanilla, and salt until smooth. Add the chilled quark and eggs, blending until just combined (avoid overmixing). Gradually fold in the flour, then briefly knead the dough by hand until it comes together.",
        "Flatten the dough into a disk, wrap it in plastic wrap, and chill in the refrigerator for about 2 hours. (The dough can also be stored for up to 2 days).",
        "After chilling, divide the dough into 16 equal portions. Take one portion and flatten it in your palm. Place a pitted apricot in the center, filling it with about half a teaspoon of sugar. Wrap the dough around the apricot, sealing it well, and shape it into a ball. Repeat with the remaining dough and apricots.",
        "Bring a large pot of lightly salted water to a boil. Carefully add the dumplings and simmer for about 7 minutes, counting from the moment they float to the surface.",
        "For the topping, melt 60g of butter in a pan, then add 110g of breadcrumbs. Cook until golden brown. Stir in 3 tablespoons of sugar and 1 teaspoon of cinnamon. Roll the warm dumplings in this mixture until fully coated.",
        "Serve immediately and enjoy!"
    ]
},
{
  "id": 24,
  "title": "Pupusas",
  "ingredients": ["cabbage", "carrot", "oregano", "apple-cider-vinegar", "masa-harina", "mozzarella", "jalapeno", "butternut-squash"],
  "image": "/images/pupusas.jpg",
  "time": "1 hour 15 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "cabbage": "1/2 head, shredded (about 2 cups)" },
    { "carrot": "1, medium, grated" },
    { "oregano": "1, tablespoon, dried (Mexican or Italian)" },
    { "hot water": "1 cup" },
    { "apple cider vinegar": "1 cup" },
    { "salt (for curtido)": "1, teaspoon, kosher" },
    { "sugar": "1, teaspoon" },
    { "masa harina": "3 cups (334g)" },
    { "salt (for dough)": "2, teaspoons, kosher" },
    { "cold water": "2 3/4 cups" },
    { "mozzarella": "2 cups, shredded (or Oaxacan cheese)" },
    { "jalapeno": "1/2 cup, pickled and diced" },
    { "butternut squash": "1/2 cup, roasted and diced" },
    { "water (for hands)": "1 cup" },
    { "oil (for hands)": "2, tablespoons, olive or neutral" }
  ],
  "steps": [
    "Curtido: In a bowl, mix shredded cabbage, grated carrots, and dried oregano. In a separate container, combine hot water, apple cider vinegar, salt, and sugar. Pour the vinegar mixture over the vegetables and mix. Let it cool to room temperature, cover with plastic wrap, and refrigerate for at least 4 hours or overnight.",
    "Dough: In a medium bowl, whisk together masa harina and salt. Gradually add cold water while mixing with a spatula. Once combined, knead the dough with your hands until it becomes soft and smooth. Use an ice cream scoop or your hands to form small dough balls.",
    "Assemble Pupusas: In a small bowl, mix water and oil to grease your hands. Flatten each dough ball into a disc shape, place the cheese, diced jalapenos, and roasted butternut squash in the center. Fold the dough around the filling, pinch the edges to seal, and then gently flatten the ball into a disc about 1/4 inch thick.",
    "Cooking: Heat a cast iron skillet or griddle over medium heat. Lightly grease with oil and cook each pupusa for 4-6 minutes per side, until golden brown. Keep cooked pupusas warm in an oven while preparing the remaining ones.",
    "Serving: Serve the hot pupusas with curtido, lime wedges, and salsa for an authentic touch."
  ]
},
{
  id: 25,
  title: 'Lithuanian Zeppelin Dumplings',
  ingredients: ['potatoes', 'minced-meat', 'bacon', 'onions', 'potato-starch', 'salt', 'sour-cream'],
  image: '/images/cepeliny.jpg',
  time: '2 hours 50 minutes',
  difficulty: 'Easy',
  ingredientsList: [
    { 'potatoes': '3 kg (6 lb 9 oz)' },
    { 'salt': '2 teaspoons' },
    { 'minced-meat': '500g, pork' },
    { 'garlic powder': '1/2 teaspoon' },
    { 'smoked bacon': '250g (9 oz), finely chopped' },
    { 'onions': '400g (14 oz), finely diced' },
    { 'sour cream': '8 tablespoons' },
    { 'potato starch': 'As needed' },
    { 'cold water': '100 ml (1/2 cup)' }
  ],
  steps: [
    'Peel all potatoes and place them in cold water to prevent browning. Boil 500g (1 lb 2 oz) of the potatoes until soft, then drain and let them cool.',
    'Grate the remaining raw potatoes into a fine pulp. Squeeze out as much liquid as possible using a cloth, keeping the liquid for later use.',
    'Mash the cooked potatoes and mix them with the raw grated potatoes. Add salt and adjust the consistency using potato starch if the mixture is too wet.',
    'In another bowl, mix pork mince with garlic powder and a pinch of salt. Shape the meat into small balls.',
    'Flatten portions of the potato dough in your hand, place a meat ball in the center, and wrap the dough around it, forming a smooth oval shape.',
    'Bring a large pot of water to a boil, adding a starch mixture (2 tablespoons of potato starch mixed with cold water) to help prevent dumplings from splitting. Gently simmer the dumplings for about 45 minutes.',
    'In a separate pan, cook the bacon until crispy. Add chopped onions and cook until softened. This will be the topping for the dumplings.',
    'Serve the dumplings hot with the bacon and onion mixture on top, along with a generous spoonful of sour cream.'
  ]
},
{
  id: 26,
  title: 'Jamaican Beef Patties',
  ingredients: ['flour', 'kosher salt', 'sugar', 'Jamaican curry powder', 'turmeric powder', 'unsalted butter', 'ice cold water', 'olive oil', 'minced-meat', 'onion', 'garlic', 'ginger', 'thyme', 'Jamaican allspice', 'scotch bonnet peppers', 'scallions', 'chicken stock', 'breadcrumbs'],
  image: '/images/beefJamaican.jpg',
  time: '1 hour 30 minutes',
  difficulty: 'Easy',
  ingredientsList: [
    { 'flour': '3 1/2 cups' },
    { 'kosher salt': '2 teaspoons' },
    { 'sugar': '1 tablespoon' },
    { 'Jamaican curry powder': '1 tablespoon' },
    { 'turmeric powder': '2 tablespoons' },
    { 'unsalted butter': '1 cup (2 sticks), grated' },
    { 'ice cold water': '1 cup' },
    { 'olive oil': '2 tablespoons' },
    { 'minced-meat': '500g, beef' },
    { 'onion': '1 large, finely chopped' },
    { 'garlic': '1 tablespoon or minced garlic' },
    { 'ginger': '1 teaspoon or freshly grated ginger' },
    { 'thyme': '1 teaspoon, fresh or dried' },
    { 'Jamaican allspice': '1 teaspoon' },
    { 'scotch bonnet peppers': '1-2, deseeded and finely chopped' },
    { 'scallions': '4, chopped' },
    { 'chicken stock': '1/2 cup' },
    { 'breadcrumbs': '1/2 cup' },
    { 'unsalted butter': '3 tablespoons, cubed' }
  ],
  steps: [
    'In a large bowl, whisk together flour, salt, sugar, curry powder, and turmeric. Add the grated butter and use your hands to mix until pea-sized crumbs form.',
    'Make a well in the center of the mixture and pour in the ice-cold water. Knead until the dough comes together into a ball, then wrap in plastic and chill for at least 30 minutes.',
    'Heat olive oil in a skillet over medium heat, then add ground beef. Cook until browned, then add onions, garlic, and ginger. Stir for a few more minutes.',
    'Add thyme, allspice, curry powder, scotch bonnet peppers, and scallions. Cook for another 2-3 minutes.',
    'Pour in chicken stock and stir. Add breadcrumbs and butter, mixing until the butter melts. Ensure the mixture is moist, adding more stock if needed. Allow to cool.',
    'Preheat oven to 350°F and prepare a baking sheet with parchment paper.',
    'Divide the chilled dough into equal pieces (about 5 oz each for 8 patties). Roll into balls, then flatten into rounds about 6-7 inches in diameter.',
    'Place 4 tablespoons of beef filling on one side of each dough round. Fold the dough over the filling to form a crescent shape. Tuck the edges and crimp with a fork.',
    'Place the patties on the baking sheet and bake for 25-30 minutes until golden brown.',
    'Let the patties cool for 5 minutes before serving.'
  ]
},
{
  id: 27,
  title: 'Coxinha (Brazilian Chicken Croquettes)',
  ingredients: ['chicken', 'chicken broth', 'carrot', 'onions', 'bay leaves', 'cream cheese', 'lime', 'garlic', 'butter', 'kosher salt', 'pepper', 'all-purpose flour', 'eggs', 'breadcrumbs', 'vegetable oil'],
  image: '/images/27.jpg',
  time: '3 hours 40 minutes',
  difficulty: 'Challenging',
  ingredientsList: [
    { 'chicken': '0,75 kg breast, boneless, skinless' },
    { 'chicken broth': '4 to 5 cups' },
    { 'carrot': '1, halved' },
    { 'onions': '2 medium' },
    { 'bay leaves': '2' },
    { 'cream cheese': '8 ounces, softened' },
    { 'lime': '1, juiced' },
    { 'garlic': '2 cloves' },
    { 'butter': '2 tablespoons' },
    { 'kosher salt': 'to taste' },
    { 'pepper': 'to taste' },
    { 'all-purpose flour': '3 to 3 1/2 cups' },
    { 'eggs': '2 large' },
    { 'breadcrumbs': '2 to 3 cups, fine' },
    { 'vegetable oil': 'for frying' }
  ],
  steps: [
    'Place chicken breasts in a pot and cover with chicken broth. Add carrot, one halved onion, and bay leaves. Simmer for 15-20 minutes until the chicken is just cooked through.',
    'Remove the chicken, cool, and shred into small pieces using a food processor or forks. Set aside the strained broth.',
    'Mix shredded chicken with softened cream cheese and lime juice.',
    'Sauté finely chopped second onion and garlic in butter until golden. Add to the chicken mixture and season with salt and pepper.',
    'Measure the reserved broth. If needed, add more broth to make 3 1/2 cups. Bring to a boil and gradually stir in an equal amount of flour, cooking until a stiff dough forms. Chill for 1 hour.',
    'Shape the dough into golf ball-sized portions. Flatten each piece, add about 1 1/2 tablespoons of the chicken filling, and close the dough around it, shaping into a teardrop (drumstick) shape.',
    'Dip the coxinhas in beaten eggs, then coat with breadcrumbs. Chill the breaded coxinhas for 1 hour.',
    'Heat oil to 360°F in a pot. Fry the coxinhas in batches until golden brown. Serve warm and enjoy!'
  ],
},
{
  "id": 28,
  "title": "Salteñas",
  "ingredients": [
    "gelatin", "potatoes", "olive oil", "onion", "minced-meat", "frozen peas", "spring onion", "fresh parsley", "white sugar", "paprika", "ground cumin", "salt","black pepper", "jalapeno sauce", "cold water", "hard-cooked eggs", "black olives", "raisins", "all-purpose flour", "butter", "hot water", "eggs", "water"
  ],
  "image": "/images/saltenas.jpg",
  "time": "2 hours 40 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "gelatin": "1 (.25 ounce) package, unflavored" },
    { "potatoes": "3, peeled" },
    { "olive oil": "1 1/2 tablespoons" },
    { "onion": "1, chopped" },
    { "minced meat": "0,75 kg, beef" },
    { "frozen peas": "1 (10 ounce) package, thawed" },
    { "spring onion": "1, sliced" },
    { "parsley": "1/2 cup, fresh, chopped" },
    { "white sugar": "4 teaspoons" },
    { "paprika": "2 teaspoons" },
    { "ground cumin": "1/4 teaspoon" },
    { "salt": "1 1/2 teaspoons" },
    { "black pepper": "1/4 teaspoon" },
    { "jalapeno sauce": "3 tablespoons (optional)" },
    { "cold water": "1/2 cup" },
    { "hard-cooked eggs": "3, peeled and chopped" },
    { "black olives": "1 (2.25 ounce) can, sliced, drained" },
    { "raisins": "1 cup, soaked in water and drained" },
    { "all-purpose flour": "6 cups" },
    { "butter": "1 cup, cubed" },
    { "hot water": "1 1/2 cups" },
    { "eggs": "2, beaten" },
    { "water": "2 teaspoons" },
    { "paprika (for egg wash)": "1 tablespoon" }
  ],
  "steps": [
    "Sprinkle gelatin over 1/2 cup cold water and set aside for 10 minutes. Microwave for 30 seconds or until melted, then refrigerate until set.",
    "Boil peeled potatoes in water until firm but cooked through, about 10 minutes. Cool, shred, and set aside.",
    "Heat olive oil in a skillet over medium heat. Add chopped onion and cook until soft, about 5 minutes. Add ground beef and cook until browned, about 10 minutes. Drain excess grease and add peas, spring onion, parsley, sugar, paprika, cumin, salt, pepper, and jalapeno sauce. Simmer for 3 minutes and remove from heat.",
    "Preheat oven to 425°F (220°C). Prepare a baking sheet with parchment paper.",
    "For the dough: Mix flour, sugar, and salt. Cut in cubed butter until the mixture resembles coarse crumbs. Gradually add hot water, kneading until smooth. Divide dough into 16 pieces and roll into balls.",
    "On a floured surface, roll each dough ball into a thin circle. Brush edges with beaten egg wash, place 2 tablespoons of filling in the center, and add chopped egg, black olives, raisins, and gelatin.",
    "Fold the dough over the filling, sealing the edges and scalloping if desired. Place the salteñas on a baking sheet.",
    "Whisk paprika into the remaining egg wash and brush over salteñas. Bake for 15-20 minutes or until golden brown."
  ]
},
{
  "id": 29,
  "title": "Pastelitos de Guayaba",
  "ingredients": [
    "cream cheese",
    "sugar",
    "vanilla extract",
    "salt",
    "guava paste",
    "all-purpose flour",
    "puff pastry",
    "egg",
    "turbinado sugar"
  ],
  "image": "/images/pastelitos.jpg",
  "time": "35 minutes",
  "difficulty": "Easy",
  "ingredientsList": [
    { "cream cheese": "8 ounces, at room temperature" },
    { "sugar": "3 tablespoons, white granulated" },
    { "vanilla extract": "1 teaspoon" },
    { "salt": "Pinch" },
    { "guava paste": "4 ounces" },
    { "all-purpose flour": "1 tablespoon, for flouring work surface" },
    { "puff pastry": "1 package, store-bought, mostly thawed" },
    { "egg": "1 large, beaten" },
    { "turbinado sugar": "1 tablespoon, optional" }
  ],
  "steps": [
    "Preheat the oven to 400°F (200°C). Line a baking sheet with parchment paper and set aside.",
    "In a stand-up mixer or a medium bowl with an electric hand mixer, combine the cream cheese, sugar, vanilla extract, and a pinch of salt. Beat until smooth, about 1 minute. Transfer to a piping bag, or use a spoon if preferred.",
    "Dust your work surface with flour. Unfold one sheet of puff pastry and use a rolling pin to gently flatten it, but do not roll it too thin. Cut the dough into 9 equal rectangles. Repeat with the second sheet of puff pastry.",
    "Place half of the rectangles (about 9) on the prepared baking sheet. Pipe or spoon about 1-2 tablespoons of the cream cheese mixture onto each rectangle and top with a slice of guava paste.",
    "Brush the edges of the rectangles with beaten egg and cover each with another puff pastry rectangle, sealing the edges tightly. Place the baking sheet in the freezer for about 10 minutes to chill.",
    "Once chilled, brush the tops with the remaining egg wash and optionally sprinkle with turbinado sugar. Bake for 18-22 minutes, or until golden brown.",
    "Remove from the oven and let cool for 10 minutes before serving (the guava filling will be very hot)."
  ]
},
{
  "id": 30,
  "title": "Chicken Momo",
  "ingredients": [
    "flour", "minced-meat", "coriander", "onion", "garlic", 
    "ginger", "ground cumin", "ground cinnamon", "salt", "black pepper"
  ],
  "image": "/images/momos.png",
  "time": "1 hour 30 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "all-purpose flour": "4 cups" },
    { "minced-meat": "1 kg, chicken tights" },
    { "fresh cilantro": "1 cup, chopped" },
    { "onions": "1 cup, chopped" },
    { "garlic": "4 tablespoons, minced" },
    { "ginger": "4 tablespoons, peeled, minced" },
    { "ground cumin": "2 tablespoons" },
    { "ground cinnamon": "1 teaspoon" },
    { "salt": "2 tablespoons, plus more for taste" },
    { "black pepper": "1/2 teaspoon" }
  ],
  "steps": [
    "In a bowl, mix the flour with 1 1/2 cups of room temperature water. Knead the dough until medium-firm and flexible. Cover and let it rest for 1 hour.",
    "In a separate bowl, combine the ground chicken, cilantro, onions, garlic, ginger, cumin, cinnamon, 2 tablespoons of salt, and 1/2 teaspoon of black pepper.",
    "To make the wrappers, break off a small portion of dough (about 1/2 ounce) and roll it into a ball. On a flat surface, roll the ball into a 4-inch round using a rolling pin. Repeat with the remaining dough.",
    "Lightly spray a steamer pan with cooking spray.",
    "Place 1 tablespoon of the chicken filling in the center of each dough wrapper. Holding the wrapper in one hand, pinch and fold the edges together to seal the momo into a satchel shape. Place the momos in the prepared steamer pan.",
    "Fill the bottom of a steamer pot with water and bring it to a boil. Set the steamer pan on top, cover, and steam the momos for 8 to 9 minutes until fully cooked."
  ]
},
{
  id: 31,
  title: 'Mongolian Meat Pockets (Khuushuur)',
  ingredients: ['minced-meat', 'onion', 'garlic', 'salt', 'pepper', 'flour', 'water'],
  image: '/images/khuushuur.jpg',
  time: '30 minutes',
  difficulty: 'Easy',
  ingredientsList: [
    { 'minced-meat': '450g, beef' },
    { 'onion': '1, minced' },
    { 'garlic': '1 clove, minced' },
    { 'salt': '1 teaspoon' },
    { 'black pepper': '1/4 teaspoon' },
    { 'flour': '3 cups' },
    { 'water': '2 cups (adjust as needed)' }
  ],
  steps: [
    'In a bowl, combine ground beef, minced onion, garlic, salt, and pepper. Set the mixture aside.',
    'In a separate bowl, gradually add water to the flour while mixing by hand, forming a smooth and slightly sticky dough.',
    'Divide the dough into four portions. Take one portion and cover the remaining dough with plastic wrap to prevent drying.',
    'Roll the dough portion into a thick rope and cut it into 2-inch pieces.',
    'Flatten each dough piece into a circle and place a tablespoon of the meat filling in the center. Use a bit of water to seal the edges tightly.',
    'Repeat the process with the remaining dough and filling.',
    'Fry the pockets in hot oil until golden brown on both sides.',
    'Serve hot and enjoy!'
  ]
},
{
  id: 32,
  title: 'Shish Barak',
  ingredients: ['flour', 'milk powder', 'sugar', 'salt', 'vegetable oil', 'water', 'minced-meat', 'pine-nuts', 'onion', 'parsley', 'garlic', 'smoked-paprika', 'seven-spice', 'plain-yogurt', 'corn-starch', 'dried-mint'],
  image: '/images/shishBarak.jpg',
  time: '2 hours 30 minutes',
  difficulty: 'Challenging',
  ingredientsList: [
    { 'flour': '3 cups' },
    { 'milk powder': '1 tbsp, optional' },
    { 'granulated sugar': '1 tbsp' },
    { 'salt': '1 tsp' },
    { 'vegetable oil': '1/3 cup' },
    { 'water': '1 cup' },
    { 'minced-meat': '225g, beef/lamb' },
    { 'pine nuts': '3 tbsp, toasted in olive oil' },
    { 'onion': '1 small' },
    { 'parsley': 'handful' },
    { 'garlic': '3 cloves' },
    { 'smoked paprika': '1/2 tbsp' },
    { 'seven-spice or allspice': '1 tbsp' },
    { 'salt and pepper': 'to taste' },
    { 'plain yogurt': '32 oz (900g), not Greek yogurt' },
    { 'corn starch': '2 tbsp' },
    { 'water (for sauce)': '2 cups, more if needed' },
    { 'dried mint': '3 tbsp' }
  ],
  steps: [
    'Dough: Combine the flour, milk powder, sugar, salt, and vegetable oil in a bowl. Gradually add water while mixing until a smooth dough forms. Cover the dough and let it rest for 30 minutes.',
    'Filling: In a food processor, pulse the onion, garlic, and parsley. Add this mixture to the ground beef and sauté in a pan with paprika, seven-spice, salt, and pepper until the meat is browned. Stir in the toasted pine nuts and set aside.',
    'Dough Preparation: Once the dough has rested, divide it into two halves. Roll out each half thinly (about 1 inch thick) and cut small circles using a cookie cutter or small cup. Add 1 tsp of the meat filling to each dough circle, fold, and seal the edges like an empanada. Pinch the ends together to form a tortellini shape. Repeat until all dough is used.',
    'Baking: Place the dumplings on a nonstick pan sprayed with olive oil. Bake in a preheated oven at 400°F (200°C) for 10 minutes or until lightly browned. Optionally, broil for a minute to get a deeper color. Once cooled, the dumplings can be frozen for later use.',
    'Yogurt Sauce: Blend the yogurt, corn starch, salt, and water together. Pour the mixture into a pot and cook over medium heat, stirring constantly, until the sauce thickens and boils (about 10-15 minutes). If the sauce needs more thickness, mix a ladle of the sauce with additional corn starch and return it to the pot.',
    'Final Cooking: Once the yogurt sauce reaches your desired thickness, add the dumplings and cook for 10 minutes until they float to the top.',
    'Garnish: Sauté crushed garlic in olive oil until crisp, then stir into the yogurt sauce. Sprinkle dried mint over the dish before serving.'
  ]
},
{
  id: 33,
  title: 'Guo Tie (Chinese Fried Pork and Cabbage Dumplings)',
  ingredients: ['flour', 'boiling water', 'napa cabbage', 'kosher salt', 'green-onion', 'minced-meat', 'soy-sauce', 'Shaoxing wine', 'sugar', 'Chinkiang vinegar', 'ginger', 'vegetable oil'],
  image: '/images/guotie.jpg',
  time: '1 hour 50 minutes',
  difficulty: 'Not too tricky',
  ingredientsList: [
    { 'flour': '2 cups (9 oz; 255g)' },
    { 'boiling water': '1 cup (237ml)' },
    { 'napa cabbage': '1/2 lb (8 oz; 226g)' },
    { 'kosher salt': '1 tsp (3g)' },
    { 'scallions': '2, roughly chopped' },
    { 'minced-meat': '226g, fatty pork' },
    { 'soy-sauce': '2 tsp' },
    { 'Shaoxing wine': '1 tbsp' },
    { 'sugar (for filling)': '2 tsp' },
    { 'soy sauce (for sauce)': '2 tbsp' },
    { 'Chinkiang vinegar': '2 tbsp' },
    { 'sugar (for sauce)': '1 tsp' },
    { 'green-onion': '1 tbsp, finely sliced' },
    { 'ginger': '1 tsp, grated' },
    { 'vegetable oil': 'for frying' }
  ],
  steps: [
    'Dough: In a food processor, add flour and slowly drizzle in boiling water while the machine is running. Mix until the dough becomes cohesive and smooth. Transfer to a bowl, cover with a damp towel, and let it rest for at least 30 minutes.',
    'Filling: Pulse cabbage with salt in a food processor until finely chopped. Transfer to a fine-mesh strainer and let sit for 30 minutes. In the meantime, blend scallions, pork, soy sauce, Shaoxing wine, and sugar in the processor until smooth. Set aside.',
    'After the cabbage has drained, squeeze out any excess liquid and mix with the pork filling using a spatula. Taste and adjust seasoning with salt, soy sauce, or sugar if necessary. Refrigerate until ready to use.',
    'Shaping Dumplings: Divide the dough into 4 sections. Roll each section into a 6-inch log, cut into 10 pieces, and shape each into a ball (40 balls total). On a floured surface, roll each ball into a 3.5 to 4-inch round wrapper. Keep wrappers covered until ready to fill.',
    'Forming Dumplings: Place 1 tablespoon of filling in the center of each wrapper. Moisten the edges, fold in half, and pleat the front edge, sealing it completely. Set aside on a floured or parchment-lined surface.',
    'Sauce: Mix soy sauce, Chinkiang vinegar, sugar, scallion greens, and grated ginger in a small bowl. Set aside.',
    'Cooking: Boil a pot of water. Add 6-12 dumplings, boil until they float, then boil 2 minutes more. Transfer to a plate. Heat vegetable oil in a nonstick skillet and fry dumplings flat-side down until golden and crispy (about 3 minutes). Serve hot with dipping sauce. Repeat with remaining dumplings.'
  ]
},
{
  "id": 34,
  "title": "Kärntner Kasnudeln",
  "ingredients": ["flour", "egg", "water", "olive oil", "quark cheese", "bread cubes", "butter", "milk", "onion", "potatoes", "herbs", "salt", "pepper"],
  "image": "/images/karntner_kasnudeln.jpg",
  "time": "1.5 hours",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "flour": "400g, wheat flour" },
    { "egg": "1, large" },
    { "water": "150ml, adjust as needed" },
    { "olive oil": "1 tablespoon" },
    { "quark cheese": "500g" },
    { "bread": "130g, cubed" },
    { "butter": "70g" },
    { "milk": "200ml" },
    { "onion": "50g, chopped" },
    { "potatoes": "100g, cooked and peeled" },
    { "herbs": "2 tablespoons, mixed (e.g., mint and chervil)" },
    { "salt": "to taste" },
    { "pepper": "to taste" }
  ],
  "steps": [
    "Dough: Mix water, egg, olive oil, and flour together to form a smooth dough. Let it rest for 20 minutes.",
    "Filling: Sauté onions in butter until softened. Mix quark cheese, bread cubes, and milk together. Add the sautéed onions and mashed potatoes, along with herbs, salt, and pepper to taste.",
    "Shape dumplings: Roll out the dough and cut into circles. Place filling on each circle, fold over, and press the edges to seal. Use a crimping technique (krendeln) for decoration.",
    "Cook: Boil the dumplings in salted water until they float to the surface. Serve with melted butter and sprinkled chives."
  ]
},
{
  "id": 35,
  "title": "Sweet Cheese Dumplings",
  "ingredients": ["flour", "water", "oil", "salt", "egg", "cottage cheese", "sugar", "vanilla"],
  "image": "/images/pierogi1.jpg",
  "time": "50 minutes",
  "difficulty": "Not too tricky",
  "ingredientsList": [
    { "flour": "500g" },
    { "water": "200ml" },
    { "oil": "3 tablespoons" },
    { "salt (for dough)": "1 teaspoon" },
    { "egg": "1" },
    { "cottage cheese": "500g" },
    { "sugar": "4 tablespoons" },
    { "eggs (for filling)": "2" },
    { "vanilla pod": "1 (or 1 teaspoon vanilla extract)" }
  ],
  "steps": [
    "Dough: In a large bowl, mix the flour, water, oil, salt, and egg until a dough forms. Knead on a floured surface for about 10 minutes until smooth and elastic. Cover with a cloth and rest for 30 minutes.",
    "Filling: In a separate bowl, mix cottage cheese with sugar, eggs, and vanilla. Ensure a smooth consistency. If the cheese is too watery, drain it before combining with the rest of the ingredients.",
    "Assembly: Roll out the dough into a thin sheet (2-3mm thick). Cut circles using a round cutter. Place a spoonful of filling in the center of each circle, fold into a half-moon shape, and seal the edges using a fork.",
    "Cooking: Bring a pot of salted water to boil. Drop the dumplings in batches. Once they float to the surface, cook for an additional 2-3 minutes. Remove with a slotted spoon.",
    "Serving: Serve warm with melted butter and sour cream. Optionally, sprinkle with a little sugar or cinnamon."
  ]
},
{
  "id": 36,
  "title": "Samosa Recipe",
  "ingredients": ["potato", "flour", "ghee", "cumin", "peas", "ginger", "garam masala", "turmeric", "salt"],
  "image": "/images/samosa.jpg",
  "time": "1 hour 15 minutes",
  "difficulty": "Not too tricky",
  "ingredientsList": [
    { "flour": "1 1/2 cups, plain/all purpose" },
    { "ajwain seeds": "1 teaspoon" },
    { "salt (for dough)": "1/2 teaspoon" },
    { "ghee (or oil)": "4 tablespoons" },
    { "cold water": "6 tablespoons" },
    { "potatoes (starchy/all-rounder)": "500g" },
    { "vegetable oil": "2 tablespoons" },
    { "cumin seeds": "1 teaspoon" },
    { "black mustard seeds": "1/4 teaspoon" },
    { "coriander seeds": "1/2 teaspoon" },
    { "fresh ginger": "1 tablespoon, finely grated" },
    { "green chilli": "1 tablespoon, finely chopped" },
    { "frozen green peas": "1/2 cup, thawed" },
    { "garam masala": "1 teaspoon" },
    { "amchur": "1/4 teaspoon" },
    { "asafoetida": "1/2 teaspoon" },
    { "cumin powder": "1/4 teaspoon" },
    { "turmeric powder": "1/2 teaspoon" },
    { "salt (for filling)": "1 teaspoon" },
    { "coriander leaves": "2 tablespoons, finely chopped" },
    { "vegetable oil (for frying)": "At least 1 litre" }
  ],
  "steps": [
    "Dough: Mix flour, ajwain seeds, and salt. Add ghee (or oil) and mix with your fingertips until the mixture resembles breadcrumbs. Add cold water and form a ball of dough. Let it rest for 30 minutes.",
    "Filling: Peel and boil potatoes until soft. Roughly mash the potatoes, leaving some chunks. Heat oil in a pan, add cumin seeds, mustard seeds, and coriander seeds. Cook for 30 seconds until fragrant. Add ginger, chilli, and peas, cooking for another minute. Add garam masala, amchur, asafoetida, cumin powder, turmeric, and salt. Stir for 30 seconds. Add potatoes and mix well. Remove from heat, stir in coriander leaves, and let the mixture cool completely.",
    "Assembly: Divide dough into 6 portions, roll each into a ball, and flatten into discs about 2mm thick. Cut each disc into two semicircles. Form cones by folding and sealing the edges, fill with potato mixture, and seal the edges.",
    "Frying: Heat oil to 160°C. Fry samosas in batches for 3 minutes, drain, and repeat. Increase oil temperature to 190°C, fry samosas again for 1-2 minutes until golden brown. Serve with tamarind or mint sauce."
  ]
},
{
  "id": 37,
  "title": "Mini Empanadillas (Puerto Rican Beef Turnovers)",
  "ingredients": ["flour", "butter", "egg", "water", "minced-meat", "sofrito", "sazon", "garlic", "onion", "green pepper", "red pepper", "potato", "tomato sauce", "adobo", "vegetable-oil"],
  "image": "/images/empanadillas.jpg",
  "time": "1 hour 30 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "flour": "2 cups, all-purpose" },
    { "salt (for dough)": "1 teaspoon" },
    { "butter": "1 stick, cold" },
    { "egg": "1" },
    { "cold water": "3/4 to 1 cup" },
    { "minced-meat": "1 kg, beef" },
    { "adobo (or salt & pepper)": "To taste" },
    { "sofrito": "1/4 cup" },
    { "sazon": "1 small envelope" },
    { "garlic": "2 cloves, chopped" },
    { "onion": "1/2, diced" },
    { "green pepper": "1/2, diced" },
    { "red pepper": "1/2, diced" },
    { "potato": "1 small, diced" },
    { "tomato sauce": "1 cup" },
    { "vegetable-oil": "Enough to fry" }
  ],
  "steps": [
    "Dough: In a food processor or mixer, combine flour, salt, cold butter (cut into slices), and egg. Slowly add cold water until the dough becomes stretchy but not sticky. If it's too sticky, add more flour. Cover the dough and refrigerate for at least 30 minutes for easier handling.",
    "Beef Filling: Season ground beef with adobo (or salt and pepper) and brown it in a skillet with chopped garlic. Once the beef is cooked, add sofrito, sazon, tomato sauce, diced onions, green and red peppers, and diced potato. Let it simmer until the potatoes are tender.",
    "Assembly: Roll out the dough on a floured surface. Use a round cutter or a cup to cut out circles of dough. Place a spoonful of beef filling in the center of each circle and fold the dough over. Seal the edges by pressing them with a fork.",
    "Frying: Heat vegetable oil in a pan and fry the empanadillas until golden brown on both sides. Remove and let them cool slightly before serving."
  ]
},
{
  "id": 38,
  "title": "Buuz ~ Mongolian Steamed Dumplings",
  "ingredients": ["flour", "water", "minced-meat", "onion", "garlic", "pepper", "caraway seeds", "salt"],
  "image": "/images/buuz.jpg",
  "time": "1 hour",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "flour": "2 cups" },
    { "boiling water": "2/3 cups" },
    { "minced-meat": "450g, mutton or fatty lamb, preferably coarsely ground" },
    { "onion": "1, finely minced" },
    { "garlic": "2-3 cloves, minced" },
    { "pepper": "1-2 teaspoons" },
    { "caraway seeds": "1 teaspoon" },
    { "salt": "1 teaspoon" },
    { "water (optional)": "1-2 tablespoons, if using pre-ground meat" }
  ],
  "steps": [
    "Mix the flour and boiling water together and knead until smooth dough forms. You can use a food processor for about 30 seconds or do it by hand. Let the dough rest under a damp towel for at least 30 minutes.",
    "Grind the mutton or fatty lamb coarsely if not pre-ground. Mix in the minced onion, garlic, pepper, caraway seeds, and salt. Add water if using pre-ground meat and mix well.",
    "Roll the dough into a long snake shape and cut it into 24 pieces. Roll each piece into a 3-inch circle.",
    "Place a walnut-sized piece of meat filling in the center of each wrapper. Pinch the edges together in your preferred shape.",
    "Steam the dumplings in a steamer basket for about 20 minutes inside a pot with a tight-fitting lid or an instant pot with a glass lid.",
    "Serve the buuz as an appetizer or main dish."
  ]
},
{
  "id": 39,
  "title": "Pierogi with Blueberries",
  "ingredients": ["flour", "egg", "butter", "water", "salt", "blueberries", "sugar", "yogurt or sour cream (optional)"],
  "image": "/images/pierogi_with_blueberries.jpg",
  "time": "1 hour 30 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "flour": "500 g" },
    { "egg": "1 medium" },
    { "butter": "50 g (1/4 stick)" },
    { "water": "250 ml (1 cup)" },
    { "salt": "a pinch" },
    { "blueberries": "500 g" },
    { "fine sugar": "3 tablespoons" },
    { "optional topping (yogurt or sour cream with powdered sugar)": "as needed" }
  ],
  "steps": [
    "Start by preparing the dough. In a large bowl, combine 500 grams of all-purpose flour. If measuring in cups, it equals 3 cups (250 ml each). Add one medium egg and 50 grams of melted and cooled butter (or 3 tablespoons of vegetable oil).",
    "Add a pinch of salt and pour in 250 ml of room-temperature water. Mix the dough until it comes together, then knead by hand until smooth. Form into a ball, wrap it in plastic, and let it rest in the fridge for 30 minutes.",
    "While the dough rests, prepare the filling. Wash and thoroughly dry the blueberries, then toss them with 3 tablespoons of fine sugar. Set aside.",
    "Divide the dough into 3 parts, keeping the unused portions covered with a damp cloth. Roll out one part very thinly on a floured surface. Cut out circles using a glass or round cutter (about 7-8 cm in diameter).",
    "Place a teaspoon of the blueberry mixture in the center of each dough circle. Fold the dough in half and press the edges together to seal, making sure no air is trapped inside. Optionally, crimp the edges to create a decorative pattern.",
    "Lay the finished pierogi on a floured board, covering them with a damp cloth to prevent drying out. Boil a large pot of salted water and cook the pierogi in batches of 15. Once they float, let them cook for 4 minutes, then remove with a slotted spoon.",
    "Serve the pierogi with yogurt or sour cream mixed with powdered sugar, or enjoy them plain. Optional toppings include sweet vanilla cream or hot sauce made with heavy cream and sugar."
  ]
},
{
  "id": 40,
  "title": "Pierogi with Strawberries",
  "ingredients": ["flour", "strawberries", "Greek yogurt or sour cream", "powdered sugar"],
  "image": "/images/pierogi_with_strawberries.jpg",
  "time": "1 hour",
  "difficulty": "Easy",
  "ingredientsList": [
    { "flour": "500 g (for dough)" },
    { "strawberries": "200 g" },
    { "Greek yogurt or sour cream": "200 g" },
    { "powdered sugar": "as needed" }
  ],
  "steps": [
    "Prepare the dough for the pierogi. Bring a pot of water to a boil (without salt). Roll out the dough on a floured surface, dividing it into 3-4 parts. Roll each part into a thin sheet (about 2-3 mm thick).",
    "Cut the strawberries into halves or quarters, depending on their size. Optionally, mix the strawberries with a tablespoon of cornstarch to thicken the filling.",
    "Use a small glass or round cutter to cut circles from the dough. Place a piece of strawberry in the center of each circle, fold the dough in half, and seal the edges tightly. Arrange the pierogi on a floured surface.",
    "Once the water is boiling, add the first batch of pierogi (about 15 pieces). After the water returns to a boil, reduce the heat to medium and cook the pierogi until the dough is soft, about 2.5 minutes from when they float to the surface.",
    "Remove the pierogi with a slotted spoon and place them on plates. Serve with sweetened sour cream or Greek yogurt, and optionally sprinkle with powdered sugar."
  ]
},
{
  id: 41,
  title: "Steamed Rice Flour Dumplings with Coconut & Jaggery (Modak)",
  ingredients: ["rice flour", "coconut", "jaggery", "ghee", "cardamom", "nutmeg"],
  image: "/images/modak.jpg",
  time: "1 hour 30 minutes",
  difficulty: "Moderate",
  ingredientsList: [
    { "rice flour": "150g" },
    { "water": "1.5 cups" },
    { "ghee (for dough)": "1/4 teaspoon" },
    { "salt": "1/4 teaspoon" },
    { "grated coconut": "100g" },
    { "jaggery": "200g" },
    { "cardamom powder": "1 teaspoon" },
    { "nutmeg powder": "1/4 teaspoon (optional)" },
    { "poppy seeds": "1/2 teaspoon (optional)" },
    { "ghee (for filling)": "1/2 teaspoon" }
  ],
  steps: [
    "Filling: Heat ghee in a pan over low heat. Add poppy seeds and sauté briefly until they start to pop. Add the grated coconut, jaggery, cardamom, and nutmeg. Stir constantly and cook until the jaggery melts and the mixture thickens, about 7-9 minutes. Remove from heat and let the filling cool completely.",
    "Dough: In a pot, bring water, ghee, and salt to a boil. Gradually add the rice flour, stirring continuously until the mixture forms a dough. Remove from heat, cover, and let rest for 4-5 minutes. Transfer the dough to a flat surface and knead well while still warm, adding a little water if necessary, until smooth.",
    "Shaping without mould: Take a small portion of dough and flatten it with your hands to form a small disc. Place a spoonful of the filling in the center. Bring the edges together, pinch, and twist the top to seal the dumpling.",
    "Shaping with mould: Grease a modak mould with ghee. Press a portion of dough inside, create a cavity for the filling, then add the coconut-jaggery mixture. Seal the bottom with more dough, then carefully remove the modak from the mould.",
    "Steaming: Grease a steamer tray lightly and place the modaks inside, leaving space between each one. Steam over boiling water for 10-15 minutes until the dumplings are cooked and no longer sticky to the touch. Optionally, drizzle with melted ghee before serving."
  ],
},
{
  "id": 42,
  "title": "Alpine Spinach & Cheese Ravioli (Schlutzkrapfen)",
  "ingredients": ["flour", "egg", "water", "oil", "spinach", "onion", "garlic", "butter", "cheese", "chives", "nutmeg", "pepper", "salt", 'chives'],
  "image": "/images/schlutzkrapfen.jpg",
  "time": "1 hour 30 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "flour": "rye, 150g, wheat, 100g" },
    { "egg": "1" },
    { "lukewarm water": "50-60ml" },
    { "oil": "1 tablespoon" },
    { "salt": "To taste" },
    { "spinach (boiled)": "150g" },
    { "onion": "50g" },
    { "garlic": "1/2 clove" },
    { "butter": "1 tablespoon" },
    { "cheese": "curd, 100g, parmesan, 1 tablespoon" },
    { "chives": "1 tablespoon" },
    { "nutmeg": "1 pinch" },
    { "pepper": "To taste" },
    { "butter": "brown for serving" },
    { "chives": "chopped for serving" }
  ],
  "steps": [
    "Dough: Mix the rye and wheat flours on a pastry board, forming a ring shape. Add salt. In a separate bowl, whisk the egg with lukewarm water and oil. Gradually pour the mixture into the center of the flour ring. Knead until a smooth dough forms. Cover and let it rest for 30 minutes.",
    "Filling: Finely chop the cooked spinach. In a pan, melt the butter and sauté the chopped onion and garlic until soft. Add the spinach and cook briefly. Let the mixture cool slightly, then mix in the curd cheese, grated parmesan, and chives. Season with nutmeg, salt, and pepper.",
    "Shaping: Roll the dough into thin sheets using a pasta machine or rolling pin. Cut out 7 cm diameter circles using a cutter. Place a small spoonful of filling in the center of each circle. Moisten the edges with water and fold the dough to form a crescent shape. Press the edges firmly to seal.",
    "Cooking: Boil the ravioli in salted water for 3-4 minutes until they float. Remove and drain.",
    "Serving: Plate the ravioli and sprinkle with grated parmesan. Drizzle with brown butter and garnish with chopped chives."
  ]
},
{
  "id": 43,
  "title": "Roasted Pumpkin & Cottage Cheese Pierogi",
  "ingredients": ["flour", "butter", "water", "pumpkin", "cottage cheese", "salt", "pepper", "ginger", "nutmeg", "cinnamon", "rosemary", "olive-oil", "onion", "garlic", "bacon", "cream", "parsley"],
  "image": "/images/pumpkin_pierogi.jpg",
  "time": "1 hour 45 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "flour": "280g" },
    { "salt (for dough)": "1/4 teaspoon" },
    { "hot water": "250ml" },
    { "butter": "30g" },
    { "roasted pumpkin flesh": "350g" },
    { "cottage cheese": "350g" },
    { "salt (for filling)": "To taste" },
    { "black pepper (for filling)": "To taste" },
    { "ginger": "1 teaspoon, grounded" },
    { "nutmeg": "1/2 teaspoon" },
    { "cinnamon": "A pinch" },
    { "rosemary (from roasted pumpkin)": "To taste" },
    { "olive-oil": "2 tablespoons (for serving)" },
    { "onion": "1" },
    { "garlic": "2, cloves (minced)" },
    { "bacon": "8 slices" },
    { "cream": "200g" },
    { "fresh parsley": "For garnish" },
    { "pepper": "For garnish" }
  ],
  "steps": [
    "Filling: Mash the roasted pumpkin and mix it with cottage cheese. Season with salt, pepper, ground ginger, nutmeg, cinnamon, and chopped rosemary from the roasted pumpkin.",
    "Dough: Sift the flour into a bowl and add salt. Melt the butter in hot water, then slowly add the water to the flour mixture, stirring. Knead the dough on a floured surface for about 7-8 minutes. Cover with a damp cloth and let it rest for 30 minutes.",
    "Shaping: Roll the dough into thin sheets and cut out circles using a glass. Place a spoonful of filling in the center of each circle. Fold the dough and press the edges to seal the pierogi. Place them on a board and cover with a cloth to prevent drying.",
    "Cooking: Boil salted water in a large pot. Once boiling, drop in batches of about 15 pierogi. Reduce the heat to medium after they float and cook for an additional 1-2 minutes. Remove with a slotted spoon.",
    "Serving: In a pan, sauté the chopped onion and minced garlic in olive oil over low heat. Add diced ham or bacon and cook for 1 minute. Serve the pierogi topped with the onion, garlic, ham, or bacon, and garnish with sour cream, freshly ground multicolored pepper, and parsley."
  ]
},
{
  id: 44,
  title: "Veal and Chanterelle Pierogi",
  ingredients: ["veal", "chanterelle", "flour", "onion", "carrot", "butter", "egg", "salt", "pepper", 'olive-oil'],
  image: "/images/vealChanterellePierogi.jpg",
  time: "2 hours",
  difficulty: "Moderate",
  ingredientsList: [
    { "flour": "500g" },
    { "salt (for dough)": "1/2 teaspoon" },
    { "cold water": "400ml" },
    { "veal (boneless leg)": "500g" },
    { "carrot": "1 large" },
    { "parsley root": "1 small" },
    { "onion": "2 medium" },
    { "chanterelle": "400g" },
    { "olive-oil": "1 tablespoon" },
    { "butter": "1 tablespoon" },
    { "egg": "1" },
    { "olive-oil": "2 tablespoons (optional)" }
  ],
  steps: [
    "Filling: Rinse the veal and cut into large chunks. Steam the veal for about 1 hour until tender. Halfway through, add the chopped carrot, parsley root, and one halved onion. Once the veal is soft, remove it and grind with the cooked vegetables.",
    "Prepare the chanterelles: Clean and chop the chanterelles. Sauté one chopped onion in olive oil until soft, then add the chanterelles. Cook for about 8 minutes until the liquid evaporates. Mince half of the mushrooms and keep the other half whole.",
    "Mix the ground veal with the minced mushrooms, add the whole mushrooms, egg, salt, and pepper. Optionally, add olive oil or veal broth if the filling seems dry.",
    "Dough: Sift the flour onto a countertop or board, make a well, and add salt. Gradually add cold water and knead the dough until smooth and elastic (about 10 minutes). Cover with a damp cloth and let it rest for 15 minutes.",
    "Roll out the dough into thin sheets and cut out circles using a glass or round cutter. Place a spoonful of filling in the center of each circle and fold the dough in half, pressing the edges together to seal.",
    "Cooking: Boil salted water in a large pot. Add the pierogi in batches, cooking for 1-2 minutes after they float to the surface. Remove with a slotted spoon.",
    "Serving: Serve with crispy onion bits, melted butter, or sour cream."
  ]
},
{
  id: 45,
  title: "Mushroom-Filled Uszka (Christmas Eve Dumplings)",
  ingredients: ["flour", "butter", "porcini", "onion", "salt", "pepper"],
  image: "/images/mushroomUszka.jpg",
  time: "1 hour 30 minutes",
  difficulty: "Moderate",
  ingredientsList: [
    { "flour": "300g" },
    { "salt (for dough)": "Pinch" },
    { "boiling water": "200ml" },
    { "butter": "30g" },
    { "porcini": "40g, dried" },
    { "water (for boiling mushrooms)": "1 cup" },
    { "onion": "1, small" },
    { "butter": "2 tablespoons" },
    { "salt (for filling)": "To taste" },
    { "pepper": "To taste" }
  ],
  steps: [
    "Dough: Sift the flour into a bowl and add a pinch of salt. In a separate bowl, melt the butter in boiling water. Gradually pour the hot butter-water mixture into the flour while stirring. Once combined, transfer the dough to a floured surface and knead for about 6 minutes until smooth and soft. Place the dough in a bowl, cover with plastic wrap, and let it rest for 30 minutes.",
    "Filling: In a small pot, simmer the dried mushrooms in 1 cup of water over low heat for about 30 minutes until soft. Meanwhile, finely chop the onion and sauté in butter or flaxseed oil until translucent (about 6 minutes). Drain the mushrooms (save the mushroom broth for soup if desired), chop them finely, and add them to the onions. Cook together for 2-3 minutes, seasoning with salt and pepper. Let the filling cool.",
    "Assembly: Divide the dough into three parts. Roll out each part on a floured surface until about 2mm thick. Use a small glass (4.5cm in diameter) to cut out circles of dough. Place 1/3 teaspoon of the mushroom filling in the center of each circle. Fold the dough in half to form a semi-circle, and press the edges firmly to seal. Then, connect the two corners of the dumpling by wrapping it around your finger to form the characteristic 'uszka' shape.",
    "Cooking: Bring a pot of salted water to a boil. Add the uszka in batches, cooking for 1-2 minutes after they float to the surface. Remove with a slotted spoon and transfer to a plate.",
    "Serving: Uszka can be served immediately with borscht or stored in the fridge for 3-4 days. They can also be frozen for later use."
  ]
},
{
  "id": 46,
  "title": "Salmon and Dill Pierogi",
  "ingredients": ["salmon", "ricotta-cheese", "egg", "parmesan-cheese", "dill", "flour", "water", "egg", "butter", "salt"],
  "image": "/images/salmonPierogi.jpg",
  "time": "1 hour 15 minutes",
  "difficulty": "Moderate",
  "ingredientsList": [
    { "salmon": "smoked 350g, fresh fillets 350g" },
    { "ricotta-cheese": "80g (or feta or cream cheese)" },
    { "egg": "1, large" },
    { "parmesan-cheese": "5 tablespoons" },
    { "dill": "2 tablespoons, fresh chopped" },
    { "salt": "To taste" },
    { "pepper": "To taste" },
    { "flour": "300g (10 ½ oz/2 ¼ cups)" },
    { "egg": "1 yolk" },
    { "butter": "1 tablespoon" }
  ],
  "steps": [
    "Filling: Rinse the fresh salmon fillets, remove the skin, rinse again, and pat dry. Steam or bake the salmon uncovered, making sure the meat doesn’t become too moist. After cooking, drain the salmon well, pat it dry with paper towels, and remove any bones. Chop the fresh salmon finely.",
    "In a bowl, combine the chopped fresh salmon with finely chopped smoked salmon, ricotta cheese, egg, grated parmesan, and dill. Season with salt and pepper. If the filling is too wet, add more parmesan until it has a firmer consistency.",
    "Dough: In a bowl, combine the flour, egg yolk, pinch of salt, and warm water. Mix and knead the dough for about 10 minutes until smooth and elastic. Add melted butter while kneading to make the dough more elastic. Cover the dough with a damp cloth and let it rest for 20 minutes.",
    "Roll out the pierogi dough into a thin sheet. Use a small glass to cut out circles from the dough. Place about a teaspoon of filling in the center of each circle. Fold the dough over and seal the edges tightly.",
    "Cooking: Boil a large pot of salted water. Add the pierogi and cook until tender, about 2 minutes. Drain the pierogi after cooking.",
    "Serving: Serve the pierogi with a drizzle of lemon juice or with a sauce made from butter and cream. To make the sauce, melt butter in a pan, add cream, and heat through. Season with salt and freshly ground pepper."
  ]
},
{
  id: 47,
  title: "Green Springtime Pierogi with Spinach, Groats and Cheese",
  ingredients: ["spinach", "feta-cheese", "lemon", "white-pepper", "watercress", "nutmeg", "buckwheat-groats", "flour", "egg", "vegetable-oil", "butter"],
  image: "/images/greenSpringtimePierogi.jpg",
  time: "1 hour",
  difficulty: "Moderate",
  ingredientsList: [
    { "flour": "300g (10 ½ oz/2 ¼ cups)" },
    { "egg": "2 yolks" },
    { "salt": "Pinch, to taste" },
    { "spinach": "3–4 tablespoons spinach juice" },
    { "vegetable-oil": "1 tablespoon" },
    { "butter": "2 tablespoons" },
    { "spinach": "200g (7 oz)(for filling)" },
    { "feta-cheese": "100g (3 ½ oz)" },
    { "lemon": "1 lemon juice" },
    { "nutmeg": "½ teaspoon, grated" },
    { "buckwheat-groats": "100g (cooked)" },
    { "white-pepper": "To taste" },
    { "watercress": "100g (3 ½ oz)" }
  ],
  steps: [
    "Dough: In a bowl, combine flour, egg yolks, a pinch of salt, and some spinach juice. Knead the mixture for about 10 minutes, adding more spinach juice as needed to form a dough with the consistency of play dough. Incorporate rapeseed oil and melted butter to make the dough more elastic and knead for an additional 2 minutes. Cover the dough with a damp tea towel and let it rest for about 20 minutes.",
    "Filling: Chop the spinach and place it in a bowl. Cover with boiling water and let it sit for 1-2 minutes. Drain thoroughly using a sieve, pressing down to remove excess water. Return the spinach to the bowl and mix with crumbled feta, lemon juice, nutmeg, toasted buckwheat groats, and white pepper.",
    "Assembly: Roll out the dough as thinly as possible on a floured surface. Use a cutter to cut out circles. Place a teaspoon of filling in the center of each circle, fold the dough over to create a half-moon shape, and seal the edges tightly by pressing them with your fingertips to create a frilly edge.",
    "Cooking: Bring a large pot of lightly salted water to a boil and add rapeseed oil. Drop the pierogi in batches (5-6 at a time). Cook until they float to the top and then for an additional 3-4 minutes. Remove with a slotted spoon and repeat with remaining pierogi.",
    "Serving: Garnish the cooked pierogi with watercress."
  ]
},
{
  id: 48,
  title: "Pan-Fried Soup Dumplings",
  ingredients: ["minced-meat", "green-onion", "mushroom", "ginger", "garlic", "sugar", "sake", "sesame-oil", "soy-sauce", "gelatin-powder", "flour", "baking-powder", "sesame-seeds", "vegetable-oil","chicken-stock-powder"],
  image: "/images/panFriedSoupDumplings1.jpg",
  time: "2 hours",
  difficulty: "Challenging",
  ingredientsList: [
    { "hot water (for soup)": "½ cup (120 mL)" },
    { "gelatin-powder": "¼ oz (5 g)" },
    { "soy-sauce": "1 tablespoon" },
    { "chicken-stock-powder": "1 tablespoon" },
    { "flour": "2 cups (250 g)(for wrappers)" },
    { "baking-powder": "2 teaspoons" },
    { "hot water (for dough)": "⅓ cup (80 mL)" },
    { "minced-meat": "150 g, pork" },
    { "green-onion": "1, thinly sliced" },
    { "mushroom": "2 shitake, thinly sliced" },
    { "ginger": "1 teaspoon, grated" },
    { "garlic": "1 teaspoon, grated" },
    { "sugar": "1 teaspoon" },
    { "sake": "1 teaspoon" },
    { "sesame-oil": "1 teaspoon (for filling)" },
    { "soy-sauce": "1 tablespoon (for filling)" },
    { "vegetable-oil": "2 tablespoon (for frying)s" },
    { "water (for steaming)": "¼ cup (50 mL)" },
    { "sesame-oil": "1 tablespoon (for frying)" },
    { "sesame-seeds": "For serving" },
    { "green-onion": "Thinly sliced" }
  ],
  steps: [
    "Soup Preparation: In a medium bowl, combine the hot water, gelatin powder, soy sauce, and chicken stock powder. Mix well. Transfer the mixture to a shallow, heatproof tray and chill in the refrigerator for 1 hour, or until set. Once set, fluff the soup gelatin with a fork to break it up.",
    "Dumpling Wrappers: In a medium bowl, mix flour and baking powder. Pour hot water over the mixture and gently mix to combine. Knead the dough until smooth and elastic. Cover with plastic wrap and let rest for at least 30 minutes at room temperature.",
    "Filling: In a bowl, combine ground pork, green onion, shiitake mushrooms, ginger, garlic, sugar, sake, sesame oil, and soy sauce. Mix well.",
    "Assembly: Roll the dough into a log and divide into 16 pieces. Roll each piece into a flat round using a rolling pin. Place a spoonful of filling and some soup gelatin in the center of each dough round. Pinch the top to seal the dumpling.",
    "Cooking: Heat oil in a medium pan over medium heat. Arrange the dumplings seam side down in the pan, pour in water, and cover. Steam the dumplings for 12 minutes. Add sesame oil to the pan, increase the heat to high, and cook until the bottoms of the dumplings are crispy.",
    "Serving: Serve the dumplings with white sesame seeds and sliced green onion."
  ]
},
{
  "id": 49,
  "title": "Wonton Soup",
  "ingredients": ["dumplings-wrappers", "minced-meat", "shrimp", "ginger", "green-onion", "soy-sauce", "wine", "salt", "sesame-oil", "broth", "garlic", "sugar"],
  "image": "/images/wontonSoup.jpg",
  "time": "35 minutes",
  "difficulty": "Not too tricky",
  "ingredientsList": [
    { "dumplings-wrappers": "50 – 60" },
    { "minced-meat": "200 g, pork" },
    { "shrimp": "200 g, chopped" },
    { "ginger": "1 tbsp, grated (1.5\" / 3 cm piece)" },
    { "green-onion": "2 (5 tbsp)" },
    { "soy-sauce": "1 tbsp, light" },
    { "Chinese cooking wine (Shaoxing wine)": "2 tbsp" },
    { "salt": "½ tsp" },
    { "sesame-oil": "2 tbsp" },
    { "broth": "3 cups chicken broth/ 750 ml" },
    { "garlic": "2 cloves, smashed" },
    { "ginger": "sliced, ⅓\" / 1 cm piece (optional)" },
    { "soy-sauce": "1½ tbsp" },
    { "sugar": "2 tsp" },
    { "wine": "1½ tbsp, chinese cooking wine" },
    { "sesame-oil": "¼ – ½ tsp (for broth)" }
  ],
  "steps": [
    "In a medium bowl, combine the hot water, gelatin, soy sauce, and chicken stock and mix well. Transfer the soup to a shallow heatproof tray and chill in the refrigerator for 1 hour, or until set. When set, fluff the soup and break up with a fork.",
    "For the dough: Add flour and baking powder to a medium bowl. Pour the hot water over the flour mixture, and mix the dough gently to combine. Using your hands, knead the dough until it becomes smooth and elastic. Cover the bowl with plastic wrap and rest for at least 30 minutes at room temperature.",
    "For the filling: Combine the ground pork, green onion, shiitake mushroom, ginger, garlic, sugar, sake, sesame oil, and soy sauce until well mixed.",
    "Roll the dough into a log. Divide it into 16 pieces. Take one piece and shape into a ball, then roll into a flat round using a rolling pin. Put a spoonful of filling and soup gelatin into the center of the dough. Pinch the top a couple of times to close the dumpling. Repeat with the remaining dough and fillings.",
    "Heat the oil in a medium pan over medium heat. Set the dumplings in the pan, seam side down, pour in the water, and cover. Steam the dumplings for 12 minutes. Add the sesame oil in the pan, increase the heat to high, and cook until the bottoms of the dumplings are crisp.",
    "Serve with sesame seeds and sliced green onion."
  ]
},
{
  "id": 50,
  "title": "Steamed Crystal Dumplings",
  "ingredients": ["starch", "water", "vegetable-oil", 'carrot', "mushrooms", "spinach", "carrot", "minced-meat", "wine", "salt", "sugar", "white-pepper", "sesame-oil", "oyster-sauce"],
  "image": "/images/harGow.jpg",
  "time": "4 hours",
  "difficulty": "Challenging",
  "ingredientsList": [
    { "starch": "wheat, 14 tablespoons, tapioca, 3 tablespoons, 3 tablespoons (plus more for kneading), cornstarch 2 teaspoons (for filling)"},
    { "water": "1¼ cups" },
    { "vegetable-oil": "2 teaspoons and 2 teaspoons for filling" },
    { "mushrooms": "4 medium dried shitake" },
    { "spinach": "3 cups" },
    { "carrot": "1 small" },
    { "minced-meat": "230g, pork" },
    { "wine": "1 tablespoon shaoxing wine" },
    { "salt": "1 teaspoon" },
    { "sugar": "¼ teaspoon" },
    { "white-pepper": "⅛ teaspoon" },
    { "sesame-oil": "½ teaspoon" },
    { "oyster-sauce": "2 teaspoons" },
  ],
  "steps": [
    "Make the dough for the wrappers: In a bowl, whisk together the wheat starch, tapioca starch, and cornstarch. In a medium pot, bring 1¼ cups of water and vegetable oil to a boil. Immediately add about a third of the starch mixture to the boiling water, stirring vigorously. Add another third of the starch mixture and mix until paste-like. Add the remaining starch and mix until it forms a shaggy dough. Cover the pot and let the dough rest for 5 minutes.",
    "Lightly dust a clean work surface with cornstarch. Knead the dough with a rubber spatula, then by hand, until smooth and pliable. Roll the dough into a log about 1½ inches thick and 15 inches long. Divide into about 36 pieces, dust with cornstarch, and cover.",
    "Make the filling: Soak dried mushrooms in hot water for 2 hours. Dice finely. Blanch spinach in boiling water, transfer to an ice bath, then squeeze dry. Dice carrots and mushrooms, blanch, and cool. Mix spinach, carrots, mushrooms, pork, Shaoxing wine, cornstarch, salt, sugar, white pepper, sesame oil, oyster sauce, and vegetable oil.",
    "Assemble the dumplings: Roll each dough piece into a 3 to 3½ inch disc on a cornstarch-dusted surface. Place about 1 tablespoon of filling in the center. Shape as desired and seal edges.",
    "Cook the dumplings: Place dumplings in a bamboo steamer lined with perforated parchment paper. Steam over boiling water at medium-high heat for about 6 minutes until translucent. Serve immediately with chili oil."
  ]
},
];

let cachedRecipes = getInitialRecipes();
let lastSelectedTime = getLastSelectedTime();

function isClient() {
  return typeof window !== "undefined";
}

function getInitialRecipes() {
  return recipesData.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function getLastSelectedTime() {
  if (isClient()) {
    const savedTime = localStorage.getItem('lastSelectedTime');
    return savedTime ? new Date(savedTime) : new Date(0);
  }
  return new Date(0); 
}

export function getRandomRecipes() {
  const now = new Date();
  const isResetTime = now.getHours() === 14 && now.getDate() !== lastSelectedTime.getDate();

  if (isResetTime) {
    cachedRecipes = recipesData.sort(() => 0.5 - Math.random()).slice(0, 3); 
    lastSelectedTime = now;
    if (isClient()) {
      localStorage.setItem('lastSelectedTime', lastSelectedTime.toString());
    }
  }

  return cachedRecipes;
}
