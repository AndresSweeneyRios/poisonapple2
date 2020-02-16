<template lang="pug">
    section.vaporwave
        div.floor
            .row( 
                v-for="(_, key) in new Array(30)" 
                :key="key + '-row'" 
                :style="{\
                    top: `${(key + 1) * 5}vmax`,\
                    animationDelay: `${key}s`,\
                    opacity: 0.1 + (key / 20),\
                }"
            )

            .column( 
                v-for="(_, key) in new Array(30)" 
                :key="key + '-column'" 
                :style="{\
                    left: `${(key + 1) * 5}vmax`,\
                    animationDelay: `${key}s`\
                }"
            )
</template>

<style lang="sass">
    section.vaporwave
        min-height: 100%
        width: 100%
        position: fixed
        left: 0
        top: 0

        > div.floor
            position: fixed
            width: 100%
            overflow: hidden
            top: 20%
            height: 100%
            // transform: perspective(20px) rotateX(30deg) scaleY(0.3)

            @keyframes rowDot
                0%
                    clip-path: inset(0 calc(100% - 10px) 0 0)

                50%
                    clip-path: inset(0 calc(50% - 50px) 0 calc(50% - 50px))

                100%
                    clip-path: inset(0 0 0 calc(100% - 10px))

            @keyframes columnDot
                0%
                    clip-path: inset(0 0 calc(100% - 10px) 0)

                50%
                    clip-path: inset(calc(50% - 50px) 0 calc(50% - 50px) 0)

                100%
                    clip-path: inset(calc(100% - 10px) 0 0 0)

            > *
                position: absolute
                background-color: rgba(#ff69b4, 0.7)

                &::after
                    position: absolute
                    content: ''
                    width: 100%
                    height: 100%
                    background-color: var(--pink)

            .row
                height: 1px
                width: 100vw

                &::after
                    animation: 3s rowDot linear infinite alternate
                    animation-delay: inherit
                    clip-path: inset(0 100% 0 0)

            .column
                width: 1px
                height: 100vh
                background: linear-gradient(transparent, rgba(#ff69b4, 0.7))

                &::after
                    background: linear-gradient(transparent, var(--pink))
                    animation: 3s columnDot linear infinite alternate
                    animation-delay: inherit
                    clip-path: inset(0 0 100% 0)
</style>