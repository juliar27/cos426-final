import * as Dat from 'dat.gui';
import * as THREE from 'three';
import { Scene, Color } from 'three';
import { Bird, Pipe } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor(width, height) {
        // Call parent Scene() constructor
        super(width, height);

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            width: width,
            height: height
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        let map = new THREE.TextureLoader().load('src/assets/skygrass.jpg');
       // this.background = map;





        // Add meshes to scene
        const bird = new Bird(this);
        const lights = new BasicLights();
        this.add(bird, lights);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);

        this.steps = 0;
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
      //  this.rotation.y = (rotationSpeed * timeStamp) / 10000;
        // Call update for each object in the updateList
        if (this.steps % 150 === 0) {
            const newPipe = new Pipe(this);
            this.add(newPipe);
        }

        for (const obj of updateList) {
            obj.update(timeStamp, 1);
        }

        this.steps++;
    }

    press() {
        this.children[0].press();
    }
}

export default SeedScene;
