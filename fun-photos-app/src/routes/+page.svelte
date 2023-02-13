<script lang="ts">
	// Imports:
	import { onMount } from 'svelte';
	import { Canvas, Layer, type Render } from 'svelte-canvas';
	// Initializations & Exports:
	let render: Render;

	onMount(() => {
		// :3
	});

	$: render = ({ context, width, height }) => {};

	// function getUserMedia(options: any, successCallback: any, failureCallback: any) {
	// 	var api =
	// 		navigator.getUserMedia ||
	// 		navigator.webkitGetUserMedia ||
	// 		navigator.mozGetUserMedia ||
	// 		navigator.msGetUserMedia;
	// 	if (api) {
	// 		return api.bind(navigator)(options, successCallback, failureCallback);
	// 	}
	// }

	// var theStream: any;

	// function getStream() {
	// 	if (
	// 		!navigator.getUserMedia &&
	// 		!navigator.webkitGetUserMedia &&
	// 		!navigator.mozGetUserMedia &&
	// 		!navigator.msGetUserMedia
	// 	) {
	// 		alert('User Media API not supported.');
	// 		return;
	// 	}

	// 	var constraints = {
	// 		video: true
	// 	};

	// 	getUserMedia(
	// 		constraints,
	// 		function (stream: any) {
	// 			var mediaControl = document.querySelector('video');
	// 			if ('srcObject' in mediaControl) {
	// 				mediaControl.srcObject = stream;
	// 			} else if (navigator.mozGetUserMedia) {
	// 				mediaControl.mozSrcObject = stream;
	// 			} else {
	// 				mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
	// 			}
	// 			theStream = stream;
	// 		},
	// 		function (err: any) {
	// 			alert('Error: ' + err);
	// 		}
	// 	);
	// }

	// function takePhoto() {
	// 	if (!('ImageCapture' in window)) {
	// 		alert('ImageCapture is not available');
	// 		return;
	// 	}

	// 	if (!theStream) {
	// 		alert('Grab the video stream first!');
	// 		return;
	// 	}

	// 	var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

	// 	theImageCapturer
	// 		.takePhoto()
	// 		.then((blob) => {
	// 			var theImageTag = document.getElementById('imageTag');
	// 			theImageTag.src = URL.createObjectURL(blob);
	// 		})
	// 		.catch((err: any) => alert('Error: ' + err));
	// }
</script>

<!-- #################################################################################################### -->

<!-- SvelteKit Dynamic Header -->
<svelte:head>
	<title>Fun Photos</title>
	<meta name="description" content="Fun Photos" />
</svelte:head>

<!-- Page Content -->
<section>
	<span>Fun Photos</span>
</section>

<Canvas width={640} height={640} layerEvents={true}>
	<Layer {render} />
</Canvas>

<!-- <p><button onclick="getStream()">Grab video</button></p>
<p><video autoplay style="height: 180px; width: 240px;" /></p>
<p><button onclick="takePhoto()">Take Photo!</button></p>
<p><img id="imageTag" width="240" height="180" /></p> -->

<!-- #################################################################################################### -->
<style>
	/* CSS Goes Here */
</style>
