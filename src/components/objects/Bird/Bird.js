import { Group } from 'three';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Bird extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const map = new THREE.TextureLoader().load( 'src/assets/bird.png' );
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

    spin() {
        // Add a simple twirl
        this.state.twirl += 6 * Math.PI;

        // Use timing library for more precice "bounce" animation
        // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
        // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
        
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: 0 }, 300)
            .easing(TWEEN.Easing.Quadratic.In);

        // Fall down after jumping up
        jumpUp.onComplete(() => fallDown.start());

        // Start animation
        jumpUp.start();
    }

    press() {
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 100 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        // Start animation
        jumpUp.start();
    }

    update(timeStamp) {
        this.children[0].position.set(this.children[0].position.x, this.children[0].position.y - 2, this.children[0].position.z);

        TWEEN.update();
        // Advance tween animations, if any exist
       // TWEEN.update();
    }
}

export default Bird;
