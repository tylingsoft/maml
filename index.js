var yaml = require('js-yaml');
var mustache = require('mustache');
var mdc = require('markdown-core/markdown-core-node');
var configuration = require('./configuration');
var file = require('./file');


var layout = file.read('templates/layout.html');


file.reset();


function generate_page(link) {
    var config = configuration.get(link);
    var markdown = file.read(link, 'index.md');
    var html = mdc.render(markdown);
    html = mustache.render(layout, {
        content: html,
        title: config.title + config.title_suffix,
        brand: config.brand,
        navbar: config.menu.reduce(function(result, _link){
                if(link == _link) { // todo: change to starts with
                    return result +  '<li class="active"><a href="' + _link + '">' + configuration.get(_link).name + '</a></li>';
                } else {
                    return result +  '<li><a href="' + _link + '">' + configuration.get(_link).name + '</a></li>';
                }
            }, '')
    });
    file.write(link, 'index.html', html);
}


generate_page('/blog/');
generate_page('/download/');
generate_page('/');
