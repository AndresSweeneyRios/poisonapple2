<template lang="pug">
    section.nav
        h1 Andres <br> Sweeney-Rios

        h4 Web Developer & Game Developer for hire.

        .links
            router-link( to="#" aria-label="Skills" ) Skills
            router-link( to="#" aria-label="Projects" ) Projects
            router-link( to="#" aria-label="Gallery" ) Gallery
            //- router-link( to="#" title="Contact" ) Contact

        p andrewarivers@gmail.com
        p Poison Apple#9351

        Social
</template>

<script>
    import Social from './Social'

    export default {
        components: {
            Social
        }
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
        width: 281px
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
                color: var(--black)
                
                &::after
                    width: 100%

            &::before
                position: absolute
                z-index: -1
                left: 0
                top: 0
                width: 100%
                height: 100%
                content: ''
                // background-color: rgba(darkgray, 0.1)

            &::after
                position: absolute
                z-index: -1
                left: 0
                top: 0
                width: 2px
                height: 100%
                content: ''
                background-color: var(--white)
                transition: width 0.25s
</style>