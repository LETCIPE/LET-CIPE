import {
  readCart,
  deleteCart,
  updateCartRecipe,
  createCartIngredient,
  deleteCartIngredient,
  patchCartIngredient,
  getCartIngredient,
  createCart,
  startCart,
} from '@/api/cart'

export const state = () => ({
  cart: [], // 레시피 정보들
  ingreList: [], // 전부 계산된 재료들
  amountByRecipe: {},
  isSucceededtoHistory: false,
  isSucceededtoRecipeList: false,
  isSucceededtoCart: false,
})

export const mutations = {
  SET_CART(state, cart) {
    state.cart = cart
  },
  CLEAR_CART(state) {
    state.cart = []
  },
  SET_INGRE(state, ingreList) {
    state.ingreList = ingreList
  },
  CLEAR_INGRE(state) {
    state.ingreList = []
  },
  ADD_INGRE_AMOUNT(state, ingreInfo) {
    state.ingreList[ingreInfo.index].amount =
      Number(state.ingreList[ingreInfo.index].amount) + Number(ingreInfo.amount)
  },
  CALC_PLUS_INGRE(state, index) {
    state.ingreList[index].amount = Number(state.ingreList[index].amount) + 1
  },
  CALC_SUB_INGRE(state, index) {
    state.ingreList[index].amount = Number(state.ingreList[index].amount) - 1
  },
  SET_INGRELIST_AMOUNT(state, updateAmountObject) {
    // console.log("ingre" + updateAmountObject.index + "====" + updateAmountObject.updateAmount)
    state.ingreList[updateAmountObject.index].amount = Number(
      updateAmountObject.updateAmount
    )
  },
  SET_BYRECIPE_AMOUNT(state, updateAmountObject) {
    // console.log("recipe" + updateAmountObject.ingreId + "====" + updateAmountObject.updateAmount)
    state.amountByRecipe[updateAmountObject.ingreId] = Number(
      updateAmountObject.updateAmount
    )
  },

  SET_RECIPE_INGRE(state, amountByRecipe) {
    state.amountByRecipe = amountByRecipe
  },
  CLEAR_ISSUCCEEDEDTOHISTORY() {
    state.isSucceededtoHistory = true
  },
  SET_ISSUCCEEDEDTOHISTORY(state, isSucceededtoHistory) {
    state.isSucceededtoHistory = isSucceededtoHistory
  },
  SET_ISSUCCEEDEDTOCART_TRUE(state) {
    state.isSucceededtoCart = true
  },
  SET_ISSUCCEEDEDTOCART_FALSE(state) {
    state.isSucceededtoCart = false
  },
  ADD_INGRELIST(state, ingreItem) {
    state.ingreList.push(ingreItem)
  },
}

export const getters = {}

export const actions = {
  async readCart({ commit }) {
    commit('CLEAR_CART')
    await readCart(
      ({ data }) => {
        commit('SET_CART', data.cartItems)
        // console.log(data)
      },
      (error) => {
        console.log(error)
      }
    )
  },

  async createCart({ commit }, addrecipes) {
    await createCart(
      addrecipes,
      ({ data }) => {
        commit('SET_ISSUCCEEDEDTOCART_TRUE')
      },
      (error) => {
        console.log(error)
        commit('SET_ISSUCCEEDEDTOCART_FALSE')
      }
    )
  },
  async deleteCart({ commit }, recipeId) {
    await deleteCart(
      recipeId,
      ({ data }) => {
        // console.log(data)
        // console.log('장바구니 레시피 삭제 성공!')
      },
      (error) => {
        console.log(error)
      }
    )
  },
  async updateCartRecipe({ commit }, updateObject) {
    await updateCartRecipe(
      updateObject,
      ({ data }) => {
        // console.log(data)
        // console.log('장바구니 레시피 수량 변경 성공!')
      },
      (error) => {
        console.log(error)
      }
    )
  },

  async getCartIngredient({ commit }) {
    commit('CLEAR_INGRE')
    await getCartIngredient(
      ({ data }) => {
        console.log(data)
        commit('SET_INGRE', data.list)
        commit('SET_RECIPE_INGRE', data.amountByRecipe)

        console.log('장바구니 재료 읽어오기 성공!')
      },
      (error) => {
        console.log(error)
      }
    )
  },

  async createCartIngredient({ commit }, createObject) {
    await createCartIngredient(
      createObject,
      ({ data }) => {
        // console.log(data)
        console.log('장바구니 추가재료 추가 성공!')
      },
      (error) => {
        console.log(error)
      }
    )
  },
  async deleteCartIngredient({ commit }, IngreId) {
    await deleteCartIngredient(
      IngreId,
      ({ data }) => {
        // console.log(data)
        // console.log('장바구니 추가재료 삭제 성공!')
      },
      (error) => {
        console.log(error)
      }
    )
  },
  async patchCartIngredient({ commit }, updateObject) {
    await patchCartIngredient(
      updateObject,
      ({ data }) => {
        console.log(data)
        // console.log('장바구니 추가재료 수량 변경 성공!')
      },
      (error) => {
        console.log(error)
      }
    )
  },
  async startCart({ commit }) {
    commit('CLEAR_ISSUCCEEDEDTOHISTORY')
    await startCart(
      ({ data }) => {
        // console.log(data)
        // console.log('장바구니 실행 성공!')
        commit('SET_ISSUCCEEDEDTOHISTORY', true)
      },
      (error) => {
        console.log(error)
      }
    )
  },
}
