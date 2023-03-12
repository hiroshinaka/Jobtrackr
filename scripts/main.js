//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function displayJobsApplied(collection) {
  let cardTemplate = document.getElementById("jobsAppliedTemplate");
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      //get the document for current user.
      const storage = firebase.storage().ref();
      db.collection(collection)
        .get()
        .then((allJobsApplied) => {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          var countJobsApplied = 0;
          allJobsApplied.forEach((doc) => {
            var userID = doc.data().userID;
            if (userID == user.uid && doc.data().stage == 1) {
              countJobsApplied = countJobsApplied + 1;
              //iterate thru each doc
              var positionApplied = doc.data().inputPosition; // get value of the "name" key
              var companyName = doc.data().inputCompanyName; // get value of the "details" key
              var dateApplied = doc.data().date; //gets the length field
              var jobPostingLink = doc.data().link;
              var resume = firebase
                .storage()
                .refFromURL(firebase.storage().ref() + doc.data().resumeUrl)
                .getDownloadURL();
              var coverLetter = firebase
                .storage()
                .refFromURL(
                  firebase.storage().ref() + doc.data().coverLetterUrl
                )
                .getDownloadURL();

              Promise.all([resume, coverLetter]).then((snapshot) => {
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector(".positionApplied").innerHTML =
                  positionApplied;
                newcard.querySelector(".companyName").innerHTML = companyName;
                newcard.querySelector(".dateApplied").innerHTML =
                  "Applied on " + dateApplied;
                newcard.querySelector(".jobPostingLink").href = jobPostingLink;
                newcard.querySelector(".jobPostingLink").innerHTML =
                  "Link to Posting";
                newcard.querySelector(".resume").href = snapshot[0];
                newcard.querySelector(".resume").innerHTML = "Your Resume";
                newcard.querySelector(".coverLetter").href = snapshot[1];
                newcard.querySelector(".coverLetter").innerHTML =
                  "Your Cover Letter";

                //Delete application----------------

                newcard.querySelector(".deleteApp").innerHTML = "Delete";
                newcard
                  .querySelector(".deleteApp")
                  .setAttribute("data-uid", doc.id);

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                document.getElementById("listJobsApplied").appendChild(newcard);
              });

              //i++;   //Optional: iterate variable to serve as unique ID
            }
          });

          document.getElementById("jobsCount").innerHTML +=
            " " + countJobsApplied;
        });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      document.getElementById("listJobsApplied").innerHTML =
        "<p>Not signed in!</p>";
    }
  });
}

displayJobsApplied("applications"); //input param is the name of the collection
