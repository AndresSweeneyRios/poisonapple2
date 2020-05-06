<template lang="pug">
    section.projects( ref="projects" )
        //- .wrapper( 
        //-     @wheel="onWheel"
        //- )

        Project( 
            v-for="(project, key) of projects"
            :project="project"
            :key="key"
            :projectKey="key"
        )

        //- .scroller
        //-     button.previous( @click="previous" aria-label="Previous project" )

        //-     p {{ index + 1 }}<span></span>{{ projects.length }}

        //-     button.next( @click="next" aria-label="Next project" )
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
            // previous () {
            //     if (this.index > 0) Object.assign( this, {
            //         index: this.index - 1
            //     })
            // },

            // next () {
            //     if (this.index < this.projects.length - 1) Object.assign( this, {
            //         index: this.index + 1
            //     })
            // },

            // onWheel ({ deltaY }) {
            //     if (deltaY < 0) this.previous()
            //     if (deltaY > 0) this.next()
            // },
        },
        
        mounted () {
            // window.addEventListener('keydown', ({ code }) => {
            //     switch (code) {
            //         case 'ArrowUp':
            //             this.previous()
            //             break

            //         case 'ArrowDown':
            //             this.next()
            //             break
            //     }
            // })

            // this.$refs.projects.addEventListener('touchmove', event => event.preventDefault(), false)

            // this.$refs.projects.addEventListener('touchstart', event => {
            //     const [{ pageY: startY }] = event.changedTouches
            //     const startTime = Date.now()

            //     const endHandler = ({ changedTouches }) => {
            //         const [{ pageY }] = changedTouches
            //         const distY = pageY - startY

            //         if (distY > 80) this.previous()
            //         if (distY < -80) this.next()

            //         window.removeEventListener('touchend', endHandler, false)
            //     }
        
            //     window.addEventListener('touchend', endHandler, false)

                // event.preventDefault()

            // }, false)
        },
    }
</script>

<style lang="sass" scoped>
    section.projects
        padding-left: 280px
        display: flex
        flex-wrap: wrap
        height: 100%
        justify-content: center
        align-items: center
        // overflow: hidden
        // position: fixed
        width: 100%
        // scroll-snap-type: y mandatory
        // scroll-snap-points-y: repeat(300px)
        // overflow-y: auto

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

            .scroller
                right: 30px

        .wrapper
            flex-grow: 1
            height: 100%
            position: relative
            top: 0
            transition: top 0.2s
            
</style>