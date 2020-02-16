<template lang="pug">
    section.projects

        .wrapper( 
            :style="{ top: `-${100*index}vh` }" 
            @wheel="onWheel"
        )

            Project( 
                v-for="(project, key) of projects"
                :project="project"
                :key="key"
            )

        .scroller
            button.previous( @click="previous" aria-label="Previous project" )

            p {{ index + 1 }}<span></span>{{ projects.length }}

            button.next( @click="next" aria-label="Next project" )
</template>

<script>
    import projects from '@/assets/projects/index.js'
    import Project from '@/components/Project'

    export default {
        name: 'projects',

        components: {
            Project
        },

        data () {
            return {
                index: 0,
                projects: Object.values(projects)
            }
        },

        methods: {
            previous () {
                if (this.index > 0) Object.assign( this, {
                    index: this.index - 1
                })
            },

            next() {
                if (this.index < this.projects.length - 1) Object.assign( this, {
                    index: this.index + 1
                })
            },

            onWheel ({ deltaY }) {
                if (deltaY < 0) this.previous()
                if (deltaY > 0) this.next()
            }
        },
    }
</script>

<style lang="sass" scoped>
    section.projects
        padding-left: 280px
        position: relative
        display: flex
        flex-wrap: wrap
        overflow: hidden
        height: 100vh
        justify-content: center
        align-items: center

        .scroller
            width: 40px
            display: flex
            align-items: center
            justify-content: center
            position: absolute
            // right: 60px
            right: 20px
            // background-color: var(--black)
            z-index: 2
            flex-direction: column

            button
                outline: none
                border: none
                background: transparent
                color: var(--white)

                &.previous, &.next
                    display: flex
                    justify-content: center
                    align-items: center
                    width: 50px
                    height: 40px
                    position: relative
                    color: var(--white)
                    cursor: pointer
                    // border-radius: 100%
                    // margin: 4px 0
                    background-color: rgba(50, 45, 55, 1)

                    &::before, &::after
                        content: ''
                        height: 1px
                        width: 10px
                        background-color: currentColor
                        // opacity: 0.7

                    &::before
                        transform: rotate(48deg)
                        margin-right: -8.2px

                    &::after
                        transform: rotate(-48deg)
                        margin-left: -8.2px

                    &.next
                        transform: rotate(180deg)

                    &:hover
                        color: var(--pink)

                        &::before, &::after
                            opacity: 1

            p
                font-weight: 200
                display: flex
                align-items: center
                justify-content: center
                pointer-events: none
                user-select: none
                width: 50px
                background-color: rgba(50, 45, 55, 1)
                flex-direction: column

                span
                    display: inline-block
                    height: 1px
                    width: 17px
                    position: relative
                    // transform: rotate(-65deg)
                    background-color: var(--white)
                    opacity: 0.5
                    margin: 5px 0


        @media (max-width: 1100px)
            padding-left: 0

        .wrapper
            flex-grow: 1
            min-height: 100vh
            position: relative
            top: 0
            transition: top 0.3s
            
</style>