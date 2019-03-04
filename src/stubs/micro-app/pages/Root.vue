<script>
	export default {
		name: "Root",
		computed: {
			user() {
				return this.$app.make('currentUser')
			},
			classes() {
				return {
					'btn-outline-success': this.user.isAdmin,
					'btn-outline-danger': !this.user.isAdmin
				}
			}
		}
	}
</script>
<template>
	<div class="h-100">
		<div class="container text-center">
			<div class="my-2">
				<router-link to="/" class="btn btn-outline-primary">
					Edit Screen
				</router-link>
				<router-link to="/components" class="btn btn-outline-primary">
					Components
				</router-link>
				<router-link to="/super-root" class="btn" :class="classes">
					{{ user.isAdmin ? 'Unlocked' : 'Locked'}} Screen
				</router-link>
			</div>
			<router-view></router-view>
		</div>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
		      integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
	</div>
</template>
