import React, { useEffect, useState } from 'react';
import { fetchCourseDetails, fetchCourseChapters } from  '../api/api';

const CourseInfo = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch the course details
        const courseData = await fetchCourseDetails(courseId);
        setCourse(courseData);

        // Fetch chapters for this course
        const chaptersData = await fetchCourseChapters(courseId);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error loading course or chapters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [courseId]);

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

      {/* Chapters Section */}
      <div className="space-y-6">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">{chapter.title}</h2>
            <p className="text-gray-600 mt-2">{chapter.description}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{chapter.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseInfo;
