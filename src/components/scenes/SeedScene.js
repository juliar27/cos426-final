import * as THREE from 'three';
import { Scene, Color } from 'three';
import { Bird, Pipe } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor(width, height, document) {
        // Call parent Scene() constructor
        super(width, height);

        // Init state
        this.state = {
            rotationSpeed: 1,
            updateList: [],
            width: width,
            height: height,
            score: 0,
            document: document
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        let map = new THREE.TextureLoader().load('src/assets/skygrass.jpg');
       // this.background = map;





        // Add meshes to scene
        const bird = new Bird(this);
        const lights = new BasicLights();
        this.add(bird, lights);

        this.steps = 0;
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
      //  this.rotation.y = (rotationSpeed * timeStamp) / 10000;
        // Call update for each object in the updateList
        if (this.steps > 150) {
            const newPipe = new Pipe(this);
            this.add(newPipe);
            this.steps = 0;
        }

        var step = Math.pow(1.02, this.state.score);

        var dead = false;
        for (const obj of updateList) {
            dead = dead || obj.update(timeStamp, step);
        }

        this.steps += step;
        return dead;
    }

    press() {
        this.children[0].press();
    }

    kill() {
   
    }

   
}

export default SeedScene;
