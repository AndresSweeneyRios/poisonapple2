<template lang="pug">
    section.gallery
        Vaporwave

        .column( 
            v-for="list in columns"
            :style="{ width: `${100 / x}%` }"
        )
            img( 
                v-for="image in list" 
                :key="image"
                :src="require(`@/assets/gallery/${image}.png`)"
                :alt="image"
                :aria-label="image"
            )
</template>

<script>
    import gallery from '@/assets/gallery/index.js'
    import Vaporwave from '@/components/Vaporwave'

    export default {
        name: 'gallery',

        components: {
            Vaporwave
        },

        data () {
            return {
                columns: null
            }
        },

        methods: {
            generateColumns () {
                const x = Math.round(window.innerWidth / 300)

                const columns = new Array(x).fill(0).map(() => [])

                gallery.forEach((item, index) => {
                    columns[
                        Math.floor(index / ( gallery.length / x ))
                    ].push(item)
                })

                Object.assign(this, { x, columns })
            }
        },

        mounted () {
            this.generateColumns()

            window.addEventListener('resize', this.generateColumns)
        },
    }
</script>

<style lang="sass" scoped>
    section.gallery
        $offset: 0px

        padding: $offset
        padding-left: 280px + $offset
        display: flex
        padding-bottom: 300px

        @media (max-width: 1100px)
            padding-left: $offset
            padding-bottom: 0

        .column
            width: 25%
            display: flex
            flex-direction: column
            position: relative
            z-index: 2

        img
            width: 100%
            padding: 0
            margin: 0
            flex-flow: column
            object-fit: center
            padding: 0px
</style>