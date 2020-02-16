<template lang="pug">
    section.social
        a.socialButton.twitter( 
            href="https://twitter.com/Andr3wRiv3rs" 
            aria-label="Twitter account" 
        )
            TwitterIcon
            .inner
                TwitterIcon

        a.socialButton.gamejolt( 
            href="https://gamejolt.com/@AndrewRivers" 
            aria-label="Game Jolt account" 
        )
            GameJoltIcon
            .inner
                GameJoltIcon

        a.socialButton.github( 
            href="https://github.com/Andr3wRiv3rs" 
            aria-label="GitHub account" 
        )
            GithubIcon
            .inner
                GithubIcon
                
        a.socialButton.soundcloud( 
            href="https://soundcloud.com/poison_apple" 
            aria-label="SoundCloud account" 
        )
            SoundcloudIcon
            .inner
                SoundcloudIcon
</template>

<script>
    import TwitterIcon from '@/assets/icons/twitter.vue'
    import GameJoltIcon from '@/assets/icons/gamejolt.vue'
    import SoundcloudIcon from '@/assets/icons/soundcloud.vue'
    import GithubIcon from '@/assets/icons/github.vue'

    export default {
        components: {
            TwitterIcon,
            GameJoltIcon,
            SoundcloudIcon,
            GithubIcon,
        },
    }
</script>

<style lang="sass">
    section.social
        display: flex
        justify-content: space-between
        width: 100%
        
    a.socialButton
        position: relative
        padding: calc(25% / 2)
        pointer-events: all
        cursor: pointer
        overflow: hidden
        display: inline-block

        > svg
            filter: saturate(80%)

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

        &.github, &.medium
            fill: var(--white)

        &.soundcloud
            fill: #ff6000

        &.twitter
            fill: #00abf8

        &.discord
            fill: #7289da

        .inner
            background-color: var(--white)
            fill: var(--pink)
            clip-path: inset(100% 0 0 0)
            transition: clip-path 0.2s

        &:hover
            > .inner
                clip-path: inset(0 0 0 0)
                
</style>