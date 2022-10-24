

class Generator {

  static use( sheet ) {
    return new Generator( sheet );
  }

  constructor( sheet ) {
    this.sheet   = sheet;
  }

  generate( sel, ...args ) {

     // check for opts
     let opts = {};

     if (typeof args[ args.length-1] === 'object' ) {
        opts = args.pop();
     }
     console.log( opts );

     let zoom = opts.zoom || 1;
     let background = opts.background || '#638596';
     let names = args;

     console.log( "generate", this.sheet.tileWidth,
                              this.sheet.tileHeight,
                              zoom,
                              names );


    let el = (typeof sel === 'string') ?
                 document.querySelector( sel )
                :
              sel;

    let canvas = el;
    canvas.width  = this.sheet.tileWidth*zoom;
    canvas.height = this.sheet.tileHeight*zoom;

    let cx = canvas.getContext( "2d" );

    cx.fillStyle = background;
    cx.fillRect(0, 0, this.sheet.tileWidth*zoom,
                      this.sheet.tileHeight*zoom );

    for( let name of names ) {
       console.log( name );
       this.sheet.pasteSprite( name, cx, zoom );
    }
  }
}


