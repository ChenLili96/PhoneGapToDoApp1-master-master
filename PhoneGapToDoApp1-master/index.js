Backendless.initApp("0B5B881C-AB5A-D7C5-FF52-297088A1FC00","9507AC93-13CF-F45F-FFA2-0DEF6F8E8F00");

var destinationType; //used sets what should be returned (image date OR file path to image for example)
document.addEventListener("deviceready",onDeviceReady,false);

$(document).on("pageshow","#todopage", onPageShow);
function onPageShow() {
	console.log("page shown");
    
	$("#taskList").empty();
	
	//run a query
	Backendless.Data.of( "Tasks" ).find().then( processResults).catch(error);
    
    $(document).on("click", "#addTaskButton", onAddTask);

} 

function onAddTask() {
		console.log("add task button clicked");
        var tasktext = $("#addTaskText").val();
        
        var newTask = {};
        newTask.Task = tasktext;
        Backendless.Data.of("Tasks").save(newTask).then(saved).catch(error);    
        location.reload();
        document.getElementById("addTaskText").value="";
}

function saved(savedTask) { 
      console.log( "new Contact instance has been saved" + savedTask);

   
}


function  processResults(tasks) {
    //alert(tasks[1].Task)
    
    //add each tasks
    for (var i = 0; i < tasks.length; i++) { 
    
        
        $("#taskList").append(
            "<li><a href id="+ tasks[i].objectId +">"+tasks[i].Task+ "</a> <a href='#infopage' id="+ tasks[i].objectId +" ></a> </li>");
    
    }
    
    //refresh the listview
    $("#taskList").listview('refresh');
    
    
    $(".delete").on('click', function(){
       
        var objectId = $(this).attr("id")
        alert("click" + objectId);
        
        //delete objectId
       
        Backendless.Data.of( "Tasks" ).remove( objectId )
        .then( function( timestamp ) {
        console.log( "Contact instance has been deleted" );
        location.reload();
        })
        .catch( function( error ) {
        console.log( "an error has occurred " + error.message );
        });
        
       
    });
    


}

function error(err) {
    alert(err);
}

function onDeviceReady() {
	destinationType=navigator.camera.DestinationType;
}

function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}
	
function onPhotoDataSuccess(imageData) {
	var image = document.getElementById('image');
	image.style.display = 'block';
	image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
      alert('Failed because: ' + message);
}

