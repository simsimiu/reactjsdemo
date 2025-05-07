import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">
          🎓 Chào mừng bạn đến với Nền tảng Kiểm Tra Cuối Khóa ReactJS
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">📘 Giới thiệu trang</h2>
          <p className="text-gray-700">
            Trang web này giúp học viên tổng hợp kiến thức và thực hành thông qua các bài kiểm tra sau khi hoàn thành khóa học. Tại đây, bạn có thể luyện tập và đánh giá trình độ lập trình ReactJS của mình một cách trực quan và hiệu quả.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">⚛️ Giới thiệu khóa học ReactJS</h2>
          <p className="text-gray-700 mb-2">
            Khóa học <strong>ReactJS</strong> cung cấp kiến thức từ cơ bản đến nâng cao về xây dựng giao diện người dùng bằng thư viện React, bao gồm các khái niệm như JSX, component, props, state, hook, routing, và quản lý form.
          </p>
          <Link
            to="/reactjs"
            className="inline-block mt-2 text-blue-600 hover:underline font-medium"
          >
            ➜ Xem chi tiết khóa học
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">📝 Giới thiệu bài kiểm tra cuối khóa</h2>
          <p className="text-gray-700 mb-2">
            Sau khi hoàn thành khóa học, bạn có thể làm bài kiểm tra trắc nghiệm gồm <strong>25 câu hỏi</strong>, mỗi câu chỉ có <strong>1 đáp án đúng</strong>. Hệ thống sẽ tính điểm và hiển thị kết quả ngay sau khi nộp bài.
          </p>
          <Link
            to="/quizpage"
            className="inline-block mt-2 text-green-600 hover:underline font-medium"
          >
            ➜ Làm bài kiểm tra ngay
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
