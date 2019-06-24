<template>
  <div>
    <h2>{{message}}</h2>
  </div>
</template>


<script>
export default {

  created() {
    if (!token) {
      return false;
    }
    axios.get("https://logical-river-244214.appspot.com/logout/"+token)
			.then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
       const lMessage=response.data.message;
       console.log(lMessage);
        Event.$emit('logout');
        
        
			});
  },
    data() {
			return {
				message:"Log out"
			}
		}
};
</script>
