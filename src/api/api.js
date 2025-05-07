const BASE_URL = 'https://6819c9291ac1155635065aae.mockapi.io'; // replace with your mockapi url

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/users?email=${email}`);
  const users = await res.json();

  if (users.length === 0) {
    throw new Error('Email không tồn tại');
  }

  const user = users[0];

  if (user.password !== password) {
    throw new Error('Mật khẩu không đúng');
  }

  return user;
};

  export const registerUser = async (email, password) => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'student' }),
    });
  
    if (!res.ok) throw new Error('Đăng ký thất bại');
    return await res.json();
  };
  

export const fetchChapters = async () => {
    const res = await fetch(`${BASE_URL}/courses`);
    return await res.json();
  };
  export const fetchCourseChapters = async () => {
    const response = await fetch(`${BASE_URL}/courses`);
    if (!response.ok) throw new Error('Failed to fetch chapters');
    return await response.json();
  };
  export const fetchCourseDetails = async () => {
    const response = await fetch(`${BASE_URL}/courses}`);
    if (!response.ok) throw new Error('Failed to fetch course details');
    return await response.json();
  };
  
  export const addChapter = async (data) => {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  };
  
  export const updateChapter = async (id, data) => {
    const res = await fetch(`${BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  };
  
  export const deleteChapter = async (id) => {
    await fetch(`${BASE_URL}/courses/${id}`, { method: 'DELETE' });
  };
  
  export const fetchUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return await res.json();
  };