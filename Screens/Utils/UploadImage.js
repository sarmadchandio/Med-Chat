async function UploadImage(){
    // An options obj need to be passed to the img lib.
    const options = {
        noData : true,
    }
    ImagePicker.launchImageLibrary(options, image => {
        // console.log('Response: ', response)
        if(image.uri){
            fetch(image.uri)
                .then(response => response.blob())
                .then( blob => {
                    let imgName = new Date().getTime() + "-media.jpg"
                    console.log(imgName)
                    const ref = storage.ref(`images/${imgName}`)
                    const uploadTask = ref.put(blob)
                    uploadTask.on('state_changed',
                        snapshot => {
                            let latest_progress = snapshot.bytesTransferred / snapshot.totalBytes
                            console.log('Upload is ' + Math.round(latest_progress*100) + ' % done');
                            setProgress(latest_progress)
                            setImageUploading(true)
                        }, error =>{
                            setProgress(0)
                            setImageUploading(false)
                            alert(error)
                            console.log(error)
                            return null;
                        }, () => {
                            setImageUploading(false)
                            storage.ref('images').child(imgName).getDownloadURL().then(url=>{
                                console.log("File Available at: ", url);
                                return ({uri: image.uri, url: url})
                            })
                      })
                })
        }
        else if (image.error){
            alert(image.error)
        }
    })   
}

export default UploadImage;