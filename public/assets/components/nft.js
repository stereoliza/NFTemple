var extendDeep = AFRAME.utils.extendDeep;
var meshMixin = AFRAME.primitives.getMeshMixin();

AFRAME.registerPrimitive('a-nft', extendDeep({}, meshMixin, {
    defaultComponents: {
        geometry: {primitive: 'plane'},
        img_url: {},
    },
    mappings: {
        height: 'geometry.height',
        width: 'geometry.width',
        src: 'material.src'
    }
}));

AFRAME.registerComponent('img_url', {
    schema: {
        img: {type: 'string'},
    },
    init: function () {
        var el = this.el;
        this.data.img = links.pop();
        console.log(this.data.img);
        el.setAttribute('src', this.data.img);
    }
})
