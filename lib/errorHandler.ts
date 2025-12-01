/**
 * Extract error message from various error formats
 * Priority: response.data.message > response.data.error > error.message > fallback
 */
export function getErrorMessage(error: any, fallback: string = "Đã xảy ra lỗi"): string {
  // Check for Axios error response
  if (error?.response?.data) {
    const data = error.response.data;
    
    // Try to get message from response data
    if (data.message) {
      return data.message;
    }
    
    // Try to get error from response data
    if (data.error) {
      return data.error;
    }
    
    // Try to get errors array (validation errors)
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const firstError = data.errors[0];
      if (typeof firstError === 'string') {
        return firstError;
      }
      if (firstError.message) {
        return firstError.message;
      }
    }
  }
  
  // Check for standard Error object
  if (error instanceof Error) {
    return error.message;
  }
  
  // Check for error.message directly
  if (error?.message) {
    return error.message;
  }
  
  // Return fallback message
  return fallback;
}
