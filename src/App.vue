<template lang="pug">
    section.app
        router-view
        Nav
</template>

<style lang="sass">
    @import './assets/sass/global'

    section.app
        height: 100%
</style>

<script>
    import Nav from '@/components/Nav'

    export default {
        components: {
            Nav
        }
    }
</script>