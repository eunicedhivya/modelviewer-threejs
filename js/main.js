var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 5;
    
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

// 3dmodel
// http://localhost/thefederal/perseverence-rover/perseverance.gltf
// http://localhost/thefederal/perseverence-rover/scene2.gltf

var domEvents = new THREEx.DomEvents(camera, renderer.domElement);

var box_model

var loader = new THREE.GLTFLoader();
loader.load('perseverance.gltf', function(gltf){
//   car = gltf.scene.children[0];
//   car.scale.set(0.5,0.5,0.5);
  scene.add(gltf.scene);

  box_model = gltf.scene.getObjectByName( "box" )
    console.log(box_model);

    domEvents.addEventListener(box_model, 'click', function(event){

        console.log("clicked")
        
    })
//   animate();
});


var spriteMap2 = new THREE.TextureLoader().load( "img/sprite2.png" );
spriteMap2.minFilter = THREE.LinearFilter;
var spriteMaterial2 = new THREE.SpriteMaterial( { map: spriteMap2, color: 0xffffff } );
var sprite2 = new THREE.Sprite( spriteMaterial2 );
sprite2.position.x = 3;
sprite2.position.y = 2;
sprite2.scale.set(3, 3, 3)
scene.add(sprite2);

//add a light
var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.x = -6.322;
light.position.y = 1.144;
light.position.z = -0.073;
scene.add(light);

//add a light2
var light2 = new THREE.DirectionalLight(0xFFFFFF, 1, 500);
light2.position.x = 5;
light2.position.y = 10;
light2.position.z = 7.5;
scene.add(light2);



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
