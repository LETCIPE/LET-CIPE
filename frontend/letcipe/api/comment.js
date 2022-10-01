import interceptor from '../config/interceptor'
import { apiInstance } from '.'

const api = apiInstance()

async function getComment(recipeObject, success, fail) {
  await api
    .get(
      `/api/comment/${recipeObject.boardType}/${recipeObject.boardId}?size=${recipeObject.size}&page=${recipeObject.page}`
    )
    .then(success)
    .catch(fail)
}
async function postComment(commentObject, success, fail) {
  console.log(commentObject)
  await interceptor
    .post(`/api/comment`, JSON.stringify(commentObject))
    .then(success)
    .catch(fail)
}

async function putComment(commentObject, success, fail) {
  console.log(commentObject)
  await interceptor
    .put(`/api/comment`, JSON.stringify(commentObject))
    .then(success)
    .catch(fail)
}

async function getCommentNum(recipeObject, success, fail) {
  await interceptor
    .get(
      `/api/comment/${recipeObject.boardType}/${recipeObject.boardId}/commentNum`
    )
    .then(success)
    .catch(fail)
}
export { getComment, getCommentNum, postComment, putComment }
