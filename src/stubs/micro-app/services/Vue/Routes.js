import Unauthorized from '@pages/Unauthorized'
import Protected from '@pages/Protected'
import Edit from '@pages/Edit'
import Root from '@pages/Root'
import Components from '@pages/Components'

export default {
	mode: 'hash',
	base: '/',
	routes: [
		{
			path: '/', component: Root,
			children: [
				{path: '', component: Edit},
				{path: 'super-root', component: Protected},
				{path: 'unauthorized', component: Unauthorized},
				{path: 'components', component: Components},
				{path: '*', component: Unauthorized},
			]
		},
	]
}
