<script>
	export default {
		name: 'Sharing',
        data: ()=> ({
            pagination: {
                descending: false,
                page: 1,
                rowsPerPage: 25,
                sortBy: 'order',
                totalItems: 0
            }
        }),
		computed:{
		    sharing(){
		        return {
                    sharedWith: this.$app.sharedWith,
                    sharable: this.$app.sharable
                }
            },
            items:{
		        cache: false,
                get(){
                    const entries = []
                    this.$app.sharable.forEach((alias)=>{
                        entries.push({alias})
                    })
                    return entries
                }
            },
            headers(){
                return [
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: true,
                        value: 'alias'
                    },
                    {
                        text: 'Shared With',
                        align: 'left',
                        sortable: false
                    },
                    {
                        text: 'Actions',
                        align: 'left',
                        sortable: false,
                    },
                ]
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
		},
	}
</script>
<template>
    <div>
        <h2>Sharing</h2>
        <v-data-table :headers="headers" :items="items" :pagination.sync="pagination">
            <template v-slot:items="props">
                <td class="text-xs-left">
                    <i class="fa fa-cube blue--text"></i> {{ props.item.alias }}
                </td>
                <td class="text-xs-left">
                    <ul>
                        <li v-if="!$app.sharedWith[props.item.alias]">
                            Nothing
                        </li>
                        <li v-else v-for="obj in $app.sharedWith[props.item.alias]">
                            {{ $app.getName(obj) }}: <code>{{ getRealName(obj) }}.{{ $app.getSharedAliasName(props.item.alias) }}()</code>
                        </li>
                    </ul>
                </td>
                <td class="text-xs-left" style="width: 0">
                    <v-btn small @click="unShare(props.item.alias)" color="red" v-if="$app.isShared(props.item.alias)">Revoke</v-btn>
                    <v-btn small @click="share(props.item.alias)" color="green" v-else>Share</v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>
