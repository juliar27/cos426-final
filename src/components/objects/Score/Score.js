import { Group } from 'three';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Score extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const map = new THREE.TextureLoader().load( 'src/assets/score.png' );
        map.magFilter = THREE.NearestFilter;
        const material = new THREE.SpriteMaterial( { map: map, transparent: true } );

        const sprite = new THREE.Sprite( material );
        sprite.scale.set( parent.state.width * 0.05, parent.state.height * 0.07, 1 );
        sprite.position.z = 0; 
        sprite.position.x = - parent.state.width / 3; 
        sprite.position.y = 0;
        this.add( sprite );

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }


    update(timeStamp) {
        // Advance tween animations, if any exist
       // TWEEN.update();
    }
}

export default Score;
