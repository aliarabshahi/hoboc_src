import { RoadmapItem } from "./components/RoadmapItem";
import { RoadmapLegend } from "./components/RoadmapLegend";
import { RoadmapItem as RoadmapItemType, RoadmapLevel, RoadmapStatus }  from "@/app/types/roadmapType";

const RoadmapPage = () => {
  const roadmapData: RoadmapItemType[] = [
    {
      id: '1',
      title: 'مفاهیم مقدماتی از مهندسی داده',
      description: 'آشنایی با اصول اولیه مهندسی داده و معماری سیستم‌های داده',
      level: 'مبتدی',
      status: 'تکمیل شده',
      resources: [
        { title: 'مقاله مهندسی داده چیست؟', url: '#' },
        { title: 'معماری سیستم‌های داده', url: '#' }
      ]
    },
    {
      id: '2',
      title: 'داکر، آشنایی و کار با کانتینرها',
      description: 'یادگیری مفاهیم کانتینریزاسیون و پیاده‌سازی با داکر',
      level: 'مبتدی',
      status: 'در حال یادگیری',
      resources: [
        { title: 'داکر از صفر تا صد', url: '#' },
        { title: 'Docker Documentation', url: '#' }
      ]
    },
    {
      id: '3',
      title: 'لینوکس و خط فرمان شگفت‌انگیز آن',
      description: 'کار با ترمینال لینوکس و دستورات اساسی',
      level: 'مبتدی',
      status: 'شروع‌نشده'
    },
    {
      id: '4',
      title: 'انجام یک پروژه‌ی ETL ساده با کرون‌جابزها',
      description: 'پیاده‌سازی یک پروژه استخراج، تبدیل و بارگذاری داده',
      level: 'متوسط',
      status: 'شروع‌نشده'
    },
    {
      id: '5',
      title: 'آپاچی ایرفلو، یک سیستم مدیریت جریان داده',
      description: 'یادگیری اورکستراسیون جریان‌های داده با Airflow',
      level: 'متوسط',
      status: 'شروع‌نشده'
    },
    {
      id: '6',
      title: 'آشنایی و کار عملی با الستیک و کیبانا',
      description: 'جستجو و تجسم داده‌ها با Elasticsearch و Kibana',
      level: 'متوسط',
      status: 'شروع‌نشده'
    },
    {
      id: '7',
      title: 'گیت برای مدیریت ورژن کدها',
      description: 'یادگیری سیستم کنترل نسخه Git',
      level: 'مبتدی',
      status: 'شروع‌نشده'
    },
    {
      id: '8',
      title: 'آشنایی و کار عملی با گیت‌هاب اکشنز',
      description: 'اتوماسیون فرآیندها با GitHub Actions',
      level: 'متوسط',
      status: 'شروع‌نشده'
    },
    {
      id: '9',
      title: 'پوستگرس، پیشرفته‌ترین دیتابیس رایگان دنیا',
      description: 'کار با PostgreSQL و ویژگی‌های پیشرفته آن',
      level: 'متوسط',
      status: 'شروع‌نشده'
    },
    {
      id: '10',
      title: 'آشنایی و کار با کلیک‌هاوس',
      description: 'پردازش تحلیلی آنلاین با ClickHouse',
      level: 'پیشرفته',
      status: 'شروع‌نشده'
    },
    {
      id: '11',
      title: 'آپاچی کافکا، غولی در دنیای پردازش داده‌های استریم',
      description: 'کار با سیستم پیام‌رسانی توزیع‌شده Kafka',
      level: 'پیشرفته',
      status: 'شروع‌نشده'
    },
    {
      id: '12',
      title: 'آپاچی فلینک، یکی از بهترین گزینه‌ها در دنیای پردازش استریم',
      description: 'پردازش جریان‌های داده با Apache Flink',
      level: 'پیشرفته',
      status: 'شروع‌نشده'
    },
    {
      id: '13',
      title: 'آپاچی اسپارک، سرعت و قدرت همزمان در پردازش داده',
      description: 'پردازش توزیع‌شده داده‌ها با Apache Spark',
      level: 'پیشرفته',
      status: 'شروع‌نشده'
    },
    {
      id: '14',
      title: 'طراحی و پیاده‌سازی یک دیتالیک‌هوز با دلتالیک',
      description: 'مدیریت دریاچه داده با Delta Lake',
      level: 'پیشرفته',
      status: 'شروع‌نشده'
    },
    {
      id: '15',
      title: 'رایانش ابری برای مهندسی داده با آروان‌کلاد',
      description: 'پیاده‌سازی راهکارهای ابری ایرانی',
      level: 'متوسط',
      status: 'شروع‌نشده'
    },
    {
      id: '16',
      title: 'رایانش ابری برای مهندسی داده با آمازون',
      description: 'کار با سرویس‌های AWS برای مهندسی داده',
      level: 'پیشرفته',
      status: 'شروع‌نشده'
    },
    {
      id: '17',
      title: 'کوبرنتیز، بهترین سیستم مدیریت کانتینرها',
      description: 'اورکستراسیون کانتینرها با Kubernetes',
      level: 'پیشرفته',
      status: 'شروع‌نشده'
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 py-12 px-4 sm:px-6 lg:px-8 font-vazir">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hoboc-dark mb-4">نقشه راه جامع مهندسی داده</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            مسیر یادگیری مهارت‌های ضروری برای تبدیل شدن به یک مهندس داده حرفه‌ای
          </p>
        </div>

        <div className="space-y-5">
          {roadmapData.map((item) => (
            <RoadmapItem
              key={item.id}
              {...item}
            />
          ))}
        </div>

        <RoadmapLegend />
      </div>
    </div>
  );
};

export default RoadmapPage;
