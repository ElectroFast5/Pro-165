AFRAME.registerComponent("enemy-fireballs", {
    init: function () {
        setInterval(this.shootEnemyFireball, 2000)
    },
    shootEnemyFireball: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyFireball entity
            var enemyFireball = document.createElement("a-entity");

            enemyFireball.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyFireball.setAttribute("material", "color", "red");

            var position = els[i].getAttribute("position")

            enemyFireball.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyFireball);

            //Three.js Vector Variables
            // Player
            var pos1 = new THREE.Vector3()
            // Enemy
            var pos2 = new THREE.Vector3()

            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D

            //Get enemey and player position using Three.js methods
            enemy.getWorldPosition(pos2)
            player.getWorldPosition(pos1)

            //set the velocity and it's direction
            var direction = new THREE.Vector3()
            direction.subVectors(pos1,pos2).normalize()
            enemyFireball.setAttribute("velocity", direction.multiplyScalar(10))
            
            //Set dynamic-body attribute
            enemyFireball.setAttribute("dynamic-body", {mass:"0", shape: "sphere"})

            //Get text attribute
            var element = document.querySelector("#countLife")
            var playerLife = parseInt(element.getAttribute("text").value)

            //collide event on enemy fireballs
            enemyFireball.addEventListener("collide", function (x) {
                if (x.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if(playerLife>0) {
                        playerLife-=1
                        element.setAttribute("text", {value: playerLife})
                    }
                    if(playerLife<0) {
                        var text = document.querySelector("#over")
                        text.setAttribute("visible", true)
                        var ogreEl = document.querySelectorAll(".enemy")
                        for (let i = 0; i < ogreEl.length; i++) {
                            scene.removeChild(ogreEl[i])
                            
                        }
                    }


                }
            });

        }
    },

});