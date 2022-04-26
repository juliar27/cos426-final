import { Group } from 'three';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Bird extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            height: parent.state.height,
            tweenCount: 0
        };

        const map = new THREE.TextureLoader().load( 'src/assets/bird.png' );
        map.magFilter = THREE.NearestFilter;
        const material = new THREE.SpriteMaterial( { map: map, transparent: true } );

        const sprite = new THREE.Sprite( material );
        sprite.scale.set( parent.state.width * 0.03, parent.state.height * 0.04, 1 );
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
            .to({ y: this.position.y + 40 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: -this.state.height / 2 }, 900)
            .easing(TWEEN.Easing.Quadratic.In);
        jumpUp.onStart(() => this.state.tweenCount++);
        jumpUp.onComplete(() => {this.state.tweenCount--; if (this.state.tweenCount === 0) fallDown.start();});
        // Start animation
        jumpUp.start();
    }

    update(timeStamp) {
        // if (this.parent.state.game_state === "active") {
        //     this.children[0].position.set(this.children[0].position.x, this.children[0].position.y - 0.2, this.children[0].position.z);

        // }
        TWEEN.update();


       // this.children[0].position.set(this.children[0].position.x, this.children[0].position.y - this.state.velocity, this.children[0].position.z);
       // this.state.velocity += 0.05;
        // Advance tween animations, if any exist
       // TWEEN.update();
       return false;
    }
}

export default Bird;
