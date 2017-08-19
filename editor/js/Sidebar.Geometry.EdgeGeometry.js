/**
 * @author rfm1201
 */

Sidebar.Geometry.EdgeGeometry = function( editor, object ) {

	var signals = editor.signals;

	var container = new UI.Row();

	var geometry = object.geometry;
	var parameters = geometry.parameters;

	// fromNodeName

	var fromNodeNameRow = new UI.Row();
	var fromNodeName = new UI.Input( parameters.fromNodeName ).onChange( update );

	fromNodeNameRow.add( new UI.Text( 'From Node (name)' ).setWidth( '90px' ) );
	fromNodeNameRow.add( fromNodeName );

	container.add( fromNodeNameRow );

	// toNodeName

	var toNodeNameRow = new UI.Row();
	var toNodeName = new UI.Input( parameters.toNodeName ).onChange( update );

	toNodeNameRow.add( new UI.Text( 'To Node (name)' ).setWidth( '90px' ) );
	toNodeNameRow.add( toNodeName );

	container.add( toNodeNameRow );

	// points

	var lastPointIdx = 0;
	var pointsUI = [];

	var pointsRow = new UI.Row();
	pointsRow.add( new UI.Text( 'Points' ).setWidth( '90px' ) );

	var points = new UI.Span().setDisplay( 'inline-block' );
	pointsRow.add( points );

	var pointsList = new UI.Div();
	points.add( pointsList );

	for ( var i = 0; i < parameters.points.length; i ++ ) {

		var point = parameters.points[ i ];
		pointsList.add( createPointRow( point.x, point.y, point.z ) );

	}

	var addPointButton = new UI.Button( '+' ).onClick( function() {

		if( pointsUI.length === 0 ){

			pointsList.add( createPointRow( 0, 0, 0 ) );

		} else {

			var point = pointsUI[ pointsUI.length - 1 ];

			pointsList.add( createPointRow( point.x.getValue(), point.y.getValue(), point.z.getValue() ) );

		}

		update();

	} );
	points.add( addPointButton );

	container.add( pointsRow );

	//

		function createPointRow( x, y, z ) {

			var pointRow = new UI.Div();
			var lbl = new UI.Text( lastPointIdx + 1 ).setWidth( '20px' );
			var txtX = new UI.Number( x ).setRange( 0, Infinity ).setWidth( '30px' ).onChange( update );
			var txtY = new UI.Number( y ).setWidth( '30px' ).onChange( update );
			var txtZ = new UI.Number( z ).setWidth( '30px' ).onChange( update );
			var idx = lastPointIdx;
			var btn = new UI.Button( '-' ).onClick( function() {
				deletePointRow( idx );
			} );
			var btnPlus = new UI.Button( '+' ).onClick( function() {
				newMidPoint( x, y, z ,idx );
			} );


			pointsUI.push( { row: pointRow, lbl: lbl, x: txtX, y: txtY, z: txtZ } );
			lastPointIdx ++;
			pointRow.add(btnPlus, lbl, txtX, txtY, txtZ, btn );

			return pointRow;

		}

		function createPointRowAt( x, y, z, idx) {

				var pointRow = new UI.Div();
				var lbl = new UI.Text( idx + 1 ).setWidth( '20px' );
				var txtX = new UI.Number( x ).setRange( 0, Infinity ).setWidth( '30px' ).onChange( update );
				var txtY = new UI.Number( y ).setWidth( '30px' ).onChange( update );
				var txtZ = new UI.Number( z ).setWidth( '30px' ).onChange( update );

				var btn = new UI.Button( '-' ).onClick( function() {
					deletePointRow( idx );
				} );
				var btnPlus = new UI.Button( '+' ).onClick( function() {
					newMidPoint( x, y, z, idx );
				} );

				pointsUI.splice(idx, 0, { row: pointRow, lbl: lbl, x: txtX, y: txtY, z: txtZ } );
				lastPointIdx ++;
				pointRow.add(btnPlus, lbl, txtX, txtY, txtZ, btn );

				return pointRow;

	}

	function newMidPoint( x, y, z, idx ) {
		var n = createPointRowAt( x, y, z, idx );
		update();
		return n;
	}

	function deletePointRow( idx ) {

		if ( ! pointsUI[ idx ] ) return;

		pointsList.remove( pointsUI[ idx ].row );
		pointsUI[ idx ] = null;

		update();

	}

	function update() {
		//var fromNodeName = "", toNodeName = "";
		var points = [];
		var count = 0;

		for ( var i = 0; i < pointsUI.length; i ++ ) {

			var pointUI = pointsUI[ i ];

			if ( ! pointUI ) continue;

			points.push( new THREE.Vector3( pointUI.x.getValue(), pointUI.y.getValue(), pointUI.z.getValue() ) );
			count ++;
			pointUI.lbl.setValue( count );

		}

		editor.execute( new SetGeometryCommand( object, new THREE[ geometry.type ](
			points, fromNodeName.getValue(), toNodeName.getValue()
		) ) );

	}

	return container;

};

Sidebar.Geometry.EdgeBufferGeometry = Sidebar.Geometry.EdgeGeometry;
