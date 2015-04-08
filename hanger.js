var Edge = {top:0, left:1, bottom:3, right:4};
Object.freeze(Edge);

function hanger(pe, de, edge){
    if (typeof edge === 'undefined') {
	this.edge = Edge.left;  // Edge to show up. Default is left.
    }else{
	this.edge = edge;
    }
   
    this.parentElem = pe;  // Element to hind behind.
    this.domElem = de;  // Element that "hangs."
    
    // Hide domElem behind parentElem.
    $(this.parentElem).css('position', 'relative');   
    $(this.parentElem).css("z-index", 1);
    $(this.domElem).css("z-index", $(this.parentElem).css("z-index")-1);
    $(this.domElem).css("position", "absolute");

    this.hangLeft = function(){
	var pElemPos = $(this.parentElem).offset();
	$(this.domElem).offset({left: (pElemPos.left),
				top: (pElemPos.top + $(this.parentElem).outerHeight()/2 -
				      $(this.domElem).outerHeight()/2)
			       });
	this.basePos = $(this.domElem).offset();

	this.edge = Edge.left;
	this.hang = this._hangLeft;
	this.unHang = this._unHangLeft;
    }

    this.hangTop = function(){
	var pElemPos = $(this.parentElem).offset();
	var pElemWidth = $(this.parentElem).outerWidth();
	$(this.domElem).offset({left: (pElemPos.left + pElemWidth/2 - $(this.domElem).outerWidth()/2),
				top: pElemPos.top
			       });
	this.basePos = $(this.domElem).offset();

	this.edge = Edge.top;
	this.hang = this._hangTop;
	this.unHang = this._unHangTop;
    }

    this.hangBottom = function(){
	var pElemPos = $(this.parentElem).offset();
	var pElemWidth = $(this.parentElem).outerWidth();
	var pElemHeight = $(this.parentElem).outerHeight();
	$(this.domElem).offset({left: (pElemPos.left + pElemWidth/2 - $(this.domElem).outerWidth()/2),
				top: pElemPos.top + pElemHeight - $(this.domElem).outerHeight()
			       });
	this.basePos = $(this.domElem).offset();

	this.edge = Edge.bottom;
	this.hang = this._hangBottom;
	this.unHang = this._unHangBottom;
    }

    this.hangRight = function(){
	var pElemPos = $(this.parentElem).offset();
	var pElemWidth = $(this.parentElem).outerWidth();
	$(this.domElem).offset({left: (pElemPos.left + pElemWidth - $(this.domElem).outerWidth()),
				top: (pElemPos.top +
				      $(this.parentElem).outerHeight()/2 - $(this.domElem).outerHeight()/2)
			       });
	this.basePos = $(this.domElem).offset();

	this.edge = Edge.right;
	this.hang = this._hangRight;
	this.unHang = this._unHangRight;
    }
    
    // Left.
    this._hangLeft = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    left: (this.basePos.left -
		   $(this.domElem).outerWidth())+"px"
	}, dur);
	
	return this;
    }

    this._unHangLeft = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    left: this.basePos.left+"px"
	}, dur);

	return this;
    }

    // Top
    this._hangTop = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    top: (this.basePos.top -
		   $(this.domElem).outerHeight())+"px"
	}, dur);
	
	return this;
    }
    
    this._unHangTop = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    top: this.basePos.top+"px"
	}, dur);

	return this;
    }

    // Bottom
    this._hangBottom = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    top: (this.basePos.top +
		   $(this.domElem).outerHeight())+"px"
	}, dur);
	
	return this;
    }
    
    this._unHangBottom = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    top: this.basePos.top+"px"
	}, dur);

	return this;
    }

    // Right
    this._hangRight = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    left: (this.basePos.left +
		   $(this.domElem).outerWidth())+"px"
	}, dur);
	
	return this;
    }

    this._unHangRight = function(dur){
	$(this.domElem).show();
	$(this.domElem).animate({
	    left: this.basePos.left+"px"
	}, dur);

	return this;
    }

    // Edge specific methods and attributes.
    switch(this.edge){
    case Edge.top:	
	this.hangTop();
	break;
    case Edge.left:	
	this.hangLeft();
	break;
    case Edge.bottom:	
	this.hangBottom();
	break;
    case Edge.right:
	this.hangRight();
	break;
    default:
	console.log("Edge mode not recognize.");
    }

    // Aux.
    this.delay = function(t, fn){
	window.setTimeout(fn, t);
	return this;
    }
}
