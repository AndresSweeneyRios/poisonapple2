<template lang="pug">
    div.skillgroup
        h3 {{ name }}
        ul
            li( v-for="item in items" :key="item" ) {{ item }}

</template>

<script>
    export default {
        props: ["name", "items"]
    }
</script>

<style lang="sass" scoped>
    div.skillgroup
        padding: 20px
        width: 240px
        display: flex
        flex-direction: column
        // align-items: center
        margin-left: 40px

        @media (max-width: 1000px)
            margin: 0

        > h3
            font-size: 18px
            font-weight: 200
            text-transform: uppercase
            color: var(--pink)
            margin-bottom: 2px

        > ul
            list-style: none
            font-size: 14px
            opacity: 0.7

            li
                padding: 2px 0
</style>