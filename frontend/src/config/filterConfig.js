// src/config/filterConfig.js

// This file is the single source of truth for all product filter options.
// All components should import their filter data from here.

export const productTypes = [
  'Tops', 'Dresses', 'Pants', 'Shorts', 'Skirts', 'Workwear'
];

export const sizes = [
  'S', 'M', 'L', 'XL', '2XL'
];

// Combined list of all colors from both filter components.
export const colors = [
  'Beige', 'Black', 'Blue', 'Red', 'Green', 'Pink', 'Purple', 'Yellow'
];

// Availability options remain here for consistency.
export const availabilityOptions = [
  { value: true, label: 'In Stock' },
  { value: false, label: 'Out Of Stock' },
];