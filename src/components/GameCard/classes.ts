export const gameCardClasses = {
  container:
    "block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer",
  imageContainer: "relative aspect-video overflow-hidden",
  image: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
  content: "p-4",
  title: "text-lg font-semibold text-gray-900 mb-2 line-clamp-2",
  genre: "text-sm text-gray-500 mb-2",
  price: "text-xl font-bold text-gray-900 mb-3",
  button:
    "w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium",
  buttonRemove:
    "w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium",
  newBadge: "absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium",
}
