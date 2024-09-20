// pages/availability.js
import React from "react";
import { libraryBooks, labEquipment } from "./data";

const Availability = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Real-Time Availability
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Library Books Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
          <div className="bg-blue-500 p-4 text-white text-xl font-semibold">
            Library Books
          </div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Availability</th>
              </tr>
            </thead>
            <tbody>
              {libraryBooks.map((book, index) => (
                <tr
                  key={index}
                  className={book.available ? "bg-green-100" : "bg-red-100"}
                >
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">
                    {book.available ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-600">Checked Out</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lab Equipment Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
          <div className="bg-blue-500 p-4 text-white text-xl font-semibold">
            Lab Equipment
          </div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Equipment Name</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {labEquipment.map((equipment, index) => (
                <tr
                  key={index}
                  className={
                    equipment.status === "Available"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }
                >
                  <td className="px-4 py-2">{equipment.equipment}</td>
                  <td className="px-4 py-2">
                    {equipment.status === "Available" ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-600">In Use</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Availability;
