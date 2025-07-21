export const cartItemClasses = {
  container: "flex items-start space-x-4 py-6 border-b border-gray-200 last:border-b-0 relative",
  imageContainer: "flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative",
  image: "w-full h-full object-cover rounded-md",
  content: "flex-1 min-w-0",
  title: "text-base sm:text-lg font-medium text-gray-900 mb-1",
  genre: "text-sm text-gray-500 mb-2",
  description: "text-sm text-gray-600 mb-2 line-clamp-2",
  price: "text-sm text-gray-600 mb-3",
  controls: "flex items-center space-x-2",
  quantityButton:
    "w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors",
  quantity: "mx-2 text-sm font-medium min-w-8 text-center",
  removeButton: "absolute top-2 right-2 text-gray-400 hover:text-red-600 text-lg font-bold transition-colors",
  priceContainer: "text-right flex-shrink-0",
  totalPrice: "text-base sm:text-lg font-semibold text-gray-900",
  newBadge: "absolute -top-1 -left-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded",
}
