/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Add = function ( editor ) {

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( 'Add' );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	//

	var meshCount = 0;
	var lightCount = 0;
	var cameraCount = 0;

	editor.signals.editorCleared.add( function () {

		meshCount = 0;
		lightCount = 0;
		cameraCount = 0;

	} );

	// Group

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Group' );
	option.onClick( function () {

		var mesh = new THREE.Group();
		mesh.name = 'Group ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	//

	options.add( new UI.HorizontalRule() );
/*
	// Plane

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Plane' );
	option.onClick( function () {

		var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
		var material = new THREE.MeshStandardMaterial();
		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Plane ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );
*/
	// Box

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Box' );
	option.onClick( function () {

		var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Box ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Edge

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Edge' );
	option.onClick( function () {

		var geometry = new THREE.Geometry();
		var vertex1 = new THREE.Vector3();
		vertex1.x = 0;
		vertex1.y = 0;
		vertex1.z = 0;
		var vertex2 = new THREE.Vector3();
		vertex2.x = 1;
		vertex2.y = 1;
		vertex2.z = 1;
//		var vertex3 = new THREE.Vector3();
//		vertex3.x = 3;
//		vertex3.y = 5;
//		vertex3.z = 2;
		geometry.vertices.push( vertex1 );
		geometry.vertices.push( vertex2 );
		geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));
//		geometry.vertices.push( vertex3 );

		var material = new THREE.LineBasicMaterial( {
			color: 0xff0000,
			linewidth: 1,
			linecap: 'round', //ignored by WebGLRenderer
			linejoin:  'round' //ignored by WebGLRenderer
		} );

	  var edge = new THREE.Line( geometry, material );

/*
var dir = new THREE.Vector3( 1, 2, 0 );

//normalize the direction vector (convert to vector of length 1)
dir.normalize();

var origin = new THREE.Vector3( 0, 0, 0 );
var length = 1;
var hex = 0xffff00;

var edge = new THREE.ArrowHelper( dir, origin, length, hex );
//var edge = ArrowHelper(dir, origin, length, hex, headLength, headWidth )
*/

		edge.name = 'Edge ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( edge ) );

	} );
	options.add( option );
/*
	// Circle

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Circle' );
	option.onClick( function () {

		var radius = 1;
		var segments = 32;

		var geometry = new THREE.CircleBufferGeometry( radius, segments );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Circle ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Cylinder

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Cylinder' );
	option.onClick( function () {

		var radiusTop = 1;
		var radiusBottom = 1;
		var height = 2;
		var radiusSegments = 32;
		var heightSegments = 1;
		var openEnded = false;

		var geometry = new THREE.CylinderBufferGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Cylinder ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Sphere

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Sphere' );
	option.onClick( function () {

		var radius = 1;
		var widthSegments = 32;
		var heightSegments = 16;
		var phiStart = 0;
		var phiLength = Math.PI * 2;
		var thetaStart = 0;
		var thetaLength = Math.PI;

		var geometry = new THREE.SphereBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Sphere ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Icosahedron

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Icosahedron' );
	option.onClick( function () {

		var radius = 1;
		var detail = 2;

		var geometry = new THREE.IcosahedronGeometry( radius, detail );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Icosahedron ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Torus

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Torus' );
	option.onClick( function () {

		var radius = 2;
		var tube = 1;
		var radialSegments = 32;
		var tubularSegments = 12;
		var arc = Math.PI * 2;

		var geometry = new THREE.TorusBufferGeometry( radius, tube, radialSegments, tubularSegments, arc );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Torus ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// TorusKnot

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'TorusKnot' );
	option.onClick( function () {

		var radius = 2;
		var tube = 0.8;
		var tubularSegments = 64;
		var radialSegments = 12;
		var p = 2;
		var q = 3;

		var geometry = new THREE.TorusKnotBufferGeometry( radius, tube, tubularSegments, radialSegments, p, q );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'TorusKnot ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Teapot

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Teapot' );
	option.onClick( function () {

		var size = 50;
		var segments = 10;
		var bottom = true;
		var lid = true;
		var body = true;
		var fitLid = false;
		var blinnScale = true;

		var material = new THREE.MeshStandardMaterial();

		var geometry = new THREE.TeapotBufferGeometry( size, segments, bottom, lid, body, fitLid, blinnScale );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Teapot ' + ( ++ meshCount );

		editor.addObject( mesh );
		editor.select( mesh );

	} );
	options.add( option );
	*/

	// Edge2

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Edge2' );
	option.onClick( function() {

		var points = [
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( 4, 0, 3 ),
			new THREE.Vector3( 3.5, 0.5, 1 )
		];
		var segments = 20;
		var phiStart = 0;
		var phiLength = 2 * Math.PI;

		var geometry = new THREE.EdgeBufferGeometry( points );
		var material = new THREE.LineBasicMaterial( {
			color: 0xff0000,
			linewidth: 1,
			linecap: 'round', //ignored by WebGLRenderer
			linejoin:  'round' //ignored by WebGLRenderer
		} );
		var edge2 = new THREE.Line( geometry, material );
		edge2.name = 'Edge2 ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( edge2 ) );

	} );
	options.add( option );
/*
	// Sprite

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Sprite' );
	option.onClick( function () {

		var sprite = new THREE.Sprite( new THREE.SpriteMaterial() );
		sprite.name = 'Sprite ' + ( ++ meshCount );

		editor.execute( new AddObjectCommand( sprite ) );

	} );
	options.add( option );

	//
*/
	options.add( new UI.HorizontalRule() );

	// PointLight

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'PointLight' );
	option.onClick( function () {

		var color = 0xffffff;
		var intensity = 1;
		var distance = 0;

		var light = new THREE.PointLight( color, intensity, distance );
		light.name = 'PointLight ' + ( ++ lightCount );

		editor.execute( new AddObjectCommand( light ) );

	} );
	options.add( option );

	// SpotLight

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'SpotLight' );
	option.onClick( function () {

		var color = 0xffffff;
		var intensity = 1;
		var distance = 0;
		var angle = Math.PI * 0.1;
		var penumbra = 0;

		var light = new THREE.SpotLight( color, intensity, distance, angle, penumbra );
		light.name = 'SpotLight ' + ( ++ lightCount );
		light.target.name = 'SpotLight ' + ( lightCount ) + ' Target';

		light.position.set( 5, 10, 7.5 );

		editor.execute( new AddObjectCommand( light ) );

	} );
	options.add( option );

	// DirectionalLight

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'DirectionalLight' );
	option.onClick( function () {

		var color = 0xffffff;
		var intensity = 1;

		var light = new THREE.DirectionalLight( color, intensity );
		light.name = 'DirectionalLight ' + ( ++ lightCount );
		light.target.name = 'DirectionalLight ' + ( lightCount ) + ' Target';

		light.position.set( 5, 10, 7.5 );

		editor.execute( new AddObjectCommand( light ) );

	} );
	options.add( option );

	// HemisphereLight

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'HemisphereLight' );
	option.onClick( function () {

		var skyColor = 0x00aaff;
		var groundColor = 0xffaa00;
		var intensity = 1;

		var light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		light.name = 'HemisphereLight ' + ( ++ lightCount );

		light.position.set( 0, 10, 0 );

		editor.execute( new AddObjectCommand( light ) );

	} );
	options.add( option );

	// AmbientLight

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'AmbientLight' );
	option.onClick( function() {

		var color = 0x222222;

		var light = new THREE.AmbientLight( color );
		light.name = 'AmbientLight ' + ( ++ lightCount );

		editor.execute( new AddObjectCommand( light ) );

	} );
	options.add( option );

	//

	options.add( new UI.HorizontalRule() );

	// PerspectiveCamera

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'PerspectiveCamera' );
	option.onClick( function() {

		var camera = new THREE.PerspectiveCamera( 50, 1, 1, 10000 );
		camera.name = 'PerspectiveCamera ' + ( ++ cameraCount );

		editor.execute( new AddObjectCommand( camera ) );

	} );
	options.add( option );

	return container;

};
