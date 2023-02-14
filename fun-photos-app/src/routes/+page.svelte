<script lang="ts">
	export const prerender = true;
	// TODO: clean this up
	// Imports:
	import { onMount } from 'svelte';
	import SourceImage from '$lib/SourceImage.svelte';
	// import { Canvas, Layer, type Render } from 'svelte-canvas';
	// Initializations & Exports:
	// let render: Render;
	// let canvas: HTMLCanvasElement;

	onMount(() => {
		// :3
		// 	const ctx = canvas.getContext('2d');
		// 	let frame = requestAnimationFrame(loop);
		// 	function loop(t: any) {
		// 		frame = requestAnimationFrame(loop);
		// 		const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)!;
		// 		for (let p = 0; p < imageData.data.length; p += 4) {
		// 			const i = p / 4;
		// 			const x = i % canvas.width;
		// 			const y = (i / canvas.width) >>> 0;
		// 			const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000);
		// 			const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1000);
		// 			const b = 128;
		// 			imageData.data[p + 0] = r;
		// 			imageData.data[p + 1] = g;
		// 			imageData.data[p + 2] = b;
		// 			imageData.data[p + 3] = 255;
		// 		}
		// 		ctx?.putImageData(imageData, 0, 0);
		// 	}
		// 	return () => {
		// 		cancelAnimationFrame(frame);
		// 	};
	});

	// $: render = ({ context, width, height }) => {};

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

<SourceImage />

<!-- <p><button onclick="getStream()">Grab video</button></p>
<p><video autoplay style="height: 180px; width: 240px;" /></p>
<p><button onclick="takePhoto()">Take Photo!</button></p>
<p><img id="imageTag" width="240" height="180" /></p> -->

<!-- #################################################################################################### -->
<style>
	/* CSS Goes Here */
</style>
