import axiosClient from "@/config/axiosConfig";

// Utility function to handle GET requests
export const getRequest = async (
  url: string,
  id?: Record<string, any>,
  params?: Record<string, any>
) => {
  try {
    const finalUrl = id ? `${url}/${id}` : url;
    const response = await axiosClient.get(finalUrl, { params });
    return response.data;
  } catch (error: any) {
    console.error(
      "GET request failed:",
      JSON.stringify(error.response, null, 2)
    );
    throw error;
  }
};

// Utility function to handle POST requests
export const postRequest = async (url: string, data: any) => {
  try {
    console.log(url);
    const response = await axiosClient.post(url, data);
    // console.log("postRequest", response.data);
    return response.data;
  } catch (error: any) {
    console.error("POST request failed:", error.response);
    throw error;
  }
};

// Utility function to handle PUT requests
export const putRequest = async (url: string, data: any) => {
  try {
    const response = await axiosClient.put(url, data);
    return response.data;
  } catch (error: any) {
    console.error("PUT request failed:", error.response);
    throw error;
  }
};

// Utility function to handle DELETE requests
export const deleteRequest = async (
  url: string,
  params?: Record<string, any>
) => {
  try {
    const response = await axiosClient.delete(url, { params });
    return response.data;
  } catch (error: any) {
    console.error("DELETE request failed:", error.response);
    throw error;
  }
};

// Utility function to handle PATCH requests
export const patchRequest = async (url: string, data?: any) => {
  try {
    const response = await axiosClient.patch(url, data);
    return response.data;
  } catch (error: any) {
    console.error(
      "PATCH request failed:",
      JSON.stringify(error.response, null, 2)
    );
    throw error;
  }
};
