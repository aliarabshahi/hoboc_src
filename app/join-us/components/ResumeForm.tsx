"use client";
import { useState } from "react";
import { ResumeSubmissionRequest } from "@/app/types/formsType";
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaFilePdf, FaFileUpload, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ResumeForm() {
  const [resume, setResume] = useState<Omit<ResumeSubmissionRequest, "resume_file">>({
    full_name: "",
    email: "",
    phone_number: "",
    linkedin_profile: "",
    github_profile: "",
    cover_letter: "",
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setMessage("❌ فقط فایل PDF قابل قبول است");
        setResumeFile(null);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setMessage(`❌ حجم فایل نباید بیشتر از ${MAX_SIZE_MB} مگابایت باشد`);
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!resumeFile) {
      setMessage("❌ لطفاً فایل رزومه را انتخاب کنید");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(resume).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("resume_file", resumeFile);

    try {
      const res = await fetch("http://localhost/hoboc/api/resume-submissions/", {
        method: "POST",
        headers: { Authorization: "Token fb65966b2be41961bf8d41278c85782e3c0ee4a7" },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = Object.values(errorData).flat().join(" | ");
        throw new Error(errorMsg);
      }

      setMessage("✅ رزومه با موفقیت ارسال شد");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">ارسال رزومه</h2>
        <p className="text-gray-600 dark:text-gray-400">فرم زیر را برای همکاری با ما تکمیل کنید</p>
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
              value={resume.full_name}
              onChange={(e) => setResume({ ...resume, full_name: e.target.value })}
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
              value={resume.email}
              onChange={(e) => setResume({ ...resume, email: e.target.value })}
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
              value={resume.phone_number}
              onChange={(e) => setResume({ ...resume, phone_number: e.target.value })}
              required
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            لینکدین (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaLinkedin className="text-hoboc" />
            </div>
            <input
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={resume.linkedin_profile || ""}
              onChange={(e) => setResume({ ...resume, linkedin_profile: e.target.value })}
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            گیت‌هاب (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <FaGithub className="text-hoboc" />
            </div>
            <input
              type="url"
              placeholder="https://github.com/your-username"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
              value={resume.github_profile || ""}
              onChange={(e) => setResume({ ...resume, github_profile: e.target.value })}
            />
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            انگیزه‌نامه (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-gray-400">
              <FaFileAlt className="text-hoboc" />
            </div>
            <textarea
              placeholder="دلایل خود برای همکاری با ما را بیان کنید"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 h-32 transition"
              value={resume.cover_letter || ""}
              onChange={(e) => setResume({ ...resume, cover_letter: e.target.value })}
            />
          </div>
        </div>

        {/* Resume File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            فایل رزومه (PDF)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaFileUpload className="w-8 h-8 mb-3 text-hoboc" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">برای آپلود کلیک کنید</span> یا فایل را بکشید و رها کنید
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  فقط فایل‌های PDF (حداکثر {MAX_SIZE_MB}MB)
                </p>
              </div>
              <input 
                type="file" 
                accept=".pdf" 
                className="hidden" 
                onChange={handleFileChange} 
                required 
              />
            </label>
          </div>
          {resumeFile && (
            <div className="mt-2 flex items-center text-sm text-hoboc">
              <FaFilePdf className="ml-1" />
              {resumeFile.name}
            </div>
          )}
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
            "ارسال رزومه"
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