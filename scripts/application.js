let appCollection;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const currentUser = firebase.firestore().collection("users").doc(user.uid);
        appCollection = currentUser.collection("applications");
    }
});

// const currentUser = firebase.auth().currentUser;
// const appCollection = firebase.firestore().collection("users").doc(currentUser.uid).collection("applications");


// I want to get the user information from the database and put them in the form
function saveAppInfo(){
    
    // document.getElementById('personalInfoFields').disabled = true;
    let Position = document.getElementById("inputPosition").value;
    let CompanyName = document.getElementById("inputCompanyName").value;
    let Dates = document.getElementById("date").value;
    let Link = document.getElementById("link").value;
    let resumeFile = document.getElementById("resume").files[0];
    let coverLetterFile = document.getElementById("coverLetter").files[0];
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // create a new storage reference to the user's folder
                    var storageRef = firebase.storage().ref().child('users/' + userID);

                    // upload the resume file to the storage
                    var resumeRef = storageRef.child('resume.pdf').put(resumeFile, {contentType: 'application/pdf'});

                    // upload the cover letter file to the storage
                    var coverLetterRef = storageRef.child('cover_letter.pdf').put(coverLetterFile, {contentType: 'application/pdf'});

                    // wait for both files to upload and get their download URLs
                    Promise.all([resumeRef, coverLetterRef])
                        .then((snapshot) => {
                            const resumeUrl = snapshot[0].metadata.fullPath;
                            const coverLetterUrl = snapshot[1].metadata.fullPath;

                            // save the application info and the file download URLs to the database
                            db.collection("applications").add({
                                userID: userID,
                                inputPosition: Position,
                                inputCompanyName: CompanyName,
                                date: Dates,
                                link: Link,
                                resumeUrl: resumeUrl,
                                coverLetterUrl: coverLetterUrl,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            }).then(() => {
                                console.log("Successfully added application");
                                window.location.href = "main.html"; //new line added
                            })
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
        } else {
            window.location.href = 'form.html';
        }
    });

}
//document.getElementById('personalInfoFields').disabled = true;
