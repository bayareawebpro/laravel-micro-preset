<script>
	export default {
		name: 'Bindings',
	}
</script>
<template>
    <div>
        <div class="flex-row flex-grow-0">
            <h3>Bindings</h3>
        </div>
        <div class="table-responsive bg-light shadow-sm">
            <table class="table table-bordered table-striped table-sm">
                <thead>
                <tr>
                    <th>Alias</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Shareable</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(binding, alias) in $app.bindings">
                    <th><i class="fa fa-cube text-secondary"></i> {{ alias }}</th>
                    <td>
                        <div v-if="$app.isResolved(alias)">
                            <i class="fa fa-microchip text-success"></i> Resolved
                        </div>
                        <div v-else>
                            <div v-if="$app.canShare(alias)">
                                <i class="fa fa-user-clock text-muted"></i> UnInstantiated
                            </div>
                            <div v-else>
                                <i class="fa fa-magic text-warning"></i> New Instance Always
                            </div>
                        </div>
                    </td>
                    <td>
                        <div v-if="$app.isConcrete(alias)">
                            <i class="fa fa-microchip text-muted"></i> Concrete
                        </div>
                        <div v-else-if="$app.isClass(alias)">
                            <i class="fa fa-clone text-muted"></i> Class
                        </div>
                        <div v-else>
                            <i class="fa fa-code text-muted"></i> Callback
                        </div>
                    </td>
                    <td>
                        <div v-if="$app.canShare(alias)">
                            <i class="fa fa-code-branch text-info"></i> Yes
                        </div>
                        <div v-else>
                            <i class="fa fa-ban text-danger"></i> No
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
