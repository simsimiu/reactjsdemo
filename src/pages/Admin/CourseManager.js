import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchChapters, addChapter, updateChapter, deleteChapter } from '../../api/api';
import ReactPaginate from 'react-paginate';


const ModalConfirmDelete = ({ show, onClose, onDelete, courseTitle }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-semibold">Xác nhận xóa khóa học</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-4">Bạn chắc chắn muốn xóa khóa học <strong>{courseTitle}</strong>?</p>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};


const Modal = ({ show, onClose, onSubmit, form, errors, setForm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-semibold">{form.id ? 'Cập nhật khóa học' : 'Thêm khóa học'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              id="title"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
          </div>

          {/* <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung</label>
            <textarea
              id="content"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              rows="4"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            ></textarea>
            {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
          </div> */}
       <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung</label>
          <div className="content-editor-wrapper">
            <ReactQuill
              value={form.content}
              onChange={(value) => setForm({ ...form, content: value })}
              className="react-quill-editor"
            />
          </div>
          {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
        </div>



          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              id="description"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              rows="2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {form.id ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', description: '', content: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [courseToDelete, setCourseToDelete] = useState(null); // Add this line
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false); // Add this line

  const load = async () => {
    try {
      const data = await fetchChapters();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Lỗi khi fetch:', err);
      setCourses([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Tiêu đề bắt buộc';
    if (!form.content.trim()) errs.content = 'Nội dung bắt buộc';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (form.id) {
      await updateChapter(form.id, form);
    } else {
      await addChapter(form);
    }
    setShowModal(false);
    setForm({ id: null, title: '', description: '', content: '' });
    load();
  };

  const handleEdit = (course) => {
    setForm(course);
    setErrors({});
    setShowModal(true);
  };

  const handleDeleteClick = (course) => {
    setCourseToDelete(course); // Store the course to be deleted
    setShowConfirmDeleteModal(true); // Show confirmation modal
  };

  const handleDelete = async () => {
    if (courseToDelete) {
      await deleteChapter(courseToDelete.id);
      load();
      setShowConfirmDeleteModal(false); // Close modal after delete
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentCourses = courses.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quản lý Khóa học</h2>
        <button
          onClick={() => { 
            setForm({ id: null, title: '', description: '', content: '' }); 
            setErrors({}); 
            setShowModal(true); 
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Thêm khóa học
        </button>
      </div>

      {/* Table of courses */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded border">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Mô tả</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course) => (
              <tr key={course.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{course.title}</td>
                <td className="px-4 py-2">{course.description}</td>
                <td className="px-4 py-2">{course.createdAt}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course)} // Trigger delete confirmation modal
                    className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {currentCourses.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-3 text-center text-gray-500">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          pageCount={Math.ceil(courses.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          pageClassName="px-3 py-1 border rounded"
          activeClassName="bg-blue-600 text-white"
          previousClassName="px-3 py-1 border rounded"
          nextClassName="px-3 py-1 border rounded"
          breakClassName="px-3 py-1"
        />
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        errors={errors}
        setForm={setForm}
      />
      <ModalConfirmDelete
        show={showConfirmDeleteModal}  // Add state for showing confirmation modal
        onClose={() => setShowConfirmDeleteModal(false)}
        onDelete={handleDelete}
        courseTitle={courseToDelete ? courseToDelete.title : ''}
      />

    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  modal: {
    backgroundColor: '#fff', padding: '20px', width: '400px', borderRadius: '8px'
  },
  actions: {
    marginTop: '10px', display: 'flex', justifyContent: 'space-between'
  },
  error: {
    color: 'red', fontSize: '0.9em'
  }
};

export default CourseManager;
