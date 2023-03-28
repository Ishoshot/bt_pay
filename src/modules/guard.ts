import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
    router.beforeEach((to:any, _from:any) => {
        if(isClient && to.meta.requiresAuth && to.path !== '/login' ) {
            console.log('Authentication required for page \'' + to.name?.toString() + '\'! Redirecting to login.')
            // Redirect user to login page
            return { path: '/login' }
        }
    })
}
