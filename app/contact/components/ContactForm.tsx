"use client";
import { useState } from "react";
import { ContactUsRequest } from "@/app/types/formsType";
import { postApiData } from "@/app/services/api/apiClientPost";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaComment,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [contact, setContact] = useState<ContactUsRequest>({
    full_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof ContactUsRequest, value: string) => {
    setContact({ ...contact, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await postApiData("/contact-us/", contact);
    setLoading(false);
    setMessage(error ? ` ${error}` : "پیام شما با موفقیت ارسال شد");
    if (!error) {
      setContact({ full_name: "", email: "", phone_number: "", message: "" });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">
          تماس با ما
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          سوالات و پیشنهادات خود را با ما در میان بگذارید
        </p>
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
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={contact.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
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
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={contact.email}
              onChange={(e) => handleChange("email", e.target.value)}
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
              pattern="^0.*$"
              maxLength={12}
              required
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={contact.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  "The Phone Number must start with 0 And in English Please"
                )
              }
              onInput={(e) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            پیام شما
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-gray-400">
              <FaComment className="text-hoboc" />
            </div>
            <textarea
              placeholder="متن پیام..."
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 h-32 transition"
              value={contact.message}
              onChange={(e) => handleChange("message", e.target.value)}
              required
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
            <FaPaperPlane className="text-sm" />
          )}
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>

        {/* Feedback Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              !message.startsWith("پیام شما")
                ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
            }`}
          >
            {!message.startsWith("پیام شما") ? (
              <FaTimesCircle className="flex-shrink-0" />
            ) : (
              <FaCheckCircle className="flex-shrink-0" />
            )}
            {message}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}
