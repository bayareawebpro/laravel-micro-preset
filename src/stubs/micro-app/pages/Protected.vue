<script>
	export default {
		name: "Authorized",
		computed: {
			user() {
				return this.$app.make('currentUser')
			}
		}
	}
</script>
<template>
	<div class="card text-left shadow mb-5">
		<div class="card-body">
			<h3 class="text-success">Authorized.</h3>
			{{ user.state.email }}
		</div>
	</div>
</template>
