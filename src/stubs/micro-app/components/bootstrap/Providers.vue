<script>
	export default {
		name: 'Providers',
		data() {
			return {
				status: this.getAppStats()
			}
		},
		methods: {
			getAppStats() {
				return Object.assign({}, Object.freeze({
					providers: this.$app.providers,
				}))
			},
			getRealName(obj) {
				const name = this.$app.getName(obj)
				if (name === 'Window') {
					return name.toLowerCase()
				}
				return name
			},
		}
	}
</script>
<template>
    <div>
        <div class="flex-row flex-grow-0">
            <h3>Providers</h3>
        </div>
        <div class="table-responsive bg-light shadow-sm">
            <table class="table table-bordered table-striped table-sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Provides</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(provider, name) in status.providers">
                    <th scope="row" class="font-weight-bold">{{ name }}</th>
                    <td>{{ provider.provides.join(', ') }}</td>
                    <td>
                        <div v-if="provider.isDeferred && !provider.isBooted">
                            <i class="fa fa-clock text-secondary"></i> Deferred
                        </div>
                        <div v-else>
                            <i class="fa fa-check-circle text-success"></i> Booted
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
