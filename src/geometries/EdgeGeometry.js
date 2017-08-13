/**
 * @author astrodud / http://astrodud.isgreat.org/
 * @author zz85 / https://github.com/zz85
 * @author bhouston / http://clara.io
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Geometry } from '../core/Geometry';
import { Float32BufferAttribute } from '../core/BufferAttribute';
import { BufferGeometry } from '../core/BufferGeometry';
import { Vector3 } from '../math/Vector3';
import { _Math } from '../math/Math';

// EdgeGeometry

function EdgeGeometry( points) {

	Geometry.call( this );

	this.type = 'EdgeGeometry';

	this.parameters = {
		points: points
	};

	this.fromBufferGeometry( new EdgeBufferGeometry( points ) );
	//this.mergeVertices();

}

EdgeGeometry.prototype = Object.create( Geometry.prototype );
EdgeGeometry.prototype.constructor = EdgeGeometry;

// EdgeBufferGeometry

function EdgeBufferGeometry( points ) {

	BufferGeometry.call( this );

	this.type = 'EdgeBufferGeometry';

	this.parameters = {
		points: points
	};



	// indices


	// build geometry
	alert("build geometry for n points: " + points.length );

		//for (var i = 0; i < points.length; i ++ ) {
		//	this.LineSegments(points);
		//}



}

EdgeBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
EdgeBufferGeometry.prototype.constructor = EdgeBufferGeometry;


export { EdgeGeometry, EdgeBufferGeometry };
