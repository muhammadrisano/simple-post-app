/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getCookieValue = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return parts.pop()?.split(";").shift()?.replace("%3D", "");
};

export const fetchData = async (endpoint: string, params = {}) => {
  try {
    
    const url = new URL(`${API_URL}/${endpoint}`);
    url.search = new URLSearchParams(params).toString();
    

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const postData = async (endpoint: string, data: any, options = {}) => {
  try {
    await fetchCsrfCookie();
    const csrfToken = getCookieValue("XSRF-TOKEN");

    const url = new URL(`${API_URL}/${endpoint}`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": csrfToken || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      ...options,
    });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const putData = async (endpoint: string, data: any) => {
  try {
     await fetchCsrfCookie();
    const csrfToken = getCookieValue("XSRF-TOKEN");
    const url = new URL(`${API_URL}/${endpoint}`);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "X-XSRF-TOKEN": csrfToken || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const patchData = async (endpoint: string, data: any) => {
  try {
    const url = new URL(`${API_URL}/${endpoint}`);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    await fetchCsrfCookie();
    const csrfToken = getCookieValue("XSRF-TOKEN");
    const url = new URL(`${API_URL}/${endpoint}`);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": csrfToken || "",
      },
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};
export const postImage = async (endpoint: string, data: any, options = {}) => {
  try {
    const url = new URL(`${API_URL}/${endpoint}`);
    const response = await fetch(url, {
      method: "POST",
      body: data,
      credentials: "include",
      ...options,
    });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const fetchCsrfCookie = () => {
  return fetch(`${API_URL}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });
};
