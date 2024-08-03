const $fileInput = document.getElementById('image')
const $dropZone = document.getElementById('result-image')
const $img = document.getElementById('img-result')

// tenga el mmismo comportamiento de input fileInput

$dropZone.addEventListener('click', () => $fileInput.click())

//prevenir que se abra en otra ventana

$dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    //css tomar el color cuando se acerca el mause al cuadrado
    $dropZone.classList.add('form-file__result--active')
})

 //prevenir que se abra en otra ventana
$dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault()
   //css quitar el color cuando se vaya el mause al cuadrado
    $dropZone.classList.remove('form-file__result--active')
})


//cargar imagen en el cuadrado 
const uploadImage = (file) => {
    //leer  localmente el archivo con fileReader.readAsDataURL
    const fileReader = new FileReader()
    
    fileReader.readAsDataURL(file)
    
    // mostrar en el cuadrado
    fileReader.addEventListener('load', (e) => {
        $img.setAttribute('src', e.target.result)
        console.log(e.target.result)
    })
}


//evitar que se abra en otra pestaña
$dropZone.addEventListener('drop', (e) => {
    e.preventDefault()

    /* console.log(e.dataTransfer) */

    $fileInput.files = e.dataTransfer.files
    const file = $fileInput.files[0]

    if (file) {
        $fileInput.files = e.dataTransfer.files;
        uploadImage(file);
    }
})

// para el input
$fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (file) {
        uploadImage(file);
    }
})

// CAMARA

    const modal = document.getElementById("modal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementsByClassName("close")[0];
    const camera = document.getElementById('camera');
    const photo = document.getElementById('photo');
    const output = document.getElementById('output');
    const captureButton = document.getElementById('capture');
    let stream;


    function openModal() {
        modal.style.display = "block";
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(s => {
                stream = s;
                camera.srcObject = stream;
                captureButton.disabled = false;
            })
            .catch(err => {
                console.error("Error al acceder a la cámara: ", err);
            });
    }

    // Función para cerrar el modal y detener la cámara
    function closeModal() {
        modal.style.display = "none";
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        captureButton.disabled = true;
    }

    // Evento para abrir el modal al hacer clic en el botón
    openModalButton.addEventListener('click', openModal);

    // Evento para cerrar el modal al hacer clic en la "x"
    closeModalButton.addEventListener('click', closeModal);

    // Evento para cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Evento para capturar la foto
    captureButton.addEventListener('click', () => {
        const context = photo.getContext('2d');
        photo.width = camera.videoWidth;
        photo.height = camera.videoHeight;
        context.drawImage(camera, 0, 0, photo.width, photo.height);

        // Convertir la imagen del canvas a una URL de datos y establecerla como src de la imagen
        const dataUrl = photo.toDataURL('image/png');
        $img.src = dataUrl;

        // Detener la cámara después de capturar la foto
        closeModal();
    });