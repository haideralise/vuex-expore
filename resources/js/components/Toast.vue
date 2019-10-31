<template>
    <div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false">
        <div class="toast-header">
            <strong class="mr-auto">{{ heading }}</strong>
            <small>{{ time }}</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            {{ message }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props: ['heading', 'time', 'message', 'show']
    }
</script>

<style scoped>

</style>
