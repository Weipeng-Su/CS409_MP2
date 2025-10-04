import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Pokémon Explorer</h1>
      <nav className="flex gap-4">
        <Link to="/list" className="underline">List View</Link>
        <Link to="/gallery" className="underline">Gallery View</Link>
      </nav>
    </div>
  );
}