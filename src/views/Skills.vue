<template lang="pug">
    section.skills
        .top
            Skillgroup( 
                v-for="[name, items] in skills.slice(0,3)" 
                :key="name"
                :name="name"
                :items="items"
            ) 

        .bottom
            Skillgroup( 
                v-for="[name, items] in skills.slice(3)" 
                :key="name"
                :name="name"
                :items="items"
            ) 
</template>

<style lang="sass" scoped>
    section.skills
        padding-left: 281px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 100%

        > div
            display: flex
</style>

<script>
    import Skillgroup from '@/components/Skillgroup'

    export default {
        name: 'skills',

        components: {
            Skillgroup,
        },

        data () {
            return { skills: [
                ['Languages', [
                    "JavaScript",
                    "C#",
                    "Godot Script",
                    "GML",
                ]],

                ['Frameworks', [
                    "Express",
                    "Phonegap / Cordova",
                    "Vue.js",
                    "Nuxt.js",
                    "React",
                    "Next.js",
                ]],

                ['Frontend', [
                    "Sass / Stylus",
                    "Three.js",
                    "WebRTC",
                    "Discord.js",
                    "Electron",
                    "jQuery",
                    "Webpack / Parcel",
                ]],

                ['Backend', [
                    "Express.js",
                    "MongoDB",
                    "MySQL",
                    "NGINX",
                    "Stripe / Mollie",
                ]],

                ['Game Engines', [
                    "Unity",
                    "Godot",
                    "GameMaker: Studio",
                    "Construct 2",
                ]],

                ['Graphics', [
                    "Blender",
                    "MagicaVoxel",
                    "GIMP",
                    "Inkscape",
                ]],
            ]}
        },
    }
</script>