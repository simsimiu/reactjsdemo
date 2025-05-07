import React, { useEffect, useState } from 'react';
import { fetchCourseDetails, fetchCourseChapters } from '../api/api';

const CourseInfo = () => {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fake data
        const courseData = { title: "Khóa học ReactJS", description: "Khóa học ReactJS cung cấp kiến thức từ cơ bản đến nâng cao về xây dựng giao diện người dùng bằng thư viện React, bao gồm các khái niệm như JSX, component, props, state, hook, routing, và quản lý form." };
        setCourse(courseData);

        const chaptersData = await fetchCourseChapters();
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error loading course or chapters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSelectChapter = (index) => {
    setSelectedChapterIndex(index);
  };

  const selectedChapter = chapters[selectedChapterIndex];

  if (loading) {
    return (
      <div className="text-center py-6">
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-6">
        <span className="text-xl font-semibold text-red-600">Course not found.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Course Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">{course.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Chapter List */}
        <div className="col-span-1 space-y-3">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              onClick={() => handleSelectChapter(index)}
              className={`cursor-pointer p-4 rounded-md shadow-md border 
                ${index === selectedChapterIndex ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-100'}`}
            >
              <h3 className="text-lg font-semibold text-gray-800">{chapter.title}</h3>
            </div>
          ))}
        </div>

        {/* Chapter Details */}
        <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
          {selectedChapter ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800">{selectedChapter.title}</h2>
              <p className="text-gray-600 mt-2">{selectedChapter.description}</p>
              <div className="mt-4">
                <p className="text-sm text-gray-700 whitespace-pre-line" 
                  dangerouslySetInnerHTML={{ __html: selectedChapter.content }} />
              </div>


              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleSelectChapter(selectedChapterIndex - 1)}
                  disabled={selectedChapterIndex === 0}
                  className={`px-4 py-2 rounded bg-blue-500 text-white font-medium 
                    ${selectedChapterIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                  Chương trước
                </button>

                <button
                  onClick={() => handleSelectChapter(selectedChapterIndex + 1)}
                  disabled={selectedChapterIndex === chapters.length - 1}
                  className={`px-4 py-2 rounded bg-blue-500 text-white font-medium 
                    ${selectedChapterIndex === chapters.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                  Chương sau
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Vui lòng chọn một chương để xem chi tiết.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
