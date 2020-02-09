<template lang="pug">
    section.nav
        router-link( tag="h1" to="/" ) Andres <br> Sweeney-Rios

        h4 Web Developer & Game Developer for hire.

        .links
            router-link( 
                v-for="([path, name], key) in links"
                :key="key"
                :aria-label="name"
                :to="path"
                :class="{ current: $route.path === path }"
            ) {{ name }}

        p andrewarivers@gmail.com
        p Poison Apple#9351

        Social
</template>

<script>
    import Social from './Social'

    export default {
        data () {
            return {
                links: [
                    ['/skills', 'Skills'],
                    ['/projects', 'Projects'],
                    ['/gallery', 'Gallery'],
                ]
            }
        },

        components: {
            Social
        },
    }
</script>

<style lang="sass" scoped>
    section.nav
        display: flex
        flex-direction: column
        align-items: flex-start
        justify-content: center
        position: fixed
        bottom: 0
        left: 0
        padding: 30px
        height: 100%
        width: 280px
        background-color: rgba(45, 40, 48, 0.9)
        z-index: 1

        @media (max-width: 600px)
            width: 100vw
            padding: 60px

        .links
            display: flex
            flex-direction: column
            align-items: flex-start
            justify-content: center
            width: 100%
            margin-bottom: auto
            margin-top: auto

        h1
            font-weight: 200
            font-size: 30px
            line-height: 39px
            cursor: pointer

            &:hover
                color: var(--pink)

        h4
            font-weight: 200
            opacity: 0.7
            margin-top: 10px
            font-size: 14px

        p
            pointer-events: all
            font-size: 16px
            opacity: 0.7

        p:nth-of-type(2)
            margin-bottom: 20px

        .links > a
            pointer-events: all
            text-transform: uppercase
            padding: 10px 20px
            color: var(--white)
            text-decoration: none
            margin: 0
            position: relative
            transition: color 0.2s
            width: 100%
            font-size: 16px

            &:hover
                &::before
                    width: 100%

            &.current
                color: var(--black)
                &::after
                    width: 100%

            &::before
                position: absolute
                z-index: -1
                left: 0
                top: 0
                width: 0
                height: 100%
                content: ''
                background-color: rgba(darkgray, 0.1)
                transition: width 0.25s

            &::after
                position: absolute
                z-index: -1
                left: 0
                top: 0
                width: 0
                border-left: 2px solid var(--white)
                height: 100%
                content: ''
                background-color: var(--white)
                transition: width 0.25s
</style>