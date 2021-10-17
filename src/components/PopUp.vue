<template>
    <div :class="{ 'show' : msg}" class="toast">
        {{ msg }}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['msg'])
    }
}
</script>

<style scoped>
.toast {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 0.5rem; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 999; /* Add a z-index if needed */
  left: 50%; /* Center the toast */
  top: 5%; /* 30px from the bottom */
}

.toast.show {
  visibility: visible; /* Show the toast */
  /* Add animation: Take 0.5 seconds to fade in and out the toast. 
  However, delay the fade out process for 1 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 1s;
  animation: fadein 0.5s, fadeout 0.5s 1s;
}

/* Animations to fade the toast in and out */
@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;} 
  to {top: 5%; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 5%; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 5%; opacity: 1;} 
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 5%; opacity: 1;} 
  to {top: 0; opacity: 0;}
}
</style>