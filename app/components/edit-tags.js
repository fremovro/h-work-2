import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    dataService: service('data'),

    actions: {
        createNewTag() {
            let newTag = document.getElementById('newTag');
            if(newTag.value[newTag.value.length-1]==',') {
                let span = document.createElement('span');
                let name = newTag.value.substring(0, newTag.value.length - 1);
                span.id = name; span.className = 'badge badge-info'; span.value = name;
                span.innerHTML = name +' <span id="' + name + 'R" data-role="remove" onclick=""></span>';
                document.getElementById('tagsInput').insertBefore(span, newTag);
                newTag.value = "";
                document.getElementById(name+"R").onclick=function() {
                    document.getElementById('tagsInput').removeChild(document.getElementById(this.id.substring(0, this.id.length - 1)));
                };
            } 
        },
        deleteTag(idTag) {
            let tag = document.getElementById(idTag);
            document.getElementById('tagsInput').removeChild(tag);
        }
    }
});
