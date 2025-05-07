import React, { useState, useEffect } from 'react';

const QuizPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const questions = [
    {
      id: 1,
      question: "ReactJS là gì?",
      options: [
        "Một ngôn ngữ lập trình",
        "Một framework của Angular",
        "Một thư viện JavaScript để xây dựng giao diện người dùng",
        "Một công cụ quản lý cơ sở dữ liệu"
      ],
      answer: "Một thư viện JavaScript để xây dựng giao diện người dùng"
    },
    {
      id: 2,
      question: "Virtual DOM có lợi ích gì trong React?",
      options: [
        "Tăng khả năng lưu trữ",
        "Tăng hiệu suất render bằng cách tránh thao tác trực tiếp DOM thật",
        "Thêm hiệu ứng cho website",
        "Giảm kích thước file JavaScript"
      ],
      answer: "Tăng hiệu suất render bằng cách tránh thao tác trực tiếp DOM thật"
    },
    {
      id: 3,
      question: "JSX là gì?",
      options: [
        "Một cú pháp mở rộng của CSS",
        "Một ngôn ngữ khác của JavaScript",
        "Một cách viết HTML bên trong JavaScript",
        "Một thư viện của React"
      ],
      answer: "Một cách viết HTML bên trong JavaScript"
    },
    {
      id: 4,
      question: "Props trong React dùng để:",
      options: [
        "Lưu trữ dữ liệu nội bộ",
        "Truyền dữ liệu giữa các component",
        "Thay đổi DOM",
        "Gọi API"
      ],
      answer: "Truyền dữ liệu giữa các component"
    },
    {
      id: 5,
      question: "State khác với Props ở điểm nào?",
      options: [
        "State dùng để truyền dữ liệu",
        "State chỉ tồn tại ở component cha",
        "State được quản lý bên trong component",
        "State không thể thay đổi"
      ],
      answer: "State được quản lý bên trong component"
    },
    {
      id: 6,
      question: "useEffect được gọi khi nào?",
      options: [
        "Trước khi component được khởi tạo",
        "Sau khi component render",
        "Khi nhấn nút",
        "Khi component bị xóa"
      ],
      answer: "Sau khi component render"
    },
    {
      id: 7,
      question: "Hook nào được dùng để lưu trạng thái?",
      options: ["useEffect", "useMemo", "useState", "useContext"],
      answer: "useState"
    },
    {
      id: 8,
      question: "Để định nghĩa một route trong react-router-dom, chúng ta dùng component nào?",
      options: ["<Path>", "<Router>", "<Route>", "<Page>"],
      answer: "<Route>"
    },
    {
      id: 9,
      question: "useParams dùng để:",
      options: [
        "Lấy query string",
        "Định tuyến",
        "Lấy tham số từ URL",
        "Lưu dữ liệu"
      ],
      answer: "Lấy tham số từ URL"
    },
    {
      id: 10,
      question: "Lệnh nào sau đây dùng fetch để gọi GET API?",
      options: ["fetch('/api/data')", "axios.post('/api')", "get('/api')", "useFetch()"],
      answer: "fetch('/api/data')"
    },
    {
      id: 11,
      question: "Khi gọi API, loading state nên được đặt khi nào?",
      options: [
        "Sau khi gọi xong",
        "Trước khi gọi API và kết thúc khi dữ liệu trả về",
        "Khi nhận được lỗi",
        "Sau khi cập nhật DOM"
      ],
      answer: "Trước khi gọi API và kết thúc khi dữ liệu trả về"
    },
    {
      id: 12,
      question: "useContext được dùng để:",
      options: [
        "Gọi API",
        "Truy cập giá trị từ Context Provider",
        "Tạo UI",
        "Render component"
      ],
      answer: "Truy cập giá trị từ Context Provider"
    },
    {
      id: 13,
      question: "Controlled component là gì?",
      options: [
        "Component không có state",
        "Component có giá trị form được điều khiển bởi state",
        "Component tự động validate",
        "Component chỉ đọc"
      ],
      answer: "Component có giá trị form được điều khiển bởi state"
    },
    {
      id: 14,
      question: "Thư viện nào giúp validate form hiệu quả trong React?",
      options: ["Bootstrap", "Axios", "Yup", "Redux"],
      answer: "Yup"
    },
    {
      id: 15,
      question: "useEffect có thể return gì?",
      options: [
        "Một string",
        "Một callback function để clean up",
        "Một DOM element",
        "Một component"
      ],
      answer: "Một callback function để clean up"
    },
    {
      id: 16,
      question: "Khi dependency array của useEffect rỗng, hook sẽ chạy:",
      options: [
        "Mỗi lần render",
        "Chỉ một lần sau khi mount",
        "Không bao giờ chạy",
        "Sau mỗi lần cập nhật state"
      ],
      answer: "Chỉ một lần sau khi mount"
    },
    {
      id: 17,
      question: "Cách thêm style trực tiếp trong JSX?",
      options: [
        'style="color: red"',
        "style={{ color: 'red' }}",
        'class="red"',
        'css="red"'
      ],
      answer: "style={{ color: 'red' }}"
    },
    {
      id: 18,
      question: "Thư viện nào sau đây chuyên dùng để styled-component?",
      options: ["lodash", "tailwind", "styled-components", "bootstrap"],
      answer: "styled-components"
    },
    {
      id: 19,
      question: "Để tích hợp biểu đồ bằng thư viện Chart.js ta cần:",
      options: [
        "Cài đặt và import thư viện",
        "Cài Node.js",
        "Dùng Redux",
        "Cài VSCode"
      ],
      answer: "Cài đặt và import thư viện"
    },
    {
      id: 20,
      question: "npm install dùng để làm gì?",
      options: [
        "Chạy React",
        "Cài đặt các package cần thiết",
        "Tạo component",
        "Tạo route"
      ],
      answer: "Cài đặt các package cần thiết"
    },
    {
      id: 21,
      question: "Câu lệnh build React app?",
      options: ["npm start", "npm run build", "react-build", "yarn dev"],
      answer: "npm run build"
    },
    {
      id: 22,
      question: "Sau khi build, thư mục build/ chứa:",
      options: [
        "Mã nguồn gốc",
        "Các file đã tối ưu để deploy",
        "File database",
        "File debug"
      ],
      answer: "Các file đã tối ưu để deploy"
    },
    {
      id: 23,
      question: "Đâu là hook hợp lệ trong React?",
      options: ["useProps", "useStyle", "useEffect", "useThis"],
      answer: "useEffect"
    },
    {
      id: 24,
      question: "File package.json dùng để:",
      options: [
        "Chứa style",
        "Lưu thông tin project và dependency",
        "Render UI",
        "Tạo route"
      ],
      answer: "Lưu thông tin project và dependency"
    },
    {
      id: 25,
      question: "Đâu là công cụ giúp debug component React hiệu quả?",
      options: [
        "Chrome Inspect",
        "Redux Toolkit",
        "React DevTools",
        "Firebase"
      ],
      answer: "React DevTools"
    }
  ];
  
// Hàm trộn câu hỏi (Fisher-Yates)
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffleArray(questions));


  const handleChange = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        score += 1;
      }
    });

    setScore(score);

    setSubmitted(true);
    setShowModal(true); // Hiện modal sau khi nộp bài

    // Lưu kết quả vào localStorage theo user
    const results = JSON.parse(localStorage.getItem('quiz_results') || '{}');
    results[user?.username || 'unknown'] = {
      score,
      total: questions.length,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem('quiz_results', JSON.stringify(results));
  };

  if (!user) {
    return <div className="p-6 text-red-600">Bạn chưa đăng nhập.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Bài kiểm tra</h1>
      <p className="mb-6">Xin chào <strong>{user.username}</strong>, hãy hoàn thành bài kiểm tra dưới đây.</p>

      {shuffledQuestions.map((q) => (
        <div key={q.id} className="mb-6">
          <h2 className="font-semibold mb-2">{q.question}</h2>
          <div className="space-y-2">
            {q.options.map(opt => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  disabled={submitted}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Nộp bài
        </button>
      ) : (
        <div className="mt-4 text-green-700 font-semibold">
          ✅ Bạn đã hoàn thành bài kiểm tra. Điểm: {score}/{questions.length}
        </div>
      )}

        {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold text-green-600 mb-4">🎉 Đã nộp bài thành công!</h2>
            <p className="text-gray-700 mb-2">Bạn đã hoàn thành bài kiểm tra.</p>
            <p className="font-semibold">Điểm của bạn: {score}/{questions.length}</p>
            <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Đóng
            </button>
            </div>
        </div>
        )}

    </div>
  );
};

export default QuizPage;
