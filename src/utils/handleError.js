export function handleError() {
    window.addEventListener('error',args => {
        console.log('error event:',args)
        return true
    },true)
    window.addEventListener('unhandledrejection',e => {
        throw e.reason
    })
}