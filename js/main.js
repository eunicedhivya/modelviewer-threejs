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
var textureLoader = new THREE.TextureLoader();
var spriteMap = textureLoader.load( "img/sprite.png" );
    spriteMap.minFilter = THREE.LinearFilter;
    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.position.x = -3;
    sprite.position.y = 2;
    sprite.scale.set(3, 3, 3)
    scene.add(sprite);
    
var spriteMap2 = textureLoader.load( "img/sprite2.png" );
    spriteMap2.minFilter = THREE.LinearFilter;
    var spriteMaterial2 = new THREE.SpriteMaterial( { map: spriteMap2, color: 0xffffff } );
    var sprite2 = new THREE.Sprite( spriteMaterial2 );
    sprite2.position.x = 3;
    sprite2.position.y = 2;
    sprite2.scale.set(3, 3, 3)
    scene.add(sprite2);
sprite2.visible = false;

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
            sprite2.visible = true;
        }else{
            console.log("mast_cams clicked")
            mast_cams_clicked = false;
            sprite2.visible = false;
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
