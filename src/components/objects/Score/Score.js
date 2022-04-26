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
        sprite.scale.set( parent.state.width * 0.5, parent.state.height * 0.5, 1 );
        sprite.position.z = 1.5; 
        sprite.position.x = 0; 
        sprite.position.y = 0;
        this.add( sprite );

        // Add self to parent's update list
        parent.addToUpdateList(this);
        parent.state.document.getElementById('game_over_text').innerHTML = '' +  parent.state.score;

    }


    update(timeStamp) {
        // Advance tween animations, if any exist
       // TWEEN.update();
    }
}

export default Score;
