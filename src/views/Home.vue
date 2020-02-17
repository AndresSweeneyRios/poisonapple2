<template lang="pug">
    section.home
        canvas.blocks(
            :width="canvas.width"
            :height="canvas.height"
            ref="canvas"
        )

        canvas.highlight(
            :width="canvas.width"
            :height="canvas.height"
            ref="highlight"
        )
</template>

<script>
    const blockTypes = [
        [
            [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
            [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
            [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
            [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]
        ],
        [
            [[0,2,0,0],[0,2,0,0],[2,2,0,0],[0,0,0,0]],
            [[2,0,0,0],[2,2,2,0],[0,0,0,0],[0,0,0,0]],
            [[0,2,2,0],[0,2,0,0],[0,2,0,0],[0,0,0,0]],
            [[0,0,0,0],[2,2,2,0],[0,0,2,0],[0,0,0,0]]
        ],
        [
            [[0,3,0,0],[0,3,0,0],[0,3,3,0],[0,0,0,0]],
            [[0,0,0,0],[3,3,3,0],[3,0,0,0],[0,0,0,0]],
            [[3,3,0,0],[0,3,0,0],[0,3,0,0],[0,0,0,0]],
            [[0,0,3,0],[3,3,3,0],[0,0,0,0],[0,0,0,0]]
        ],
        [
            [[4,4,0,0],[4,4,0,0],[0,0,0,0],[0,0,0,0]],
            [[4,4,0,0],[4,4,0,0],[0,0,0,0],[0,0,0,0]],
            [[4,4,0,0],[4,4,0,0],[0,0,0,0],[0,0,0,0]],
            [[4,4,0,0],[4,4,0,0],[0,0,0,0],[0,0,0,0]]
        ],
        [
            [[0,0,0,0],[0,5,5,0],[5,5,0,0],[0,0,0,0]],
            [[5,0,0,0],[5,5,0,0],[0,5,0,0],[0,0,0,0]],
            [[0,5,5,0],[5,5,0,0],[0,0,0,0],[0,0,0,0]],
            [[0,5,0,0],[0,5,5,0],[0,0,5,0],[0,0,0,0]]
        ],
        [
            [[0,0,0,0],[6,6,6,0],[0,6,0,0],[0,0,0,0]],
            [[0,6,0,0],[6,6,0,0],[0,6,0,0],[0,0,0,0]],
            [[0,6,0,0],[6,6,6,0],[0,0,0,0],[0,0,0,0]],
            [[0,6,0,0],[0,6,6,0],[0,6,0,0],[0,0,0,0]]
        ],
        [
            [[0,0,0,0],[7,7,0,0],[0,7,7,0],[0,0,0,0]],
            [[0,7,0,0],[7,7,0,0],[7,0,0,0],[0,0,0,0]],
            [[7,7,0,0],[0,7,7,0],[0,0,0,0],[0,0,0,0]],
            [[0,0,7,0],[0,7,7,0],[0,7,0,0],[0,0,0,0]]
        ],
        // [
        //     [[8,0,0,0],[8,0,0,0],[8,0,0,0],[0,0,0,0]],
        //     [[8,8,8,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
        //     [[0,8,0,0],[0,8,0,0],[0,8,0,0],[0,0,0,0]],
        //     [[8,8,8,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
        // ],
        // [
        //     [[9,0,0,0],[9,0,0,0],[0,0,0,0],[0,0,0,0]],
        //     [[9,9,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
        //     [[0,9,0,0],[0,9,0,0],[0,0,0,0],[0,0,0,0]],
        //     [[0,0,0,0],[9,9,0,0],[0,0,0,0],[0,0,0,0]]
        // ],
    ]

    const blockColors = [
        '#C4FAF8', // I cyan
        '#97A2FF', // J blue
        '#FFF5BA', // L orange
        '#FFFFD1', // O yellow
        '#BFFCC6', // S green
        '#D5AAFF', // T purple
        '#FFABAB', // Z red
    ]

    const shuffle = (array) => {
        let counter = array.length

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter)
            counter--
            let temp = array[counter]
            array[counter] = array[index]
            array[index] = temp
        }

        return array
    }

    const iterate = ( { x: gridX, y: gridY, block }, callback ) => {
        for (let x = 0; x < block[0].length; x++) {
            for (let y = 0; y < block.length; y++) {
                const value = block[y][x]

                if (value) callback({ 
                    x: gridX + x, 
                    y: gridY + y, 
                    value
                })
            }
        }
    }

    const iterateHeld = (held, callback) => {
        iterate(
            {
                ...held,
                block: held.block[held.rotation]
            }, 

            callback
        )
    }

    export default {
        name: 'home',

        data () {
            return {
                canvas: {
                    width: 0,
                    height: 0,
                },

                held: {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    block: blockTypes[0]
                },

                npc: {},

                ctx: null,
                highlightCtx: null,
                grid: [], 
                queue: [],
                speed: 500,
                speedMultiplier: 1,
                started: false,
                loopTimeout: null,
                highlightHeld: null,
            }
        },

        methods: {
            scaleCanvas () {
                const aspect = this.$refs.canvas.offsetWidth / this.$refs.canvas.offsetHeight

                const width = Math.floor(this.$refs.canvas.offsetWidth / 24 / 2) * 2
                const height = Math.floor(width / aspect)

                Object.assign(this, {
                    canvas: { width, height }
                })

                return { width, height }
            },

            keyup ( code ) {
                switch (code.toLowerCase()) {
                    case 's':
                    case 'arrowdown':
                        Object.assign(this, { speed: 500 })
                        clearTimeout(this.loopTimeout)
                        setTimeout(this.gameLoop, this.speed)
                        break
                }
            },

            keydown ( code ) {
                switch (code.toLowerCase()) {
                    case 'w':
                    case 'arrowup':
                        while (!this.willCollide({
                            ...this.held,
                            y: this.held.y + 1
                        })) {
                            this.update()
                        }

                        this.update()
                        break

                    case 's':
                    case 'arrowdown':
                        Object.assign(this, { speed: 1000/30 })
                        clearTimeout(this.loopTimeout)
                        this.gameLoop()
                        break

                    case 'a':
                    case 'arrowleft': {
                        const newX = this.held.x - 1

                        if (this.willCollide({
                            ...this.held,
                            x: newX
                        })) return

                        iterateHeld(this.held, this.clear)
                        this.held.x = newX
                        iterateHeld(this.held, this.draw)

                        this.highlight()
                        break
                    }

                    case 'd':
                    case 'arrowright': {
                        const newX = this.held.x + 1

                        if (this.willCollide({
                            ...this.held,
                            x: newX
                        })) return

                        iterateHeld(this.held, this.clear)
                        this.held.x = newX
                        iterateHeld(this.held, this.draw)

                        this.highlight()
                        break
                    }

                    case '':
                        break

                    case 'shiftleft': {
                        const newRot = this.held.rotation <= 0 ? 3 : this.held.rotation - 1

                        if (this.willCollide({
                            ...this.held,
                            rotation: newRot
                        })) return

                        iterateHeld(this.held, this.clear)
                        this.held.rotation = newRot
                        iterateHeld(this.held, this.draw)

                        this.highlight()
                        break
                    }

                    case 'shiftright': {
                        const newRot = this.held.rotation >= 3 ? 0 : this.held.rotation + 1

                        if (this.willCollide({
                            ...this.held,
                            rotation: newRot
                        })) return

                        iterateHeld(this.held, this.clear)
                        this.held.rotation = newRot
                        iterateHeld(this.held, this.draw)

                        this.highlight()
                        break
                    }
                }
            },

            willCollide (held) {
                let result = false

                iterateHeld( 
                    held, 
                    ({ x, y }) => { 
                        if (y >= 0 && this.grid[x + 1][y + 1]) result = true 
                    }
                )

                return result
            },

            clear ({ x, y }, context = this.ctx) {
                context.clearRect(x, y, 1, 1)
            },

            draw ({ x, y, value }, context = this.ctx) {
                context.fillStyle = blockColors[value-1]
                context.fillRect(x, y, 1, 1)
            },

            highlight () {
                if (this.highlightHeld) 
                    iterateHeld(this.highlightHeld, point => this.clear(point, this.highlightCtx))

                const highlightHeld = { ...this.held }

                while (!this.willCollide({
                    ...highlightHeld,
                    y: highlightHeld.y + 1
                })) {
                    highlightHeld.y++
                }

                Object.assign(this, { highlightHeld })

                iterateHeld(highlightHeld, point => this.draw(point, this.highlightCtx))
            },


            update () {
                if (this.willCollide({
                    ...this.held,
                    y: this.held.y + 1
                })) {
                    const { grid } = this

                    iterateHeld(this.held, 
                        ({ x, y, value }) => {
                            grid[x+1][y+1] = value
                        }
                    )

                    this.next()
                } else {
                    iterateHeld(this.held, this.clear)
                    this.held.y++
                    iterateHeld(this.held, this.draw)
                }
            },

            next () {
                if (this.queue.length === 0) Object.assign(this, {
                    queue: shuffle([ ...blockTypes, ...blockTypes ])
                })

                if (this.demo) {
                    // this.keydown('arrowup')

                    this.held.rotation = Math.floor(Math.random()*4)

                    this.held.x = this.npc.pos

                    this.npc.pos += this.npc.direction * this.npc.offset

                    if (this.npc.pos > this.grid.length - 6) {
                        this.npc.direction = -1
                        this.npc.pos += this.npc.direction * this.npc.offset
                        this.npc.pos ++
                    } else if (this.npc.pos < 0) {
                        this.npc.direction = 1
                        this.npc.pos += this.npc.direction * this.npc.offset
                    }
                } else {
                    this.held.x = Math.floor(this.canvas.width / 2) - 2
                    this.held.rotation = 0
                }

                this.held.block = this.queue.splice(0,1)[0]
                this.held.y = -3
            },

            gameLoop () {
                if (this.loopTimeout) clearTimeout(this.loopTimeout)

                this.update()

                this.highlight()

                Object.assign( this, {
                    loopTimeout: setTimeout(this.gameLoop, this.speed / this.speedMultiplier)
                })
            },

            demo () {
                let pos = 0, direction = 1, offset = 3

                this.held.x = 0

                Object.assign(this, { 
                    speed: 1000/120, 
                    demo: true,
                    npc: {
                        pos, direction, offset
                    }
                })
            },

            start () {
                const keys = []

                setInterval(() => {
                    for (const { time, code } of keys) {
                        if (
                            !['keys', 'arrowdown'].includes(code.toLowerCase())
                            && 
                            Date.now() - time > 200
                        ) this.keydown(code)
                    }
                }, 40)

                window.addEventListener('keydown', ({ code }) => {
                    if (keys.findIndex( key => key.code === code) < 0) {
                        keys.push({ code, time: Date.now() })

                        this.keydown(code)
                    }

                })

                window.addEventListener('keyup', ({ code }) => {
                    keys.splice(keys.findIndex( key => key.code === code), 1)

                    this.keyup(code)
                })

                Object.assign(this, { started: true })
            },
        },

        mounted () {
            Object.assign(this, {
                ctx: this.$refs.canvas.getContext('2d'),
                highlightCtx: this.$refs.highlight.getContext('2d'),
            })

            const { width, height } = this.scaleCanvas()

            window.addEventListener('resize', this.scaleCanvas)

            for ( let x = -1; x < width + 1; x++ ){
                let column = []

                for ( let y = -1; y < Math.floor(height) + 1; y++ )
                    column.push( 
                        x < 0 || x >= width || y >= Math.floor(height)
                            ? 1
                            : 0
                    )

                this.grid.push(column)
            }

            this.demo()

            this.next()

            this.gameLoop()
        },
    }
</script>

<style lang="sass" scoped>
    section.home
        canvas
            width: calc(100vw - 280px)

            @media (max-width: 1100px)
                width: 100vw

            margin-left: 280px
            height: 100vh
            position: absolute
            image-rendering: pixelated
            top: 0
            right: 0
            filter: saturate(250%)

        .highlight
            opacity: 0.1
            top: 0
            right: 0
</style>