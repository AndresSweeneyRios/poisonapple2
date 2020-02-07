<template lang="pug">
    section.social
        a.twitter( href="#" aria-label="Twitter account" )
            include ../assets/icons/twitter.svg
            .inner
                include ../assets/icons/twitter.svg

        a.gamejolt( href="#" aria-label="Game Jolt account" )
            include ../assets/icons/gamejolt.svg
            .inner
                include ../assets/icons/gamejolt.svg

        a.github( href="#" aria-label="GitHub account" )
            include ../assets/icons/github.svg
            .inner
                include ../assets/icons/github.svg
                
        a.soundcloud( href="#" aria-label="SoundCloud account" )
            include ../assets/icons/soundcloud.svg
            .inner
                include ../assets/icons/soundcloud.svg
</template>

<style lang="sass" scoped>
    section.social
        display: flex
        justify-content: space-between
        width: 100%
        
        > a
            position: relative
            padding: calc(25% / 2)
            pointer-events: all
            cursor: pointer
            overflow: hidden

            > svg
                // filter: saturate(80%)

            svg, .inner
                pointer-events: none
                position: absolute
                top: -1px
                left: -1px
                width: calc(100% + 2px)
                height: calc(100% + 2px)
                display: flex

            &.gamejolt
                fill: #ccf24f

            &.github
                fill: var(--white)

            &.soundcloud
                fill: #ff6000

            &.twitter
                fill: #00abf8

            .inner
                background-color: var(--white)
                fill: var(--pink)
                clip-path: inset(100% 0 0 0)
                transition: clip-path 0.2s

            &:hover
                > .inner
                    clip-path: inset(0 0 0 0)
                
</style>