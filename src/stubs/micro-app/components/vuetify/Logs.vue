<script>
	export default {
		name: 'Logs',
        data: ()=> ({
            logOutput: [],
            pagination: {
                descending: false,
                page: 1,
                rowsPerPage: 25,
                sortBy: 'order',
                totalItems: 0
            }
        }),
        watch:{
		    '$app.logOutput':{
		        immediate: true,
		        deep: true,
		        handler(logOutput){
                    this.logOutput = logOutput
                }
            }
        },
        computed:{
            items(){
                const entries = []
                this.logOutput.forEach((entry, order)=>{
                    entries.push({
                        order,
                        entry
                    })
                })
                return entries
            },
            headers(){
                return [
                    {
                        text: 'Order',
                        align: 'left',
                        sortable: true,
                        value: 'order'
                    },
                    {
                        text: 'Message',
                        align: 'left',
                        sortable: true,
                        value: 'entry'
                    },
                ]
            }
        },
		methods: {
			flush() {
                this.logOutput = this.$app.logOutput = []
			},
		}
    }
</script>
<template>
	<div>
        <v-btn
            small
            @click="flush"
            class="right mr-0 mb-2">
            Flush
        </v-btn>

        <h2>Logs</h2>

        <v-data-table :headers="headers" :items="items" :pagination.sync="pagination">
            <template v-slot:items="props">
                <td class="text-xs-left" style="width: 0">
                    #{{ props.item.order }}
                </td>
                <td class="text-xs-left">
                    <i class="fa fa-info-circle blue--text"></i> {{ props.item.entry }}
                </td>
            </template>
        </v-data-table>
	</div>
</template>
