AFRAME.registerComponent("throw",{
    init:function(){
        this.throwBall();
    },
    throwBall:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:1
                })
                ball.setAttribute("material","color","red")
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                ball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))
                ball.setAttribute("dynamic-body",{shape:"sphere",mass:"0"})
                ball.addEventListener("collide",this.removeBall);
                var scene=document.querySelector("#scene")
                scene.removeChild(ball)
            }
        })
    },
    removeBall:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
        
        if(elementHit.id.includes("bowling_pin")){
            elementHit.setAttribute("material",{
                opacity:0.6,
                transparent:true
            })
            var impulse = new CANNON.Vec3(0,1,-15)
            var worldPoint = new CANNON.Vec3.copy(
                elementHit.getAttribute("position")
            )
            elementHit.applyForce(impulse,worldPoint) 
            elementHit.removeEventListener("collide",this.removeBall)
            var scene = document.querySelector("#scene")
            scene.removeChild(element)
        }
    }
})