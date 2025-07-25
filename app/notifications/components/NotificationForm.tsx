// app/notifications/components/NotificationForm.tsx
"use client";
import { useState, useEffect } from "react";
import { postApiData } from "@/app/services/api/apiClientPost";
import { getApiData } from "@/app/services/api/apiServerFetch";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaPaperPlane,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface NotificationRequest {
  full_name: string;
  email: string;
  phone_number: string;
  topics: number[]; // Array of topic IDs
}

export default function NotificationForm() {
  const [notification, setNotification] = useState<NotificationRequest>({
    full_name: "",
    email: "",
    phone_number: "",
    topics: [],
  });

  const [topics, setTopics] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      const response = await getApiData("/course-topics/");
      if (response.data) {
        setTopics(
          Array.isArray(response.data)
            ? response.data
            : response.data.results || []
        );
      }
    };
    fetchTopics();
  }, []);

  const handleChange = (field: keyof NotificationRequest, value: string) => {
    setNotification({ ...notification, [field]: value });
  };

  const toggleTopic = (topicId: number) => {
    setNotification((prev) => {
      const newTopics = prev.topics.includes(topicId)
        ? prev.topics.filter((id) => id !== topicId)
        : [...prev.topics, topicId];
      return { ...prev, topics: newTopics };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (notification.topics.length === 0) {
      setMessage("لطفاً حداقل یک موضوع را انتخاب کنید");
      return;
    }

    setLoading(true);

    const payload = {
      mobile: notification.phone_number,
      email: notification.email,
      full_name: notification.full_name,
      topics: notification.topics,
    };

    const { error } = await postApiData(
      "/notification-subscriptions/",
      payload
    );
    setLoading(false);
    setMessage(error ? ` ${error}` : "مشخصات شما با موفقیت ارسال شد!");
    if (!error) {
      setNotification({
        full_name: "",
        email: "",
        phone_number: "",
        topics: [],
      });
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
          نوتیفیکیشن جات!!!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          اگه دوست داری زودتر از بقیه باخبر شی، شمارتو وارد کن!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            نام کامل (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaUser className="text-hoboc" />
            </div>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={notification.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            ایمیل (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaEnvelope className="text-hoboc" />
            </div>
            <input
              type="email"
              placeholder="ایمیل شما"
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={notification.email}
              onChange={(e) => handleChange("email", e.target.value)}
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
  value={notification.phone_number}
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

        {/* Topics Selection */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            موضوعات مورد علاقه
          </label>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  notification.topics.includes(topic.id)
                    ? "bg-hoboc text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>
          {notification.topics.length === 0 && (
            <p className="mt-3 text-sm text-center text-hoboc-dark font-bold">
              لطفاً حداقل یک موضوع را انتخاب کنید
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || notification.topics.length === 0}
          className="w-full bg-hoboc hover:bg-hoboc-dark text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : null}
          {loading ? "در حال ارسال..." : "ارسال مشخصات"}
        </button>

        {/* Feedback Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              !message.startsWith("مشخصات شما")
                ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
            }`}
          >
            {!message.startsWith("مشخصات شما") ? (
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
