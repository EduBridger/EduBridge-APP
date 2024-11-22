import { apiClient } from './config';

export const apiAdminLogin = async (payload) => {
  try {
    console.log('Login payload:', payload);
    const response = await apiClient.post('/admin/login', payload);
    console.log('Login response:', response);

    // Store tokens immediately if they exist in response
    if (response.data?.token) {
      localStorage.setItem('accessToken', response.data.token);
    }
    if (response.data?.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response;
  } catch (error) {
    console.error('Login error:', error.response || error);
    throw error;
  }
};

export const apiAdminSignUp = async (payload) => {
  return await apiClient.post("/admin/signup", payload)
};

export const apiAdminRegisterTeacher = async (payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No admin token found. Please login as admin first.');
    }

    // Log complete registration payload
    console.log('Teacher registration full payload:', {
      ...payload,
      passwordLength: payload.password?.length
    });

    const response = await apiClient.post("/admin/teacher/registration", payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Store registration details temporarily for verification
    sessionStorage.setItem('lastRegisteredTeacher', JSON.stringify({
      email: payload.email,
      timestamp: new Date().toISOString()
    }));

    console.log('Teacher registration response:', response.data);
    return response;
  } catch (error) {
    console.error('Teacher registration error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    throw error;
  }
};

export const apiAdminRegisterStudent = async (payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Admin authentication required');
    }

    // Log the registration attempt
    console.log('Attempting student registration:', {
      payload,
      hasToken: !!token
    });

    const response = await apiClient.post("/admin/student/registration", payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Student registration response:', response);
    return response;
  } catch (error) {
    console.error('Student registration error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    throw error;
  }
};

export const apiAdminDeleteStudent = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.delete(`/admin/student/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: { id }
    });

    return response;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const apiAdminEditStudent = async (id, payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.patch(`/admin/student/update/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: { id }
    });

    return response;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const apiAdminDeleteTeacher = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('Deleting teacher with ID:', id);

    const response = await apiClient.delete(`/admin/teachers/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Teacher delete response:', response);
    return response;
  } catch (error) {
    console.error('Error deleting teacher:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    throw error;
  }
};


export const apiStudentLogin = async (payload) => {
  try {
    const loginPayload = {
      email: payload.email.trim(),
      password: payload.password
    };

    console.log('Student login request:', {
      url: '/student/login',
      payload: loginPayload
    });

    const response = await apiClient.post("/student/login", loginPayload);

    console.log('Student login response:', response);

    if (response.data?.token) {
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('userRole', 'student');
      
      if (response.data.student) {
        localStorage.setItem('studentInfo', JSON.stringify(response.data.student));
      }

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response;
  } catch (error) {
    console.error('Student login error:', {
      status: error.response?.status,
      message: error.response?.data,
      data: error.response?.data,
      requestPayload: {
        email: payload.email,
        passwordSent: !!payload.password
      }
    });
    throw error;
  }
};

export const apiTeacherLogin = async (payload) => {
  try {
    // Match exactly what backend expects
    const loginPayload = {
      email: payload.email.trim(),    // email field
      password: payload.password      // password field only
    };

    console.log('Teacher login request:', {
      url: '/teacher/login',
      payload: loginPayload
    });

    const response = await apiClient.post("/teacher/login", loginPayload);

    console.log('Teacher login response:', response);

    if (response.data?.token) {
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('userRole', 'teacher');
      
      // Store teacher info if available
      if (response.data.teacher) {
        localStorage.setItem('teacherInfo', JSON.stringify(response.data.teacher));
      }

      // Set auth header for future requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response;
  } catch (error) {
    // Enhanced error logging
    console.error('Teacher login error:', {
      status: error.response?.status,
      message: error.response?.data,  // Changed to handle string response
      data: error.response?.data,
      requestPayload: {
        email: payload.email,
        passwordSent: !!payload.password
      }
    });
    throw error;
  }
};

export const apiAdminGetAllTeachers = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.get('/admin/teachers', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Log the response structure
    console.log('Teachers API response:', {
      status: response.status,
      data: response.data,
      dataType: typeof response.data,
      isArray: Array.isArray(response.data)
    });

    return response;
  } catch (error) {
    console.error('Error fetching teachers:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    throw error;
  }
};

export const apiAdminGetAllStudents = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.get('/admin/students', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Backend returns { message, students }
    console.log('Students API response:', response.data);
    return response;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const apiAdminAddCourse = async (payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Admin authentication required');
    }

    console.log('Adding course with payload:', payload);

    const response = await apiClient.post('/admin/course/add', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Course add response:', response);
    return response;
  } catch (error) {
    console.error('Error adding course:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    throw error;
  }
};

export const apiAdminEditCourse = async (id, payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Validate payload
    if (!Object.keys(payload).length) {
      throw new Error('Update data cannot be empty');
    }

    const response = await apiClient.patch(`/admin/courses/update/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const apiAdminDeleteCourse = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.delete(`/admin/courses/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

export const apiAdminGetAllCourses = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.get('/admin/courses', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // The backend returns { message, courses }
    return response;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const apiAdminGetOneCourse = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('Fetching course with ID:', id);

    // Update the endpoint to match backend
    const response = await apiClient.get(`/admin/course/${id}`, {  // Changed from courses to course
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Get single course response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching course:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
      endpoint: `/admin/course/${id}`  // Log the endpoint for debugging
    });
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post('/auth/refresh', {
      refreshToken: refreshToken
    });

    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    }

    throw new Error('Failed to refresh token');
  } catch (error) {
    throw error;
  }
};

export const apiAdminEditTeacher = async (id, payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('Updating teacher with payload:', {
      id,
      payload
    });

    const response = await apiClient.patch(`/admin/teachers/update/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Teacher update response:', response);
    return response;
  } catch (error) {
    console.error('Error updating teacher:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    throw error;
  }
};

// Get single teacher
export const apiAdminGetOneTeacher = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('Fetching teacher with ID:', id);

    const response = await apiClient.get(`/admin/teachers/${id}`, {  // Changed from teacher to teachers
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Get single teacher response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching teacher:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
      endpoint: `/admin/teachers/${id}`  // Updated endpoint in error log
    });
    throw error;
  }
};

// Get single student
export const apiAdminGetOneStudent = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    console.log('Fetching student with ID:', id);

    // Update endpoint to match backend exactly
    const response = await apiClient.get(`/admin/students/${id}`, {  // Changed back to students
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Get single student response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching student:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
      endpoint: `/admin/students/${id}`  // Updated endpoint in error log
    });
    throw error;
  }
};

export const apiAdminSearchStudents = async (searchTerm) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    // If no search term, get all students
    if (!searchTerm) {
      return apiAdminGetAllStudents();
    }

    const response = await apiClient.get(`/admin/students/search?query=${searchTerm}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Backend returns { message, students }
    return response;
  } catch (error) {
    console.error('Error searching students:', error);
    throw error;
  }
};

// Search teachers
export const apiAdminSearchTeachers = async (searchTerm) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    // If no search term, get all teachers
    if (!searchTerm) {
      return apiAdminGetAllTeachers();
    }

    const response = await apiClient.get(`/admin/teachers/search?query=${searchTerm}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error searching teachers:', error);
    throw error;
  }
};

// Get student profile
export const apiGetStudentProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.get('/student/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error;
  }
};

// Update student profile
export const apiUpdateStudentProfile = async (id, payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Update endpoint to match backend
    const response = await apiClient.put(`/student/update-profile/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error updating student profile:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    throw error;
  }
};

// Complete student profile
export const apiCompleteStudentProfile = async (id, payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.put(`/student/complete-profile/${id}`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error completing student profile:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    throw error;
  }
};

// Submit assignment
export const apiSubmitStudentAssignment = async (id, payload) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Create FormData for file upload
    const formData = new FormData();
    if (payload.file) {
      formData.append('file', payload.file);
    }
    if (payload.content) {
      formData.append('content', payload.content);
    }
    formData.append('assignmentId', payload.assignmentId);

    // Update the endpoint to match your backend
    const response = await apiClient.post(`/student/${id}/submit-assignment`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error) {
    console.error('Error submitting assignment:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    throw error;
  }
};

// Get student assignments
export const apiGetStudentAssignments = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const studentId = JSON.parse(localStorage.getItem('studentInfo'))?.id;
    if (!studentId) {
      throw new Error('Student ID not found');
    }

    // Update endpoint to match backend
    const response = await apiClient.get(`/student/assignments/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Assignments response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};

// Get student grades
export const apiGetStudentGrades = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.get('/student/grades', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error fetching grades:', error);
    throw error;
  }
};

// Get course materials
export const apiGetCourseMaterials = async (courseId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.get(`/student/courses/${courseId}/materials`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    console.error('Error fetching course materials:', error);
    throw error;
  }
};
