<template lang="pug">
    section.nav( 
        :class="{ closed }" 
    )
        h1 Andres <br> Sweeney-Rios

        h4 Game Developer & Frontend Web Specialist for hire.

        .links( @click="closed = true" )
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

        button.hamburger( 
            @click="closed = !closed" 
            :class="{ closed }"
            aria-label="Navigation menu"
        )
            .bar1
            .bar2
            .bar3
</template>

<script>
    import Social from './Social'

    export default {
        data () {
            return {
                closed: true,

                links: [
                    ['/', 'Projects'],
                    ['/gallery', 'Gallery'],
                    ['/skills', 'Skills'],
                ]
            }
        },

        watch: {
            $route ({ path }) {
                Object.assign(this, {
                    closed: path !== '/'
                })
            }
        },

        components: {
            Social
        },

        mounted () {
            Object.assign(this, {
                closed: this.$route.path !== '/'
            })

            window.addEventListener('touchstart', event => {
                const [{ pageX: startX }] = event.changedTouches
                const startTime = Date.now()

                const endHandler = ({ changedTouches }) => {
                    const [{ pageX }] = changedTouches
                    const distX = pageX - startX

                    if (distX > 50 && startX < 50) Object.assign(this, { closed: false })
                    if (distX < -50) Object.assign(this, { closed: true })

                    window.removeEventListener('touchend', endHandler, false)
                }
        
                window.addEventListener('touchend', endHandler, false)
            }, false)
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
        top: 0
        left: 0
        padding: 30px
        height: 100%
        width: 280px
        background-color: rgb(45, 37, 48)
        z-index: 3
        transition: left 0.1s

        .hamburger
            position: absolute
            top: 0
            right: 0px
            width: 60px
            height: 60px
            border: none
            background: transparent
            outline: none
            cursor: pointer
            display: none
            transition: right 0.1s

            @media (max-width: 1100px)
                display: block

            > *
                position: absolute
                background-color: var(--white)
                height: 4px
                width: 33px
                left: calc((60px - 33px) / 2)
                transform: rotate(0deg)
                transition: left 0.3s, top 0.3s, transform 0.3s, background 0.3s
                pointer-events: none
                margin: auto
                display: inline-block
                box-shadow: 0 0 5px 1px rgba(black, 0.4)

            &:hover > *
                background-color: var(--pink)

            .bar1
                top: 30%

            .bar2
                top: calc(45% + 1px)

            .bar3
                bottom: 30%

            &:not(.closed)
                .bar1, .bar2
                    top: 40%
                    transform: rotate(45deg)

                .bar3
                    top: 40%
                    bottom: auto
                    transform: rotate(-45deg)
                

        &.closed > .hamburger
            right: -60px

        @media (max-width: 1100px)
            &.closed
                left: -280px

        @media (max-width: 500px)
            width: 100%
            padding: 60px

            &.closed
                left: -100%

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

            // &:hover
            //     color: var(--pink)

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