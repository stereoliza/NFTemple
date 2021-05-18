var extendDeep = AFRAME.utils.extendDeep;
var meshMixin = AFRAME.primitives.getMeshMixin();

AFRAME.registerPrimitive('a-backdoor', extendDeep({}, meshMixin, {
    defaultComponents: {
        geometry: {primitive: 'triangle'},
        material: {src: 'https://ipfs.fleek.co/ipfs/bafybeih77zchlye42wumctobtvjcmaa677uzi6fbxznaslgl7yco2cvolm'},
        text: {},
        back:{},

    },
    mappings: {
        height: 'geometry.height',
        width: 'geometry.width',
        src: 'material.src',
        text_val: 'text.value',
        text_clr: 'text.color'
    }
}));
AFRAME.registerComponent('back', {
    schema: {
        owner: {type: 'string'}
    },
    init: function () {
        var el = this.el;
        el.addEventListener('mouseenter', () => {
            el.setAttribute("text_clr", 'black');
        });
        el.addEventListener('mouseleave', () => {
            setTimeout(() => {
                el.setAttribute("text_clr", 'white');
            });
        });

        el.setAttribute("text_val", "GO BACK!@");
        el.addEventListener('click', () => {
            console.log('CLOKICKED!')
            var scene = document.querySelector('a-scene')
            setTimeout(() => {
                document.querySelectorAll('.slot').forEach(slot =>{
                    slot.setAttribute('obj-model' , 'obj: #door_obj');
                    slot.removeChild(document.querySelector('a-nft'));
                    var door = document.createElement('a-door');
                    door.setAttribute("position", "0.32 0 2.3");
                    door.setAttribute("rotation", "0 87 90");
                    door.setAttribute("scale", "2 2.7");

                    door.setAttribute('geometry', {
                        vertexA: '0 0.55 -0.1',
                        vertexB: '-0.5 -0.36 0',
                        vertexC: '0.5 -0.36 0',

                    });


                    door.classList.toggle('raycastable');
                    slot.appendChild(door);
                })
                scene.removeChild(document.querySelector('a-backdoor'))
            }, 900);


        });

    }
});

