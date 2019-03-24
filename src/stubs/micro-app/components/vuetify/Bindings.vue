<script>
	export default {
		name: 'Bindings',
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
                Object.keys(this.$app.bindings).forEach((alias)=>{
                    const isResolved  = this.$app.isResolved(alias)
                    const canShare    = this.$app.canShare(alias)
                    const isConcrete  = this.$app.isConcrete(alias)
                    const isClass     = this.$app.isClass(alias)
                    const entry = {
                        alias       : alias,
                        status      : isResolved    ? 'Resolved' : 'UnInstantiated',
                        type        : isConcrete    ? 'Concrete' : (isClass ? 'Class' : 'Callback'),
                        shared      : canShare      ? 'Shared Instance' : 'Unique Instance',
                        isResolved,
                        canShare,
                        isConcrete,
                        isClass,
                    }
                    entries.push(entry)
                })
                return entries
            },
		    headers(){
		        return [
                    {
                        text: 'Alias',
                        align: 'left',
                        sortable: true,
                        value: 'alias'
                    },
                    {
                        text: 'Status',
                        align: 'left',
                        sortable: true,
                        value: 'status'
                    },
                    {
                        text: 'Type',
                        align: 'left',
                        value: 'type',
                        sortable: true,
                    },
                    {
                        text: 'Shareable',
                        align: 'left',
                        value: 'shared',
                        sortable: true,
                    },
                ]
            }
        }
	}
</script>
<template>
    <div>
        <h2>Bindings</h2>
        <v-data-table :headers="headers" :items="items" :pagination.sync="pagination">
            <template v-slot:items="props">
                <td class="text-xs-left">
                    <i class="fa fa-cube blue--text"></i> {{ props.item.alias }}
                </td>
                <td class="text-xs-left">
                    <i v-if="props.item.isResolved" class="fa fa-microchip green--text"></i>
                    <i v-else class="fa fa-user-clock orange--text"></i>
                    {{ props.item.status }}
                </td>
                <td class="text-xs-left">
                    <i v-if="props.item.isConcrete" class="fa fa-microchip blue--text"></i>
                    <i v-else-if="props.item.isClass" class="fa fa-clone red--text"></i>
                    <i v-else class="fa fa-code orange--text" ></i>
                    {{ props.item.type }}
                </td>
                <td class="text-xs-left">
                    <template v-if="props.item.canShare">
                        <i class="fa fa-code-branch green--text"></i> {{ props.item.shared }}
                    </template>
                    <template v-else>
                        <i class="fa fa-bullseye red--text"></i> {{ props.item.shared }}
                    </template>
                </td>
            </template>
        </v-data-table>
</div>
</template>
