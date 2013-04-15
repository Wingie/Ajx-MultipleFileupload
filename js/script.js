// variables
var dropArea = document.getElementById('dropArea');
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var count = document.getElementById('count');
var destinationUrl = "./upload.php";
var result = document.getElementById('result');
var list = [];
var totalSize = 0;
var totalProgress = 0;

// main initialization
(function(){

    // init handlers
    function initHandlers() {
        dropArea.addEventListener('drop', handleDrop, false);
        dropArea.addEventListener('dragover', handleDragOver, false);
        dropArea.addEventListener('dragleave', handleDragLeave, false);
    }

    // draw progress
    function drawProgress(progress) {
        context.clearRect(0, 0, canvas.width, canvas.height); // clear context
        console.log(progress);
        if (progress <1){
            context.beginPath();
            context.strokeStyle = '#4BFF00';
            context.fillStyle = '#FF9500';
            context.fillRect(0, 0, progress *880, 25);
            context.closePath();

            // draw progress (as text)
            context.font = '16px Verdana';
            context.fillStyle = '#000';
            context.fillText('Progress: ' + Math.floor(progress*100) + '%', 400, 17);
        }
    }

    // drag over
    function handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();

        dropArea.className = 'hover';
    }

    function handleDragLeave(event) {
        console.log("drag_left!");
        dropArea.className = ''
    }

    // drag drop
    function handleDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        processFiles(event.dataTransfer.files);
    }

    // process bunch of files
    function processFiles(filelist) {
        if (!filelist || !filelist.length || list.length) return;

        totalSize = 0;
        totalProgress = 0;
        // result.textContent = '';

        for (var i = 0; i < filelist.length && i < 5; i++) {
            list.push(filelist[i]);
            totalSize += filelist[i].size;
        }
        uploadNext();
    }

    // on complete - start next file
    function handleComplete(size) {
        totalProgress += size;
        drawProgress(totalProgress / totalSize);
        uploadNext();
    }

    // update progress
    function handleProgress(event) {
        var progress = totalProgress + event.loaded;
        drawProgress(progress / totalSize);
    }

    // upload file
    function uploadFile(file, status) {

        // prepare XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.open('POST', destinationUrl);
        xhr.onload = function() {
            result.innerHTML += this.responseText;
            handleComplete(file.size);
        };
        xhr.onerror = function() {
            result.textContent = this.responseText;
            handleComplete(file.size);
        };
        xhr.upload.onprogress = function(event) {
            handleProgress(event);
        }
        xhr.upload.onloadstart = function(event) {
        }

        // prepare FormData
        var formData = new FormData();  
        formData.append('myfile', file); 
        xhr.send(formData);
    }

    // upload next file
    function uploadNext() {
        if (list.length) {
            count.textContent = list.length - 1;
            dropArea.className = 'uploading';
            dropArea.innerHTML = "<p>All your files are belong to us.</p>";
            var nextFile = list.shift();
            console.log();
            if (nextFile.size >= 5242880) { // 256kb
                result.innerHTML += '<div class="f">Oops, your file ('+nextFile.name+') seems to be above our upload limit (5Mb). </br>You can try with a smaller file however.</div>';
                handleComplete(nextFile.size);
            } else {
                uploadFile(nextFile, status);
            }
        } else {
            dropArea.className = '';
            dropArea.innerHTML = "<p>Drop Zone</p>";
        }
    }

    
    initHandlers();
})();