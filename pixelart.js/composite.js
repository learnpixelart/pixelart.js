

class ImageComposite {

  static async read( src,
                tileWidth=24,
                tileHeight=24 ) {
      let img = new Image();
      img.src = src;

      // check if there's a better way to wait for image to load?
      await new Promise( (resolve, reject) => {
          img.onload = () => {
            console.log( "[ImageComposite] image.onload callback " );
            resolve( true );
            console.log( `[ImageComposite] done image.onload ready - (${img.naturalWidth}x${img.naturalHeight})` );
         }
      });

      return new ImageComposite( img, tileWidth, tileHeight );
   }

   constructor( img,
                tileWidth=24,
                tileHeight=24 ) {
     this.img       =  img;
     this.tileWidth =  tileWidth;
     this.tileHeight = tileHeight;

     // (auto-)calculate composite grid (cols x rows) - why? why not?
     this.width  = this.img.naturalWidth;
     this.height = this.img.naturalHeight;

     this.cols = this.width / this.tileHeight;
     this.rows = this.height / this.tileWidth;
   }



  pasteCtx( num, ctx, zoom=1 ) {
    // note: paste (in contrast to draw)
    //         will NOT clean the canvas first
    let dy = Math.floor( num / this.cols );
    let dx = num % this.cols;
    // console.log( dx, dy );

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage( this.img,
                   // source rect
                   dx*this.tileWidth, dy*this.tileHeight, this.tileWidth, this.tileHeight,
                   // dest rect
                   0, 0, this.tileWidth*zoom, this.tileHeight*zoom );
  }

  drawCtx( num, ctx, zoom=1 ) {
    ctx.clearRect( 0, 0, this.tileWidth*zoom, this.tileHeight*zoom );
    this.pasteCtx( num, ctx, zoom );
  }


  drawCanvas( num, sel, zoom=1 ) {
     let canvas = this._findCanvas( sel );

    canvas.width = this.tileWidth*zoom;
    canvas.height =this.tileHeight*zoom;

    let ctx = canvas.getContext( "2d" );
    this.drawCtx( num, ctx, zoom );
  }



  pasteCanvas( num, sel, zoom=1 ) {
    let canvas = this._findCanvas( sel );

    // note: do NOT resize canvas in paste here
    //   resize (even if same width/height)
    //   will clean/reset canvas

    let ctx = canvas.getContext( "2d" );
    this.pasteCtx( num, ctx, zoom );
  }


  ////////////////
  // (private) helpers
  _findCanvas( sel ) {
    let canvas = (typeof sel === 'string') ?
                     document.querySelector( sel )
                      :
                     sel;
     return canvas;
   }
}


