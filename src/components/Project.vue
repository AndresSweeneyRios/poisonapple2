<template lang="pug">
    section.project
        .background(:style="backgroundStyle")

        .inner
            .head
                h1 {{ project.title }}

                .links( v-if="project.links" )
                    a.socialButton( 
                        v-for="(link, key) in project.links" 
                        :key="key"
                        :href="link.url"
                        :class="link.type"
                    )
                        TwitterIcon( v-if="link.type === 'twitter'" )
                        GameJoltIcon( v-if="link.type === 'gamejolt'" )
                        SoundcloudIcon( v-if="link.type === 'soundcloud'" )
                        GithubIcon( v-if="link.type === 'github'" )
                        DiscordIcon( v-if="link.type === 'discord'" )
                        MediumIcon( v-if="link.type === 'medium'" )

                        .inner
                            TwitterIcon( v-if="link.type === 'twitter'" )
                            GameJoltIcon( v-if="link.type === 'gamejolt'" )
                            SoundcloudIcon( v-if="link.type === 'soundcloud'" )
                            GithubIcon( v-if="link.type === 'github'" )
                            DiscordIcon( v-if="link.type === 'discord'" )
                            MediumIcon( v-if="link.type === 'medium'" )

            p( v-html="description" )

            .handles( v-if="project.handles" )
                a( 
                    v-for="({ type, value }, key) in project.handles"
                    :href="`https://${ type }.com/${ type === 'instagram' ? '' : '@' }${ value }`"
                ) @{{ value }}
</template>

<script>
    import TwitterIcon from '@/assets/icons/twitter.vue'
    import GameJoltIcon from '@/assets/icons/gamejolt.vue'
    import SoundcloudIcon from '@/assets/icons/soundcloud.vue'
    import GithubIcon from '@/assets/icons/github.vue'
    import DiscordIcon from '@/assets/icons/discord.vue'
    import MediumIcon from '@/assets/icons/medium.vue'

    export default {
        props: ["project"],

        components: {
            TwitterIcon,
            GameJoltIcon,
            SoundcloudIcon,
            GithubIcon,
            DiscordIcon,
            MediumIcon,
        },

        data () {
            return {
                backgroundStyle: {
                    backgroundImage: `url(${
                        require(`@/assets/projects/${this.project.id}/${this.project.id}.png`)
                    })`,

                    ...(this.project.left ? {
                        backgroundPosition: 'left center'
                    } : {}),


                }
            }
        },

        computed: {
            description () {
                return this.project.description.replace(
                    /\[([^\]]+)\]\(([^\)]+)\)/g,
                    '<a href="$2">$1</a>'
                )
            }
        },
    }
</script>

<style lang="sass">
    .project
        height: 100%
        width: 100%
        position: relative
        display: flex
        align-items: flex-end

        .background
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            display: flex
            background-size: cover
            background-position: center center
            z-index: 0

            &::after
                content: ''
                flex-grow: 1
                // background-color: rgba(30, 30, 30, 0.8)
                background: linear-gradient(transparent, transparent, rgba(35,30,38,0.4))

        > .inner
            z-index: 1
            width: 100%
            padding: 40px
            display: flex
            flex-direction: column
            align-items: flex-start

            h1
                font-weight: 200
                font-size: 26px
                background-color: rgba(50, 45, 55, 1)
                padding: 8px
                display: inline-block
                margin-right: 5px
                height: 50px
                display: flex
                align-items: center

            p
                color: rgba(230,230,230, 0.7)
                font-size: 18px
                background-color: rgba(50, 45, 55, 1)
                padding: 8px
                max-width: 700px
                word-wrap: break-all
                display: inline-block

            @media (max-width: 500px)
                h1
                    font-size: 20px

                p
                    font-size: 15px


            @media (max-width: 1100px)
                padding: 30px

        .head
            display: flex
            align-items: flex-start
            justify-content: center
            margin-bottom: 5px

            .links
                display: flex
                // margin-top: 5px
                width: auto
                align-items: center
                justify-content: center

                .socialButton
                    width: 50px
                    height: 50px
                    padding: 0
                    background: rgba(35,30,38,0.4)
                    // border: 2px solid var(--black)
                    // clip-path: circle(50%)
                    // border-radius: 55px
                    // fill: var(--white)
                    filter: saturate(75%)

                    &:not(:last-child)
                        margin-right: 5px

            @media (max-width: 600px)
                flex-direction: column

                .links
                    margin-top: 5px

        .handles
            display: flex
            flex-wrap: wrap

            a
                display: inline-block
                background-color: rgba(50, 45, 55, 1)
                padding: 5px
                margin-right: 5px
                font-size: 13px
                margin-top: 5px
</style>