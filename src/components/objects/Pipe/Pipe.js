import { Group } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from '../Flower/flower.gltf';
import * as THREE from 'three';

class Pipe extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.state = {
            width : parent.state.width,
            height: parent.state.height,
            bird: parent.children[0],
            parent: parent
        }

        const map = new THREE.TextureLoader().load( 'src/assets/pipe.png' );
        map.magFilter = THREE.NearestFilter;
        const material = new THREE.SpriteMaterial( { map: map, transparent: true } );

        this.state.bottomLength = parent.state.height * 0.2 + Math.random() * parent.state.height * 0.4;
        const topLength = parent.state.height * 0.8 - this.state.bottomLength;

        const bottomSprite = new THREE.Sprite( material );
        bottomSprite.scale.set( parent.state.width * 0.05, this.state.bottomLength, 1 );
        bottomSprite.position.z = 0; 
        bottomSprite.position.x = parent.state.width / 2; 
        bottomSprite.position.y = -parent.state.height / 2 + bottomSprite.scale.y / 2;
        this.add( bottomSprite );

        const topMaterial = new THREE.SpriteMaterial( { map: map, transparent: true, rotation : Math.PI } );
        const topSprite = new THREE.Sprite( topMaterial );
        topSprite.scale.set( parent.state.width * 0.05, topLength, 1 );
        topSprite.position.z = 0; 
        topSprite.position.x = parent.state.width / 2; 
        topSprite.position.y = parent.state.height / 2 - topSprite.scale.y / 2;
        this.add( topSprite );

        parent.addToUpdateList(this);
    }

    update(timeStamp, stepSize) {
        this.children[0].position.set(this.children[0].position.x - stepSize, this.children[0].position.y, this.children[0].position.z);
        this.children[1].position.set(this.children[1].position.x - stepSize, this.children[1].position.y, this.children[1].position.z);

        var birdBox = new THREE.Box3().setFromObject(this.state.bird.children[0]).expandByScalar(0.9);
        var topPipeBox = new THREE.Box3().setFromObject(this.children[0]);
        var bottomPipeBox = new THREE.Box3().setFromObject(this.children[1]);
        if (birdBox.intersectsBox(topPipeBox) || birdBox.intersectsBox(bottomPipeBox)) {
            this.state.parent.kill();
        }

    }
}



export default Pipe;
