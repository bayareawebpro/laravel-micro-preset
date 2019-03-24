<script>
	export default {
		name: 'Providers',
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
            items(){
                const entries = []
                Object.keys(this.$app.providers).forEach((name)=>{
                    const provider = this.$app.providers[name]
                    const entry = {
                        name      : name,
                        provides  : provider.provides.join(', '),
                        status    : provider.isDeferred && !provider.isBooted ? 'Deferred' : 'Booted',
                        deferred  : provider.isDeferred,
                        booted    : provider.isBooted,
                    }
                    entries.push(entry)
                })
                return entries
            },
            headers(){
                return [
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: true,
                        value: 'name'
                    },
                    {
                        text: 'Provides',
                        align: 'left',
                        sortable: true,
                        value: 'provides'
                    },
                    {
                        text: 'Status',
                        align: 'left',
                        value: 'status',
                        sortable: true,
                    },
                ]
            }
        }
	}
</script>
<template>
    <div>
        <h2>Service Providers</h2>
        <v-data-table :headers="headers" :items="items" :pagination.sync="pagination">
            <template v-slot:items="props">
                <td class="text-xs-left">
                    <i class="fa fa-cube blue--text"></i> {{ props.item.name }}
                </td>
                <td class="text-xs-left">
                    <i class="fa fa-cubes blue--text"></i>
                    {{ props.item.provides }}
                </td>
                <td class="text-xs-left">
                    <i v-if="props.item.booted" class="fa fa-microchip green--text"></i>
                    <i v-else class="fa fa-user-clock blue-grey--text"></i>
                    {{ props.item.status }}
                </td>
            </template>
        </v-data-table>
    </div>
</template>
