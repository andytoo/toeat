import { createStore } from 'vuex'
import RestaurantService from '@/services/RestaurantService'

export default createStore({
  state: {
    msg: null,
    isLoading: false,

    // Pagination
    page: 1,
    totalPage: 1,

    // Restaurant
    restaurants: [],
    restaurant: {},

    // Cart
    carts: []
  },
  mutations: {
    setMsg: (state, data) => {
      state.msg = data
    },
    setLoading: (state, data) => {
      state.isLoading = data
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
    addOrderToCart: (state, { order, isEmpty }) => {
      if (!isEmpty) {
        state.carts.find(data => data = order)
      } else {
        state.carts.push(order)
      }
    },
    updateOrderStatus: (state, restaurantId) => {
      state.carts.find(data => { if (data.restaurantId == restaurantId) data.isSubmit = true } )
    }
  },
  actions: {
    setMsg: ({commit}, data) => {
      commit('setMsg', data)
    },
    setLoading: ({commit}, data) => {
      commit('setLoading', data)
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
        order.phone = '09123456789' //TODO PHONE
        order.isSubmit = false
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
      commit('addOrderToCart', { order, isEmpty })
    },
    submitCart({commit}, data) {
      commit('updateOrderStatus', data.restaurantId)
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
    page: state => state.page,
    lastPage: state => state.lastPage,
    restaurants: state => state.restaurants,
    restaurant: state => state.restaurant,
    carts: state => state.carts,
    getOrderByRestaurantId: state => id => state.carts.find(order => order.restaurantId == id && order.isSubmit == false),
  }
})
