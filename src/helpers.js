export const API_BASE_URL = process.env.REACT_APP_HELLO_NERDS_API_BASE_URL

export const validateISBN = (isbn) => {
  const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/; 
  const isValid = isbnRegex.test(isbn)
  return isValid
}