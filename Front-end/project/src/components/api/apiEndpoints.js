// const API_BASE_URL = 'http://43.202.97.69:8080';

const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  logout: `${API_BASE_URL}/logout`,
  join: `${API_BASE_URL}/join`,
  checkLogin : `${API_BASE_URL}/check-login`,
  checkDuplicate: (userId) => `${API_BASE_URL}/checkDuplicateId/${userId}`,
  allBeachInfoSearchFromDB : (region) => `${API_BASE_URL}/allBeachInfoSearchFromDB/${region}`,
  communityListAll: `${API_BASE_URL}/board/listall`,
  communityList: `${API_BASE_URL}/board/list`,
  communityCommentList: (boardId) => `${API_BASE_URL}/board/${boardId}/comments/list`,
  communityCommentWrite: (boardId) => `${API_BASE_URL}/board/${boardId}/comments/write`,
  communityLike: (boardId) => `${API_BASE_URL}/board/${boardId}/likeson`,
  communityWrite: `${API_BASE_URL}/board/write`,
  communityDelete: (boardId) => `${API_BASE_URL}/board/delete/${boardId}`,
  communityCommentDelete: (commentId) => `${API_BASE_URL}/board/${commentId}/comments/delete`,
  communityUpdate: (boardId) => `${API_BASE_URL}/board/update/${boardId}`,
  communityImage: (filename) => `${API_BASE_URL}/board/photo/${filename}`,
  chat: `${API_BASE_URL}/chat`,
  chatbot : `${API_BASE_URL}/chatbot`,
};
