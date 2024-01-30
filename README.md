# StoryBoard App

Quickly storyboard stories and scenes using latest imaging technology.


## Build

This project builds into a single file: `./dist/index.html` using the [plugin](https://github.com/richardtallent/vite-plugin-singlefile) with command:

```
npm run build
```

## Develop

Begin interactive (hot-reload) development with command:

```
npm run dev
```



## References

* Bootstrap-vue is not quite ready for Vue3 (explained [here](https://bootstrap-vue.org/vue3))
* Vue3 compat(ability) [setup](https://stackblitz.com/edit/bootstrap-vue-with-compat?file=main.js) is used



## ToDo

__Staging__

logic-2
* board-image clicked => selectedBoardId
* if image is svg => load layers (g) into imageEditor:{layers:[...]}
  - else if image is placeholder => save initial svg with layer-0
  - else error
* perform freehand sketch on different layers
* save layers to board-image

logic-1
BoardOutline should have similar logic as layers, such asthe following:
* at least one board should always be available
* this board should be selected, by default
* selected board image is always loaded into imageEditor

state
* ~~board-image should be initialized as svg and placeholderimage within `g`~~
* ~~layers should always be maintained `layers` with board,then created as `g` within image~~
* ~~ImageEditor will only use data of selected Board~~
 

 __Test__

AppDisplay
* ~~pane borders move with pointer~~
* ~~pane title expand~~
* ~~reset panes~~
* ~~click Outline > Board > Image, then the pane expands~~

Outline
* ~~add board~~
* ~~delete board~~
* ~~move board~~
* ~~after moving boards, it is not possible to move, again~~ => pinia getters may be redundant. If you want a property to be writable, you don't need a getter