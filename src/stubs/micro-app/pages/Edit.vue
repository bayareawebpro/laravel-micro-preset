<script>
	export default {
		name: "Splash",
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
			<h3>Dumb Views + Smart Objects Example</h3>

			<div class="form-group">
				<label>Reactive Observable Using the Container Instead of VueX:<br/> {{ user.state.name }}</label>
				<input type="text" v-model="user.state.name" class="form-control">
			</div>

			<div class="form-group">
				<label>{{ user.state.email }}</label>
				<input type="email" v-model="user.state.email" class="form-control">
			</div>

			<button @click="user.update()" class="btn btn-outline-secondary">
				{{ !user.isAdmin ? 'Promote to SuperRoot' : 'Downgrade to User'}}
			</button>
		</div>
	</div>
</template>
