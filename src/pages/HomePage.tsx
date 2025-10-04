import { Link } from "react-router-dom";
import pokenmon1 from "../Images/pokemon1.jpg"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-b from-yellow-100 to-yellow-200">
      {/* Title Section */}
      <h1 className="text-5xl font-extrabold text-yellow-800 mb-6 drop-shadow-lg">
        Pokémon Explorer
      </h1>

      {/* Image */}
      <img
        src={pokenmon1}
        alt="Pokéball"
        className="w-200 h-48 mb-6 drop-shadow-md rounded-lg"
      />

      {/* Subtitle */}
      <p className="text-lg text-yellow-700 mb-6 font-semibold">
        Discover, browse, and catch them all!
      </p>

      {/* Navigation */}
      <nav className="flex gap-6">
        <Link
          to="/list"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-2xl shadow-md transition-transform transform hover:scale-105"
        >
          List View
        </Link>
        <Link
          to="/gallery"
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-2xl shadow-md transition-transform transform hover:scale-105"
        >
          Gallery View
        </Link>
      </nav>
    </div>
  );
}