<template lang="pug">
    section.home
        .threejs( ref="threejs" )
</template>

<script>
    import { 
        BoxGeometry, MeshStandardMaterial, Color, Mesh, Scene, 
        OrthographicCamera, AmbientLight, DirectionalLight, WebGLRenderer,
    } from 'three'

    export default {
        name: 'home',

        data () {
            return {
                scene: null
            }
        },

        methods: {
            async paintCubes () {
                const geometry = new BoxGeometry()

                const pink = new MeshStandardMaterial({ 
                    color: 0xff69b4, 
                    emissive: new Color(0.3, 0.1, 0.2) 
                })

                const blue = new MeshStandardMaterial({ 
                    color: 0x11cbff, 
                    emissive: new Color(0.3, 0.1, 0.2) 
                })

                const green = new MeshStandardMaterial({ 
                    color: 0xccf24f, 
                    emissive: new Color(0.3, 0.1, 0.2) 
                })

                const white = new MeshStandardMaterial({ 
                    color: 0xffffff, 
                    emissive: new Color(0.3, 0.1, 0.2) 
                })

                const aspect = window.innerWidth / window.innerHeight * 1.5

                let xmin = Math.ceil(-2.5 * aspect), xmax = Math.ceil(2.5 * aspect) + 2
                let ymin = -3, ymax = 5

                let x = xmin, y = ymin, reverse = 1

                const paint = async () => {
                    const cube = new Mesh( 
                        geometry, 
                        [pink, blue, green, white][Math.round(Math.random()*3)]
                    )

                    cube.position.set(
                        x, 
                        17, 
                        Math.round(Math.random() * 10) / 10 * ((x+y) % 4)
                    )

                    cube.scale.set(1, 1, 3)

                    const currentY = y

                    let grav = 0.1

                    const fall = setInterval(() => {
                        if (currentY + 0.05 < cube.position.y - grav) {
                            cube.position.y -= grav
                            grav += 0.004
                        } else {
                            cube.position.y = currentY
                            clearInterval(fall)
                        }
                    }, 10)

                    x += reverse

                    if (x <= xmin || x >= xmax) {
                        reverse *= -1
                        if (y < ymax) y++
                        if (x >= xmax) xmin++
                    } 
                   
                    if (y < ymax) setTimeout(paint, 50)

                    if (y === ymax - 1) {
                        if (Math.random() > 0.6) this.scene.add( cube )
                    } else {
                        this.scene.add( cube )
                    }
                }

                paint()
            },

            spawnLighting () {
                this.scene.add( new AmbientLight( 0x666666) )

                const directionalLight = new DirectionalLight( 0xffffff, 1.1 )

                directionalLight.position.y = 100
                directionalLight.position.x = 5
                directionalLight.position.z = -10

                this.scene.add( directionalLight )
            },

            async makeBlocks () {
                const scene = new Scene()
                
                Object.assign(this, { scene })

                await new Promise(this.$nextTick)

                const aspect = window.innerWidth / window.innerHeight
                const d = 4
                const camera = new OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 )

                camera.position.set( aspect > 1.2 ? 16 : 20, 22, 20 )
                camera.rotation.order = 'YXZ'
                camera.rotation.y = + (Math.PI / 4)
                camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) )

                window.addEventListener( 'resize', () => {
                    const aspect = window.innerWidth / window.innerHeight
                    camera.aspect = aspect
                    camera.left = - d * aspect
                    camera.right = d * aspect
                    camera.updateProjectionMatrix()

                    renderer.setSize( window.innerWidth, window.innerHeight )
                }, false );

                this.spawnLighting()

                this.paintCubes()

                const renderer = new WebGLRenderer({
                    antialias: true,
                    alpha: true,
                })

                renderer.setSize( window.innerWidth, window.innerHeight )

                this.$refs.threejs.appendChild( renderer.domElement )

                const animate = () => {
                    requestAnimationFrame( animate )
                    renderer.render( scene, camera )
                }

                animate()
            }
        },

        mounted () {
            this.makeBlocks()
        }
    }
</script>

<style lang="sass" scoped>
    section.home
        height: 100%

        .threejs
            width: 100%
            height: 100%
            overflow: hidden
            // filter: saturate(60%) luminosity(50%)
</style>