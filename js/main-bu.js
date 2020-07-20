var scene = new THREE.Scene()

var raycaster = new THREE.Raycaster()

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 5;
    
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth - 20,window.innerHeight - 20);

var wrap = document.getElementById("canvas-wrapper");
    wrap.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})
// Sprite function
var sprite;
function addSprite(source, xpos, ypos) {
    var spriteMap = source;
    spriteMap.minFilter = THREE.LinearFilter;
    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    sprite = new THREE.Sprite( spriteMaterial );
    sprite.position.x = xpos;
    sprite.position.y = ypos;
    sprite.scale.set(3, 3, 3);
    spriteMaterial.sizeAttenuation = true;
    scene.add(sprite);
}

addSprite(new THREE.TextureLoader().load( "img/sprite.png" ), -3, 2)
var domEvents = new THREEx.DomEvents(camera, renderer.domElement);

var box_model, mast_cams

var mast_cams_clicked = false;



var loader = new THREE.GLTFLoader();
loader.load('perseverance.gltf', function(gltf){
//   car = gltf.scene.children[0];
//   car.scale.set(0.5,0.5,0.5);
  scene.add(gltf.scene);

  box_model = gltf.scene.getObjectByName( "box" )
  mast_cams = gltf.scene.getObjectByName( "Mastcam_Z_cams" )
  console.log(mast_cams);

    domEvents.addEventListener(mast_cams, 'click', function(event){

        if(!mast_cams_clicked){
            console.log("mast_cams clicked")
            mast_cams_clicked = true;
            addSprite(new THREE.TextureLoader().load( "img/sprite2.png" ), 3, 2)
            sprite.visible = true;
        }else{
            console.log("mast_cams clicked")
            mast_cams_clicked = false;
            sprite.visible = false;
        }
        
    })
//   animate();
});




//add a light
function addLight(source, xpos, ypos, zpos) {
    var light = source;
    light.position.x = xpos;
    light.position.y = ypos;
    light.position.z = zpos;
    scene.add(light);
}

// using reusable function addLight(source, xpos, ypos, zpos) 
addLight(new THREE.PointLight(0xFFFFFF, 1, 500), -6.322, 1.144, -0.073);
addLight(new THREE.DirectionalLight(0xFFFFFF, 1, 500), 5, 10, 7.5);


// console.log(scene);

var controls = new THREE.OrbitControls(camera);

// controls.addEventListener('change', renderer);










// Set this to be able to see the scene (Points the camera to scene and renders it)

// renderer.render(scene, camera)

var render = function(){
    requestAnimationFrame(render);

    // sphere.rotation.x += 0.01;

    renderer.render(scene, camera)
}

render()

controls.addEventListener('change', render);
