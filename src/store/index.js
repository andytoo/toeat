import { createStore } from 'vuex'
import TokenService from '@/services/TokenService'

export default createStore({
  state: {
    msg: null,
    isLoading: false,

    // User
    user: TokenService.getUser() || {},
    isUserSignedIn: TokenService.isUserSignedIn() || false,

    // Pagination
    page: 1,
    totalPage: 1,

    // Restaurant
    restaurants: [],
    restaurant: {},

    // Cart
    cart: [],
    pendingCart: []
  },
  mutations: {
    setMsg: (state, data) => {
      state.msg = data
    },
    setLoading: (state, data) => {
      state.isLoading = data
    },
    setUser: (state, data) => {
      state.user = data
    },
    setIsUserSignedIn: (state, data) => {
      state.isUserSignedIn = data
    },
    setRestaurants: (state, data) => {
      state.restaurants = data
    },
    setPage: (state, data) => {
      state.page = data.page
    },
    setLastPage: (state, data) => {
      state.lastPage = data.lastPage
    },
    findRestaurantById: (state, id) => {
      state.restaurants.find(restaurant => { if (restaurant.id == id) state.restaurant = restaurant })
    },
    addOrderToPendingCart: (state, { order, isEmpty }) => {
      if (!isEmpty) {
        state.pendingCart.find(data => data = order)
      } else {
        state.pendingCart.push(order)
      }
    },
    removeFromPendingCart: (state, restaurantId) => {
      state.pendingCart = state.pendingCart.filter(data => data.restaurantId !== restaurantId)
    },
    updateCart: (state, data) => {
      state.cart = data
    }
  },
  actions: {
    setMsg: ({commit}, data) => {
      commit('setMsg', data)
      setTimeout(() => { commit('setMsg', null) }, 1500)
    },
    setLoading: ({commit}, data) => {
      commit('setLoading', data)
    },
    setUser: ({commit}, data) => {
      commit('setUser', data)
      if (Object.keys(data).length === 0) commit('setIsUserSignedIn', false)
      else commit('setIsUserSignedIn', true)
    },
    setRestaurant: ({ commit }, data) => {
      commit('setRestaurants', data)
      // commit('setPage', data.page)
      // commit('setLastPage', data.lastPage)
    },
    findRestaurantById: ({ commit }, id) => {
      commit('findRestaurantById', id)
    },
    addOrderToCart: ({ state, getters, commit }, { refs, id, name } ) => {
      let order = getters.getOrderByRestaurantId(id)
      let isEmpty = false

      if (order == null) {
        isEmpty = true
        order = {}
        order.restaurantId = id
        order.restaurantName = name
        order.phone = state.user.phone
      }

      let total = 0
      order.itemList = []
      for (var key in refs) {
        if (!isNaN(parseInt(refs[key].innerHTML))) {
          let quantity = parseInt(refs[key].innerHTML)
          if (quantity > 0) {
            let name
            let price
            state.restaurant.categoryList.forEach(category => {
              category.menuList.forEach(menu => {
                if (menu.id == key) {
                  name = menu.name
                  price = menu.price
                  total += price * quantity
                }
              })
            })
            order.itemList.push({id: key, name: name, quantity: quantity, price: price})
          }
        }
      }

      order.total = total
      commit('addOrderToPendingCart', { order, isEmpty })
    },
    submitOrder({commit}, data) {
      commit('removeFromPendingCart', data.restaurantId)
    },
    updateCart({commit}, data) {
      commit('updateCart', data)
    },
    goToPage: ({ dispatch, getters }, page) => {
      if (page > 0 && page <= getters.lastPage) {
        dispatch('loadRestaurants', page)
      }
    }
  },
  modules: {

  },
  getters: {
    msg: state => state.msg,
    isLoading: state => state.isLoading,
    user: state => state.user,
    isUserSignedIn: state => state.isUserSignedIn,
    page: state => state.page,
    lastPage: state => state.lastPage,
    restaurants: state => state.restaurants,
    restaurant: state => state.restaurant,
    cart: state => state.cart,
    pendingCart: state => state.pendingCart,
    getOrderByRestaurantId: state => id => state.pendingCart.find(order => order.restaurantId == id),
  }
})
