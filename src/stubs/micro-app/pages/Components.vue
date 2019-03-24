<script>
	import Providers from '../components/bootstrap/Providers'
	import Bindings from '../components/bootstrap/Bindings'
	import Sharing from '../components/bootstrap/Sharing'
	import Logs from '../components/bootstrap/Logs'
	export default {
		name: "Components",
		components: {
			Bindings,
			Providers,
			Sharing,
			Logs,
		}
	}
</script>
<template>
	<div>
		<div class="card shadow mb-5">
			<div class="card-body text-left">
				<providers></providers>
			</div>
		</div>
		<div class="card shadow mb-5">
			<div class="card-body text-left">
				<bindings></bindings>
			</div>
		</div>
		<div class="card shadow mb-5">
			<div class="card-body text-left">
				<sharing></sharing>
			</div>
		</div>
		<div class="card shadow mb-5">
			<div class="card-body text-left">
				<logs></logs>
			</div>
		</div>
	</div>
</template>
