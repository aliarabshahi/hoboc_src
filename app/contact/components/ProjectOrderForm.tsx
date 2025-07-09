"use client";
import { useState } from "react";
import { ProjectOrderRequest } from "@/app/types/formsType";
import { postApiData } from "@/app/services/api/apiServerPost";
import { FaUser, FaEnvelope, FaPhone, FaFileAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProjectOrderForm() {
  const [projectOrder, setProjectOrder] = useState<ProjectOrderRequest>({
    full_name: "",
    email: "",
    phone_number: "",
    project_description: "",
    budget: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await postApiData("/project-orders/", projectOrder);
    setLoading(false);
    setMessage(error ? `❌ ${error}` : "✅ سفارش شما با موفقیت ثبت شد");
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">سفارش پروژه</h2>
        <p className="text-gray-600 dark:text-gray-400">فرم زیر را پر کنید تا با شما تماس بگیریم</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            نام کامل
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaUser className="text-hoboc" />
            </div>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={projectOrder.full_name}
              onChange={(e) => setProjectOrder({ ...projectOrder, full_name: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            ایمیل
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaEnvelope className="text-hoboc" />
            </div>
            <input
              type="email"
              placeholder="ایمیل شما"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={projectOrder.email}
              onChange={(e) => setProjectOrder({ ...projectOrder, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            شماره تماس
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaPhone className="text-hoboc" />
            </div>
            <input
              type="tel"
              placeholder="مثلاً 09123456789"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={projectOrder.phone_number}
              onChange={(e) => setProjectOrder({ ...projectOrder, phone_number: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            توضیحات پروژه
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-gray-400">
              <FaFileAlt className="text-hoboc" />
            </div>
            <textarea
              placeholder="جزئیات پروژه مورد نظر خود را شرح دهید"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 h-32 transition"
              value={projectOrder.project_description}
              onChange={(e) => setProjectOrder({ ...projectOrder, project_description: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            بودجه پیشنهادی (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaMoneyBillWave className="text-hoboc" />
            </div>
            <input
              type="text"
              placeholder="مثلاً ۵,۰۰۰,۰۰۰ تومان"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={projectOrder.budget || ""}
              onChange={(e) => setProjectOrder({ ...projectOrder, budget: e.target.value })}
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            مهلت انجام (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaCalendarAlt className="text-hoboc" />
            </div>
            <input
              type="text"
              placeholder="مثلاً ۲ هفته"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={projectOrder.deadline || ""}
              onChange={(e) => setProjectOrder({ ...projectOrder, deadline: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-hoboc hover:bg-hoboc-dark text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "ارسال سفارش"
          )}
          {loading && "در حال ارسال..."}
        </button>

        {/* Feedback Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-sm ${
              message.startsWith("✅") 
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            {message}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}