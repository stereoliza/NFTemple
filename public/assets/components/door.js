var owners = ['0x0680cc6a4d7f7b9a3c3f584ef2d5df04d6931c32','0x91671d0c02c7465b0948e819d2c2d261405301cf',
    '0x35742dc6b6e674f3b13fc15469873fdc809cd557', '0x0605a93a0d4245f2ebd4a2d36dcab68a8fa63aab', '0x65c1b9ae4e4d8dcccfd3dc41b940840fe8570f2a',
    '0xba45e5496f29c1a421f639de38232986429f7439', '0xa8f8d167320d09ccaa6544caa61af0c3a34f75b0','0x3f16d081113c613743ce1d7da6858dc4d26352c3','0x20737767a070acf0e6802da1d8ce7cd34c065714',
    '0x20737767a070acf0e6802da1d8ce7cd34c065714','0x20737767a070acf0e6802da1d8ce7cd34c065714','0x20737767a070acf0e6802da1d8ce7cd34c065714','0x20737767a070acf0e6802da1d8ce7cd34c065714',
    '0x20737767a070acf0e6802da1d8ce7cd34c065714','0x20737767a070acf0e6802da1d8ce7cd34c065714','0x20737767a070acf0e6802da1d8ce7cd34c065714'];

var links = [];
var extendDeep = AFRAME.utils.extendDeep;
var meshMixin = AFRAME.primitives.getMeshMixin();

AFRAME.registerPrimitive('a-door', extendDeep({}, meshMixin, {
    defaultComponents: {
        geometry: {primitive: 'triangle'},
        material: {src: 'https://ipfs.fleek.co/ipfs/bafybeih77zchlye42wumctobtvjcmaa677uzi6fbxznaslgl7yco2cvolm'},
        text: {},
        clickable:{},

    },
    mappings: {
        height: 'geometry.height',
        width: 'geometry.width',
        src: 'material.src',
        text_val: 'text.value',
        text_clr: 'text.color'
    }
}));

AFRAME.registerComponent('clickable', {
    schema: {
        owner: {type: 'string'}
    },

    init: function () {

        var el = this.el;
        el.setAttribute('geometry', {
            vertexA: '0 0.55 -0.1',
            vertexB: '-0.5 -0.36 0',
            vertexC: '0.5 -0.36 0',
        });
        el.setAttribute("scale", "2 2.7");

        this.data.owner = owners.pop();
        el.setAttribute("text_val", this.data.owner);

        el.addEventListener('click', () => {
            fetchImages();
            setTimeout(() => {
                var scene = document.querySelector('a-scene')
                document.querySelectorAll('.slot').forEach(slot =>{
                    slot.setAttribute('obj-model' , 'obj: #frame_obj');
                    slot.removeChild(document.querySelector('a-door'));
                    var nft = document.createElement('a-nft');
                    nft.setAttribute("position", '0.37 0 2.3');
                    nft.setAttribute("rotation", '0 90 90');
                    nft.setAttribute("scale", '1.9 2');
                    slot.appendChild(nft);
                })
                var backdoor = document.createElement('a-backdoor')
                backdoor.classList.toggle('raycastable');
                backdoor.setAttribute("position", "0 1.5 1.2");
                backdoor.setAttribute("scale", "3 3.7 0");
                backdoor.setAttribute("rotation", "0 180 0");
                scene.appendChild(backdoor);
            }, 1000);
        });
        el.addEventListener('mouseenter', () => {
            el.setAttribute("text_clr", 'black');
        });
        el.addEventListener('mouseleave', () => {
            setTimeout(() => {
                el.setAttribute("text_clr", 'white');
            });
        });
    }
});
var offset = 0;
async function fetchImages() {
    var limit = 12;
    var opt = {method: 'GET',};
    console.log('https://api.opensea.io/api/v1/assets?'+'offset='+offset+'&limit='+limit);
    let response = await fetch('https://api.opensea.io/api/v1/assets?'+'offset='+offset+'&limit='+limit, opt);
    let data = await response.json();
    data.assets.forEach(asset =>{
        if (asset != "undifined"){
            links.push(asset.image_url)
        }
    })
    offset = offset + 10;

}