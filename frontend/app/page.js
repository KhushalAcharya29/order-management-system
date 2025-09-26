// frontend/app/page.js
import Link from "next/link";
import { FaBoxes, FaUserCog, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800 text-white p-6 md:p-10">
      {/* Hero Section */}
      <section className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 drop-shadow-lg">
          Order Management System
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Streamline your order processes from customer submission to administrative oversight.
          Effortlessly manage and track all your product orders.
        </p>
      </section>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">

        {/* Card 1: Place Order */}
        <Link href="/order" className="group">
          <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl transition-all duration-300 ease-in-out
                          hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"> {/* <-- UPDATED HOVER EFFECT */}
            <FaBoxes className="text-blue-400 text-5xl mb-4" />
            <h2 className="text-3xl font-bold text-blue-300 mb-2">Place New Order</h2>
            <p className="text-gray-400 text-center text-base">
              Customers can submit product orders quickly and easily.
            </p>
          </div>
        </Link>

        {/* Card 2: Admin Panel */}
        <Link href="/admin/login" className="group">
          <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl transition-all duration-300 ease-in-out
                          hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"> {/* <-- UPDATED HOVER EFFECT */}
            <FaUserCog className="text-green-400 text-5xl mb-4" />
            <h2 className="text-3xl font-bold text-green-300 mb-2">Admin Panel</h2>
            <p className="text-gray-400 text-center text-base">
              Secure access for administrators to manage all incoming orders.
            </p>
          </div>
        </Link>

        {/* Card 3: View Dashboard */}
        <Link href="/admin/dashboard" className="group">
          <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl transition-all duration-300 ease-in-out
                          hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"> {/* <-- UPDATED HOVER EFFECT */}
            <FaChartLine className="text-purple-400 text-5xl mb-4" />
            <h2 className="text-3xl font-bold text-purple-300 mb-2">View Dashboard</h2>
            <p className="text-gray-400 text-center text-base">
              Overview of all orders, filtering, editing, and deletion capabilities.
            </p>
          </div>
        </Link>

      </div>
    </main>
  );
}