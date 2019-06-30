<template>
  <div>
    <h2>{{message}}</h2>
  </div>
</template>


<script>
export default {

  created() {

    if (!token) {
      localStorage.removeItem('user');
      Event.$emit('logout');
      
    }
    axios.get("/logout/"+token)
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
