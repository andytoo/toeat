import { createStore } from 'vuex'
import TokenService from '@/services/TokenService'

export default createStore({
  state: {
    // App
    msg: null,
    isLoading: false,

    // Pagination
    page: 1,
    totalPage: 1,

    // User
    user: TokenService.getUser() || {},
    isUserSignedIn: TokenService.isUserSignedIn() || false,

    // Restaurant
    restaurants: [],
    restaurant: {},

    // Order & Cart
    cart: [],
    pendingCart: []
  },
  mutations: {
    // App
    setMsg: (state, data) => {
      state.msg = data
    },
    setLoading: (state, data) => {
      state.isLoading = data
    },

    // Pagination
    setPage: (state, data) => {
      state.page = data.page
    },
    setLastPage: (state, data) => {
      state.lastPage = data.lastPage
    },

    // User
    setUser: (state, data) => {
      state.user = data
    },
    setIsUserSignedIn: (state, data) => {
      state.isUserSignedIn = data
    },

    // Restaurant
    setRestaurants: (state, data) => {
      state.restaurants = data
    },
    findRestaurantById: (state, id) => {
      state.restaurants.find(restaurant => { if (restaurant.id == id) state.restaurant = restaurant })
    },

    // Order & Cart
    updateOrder: (state, data) => { 
      state.cart.find(order => { if (order.id == data.id) order.status = data.status })
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
    // App
    setMsg: ({commit}, data) => {
      commit('setMsg', data)
      setTimeout(() => { commit('setMsg', null) }, 1500)
    },
    setLoading: ({commit}, data) => {
      commit('setLoading', data)
    },

    // Pagination
    goToPage: ({ dispatch, getters }, page) => {
      if (page > 0 && page <= getters.lastPage) {
        dispatch('loadRestaurants', page)
      }
    },

    // User
    setUser: ({commit}, data) => {
      commit('setUser', data)
      if (Object.keys(data).length === 0) commit('setIsUserSignedIn', false)
      else commit('setIsUserSignedIn', true)
    },

    // Restaurant
    setRestaurant: ({ commit }, data) => {
      commit('setRestaurants', data)
      // commit('setPage', data.page)
      // commit('setLastPage', data.lastPage)
    },
    findRestaurantById: ({ commit }, id) => {
      commit('findRestaurantById', id)
    },

    // Order & Cart
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
    updateOrder({commit}, data) {
      commit('updateOrder', data)
    },
    updateCart({commit}, data) {
      commit('updateCart', data)
    }
  },
  modules: {

  },
  getters: {
    // App
    msg: state => state.msg,
    isLoading: state => state.isLoading,

    // Pagination
    page: state => state.page,
    lastPage: state => state.lastPage,

    // User
    user: state => state.user,
    isUserSignedIn: state => state.isUserSignedIn,
    
    // Restaurant
    restaurants: state => state.restaurants,
    restaurant: state => state.restaurant,

    // Order & Cart
    cart: state => state.cart,
    pendingCart: state => state.pendingCart,
    getOrderByRestaurantId: state => id => state.pendingCart.find(order => order.restaurantId == id),
  }
})
