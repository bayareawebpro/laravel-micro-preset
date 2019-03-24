<script>
	export default {
		name: 'Sharing',
		computed:{
		    sharing(){
		        return {
                    sharedWith: this.$app.sharedWith,
                    sharable: this.$app.sharable
                }
            }
        },
		methods: {
			getRealName(obj) {
				const name = this.$app.getName(obj)
				if (name === 'Window') {
					return name.toLowerCase()
				}
				return name
			},
			share(alias) {
				this.$app.share(alias).withOthers(window)
				this.$forceUpdate()
			},
			unShare(alias) {
				this.$app.unShare(alias)
				this.$forceUpdate()
			}
		}
	}
</script>
<template>
    <div>
        <div class="flex-row flex-grow-0">
            <h3>Sharing</h3>
        </div>
        <div class="table-responsive bg-light shadow-sm">
            <table class="table table-bordered table-striped table-sm">
                <thead>
                <tr>
                    <th>Alias</th>
                    <th>Shared With</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(alias, index) in sharing.sharable">
                    <th>{{ alias }}</th>
                    <td>
                        <ul class="m-0 pl-4">
                            <li v-for="obj in sharing.sharedWith[alias]">
                                {{ $app.getName(obj) }}: <code>{{ getRealName(obj) }}.{{ $app.getSharedAliasName(alias) }}()</code>
                            </li>
                        </ul>
                    </td>
                    <td style="max-width: 50px">
                        <button @click="share(alias)" class="btn btn-primary btn-sm" v-if="!sharing.sharedWith[alias]">Share</button>
                        <button @click="unShare(alias)" class="btn btn-secondary btn-sm" v-else>Revoke</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
