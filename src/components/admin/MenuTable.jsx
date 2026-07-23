import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Pencil,
  Trash2,
  PackageOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = [
  "All",
  "Appetizers",
  "Mains",
  "Sides",
  "Desserts",
  "Drinks",
  "Fast Food",
  "Rice Dishes",
  "Grilled Meals",
  "Soups",
  "Salads",
];

const ITEMS_PER_PAGE = 8;

const MenuTable = ({
  meals = [],
  loading = false,
  error = "",
  onEdit,
  onDelete,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchSearch =
        meal.name?.toLowerCase().includes(search.toLowerCase()) ||
        meal.description?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All" ||
        meal.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [meals, search, selectedCategory]);

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);

  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 rounded-3xl p-8 text-center">
        {error}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-12 text-center">
        <PackageOpen className="mx-auto text-gray-400" size={70} />

        <h2 className="mt-5 text-2xl font-bold dark:text-white">
          No Menu Items Found
        </h2>

        <p className="text-gray-500 mt-2">
          Click Add New Meal to create a menu item.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden"
    >

      <div className="p-6 border-b dark:border-gray-700 flex flex-col lg:flex-row gap-4 justify-between">

        <div className="relative w-full lg:w-96">
          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search meals..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white outline-none"
          />
        </div>


        <select
          value={selectedCategory}
          onChange={(e)=>{
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 rounded-xl border dark:bg-gray-800 dark:text-white"
        >
          {categories.map((cat)=>(
            <option key={cat}>
              {cat}
            </option>
          ))}
        </select>

      </div>


      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Meal</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>


          <tbody>

          {paginatedMeals.length > 0 ? (

            paginatedMeals.map((meal)=>(

              <motion.tr
                key={meal._id}
                initial={{opacity:0}}
                animate={{opacity:1}}
                className="border-b dark:border-gray-700"
              >

                <td className="px-6 py-4">
                  <img
                    src={
                      meal.image
                      ? `http://localhost:5000${meal.image}`
                      : "/placeholder-food.png"
                    }
                    alt={meal.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </td>


                <td className="px-6 py-4">

                  <p className="font-bold dark:text-white">
                    {meal.name}
                  </p>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {meal.description}
                  </p>

                </td>


                <td className="px-6 py-4">

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                    {meal.category}
                  </span>

                </td>


                <td className="px-6 py-4 font-bold text-green-600">
                  ₦{Number(meal.price).toLocaleString()}
                </td>


                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      meal.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                  >
                    {meal.isAvailable ? "Available" : "Unavailable"}
                  </span>

                </td>


                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={()=>onEdit(meal)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
                    >
                      <Pencil size={18}/>
                    </button>


                    <button
                      onClick={()=>onDelete(meal)}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                    >
                      <Trash2 size={18}/>
                    </button>

                  </div>

                </td>


              </motion.tr>

            ))

          ) : (

            <tr>
              <td colSpan="6" className="text-center py-12">
                <PackageOpen className="mx-auto text-gray-400" size={60}/>
                <p className="mt-3 text-gray-500">
                  No meals found
                </p>
              </td>
            </tr>

          )}

          </tbody>

        </table>

      </div>


      {totalPages > 1 && (

        <div className="flex justify-between items-center p-6 border-t">

          <button
            disabled={currentPage===1}
            onClick={()=>setCurrentPage(p=>p-1)}
            className="flex items-center gap-2 px-4 py-2 border rounded-xl"
          >
            <ChevronLeft size={18}/>
            Previous
          </button>


          <span className="font-bold">
            {currentPage} / {totalPages}
          </span>


          <button
            disabled={currentPage===totalPages}
            onClick={()=>setCurrentPage(p=>p+1)}
            className="flex items-center gap-2 px-4 py-2 border rounded-xl"
          >
            Next
            <ChevronRight size={18}/>
          </button>

        </div>

      )}

    </motion.div>
  );
};

export default MenuTable;