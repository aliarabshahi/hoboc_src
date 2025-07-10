"use client";
import { useState } from "react";
import { ProjectOrderRequest } from "@/app/types/formsType";
import { postApiData } from "@/app/services/api/apiServerPost";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
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

    if (!error) {
      setProjectOrder({
        full_name: "",
        email: "",
        phone_number: "",
        project_description: "",
        budget: "",
        deadline: "",
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">
          سفارش پروژه
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          فرم زیر را پر کنید تا با شما تماس بگیریم
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <FormField
          label="نام کامل"
          icon={<FaUser className="text-hoboc" />}
          placeholder="نام و نام خانوادگی"
          value={projectOrder.full_name}
          onChange={(v) => setProjectOrder({ ...projectOrder, full_name: v })}
          required
        />

        {/* Email */}
        <FormField
          label="ایمیل"
          icon={<FaEnvelope className="text-hoboc" />}
          placeholder="ایمیل شما"
          type="email"
          value={projectOrder.email}
          onChange={(v) => setProjectOrder({ ...projectOrder, email: v })}
          required
        />

        {/* Phone */}
        <FormField
          label="شماره تماس"
          icon={<FaPhone className="text-hoboc" />}
          placeholder="مثلاً 09123456789"
          type="tel"
          value={projectOrder.phone_number}
          onChange={(v) =>
            setProjectOrder({ ...projectOrder, phone_number: v })
          }
          required
        />

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
              onChange={(e) =>
                setProjectOrder({
                  ...projectOrder,
                  project_description: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Budget */}
        <FormField
          label="بودجه پیشنهادی (اختیاری)"
          icon={<FaMoneyBillWave className="text-hoboc" />}
          placeholder="مثلاً ۵,۰۰۰,۰۰۰ تومان"
          value={projectOrder.budget || ""}
          onChange={(v) => setProjectOrder({ ...projectOrder, budget: v })}
        />

        {/* Deadline */}
        <FormField
          label="مهلت انجام (اختیاری)"
          icon={<FaCalendarAlt className="text-hoboc" />}
          placeholder="مثلاً ۲ هفته"
          value={projectOrder.deadline || ""}
          onChange={(v) => setProjectOrder({ ...projectOrder, deadline: v })}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-hoboc hover:bg-hoboc-dark text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              در حال ارسال...
            </>
          ) : (
            "ارسال سفارش"
          )}
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

// ✅ Reusable Input Field Component
function FormField({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    </div>
  );
}
